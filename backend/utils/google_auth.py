from google.oauth2 import id_token
from google.auth.transport import requests
import os
from fastapi import HTTPException, status

GOOGLE_CLIENT_ID = os.environ.get("GOOGLE_CLIENT_ID", "")

def verify_google_token(token: str) -> dict:
    try:
        # Verify the token
        idinfo = id_token.verify_oauth2_token(
            token, 
            requests.Request(), 
            GOOGLE_CLIENT_ID
        )
        
        # Return user info
        return {
            "email": idinfo.get("email"),
            "name": idinfo.get("name"),
            "google_id": idinfo.get("sub"),
            "profile_image": idinfo.get("picture")
        }
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail=f"Invalid Google token: {str(e)}"
        )