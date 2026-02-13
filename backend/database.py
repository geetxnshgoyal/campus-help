from motor.motor_asyncio import AsyncIOMotorClient
import os
from dotenv import load_dotenv
from pathlib import Path

# Load environment variables
ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# Initialize database connection immediately
mongo_url = os.environ.get('MONGO_URL')
db_name = os.environ.get('DB_NAME')

if not mongo_url or not db_name:
    raise ValueError("MONGO_URL and DB_NAME must be set in environment variables")

_client = AsyncIOMotorClient(mongo_url)
_db = _client[db_name]

def get_database():
    """Get database instance"""
    return _db

async def get_db():
    """Dependency to get database"""
    return _db

def close_database():
    """Close database connection"""
    global _client
    if _client:
        _client.close()
