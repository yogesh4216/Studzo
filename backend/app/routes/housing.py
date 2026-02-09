from fastapi import APIRouter, Depends
from typing import List
from app.schemas.housing import HousingResponse, HousingCreate

router = APIRouter()

@router.get("/", response_model=List[HousingResponse])
def read_listings():
    return []

@router.post("/", response_model=HousingResponse)
def create_listing(listing: HousingCreate):
    return {"id": 1, **listing.dict(), "landlord_id": 1, "is_verified": False}
