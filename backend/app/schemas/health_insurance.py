from pydantic import BaseModel
from typing import Optional, Dict, Any, List

class HealthInsuranceRequest(BaseModel):
    query_text: str

class HealthInsuranceResponse(BaseModel):
    analysis: Dict[str, Any]
