from sqlalchemy import Column, Integer, Float, ForeignKey, DateTime, JSON
from sqlalchemy.sql import func
from app.database import Base

class RoommateMatch(Base):
    __tablename__ = "roommate_matches"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    match_user_id = Column(Integer, ForeignKey("users.id"))
    compatibility_score = Column(Float)
    analysis = Column(JSON)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
