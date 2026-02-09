from typing import Optional
from pydantic import BaseModel

class HousingBase(BaseModel):
    title: str
    description: Optional[str] = None
    address: str
    price: float
    bedrooms: int
    bathrooms: float

class HousingCreate(HousingBase):
    pass

class HousingUpdate(HousingBase):
    title: Optional[str] = None
    price: Optional[float] = None

class HousingResponse(HousingBase):
    id: int
    landlord_id: int
    is_verified: bool

    class Config:
        orm_mode = True
