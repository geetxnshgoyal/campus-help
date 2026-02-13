from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime
from bson import ObjectId

class BookingBase(BaseModel):
    student_id: str
    mentor_id: str
    session_type: str = Field(pattern="^(quick|deep|group)$")
    date: str
    time: str
    duration: int = 15
    price: int
    notes: Optional[str] = None
    status: str = Field(default="pending", pattern="^(pending|confirmed|completed|cancelled)$")
    meeting_link: Optional[str] = None
    payment_status: str = Field(default="pending", pattern="^(pending|completed|refunded)$")
    payment_id: Optional[str] = None

class BookingCreate(BaseModel):
    mentor_id: str
    session_type: str
    date: str
    time: str
    notes: Optional[str] = None

class Booking(BookingBase):
    id: str = Field(default_factory=lambda: str(ObjectId()), alias="_id")
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

    class Config:
        populate_by_name = True
        json_encoders = {ObjectId: str}

class BookingUpdate(BaseModel):
    status: Optional[str] = None
    meeting_link: Optional[str] = None
    payment_status: Optional[str] = None
    payment_id: Optional[str] = None

class BookingWithDetails(Booking):
    mentor_name: str
    mentor_image: Optional[str] = None
    student_name: str
    college_name: str