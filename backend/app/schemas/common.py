from pydantic import BaseModel
from typing import Generic, TypeVar, Optional, List

T = TypeVar('T')

class Message(BaseModel):
    message: str

class ResponseBase(BaseModel, Generic[T]):
    data: Optional[T] = None
    message: Optional[str] = None
    success: bool = True
