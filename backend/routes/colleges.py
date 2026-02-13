from fastapi import APIRouter, HTTPException, status
from models.college import College, CollegeCreate
from motor.motor_asyncio import AsyncIOMotorClient
from datetime import datetime
from bson import ObjectId
import os

router = APIRouter(prefix="/colleges", tags=["Colleges"])

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

@router.get("", response_model=dict)
async def get_colleges():
    colleges_cursor = db.colleges.find({})
    colleges = await colleges_cursor.to_list(length=100)
    
    for college in colleges:
        college["_id"] = str(college["_id"])
    
    return {"colleges": colleges}

@router.get("/{college_id}")
async def get_college(college_id: str):
    try:
        college = await db.colleges.find_one({"_id": ObjectId(college_id)})
    except:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid college ID"
        )
    
    if not college:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="College not found"
        )
    
    college["_id"] = str(college["_id"])
    
    # Count mentors
    mentors_count = await db.mentors.count_documents({"college_id": college_id})
    
    return {
        "college": college,
        "mentors_count": mentors_count
    }

@router.post("", status_code=status.HTTP_201_CREATED)
async def create_college(college: CollegeCreate):
    college_dict = college.model_dump()
    college_dict["created_at"] = datetime.utcnow()
    college_dict["updated_at"] = datetime.utcnow()
    
    result = await db.colleges.insert_one(college_dict)
    college_dict["_id"] = str(result.inserted_id)
    
    return {
        "message": "College created successfully",
        "college": college_dict
    }