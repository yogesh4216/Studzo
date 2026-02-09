from typing import Optional
from pydantic import BaseModel, EmailStr

class UserBase(BaseModel):
    email: EmailStr
    full_name: Optional[str] = None
    role: Optional[str] = "student"
    university: Optional[str] = None

class UserCreate(UserBase):
    password: str

class UserUpdate(UserBase):
    password: Optional[str] = None
    bio: Optional[str] = None

class UserResponse(UserBase):
    id: int
    is_active: bool
    bio: Optional[str] = None

    class Config:
        orm_mode = True
