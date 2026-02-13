from pydantic import BaseModel, Field
from typing import List, Optional
from datetime import datetime
from bson import ObjectId

class MentorBase(BaseModel):
    user_id: str
    year: str
    college_id: str
    bio: str
    expertise: List[str]
    languages: List[str]
    price: int = 49
    rating: float = 5.0
    sessions_completed: int = 0
    available: bool = True

class MentorCreate(BaseModel):
    year: str
    college_id: str
    bio: str
    expertise: List[str]
    languages: List[str]
    price: int = 49

class Mentor(MentorBase):
    id: str = Field(default_factory=lambda: str(ObjectId()), alias="_id")
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

    class Config:
        populate_by_name = True
        json_encoders = {ObjectId: str}
        json_schema_extra = {
            "example": {
                "year": "2nd Year Student",
                "college_id": "college_id_here",
                "bio": "Computer Science student passionate about web development",
                "expertise": ["Campus Life", "Placements", "Academics"],
                "languages": ["English", "Hindi"],
                "price": 49
            }
        }

class MentorWithUser(Mentor):
    name: str
    email: str
    profile_image: Optional[str] = None
    college_name: str
    college_short_name: str