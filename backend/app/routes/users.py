from fastapi import APIRouter, Depends
from typing import List
from app.schemas.user import UserResponse

router = APIRouter()

@router.get("/", response_model=List[UserResponse])
def read_users():
    return []

@router.get("/me", response_model=UserResponse)
def read_user_me():
    return {"id": 1, "email": "me@example.com", "is_active": True}
