from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime
from bson import ObjectId

class CollegeBase(BaseModel):
    name: str
    short_name: str
    description: str
    location: Optional[str] = None

class CollegeCreate(CollegeBase):
    pass

class College(CollegeBase):
    id: str = Field(default_factory=lambda: str(ObjectId()), alias="_id")
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

    class Config:
        populate_by_name = True
        json_encoders = {ObjectId: str}
        json_schema_extra = {
            "example": {
                "name": "Newton School of Technology",
                "short_name": "NST",
                "description": "A tech-first university focused on practical learning",
                "location": "Pune"
            }
        }