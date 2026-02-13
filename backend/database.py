from motor.motor_asyncio import AsyncIOMotorClient
import os
from fastapi import Request

# Global database client
_client = None
_db = None

def get_database():
    """Get database instance"""
    global _db
    if _db is None:
        mongo_url = os.environ.get('MONGO_URL')
        db_name = os.environ.get('DB_NAME')
        if mongo_url and db_name:
            global _client
            _client = AsyncIOMotorClient(mongo_url)
            _db = _client[db_name]
    return _db

async def get_db():
    """Dependency to get database"""
    return get_database()

def close_database():
    """Close database connection"""
    global _client
    if _client:
        _client.close()
