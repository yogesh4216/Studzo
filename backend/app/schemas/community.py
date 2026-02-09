from pydantic import BaseModel
from datetime import datetime

class EventBase(BaseModel):
    title: str
    description: str
    date: datetime

class EventCreate(EventBase):
    pass

class EventUpdate(EventBase):
    pass

class EventResponse(EventBase):
    id: int
    organizer_id: int

    class Config:
        orm_mode = True
