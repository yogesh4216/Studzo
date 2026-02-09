from sqlalchemy import Column, Integer, String, DateTime, ForeignKey, JSON
from sqlalchemy.sql import func
from app.database import Base

class CulturalGuide(Base):
    __tablename__ = "cultural_guides"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    home_country = Column(String)
    host_country = Column(String)
    host_city = Column(String, nullable=True)
    university = Column(String, nullable=True)
    ai_advice = Column(JSON) # Stores the full structured guidance
    created_at = Column(DateTime(timezone=True), server_default=func.now())
