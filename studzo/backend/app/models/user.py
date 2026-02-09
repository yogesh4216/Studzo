from sqlalchemy import Boolean, Column, Integer, String, Enum
from sqlalchemy.orm import relationship
from app.database import Base
import enum

class UserRole(str, enum.Enum):
    STUDENT = "student"
    LANDLORD = "landlord"
    ADMIN = "admin"

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True)
    hashed_password = Column(String)
    full_name = Column(String, index=True)
    role = Column(String, default=UserRole.STUDENT)
    is_active = Column(Boolean, default=True)
    university = Column(String, nullable=True)
    bio = Column(String, nullable=True)

    health_insurance_logs = relationship("HealthInsuranceLog", back_populates="user")
