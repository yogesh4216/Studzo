from sqlalchemy import Column, Integer, String, Float, ForeignKey, Boolean, Text, DateTime, JSON
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.database import Base

class Housing(Base):
    __tablename__ = "housing"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True)
    description = Column(Text)
    address = Column(String)
    price = Column(Float)
    currency = Column(String, default="USD")
    bedrooms = Column(Integer)
    bathrooms = Column(Float)
    is_verified = Column(Boolean, default=False)
    landlord_id = Column(Integer, ForeignKey("users.id"))

    landlord = relationship("User", backref="listings")



