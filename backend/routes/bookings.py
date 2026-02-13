from fastapi import APIRouter, HTTPException, status, Depends
from models.booking import Booking, BookingCreate, BookingUpdate, BookingWithDetails
from utils.auth import get_current_user
from database import get_database
from datetime import datetime
from bson import ObjectId

# Get database instance
db = get_database()

router = APIRouter(prefix="/bookings", tags=["Bookings"])

# MongoDB connection

@router.post("", status_code=status.HTTP_201_CREATED)
async def create_booking(
    booking: BookingCreate,
    current_user: dict = Depends(get_current_user)
):
    # Get mentor to get price
    try:
        mentor = await db.mentors.find_one({"_id": ObjectId(booking.mentor_id)})
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
    
    # Determine price based on session type
    price = mentor["price"]
    duration = 15
    if booking.session_type == "deep":
        price = mentor["price"] * 2
        duration = 30
    elif booking.session_type == "group":
        price = mentor["price"]
        duration = 60
    
    # Create booking
    booking_dict = {
        "student_id": current_user["sub"],
        "mentor_id": booking.mentor_id,
        "session_type": booking.session_type,
        "date": booking.date,
        "time": booking.time,
        "duration": duration,
        "price": price,
        "notes": booking.notes,
        "status": "pending",
        "payment_status": "pending",
        "created_at": datetime.utcnow(),
        "updated_at": datetime.utcnow()
    }
    
    result = await db.bookings.insert_one(booking_dict)
    booking_dict["_id"] = str(result.inserted_id)
    
    return {
        "message": "Booking created successfully",
        "booking": booking_dict,
        "payment_url": f"/payment/{str(result.inserted_id)}"  # Placeholder for payment integration
    }

@router.get("", response_model=dict)
async def get_bookings(current_user: dict = Depends(get_current_user)):
    # Get bookings for current user
    query = {}
    if current_user["role"] == "student":
        query["student_id"] = current_user["sub"]
    elif current_user["role"] == "mentor":
        # Find mentor profile
        mentor = await db.mentors.find_one({"user_id": current_user["sub"]})
        if mentor:
            query["mentor_id"] = str(mentor["_id"])
    
    bookings_cursor = db.bookings.find(query).sort("created_at", -1)
    bookings = await bookings_cursor.to_list(length=100)
    
    # Enrich bookings with details
    enriched_bookings = []
    for booking in bookings:
        # Get mentor
        mentor = await db.mentors.find_one({"_id": ObjectId(booking["mentor_id"])})
        if not mentor:
            continue
        
        # Get mentor user
        mentor_user = await db.users.find_one({"_id": ObjectId(mentor["user_id"])})
        if not mentor_user:
            continue
        
        # Get student
        student = await db.users.find_one({"_id": ObjectId(booking["student_id"])})
        if not student:
            continue
        
        # Get college
        college = await db.colleges.find_one({"_id": ObjectId(mentor["college_id"])})
        
        booking["_id"] = str(booking["_id"])
        booking["mentor_name"] = mentor_user["name"]
        booking["mentor_image"] = mentor_user.get("profile_image")
        booking["student_name"] = student["name"]
        booking["college_name"] = college["name"] if college else "Unknown"
        
        enriched_bookings.append(booking)
    
    return {"bookings": enriched_bookings}

@router.patch("/{booking_id}")
async def update_booking(
    booking_id: str,
    booking_update: BookingUpdate,
    current_user: dict = Depends(get_current_user)
):
    try:
        booking = await db.bookings.find_one({"_id": ObjectId(booking_id)})
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
    
    # Update booking
    update_data = booking_update.model_dump(exclude_unset=True)
    update_data["updated_at"] = datetime.utcnow()
    
    await db.bookings.update_one(
        {"_id": ObjectId(booking_id)},
        {"$set": update_data}
    )
    
    # Get updated booking
    updated_booking = await db.bookings.find_one({"_id": ObjectId(booking_id)})
    updated_booking["_id"] = str(updated_booking["_id"])
    
    return {
        "message": "Booking updated successfully",
        "booking": updated_booking
    }