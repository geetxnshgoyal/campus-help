from fastapi import FastAPI, APIRouter
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
import os
import logging
from pathlib import Path
from database import get_database, close_database

# Import routes
from routes import auth, mentors, colleges, bookings, reviews, dashboard

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# Get MongoDB database instance
db = get_database()

# Create the main app without a prefix
app = FastAPI(title="Campus Connect API", version="1.0.0")

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")

# Health check endpoint
@api_router.get("/")
async def root():
    return {"message": "Campus Connect API is running", "status": "ok"}

# Include all routers
api_router.include_router(auth.router)
api_router.include_router(mentors.router)
api_router.include_router(colleges.router)
api_router.include_router(bookings.router)
api_router.include_router(reviews.router)
api_router.include_router(dashboard.router)

# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("startup")
async def startup_event():
    logger.info("Application starting up...")
    logger.info(f"Connected to MongoDB: {db.name}")

@app.on_event("shutdown")
async def shutdown_event():
    close_database()
    logger.info("Application shutting down...")