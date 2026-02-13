from fastapi import APIRouter, HTTPException, status, Query
from models.mentor import Mentor, MentorCreate, MentorWithUser
from motor.motor_asyncio import AsyncIOMotorClient
from typing import Optional, List
from datetime import datetime
from bson import ObjectId
import os

router = APIRouter(prefix="/mentors", tags=["Mentors"])

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

@router.get("", response_model=dict)
async def get_mentors(
    college_id: Optional[str] = None,
    search: Optional[str] = None,
    limit: int = Query(default=10, le=100),
    offset: int = Query(default=0, ge=0)
):
    query = {"available": True}
    
    if college_id:
        query["college_id"] = college_id
    
    # Get mentors
    mentors_cursor = db.mentors.find(query).skip(offset).limit(limit)
    mentors = await mentors_cursor.to_list(length=limit)
    
    # Enrich with user and college data
    enriched_mentors = []
    for mentor in mentors:
        # Get user details
        user = await db.users.find_one({"_id": ObjectId(mentor["user_id"])})
        if not user:
            continue
            
        # Get college details
        college = await db.colleges.find_one({"_id": ObjectId(mentor["college_id"])})
        if not college:
            continue
        
        mentor["_id"] = str(mentor["_id"])
        mentor["name"] = user["name"]
        mentor["email"] = user["email"]
        mentor["profile_image"] = user.get("profile_image")
        mentor["college_name"] = college["name"]
        mentor["college_short_name"] = college["short_name"]
        
        # Apply search filter
        if search:
            search_lower = search.lower()
            if (search_lower in mentor["name"].lower() or 
                search_lower in mentor["college_name"].lower()):
                enriched_mentors.append(mentor)
        else:
            enriched_mentors.append(mentor)
    
    total = await db.mentors.count_documents(query)
    
    return {
        "mentors": enriched_mentors,
        "total": total,
        "page": offset // limit + 1,
        "limit": limit
    }

@router.get("/{mentor_id}")
async def get_mentor(mentor_id: str):
    try:
        mentor = await db.mentors.find_one({"_id": ObjectId(mentor_id)})
    except:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid mentor ID"
        )
    
    if not mentor:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Mentor not found"
        )
    
    # Get user details
    user = await db.users.find_one({"_id": ObjectId(mentor["user_id"])})
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found"
        )
    
    # Get college details
    college = await db.colleges.find_one({"_id": ObjectId(mentor["college_id"])})
    if not college:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="College not found"
        )
    
    # Get reviews
    reviews_cursor = db.reviews.find({"mentor_id": mentor_id}).sort("created_at", -1)
    reviews = await reviews_cursor.to_list(length=100)
    
    # Enrich reviews with student data
    enriched_reviews = []
    for review in reviews:
        student = await db.users.find_one({"_id": ObjectId(review["student_id"])})
        if student:
            review["_id"] = str(review["_id"])
            review["student_name"] = student["name"]
            review["student_image"] = student.get("profile_image")
            enriched_reviews.append(review)
    
    mentor["_id"] = str(mentor["_id"])
    mentor["name"] = user["name"]
    mentor["email"] = user["email"]
    mentor["profile_image"] = user.get("profile_image")
    mentor["college_name"] = college["name"]
    mentor["college_short_name"] = college["short_name"]
    
    return {
        "mentor": mentor,
        "reviews": enriched_reviews
    }