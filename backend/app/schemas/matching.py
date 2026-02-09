from pydantic import BaseModel

class MatchBase(BaseModel):
    user_id: int
    match_user_id: int
    compatibility_score: float

class MatchCreate(MatchBase):
    pass

class MatchResponse(MatchBase):
    id: int

    class Config:
        orm_mode = True
