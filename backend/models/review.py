from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime
from bson import ObjectId

class ReviewBase(BaseModel):
    mentor_id: str
    student_id: str
    booking_id: str
    rating: int = Field(ge=1, le=5)
    comment: str

class ReviewCreate(BaseModel):
    mentor_id: str
    booking_id: str
    rating: int = Field(ge=1, le=5)
    comment: str

class Review(ReviewBase):
    id: str = Field(default_factory=lambda: str(ObjectId()), alias="_id")
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

    class Config:
        populate_by_name = True
        json_encoders = {ObjectId: str}

class ReviewWithStudent(Review):
    student_name: str
    student_image: Optional[str] = None