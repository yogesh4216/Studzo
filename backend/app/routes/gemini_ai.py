from fastapi import APIRouter, HTTPException, Depends
from app.services.gemini_service import gemini_service
from pydantic import BaseModel
from typing import List, Dict, Any

from datetime import date
from sqlalchemy.orm import Session
from app.database import get_db

from app.models.cultural import CulturalGuide
from app.models.matching import RoommateMatch
from app.models.chat import ChatHistory
from sqlalchemy import desc

router = APIRouter()

class RoommateMatchRequest(BaseModel):
    user_profile: dict
    candidates: List[dict]

class HostelSearchRequest(BaseModel):
    query: str
    filters: dict

class LeaseAnalysisRequest(BaseModel):
    text: str

@router.post("/roommate-match")
async def match_roommates(request: RoommateMatchRequest, db: Session = Depends(get_db)):
    return await gemini_service.match_roommates(request.user_profile, request.candidates)





class CulturalGuidanceRequest(BaseModel):
    home_country: str
    host_country: str
    university: str
    week: int
    challenges: str

@router.post("/cultural-guidance")
async def cultural_guidance(request: CulturalGuidanceRequest, db: Session = Depends(get_db)):
    # 1. Get Guidance
    parsed_data = await gemini_service.cultural_guidance(
        request.home_country, 
        request.host_country, 
        request.university, 
        request.week, 
        request.challenges
    )
    
    # 2. Save to DB
    db_record = CulturalGuide(
        user_id=1,
        home_country=request.home_country,
        host_country=request.host_country,
        university=request.university,
        ai_advice=parsed_data
    )
    db.add(db_record)
    db.commit()
    
    return parsed_data

class CulturalDiscoveryRequest(BaseModel):
    home_country: str
    host_country: str
    city: str
    date_range: str

@router.post("/cultural-discovery")
async def cultural_discovery(request: CulturalDiscoveryRequest):
    return await gemini_service.cultural_discovery(
        request.home_country,
        request.host_country,
        request.city,
        request.date_range
    )

class FinancialGuidanceRequest(BaseModel):
    host_country: str
    home_country: str
    length: str
    income: float
    expenses: float
    rent: float
    food: float
    other: float
    budget: float
    query: str = ""

@router.post("/financial-guidance")
async def financial_guidance(request: FinancialGuidanceRequest):
    # Service expects a single dict
    return await gemini_service.financial_guidance(request.dict())

class FinancialRiskRequest(BaseModel):
    text: str

@router.post("/financial-risk")
async def financial_risk(request: FinancialRiskRequest):
    return await gemini_service.analyze_financial_risk(request.text)

class CommunityRecRequest(BaseModel):
    country: str
    interests: str
    university: str
    budget: float
    loneliness: int
    weeks: int
    hours_per_week: int = 5
    location: str = ""
    events: List[Any] = []

@router.post("/community-recommendations")
async def community_recommendations(request: CommunityRecRequest):
    return await gemini_service.community_recommendations(request.dict())

class CommunityConnectRequest(BaseModel):
    user_profile: dict
    query: str = ""

class AskCommunityRequest(BaseModel):
    community_context: str
    question: str

@router.post("/community-connect")
async def community_connect(request: CommunityConnectRequest):
    return await gemini_service.community_connect(request.user_profile, request.query)

@router.post("/ask-community")
async def ask_community(request: AskCommunityRequest):
    return await gemini_service.ask_community(request.community_context, request.question)

class JobFindRequest(BaseModel):
    user_profile: dict
    query: str = ""

class JobScamCheckRequest(BaseModel):
    text: str

@router.post("/job-finder")
async def find_jobs(request: JobFindRequest):
    return await gemini_service.find_jobs(request.user_profile, request.query)

@router.post("/job-scam-check")
async def analyze_job_scam(request: JobScamCheckRequest):
    return await gemini_service.analyze_job_scam(request.text)

class HostelSearchRequest(BaseModel):
    query: str
    filters: dict = {}

@router.post("/hostel-discovery")
async def search_hostels(request: HostelSearchRequest):
    return await gemini_service.search_hostels(request.query, request.filters)

class LeaseAnalysisRequest(BaseModel):
    text: str

@router.post("/lease-analysis")
async def analyze_lease(request: LeaseAnalysisRequest):
    return await gemini_service.analyze_lease(request.text)





from app.utils.analytics import get_analytics_summary

@router.get("/analytics")
async def get_analytics():
    return get_analytics_summary()

from fastapi import WebSocket, WebSocketDisconnect
from app.websocket.manager import manager
import json

@router.websocket("/chat/{user_id}")
async def websocket_endpoint(websocket: WebSocket, user_id: int, db: Session = Depends(get_db)):
    await manager.connect(websocket, user_id)
    
    # 1. Load History
    # Fetch last 20 messages, ordered by timestamp desc, then reverse to get chronological
    history_records = db.query(ChatHistory).filter(ChatHistory.user_id == user_id).order_by(desc(ChatHistory.timestamp)).limit(20).all()
    history_records.reverse()
    
    # Convert to Gemini format
    chat_history = []
    for record in history_records:
        chat_history.append({'role': record.role, 'parts': [record.message]})
        
    try:
        while True:
            data = await websocket.receive_text()
            
            # 2. Save User Message
            user_msg = ChatHistory(user_id=user_id, role='user', message=data)
            db.add(user_msg)
            db.commit()
            
            # Add to local history for context
            chat_history.append({'role': 'user', 'parts': [data]})
            
            # 3. Stream Response
            full_response = ""
            async for chunk in gemini_service.chat_stream(data, history=chat_history):
                await manager.send_personal_message(chunk, user_id)
                full_response += chunk
            
            # 4. Save Model Response
            if full_response:
                ai_msg = ChatHistory(user_id=user_id, role='model', message=full_response)
                db.add(ai_msg)
                db.commit()
                
                # Add to local history
                chat_history.append({'role': 'model', 'parts': [full_response]})
            
    except WebSocketDisconnect:
        manager.disconnect(websocket, user_id)
    except Exception as e:
        print(f"WebSocket Error: {e}")
        manager.disconnect(websocket, user_id)

@router.websocket("/notifications/{user_id}")
async def notification_endpoint(websocket: WebSocket, user_id: int):
    await manager.connect(websocket, user_id)
    try:
        while True:
            # Keep connection alive, maybe wait for heartbeat
            await websocket.receive_text()
    except WebSocketDisconnect:
        manager.disconnect(websocket, user_id)

class NotificationRequest(BaseModel):
    user_id: int
    message: str
    type: str = "info"

@router.post("/send-notification")
async def send_notification(request: NotificationRequest):
    # In a real app, save to DB here
    msg = json.dumps({"type": request.type, "message": request.message})
    await manager.send_personal_message(msg, request.user_id)
    return {"success": True}

class EmergencySupportRequest(BaseModel):
    input_text: str
    language: str = "en"

@router.post("/emergency-support")
async def emergency_support(request: EmergencySupportRequest):
    return await gemini_service.emergency_support(request.input_text, request.language)




class HealthInsuranceRequest(BaseModel):
    query_text: str

@router.post("/health-insurance")
async def health_insurance(request: HealthInsuranceRequest, db: Session = Depends(get_db)):
    # 1. Get Analysis
    analysis = await gemini_service.analyze_health_insurance(request.query_text)
    
    # 2. Save to DB
    from app.models.health_insurance import HealthInsuranceLog
    db_record = HealthInsuranceLog(
        user_id=1,
        query_text=request.query_text,
        ai_analysis=analysis
    )
    db.add(db_record)
    db.commit()
    
    return analysis
