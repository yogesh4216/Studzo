from sqlalchemy import Column, Integer, String, Float, DateTime, ForeignKey, JSON
from sqlalchemy.sql import func
from app.database import Base

class APICallLog(Base):
    __tablename__ = "api_call_logs"

    id = Column(Integer, primary_key=True, index=True)
    endpoint = Column(String, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=True)
    timestamp = Column(DateTime(timezone=True), server_default=func.now())
    duration_ms = Column(Float)
    status_code = Column(Integer)
    tokens_used = Column(Integer, default=0)
    error_message = Column(String, nullable=True)

class QuotaUsage(Base):
    __tablename__ = "quota_usage"

    id = Column(Integer, primary_key=True, index=True)
    date = Column(DateTime, index=True) # Just the date part
    requests_count = Column(Integer, default=0)
    tokens_count = Column(Integer, default=0)
