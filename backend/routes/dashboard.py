from fastapi import APIRouter, HTTPException, status, Depends
from utils.auth import get_current_user
from motor.motor_asyncio import AsyncIOMotorClient
from bson import ObjectId
import os

router = APIRouter(prefix="/dashboard", tags=["Dashboard"])

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

@router.get("/student")
async def get_student_dashboard(current_user: dict = Depends(get_current_user)):
    if current_user["role"] != "student":
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Only students can access this endpoint"
        )
    
    # Get all bookings
    bookings_cursor = db.bookings.find({"student_id": current_user["sub"]}).sort("date", 1)
    bookings = await bookings_cursor.to_list(length=1000)
    
    upcoming_sessions = []
    past_sessions = []
    total_hours = 0
    
    for booking in bookings:
        booking["_id"] = str(booking["_id"])
        total_hours += booking.get("duration", 0) / 60
        
        if booking["status"] in ["pending", "confirmed"]:
            upcoming_sessions.append(booking)
        else:
            past_sessions.append(booking)
    
    return {
        "upcoming_sessions": upcoming_sessions,
        "past_sessions": past_sessions,
        "total_sessions": len(bookings),
        "total_hours": round(total_hours, 1)
    }

@router.get("/mentor")
async def get_mentor_dashboard(current_user: dict = Depends(get_current_user)):
    if current_user["role"] != "mentor":
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Only mentors can access this endpoint"
        )
    
    # Find mentor profile
    mentor = await db.mentors.find_one({"user_id": current_user["sub"]})
    if not mentor:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Mentor profile not found"
        )
    
    mentor_id = str(mentor["_id"])
    
    # Get all bookings
    bookings_cursor = db.bookings.find({"mentor_id": mentor_id}).sort("date", 1)
    bookings = await bookings_cursor.to_list(length=1000)
    
    upcoming_sessions = []
    completed_sessions = []
    total_earnings = 0
    
    for booking in bookings:
        booking["_id"] = str(booking["_id"])
        
        if booking["payment_status"] == "completed":
            total_earnings += booking.get("price", 0)
        
        if booking["status"] in ["pending", "confirmed"]:
            upcoming_sessions.append(booking)
        elif booking["status"] == "completed":
            completed_sessions.append(booking)
    
    return {
        "upcoming_sessions": upcoming_sessions,
        "completed_sessions": completed_sessions,
        "total_earnings": total_earnings,
        "rating": mentor.get("rating", 5.0),
        "sessions_completed": mentor.get("sessions_completed", 0)
    }