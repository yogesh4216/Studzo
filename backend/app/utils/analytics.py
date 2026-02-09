from datetime import datetime, timedelta
import logging

# Simple in-memory analytics storage
_analytics_data = []

def log_ai_usage(feature: str, success: bool, latency: float):
    _analytics_data.append({
        "timestamp": datetime.now(),
        "feature": feature,
        "success": success,
        "latency": latency
    })

def get_analytics_summary():
    total_calls = len(_analytics_data)
    if total_calls == 0:
        return {
            "total_calls": 0,
            "success_rate": 0,
            "average_latency": 0,
            "feature_breakdown": {}
        }
    
    successful_calls = sum(1 for call in _analytics_data if call["success"])
    total_latency = sum(call["latency"] for call in _analytics_data)
    
    feature_counts = {}
    for call in _analytics_data:
        feature = call["feature"]
        feature_counts[feature] = feature_counts.get(feature, 0) + 1
        
    return {
        "total_calls": total_calls,
        "success_rate":  round((successful_calls / total_calls) * 100, 2),
        "average_latency": round(total_latency / total_calls, 3),
        "feature_breakdown": feature_counts
    }
