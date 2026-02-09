from sqlalchemy import Column, Integer, String, DateTime, ForeignKey
from app.database import Base

class CommunityEvent(Base):
    __tablename__ = "community_events"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True)
    description = Column(String)
    date = Column(DateTime)
    organizer_id = Column(Integer, ForeignKey("users.id"))
