import time
import asyncio
import logging
from functools import wraps
from typing import Callable, Any, Optional
import random

# Configure logging
logger = logging.getLogger(__name__)

class GeminiRateLimiter:
    """
    Manages rate limiting for Gemini API calls.
    Implements a simple token bucket or fixed window counter.
    For this implementation, we'll use a local in-memory counter 
    since Redis setup might be complex for the user's local env initially.
    """
    def __init__(self, requests_per_minute: int = 60, requests_per_day: int = 1500):
        self.rpm_limit = requests_per_minute
        self.rpd_limit = requests_per_day
        
        self.minute_window_start = time.time()
        self.day_window_start = time.time()
        
        self.requests_this_minute = 0
        self.requests_this_day = 0

    async def wait_for_token(self):
        """Checks limits and waits if necessary."""
        current_time = time.time()
        
        # Reset minute window
        if current_time - self.minute_window_start >= 60:
            self.minute_window_start = current_time
            self.requests_this_minute = 0
            
        # Reset day window
        if current_time - self.day_window_start >= 86400:
            self.day_window_start = current_time
            self.requests_this_day = 0
            
        if self.requests_this_day >= self.rpd_limit:
            raise Exception("Daily quota exceeded")
            
        if self.requests_this_minute >= self.rpm_limit:
            # FAIL FAST for Demo/Mock Mode:
            logger.warning("Rate limit hit. Raising 429 to trigger mock fallback.")
            raise Exception("429 Resource exhausted: Rate limit hit")
            
            # Old Sleep Logic:
            # wait_time = 60 - (current_time - self.minute_window_start) + 1
            # logger.warning(f"Rate limit hit. Waiting {wait_time:.2f}s")
            # await asyncio.sleep(wait_time)
            # self.minute_window_start = time.time()
            # self.requests_this_minute = 0
            
        self.requests_this_minute += 1
        self.requests_this_day += 1

# Global Limiter Instance
rate_limiter = GeminiRateLimiter()

def with_retry(max_retries: int = 3, initial_delay: float = 2.0):
    """
    Decorator for exponential backoff retry logic.
    Handles 429 and 500 errors.
    """
    def decorator(func: Callable):
        @wraps(func)
        async def wrapper(*args, **kwargs):
            delay = initial_delay
            last_exception = None
            
            for attempt in range(max_retries + 1):
                try:
                    await rate_limiter.wait_for_token()
                    return await func(*args, **kwargs)
                except Exception as e:
                    last_exception = e
                    is_retryable = False
                    error_msg = str(e).lower()
                    
                    if "429" in error_msg or "resource_exhausted" in error_msg:
                        is_retryable = True
                        logger.warning(f"429 Quota Exceeded. Attempt {attempt+1}/{max_retries}")
                    elif "500" in error_msg or "internal" in error_msg:
                        is_retryable = True
                        logger.warning(f"500 Server Error. Attempt {attempt+1}/{max_retries}")
                    elif "timeout" in error_msg:
                        is_retryable = True
                    
                    if not is_retryable or attempt == max_retries:
                        raise e
                    
                    # Add jitter
                    sleep_time = delay * (1 + random.random() * 0.1)
                    await asyncio.sleep(sleep_time)
                    delay *= 2 # Exponential backoff
            
            raise last_exception
        return wrapper
    return decorator

# Simple In-Memory Cache (Replace with Redis for production)
_cache = {}

def with_cache(ttl_seconds: int = 3600):
    """Decorator to cache results based on function arguments."""
    def decorator(func: Callable):
        @wraps(func)
        async def wrapper(*args, **kwargs):
            # Create a simplified cache key from args (excluding self)
            # This is a basic implementation
            try:
                key_parts = [func.__name__]
                for arg in args[1:]: # Skip self
                    key_parts.append(str(arg))
                for k, v in kwargs.items():
                    key_parts.append(f"{k}={v}")
                
                cache_key = "_".join(key_parts)
                
                # Check cache
                if cache_key in _cache:
                    timestamp, data = _cache[cache_key]
                    if time.time() - timestamp < ttl_seconds:
                        logger.info(f"Cache hit for {func.__name__}")
                        return data
                    else:
                        del _cache[cache_key]
                
                # Call function
                result = await func(*args, **kwargs)
                
                # Store in cache
                _cache[cache_key] = (time.time(), result)
                return result
            except Exception as e:
                # If caching logic fails, just run the function
                return await func(*args, **kwargs)
        return wrapper
    return decorator
