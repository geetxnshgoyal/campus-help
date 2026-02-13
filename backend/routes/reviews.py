from fastapi import APIRouter, HTTPException, status, Depends
from models.review import Review, ReviewCreate, ReviewWithStudent
from utils.auth import get_current_user
from motor.motor_asyncio import AsyncIOMotorClient
from datetime import datetime
from bson import ObjectId
import os

router = APIRouter(prefix="/reviews", tags=["Reviews"])

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

@router.post("", status_code=status.HTTP_201_CREATED)
async def create_review(
    review: ReviewCreate,
    current_user: dict = Depends(get_current_user)
):
    # Check if booking exists and belongs to user
    try:
        booking = await db.bookings.find_one({"_id": ObjectId(review.booking_id)})
    except:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid booking ID"
        )
    
    if not booking:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Booking not found"
        )
    
    if booking["student_id"] != current_user["sub"]:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="You can only review your own bookings"
        )
    
    # Check if review already exists
    existing_review = await db.reviews.find_one({"booking_id": review.booking_id})
    if existing_review:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Review already exists for this booking"
        )
    
    # Create review
    review_dict = {
        "mentor_id": review.mentor_id,
        "student_id": current_user["sub"],
        "booking_id": review.booking_id,
        "rating": review.rating,
        "comment": review.comment,
        "created_at": datetime.utcnow(),
        "updated_at": datetime.utcnow()
    }
    
    result = await db.reviews.insert_one(review_dict)
    review_dict["_id"] = str(result.inserted_id)
    
    # Update mentor rating
    mentor = await db.mentors.find_one({"_id": ObjectId(review.mentor_id)})
    if mentor:
        # Calculate new average rating
        reviews = await db.reviews.find({"mentor_id": review.mentor_id}).to_list(length=1000)
        total_rating = sum(r["rating"] for r in reviews)
        avg_rating = round(total_rating / len(reviews), 1)
        
        await db.mentors.update_one(
            {"_id": ObjectId(review.mentor_id)},
            {"$set": {"rating": avg_rating}}
        )
    
    return {
        "message": "Review created successfully",
        "review": review_dict
    }

@router.get("/mentor/{mentor_id}")
async def get_mentor_reviews(mentor_id: str):
    reviews_cursor = db.reviews.find({"mentor_id": mentor_id}).sort("created_at", -1)
    reviews = await reviews_cursor.to_list(length=100)
    
    # Enrich with student data
    enriched_reviews = []
    for review in reviews:
        student = await db.users.find_one({"_id": ObjectId(review["student_id"])})
        if student:
            review["_id"] = str(review["_id"])
            review["student_name"] = student["name"]
            review["student_image"] = student.get("profile_image")
            enriched_reviews.append(review)
    
    # Calculate average rating
    if enriched_reviews:
        avg_rating = sum(r["rating"] for r in enriched_reviews) / len(enriched_reviews)
        avg_rating = round(avg_rating, 1)
    else:
        avg_rating = 0
    
    return {
        "reviews": enriched_reviews,
        "average_rating": avg_rating
    }