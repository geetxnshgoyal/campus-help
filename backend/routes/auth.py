from fastapi import APIRouter, HTTPException, status, Depends
from models.user import UserCreate, UserLogin, User, UserInDB, GoogleAuthRequest
from utils.auth import hash_password, verify_password, create_access_token, get_current_user
from utils.google_auth import verify_google_token
from database import get_database
from datetime import datetime

router = APIRouter(prefix="/auth", tags=["Authentication"])

# Get database instance
db = get_database()

@router.post("/register", status_code=status.HTTP_201_CREATED)
async def register(user: UserCreate):
    # Check if user already exists
    existing_user = await db.users.find_one({"email": user.email})
    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already registered"
        )
    
    # Hash password
    hashed_password = hash_password(user.password)
    
    # Create user document
    user_dict = user.model_dump(exclude={"password"})
    user_dict["password"] = hashed_password
    user_dict["created_at"] = datetime.utcnow()
    user_dict["updated_at"] = datetime.utcnow()
    
    # Insert into database
    result = await db.users.insert_one(user_dict)
    user_dict["_id"] = str(result.inserted_id)
    
    # Create JWT token
    token = create_access_token(data={
        "sub": str(result.inserted_id),
        "email": user.email,
        "role": user.role
    })
    
    # Remove password from response
    user_dict.pop("password")
    
    return {
        "message": "User registered successfully",
        "user": user_dict,
        "token": token
    }

@router.post("/login")
async def login(credentials: UserLogin):
    # Find user by email
    user = await db.users.find_one({"email": credentials.email})
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password"
        )
    
    # Verify password
    if not verify_password(credentials.password, user["password"]):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password"
        )
    
    # Create JWT token
    token = create_access_token(data={
        "sub": str(user["_id"]),
        "email": user["email"],
        "role": user["role"]
    })
    
    # Remove password from response
    user.pop("password")
    user["_id"] = str(user["_id"])
    
    return {
        "message": "Login successful",
        "user": user,
        "token": token
    }

@router.post("/google")
async def google_auth(auth_request: GoogleAuthRequest):
    # Verify Google token
    google_user = verify_google_token(auth_request.token)
    
    # Check if user exists
    user = await db.users.find_one({"email": google_user["email"]})
    
    if not user:
        # Create new user
        user_dict = {
            "name": google_user["name"],
            "email": google_user["email"],
            "phone": "",
            "role": "student",
            "google_id": google_user["google_id"],
            "profile_image": google_user.get("profile_image"),
            "password": "",  # No password for Google auth
            "created_at": datetime.utcnow(),
            "updated_at": datetime.utcnow()
        }
        result = await db.users.insert_one(user_dict)
        user_dict["_id"] = str(result.inserted_id)
        user = user_dict
    else:
        user["_id"] = str(user["_id"])
    
    # Create JWT token
    token = create_access_token(data={
        "sub": str(user["_id"]),
        "email": user["email"],
        "role": user["role"]
    })
    
    # Remove password from response
    if "password" in user:
        user.pop("password")
    
    return {
        "message": "Google login successful",
        "user": user,
        "token": token
    }

@router.get("/me")
async def get_me(current_user: dict = Depends(get_current_user)):
    from bson import ObjectId
    try:
        user = await db.users.find_one({"_id": ObjectId(current_user["sub"])})
    except:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid user ID"
        )
    
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found"
        )
    user["_id"] = str(user["_id"])
    user.pop("password", None)
    return {"user": user}