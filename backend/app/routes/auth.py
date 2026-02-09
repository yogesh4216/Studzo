from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.database import get_db
from app.schemas.user import UserCreate, UserResponse

router = APIRouter()

@router.post("/login")
def login():
    return {"token": "dummy_token"}

@router.post("/register", response_model=UserResponse)
def register(user: UserCreate, db: Session = Depends(get_db)):
    return {"id": 1, "email": user.email, "is_active": True}
