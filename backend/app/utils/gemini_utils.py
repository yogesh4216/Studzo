import asyncio
import time
from functools import wraps
from typing import Callable, Any
import logging

# Simple in-memory cache
_cache = {}
_cache_ttl = 300  # 5 minutes

# Rate limiting
_request_times = []
_rate_limit = 60  # requests per minute
_window_size = 60 # seconds

def rate_limit(func: Callable) -> Callable:
    @wraps(func)
    async def wrapper(*args, **kwargs) -> Any:
        current_time = time.time()
        
        # Remove old requests
        global _request_times
        _request_times = [t for t in _request_times if current_time - t < _window_size]
        
        if len(_request_times) >= _rate_limit:
            wait_time = _window_size - (current_time - _request_times[0])
            logging.warning(f"Rate limit hit. Waiting {wait_time:.2f}s")
            # Implement exponential backoff or simple wait here if critical, 
            # or raise exception to be handled by caller
            raise Exception("Rate limit exceeded. Please try again later.")
            
        _request_times.append(current_time)
        return await func(*args, **kwargs)
    return wrapper

def cache_response(func: Callable) -> Callable:
    @wraps(func)
    async def wrapper(*args, **kwargs) -> Any:
        # Create a simple key from function name and args
        # Note: simplistic key generation, might need robust serialization for complex dicts
        key = f"{func.__name__}:{str(args)}:{str(kwargs)}"
        
        current_time = time.time()
        if key in _cache:
            result, timestamp = _cache[key]
            if current_time - timestamp < _cache_ttl:
                logging.info(f"Cache hit for {key}")
                return result
            
        result = await func(*args, **kwargs)
        _cache[key] = (result, current_time)
        return result
    return wrapper
