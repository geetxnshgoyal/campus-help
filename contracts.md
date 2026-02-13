# Campus Connect - API Contracts & Implementation Guide

## Overview
This document outlines the API contracts, database models, and integration strategy for the Campus Connect platform.

## Database Models

### 1. User Model
```python
{
    "_id": ObjectId,
    "name": string,
    "email": string (unique),
    "password": string (hashed),
    "phone": string,
    "role": enum["student", "mentor", "admin"],
    "profile_image": string (URL),
    "google_id": string (optional),
    "created_at": datetime,
    "updated_at": datetime
}
```

### 2. Mentor Model
```python
{
    "_id": ObjectId,
    "user_id": ObjectId (ref: User),
    "year": string,
    "college_id": ObjectId (ref: College),
    "rating": float,
    "price": integer,
    "bio": string,
    "expertise": array[string],
    "languages": array[string],
    "sessions_completed": integer,
    "available": boolean,
    "created_at": datetime,
    "updated_at": datetime
}
```

### 3. College Model
```python
{
    "_id": ObjectId,
    "name": string,
    "short_name": string,
    "description": string,
    "location": string,
    "created_at": datetime,
    "updated_at": datetime
}
```

### 4. Session/Booking Model
```python
{
    "_id": ObjectId,
    "student_id": ObjectId (ref: User),
    "mentor_id": ObjectId (ref: Mentor),
    "session_type": enum["quick", "deep", "group"],
    "date": datetime,
    "time": string,
    "duration": integer (minutes),
    "price": integer,
    "status": enum["pending", "confirmed", "completed", "cancelled"],
    "notes": string,
    "meeting_link": string,
    "payment_status": enum["pending", "completed", "refunded"],
    "payment_id": string,
    "created_at": datetime,
    "updated_at": datetime
}
```

### 5. Review Model
```python
{
    "_id": ObjectId,
    "mentor_id": ObjectId (ref: Mentor),
    "student_id": ObjectId (ref: User),
    "booking_id": ObjectId (ref: Booking),
    "rating": integer (1-5),
    "comment": string,
    "created_at": datetime,
    "updated_at": datetime
}
```

## API Endpoints

### Authentication APIs

#### 1. POST /api/auth/register
**Request:**
```json
{
  "name": "string",
  "email": "string",
  "password": "string",
  "phone": "string",
  "role": "student|mentor"
}
```
**Response:**
```json
{
  "message": "User registered successfully",
  "user": {...},
  "token": "JWT_TOKEN"
}
```

#### 2. POST /api/auth/login
**Request:**
```json
{
  "email": "string",
  "password": "string"
}
```
**Response:**
```json
{
  "message": "Login successful",
  "user": {...},
  "token": "JWT_TOKEN"
}
```

#### 3. POST /api/auth/google
**Request:**
```json
{
  "token": "GOOGLE_ID_TOKEN"
}
```
**Response:**
```json
{
  "message": "Google login successful",
  "user": {...},
  "token": "JWT_TOKEN"
}
```

### Mentor APIs

#### 4. GET /api/mentors
**Query Params:** `college_id`, `search`, `limit`, `offset`
**Response:**
```json
{
  "mentors": [...],
  "total": 123,
  "page": 1,
  "limit": 10
}
```

#### 5. GET /api/mentors/:id
**Response:**
```json
{
  "mentor": {...},
  "reviews": [...]
}
```

#### 6. POST /api/mentors (Auth Required - Mentor/Admin)
**Request:**
```json
{
  "year": "string",
  "college_id": "string",
  "bio": "string",
  "expertise": ["string"],
  "languages": ["string"],
  "price": 49
}
```

### College APIs

#### 7. GET /api/colleges
**Response:**
```json
{
  "colleges": [...]
}
```

#### 8. GET /api/colleges/:id
**Response:**
```json
{
  "college": {...},
  "mentors_count": 10
}
```

### Booking APIs

#### 9. POST /api/bookings (Auth Required)
**Request:**
```json
{
  "mentor_id": "string",
  "session_type": "quick|deep",
  "date": "2025-07-15",
  "time": "10:00 AM",
  "notes": "string"
}
```
**Response:**
```json
{
  "message": "Booking created successfully",
  "booking": {...},
  "payment_url": "string"
}
```

#### 10. GET /api/bookings (Auth Required)
**Response:**
```json
{
  "bookings": [...]
}
```

#### 11. PATCH /api/bookings/:id (Auth Required)
**Request:**
```json
{
  "status": "confirmed|cancelled",
  "meeting_link": "string"
}
```

### Review APIs

#### 12. POST /api/reviews (Auth Required)
**Request:**
```json
{
  "mentor_id": "string",
  "booking_id": "string",
  "rating": 5,
  "comment": "string"
}
```

#### 13. GET /api/reviews/mentor/:mentor_id
**Response:**
```json
{
  "reviews": [...],
  "average_rating": 4.9
}
```

### Dashboard APIs

#### 14. GET /api/dashboard/student (Auth Required)
**Response:**
```json
{
  "upcoming_sessions": [...],
  "past_sessions": [...],
  "total_sessions": 5,
  "total_hours": 2.5
}
```

#### 15. GET /api/dashboard/mentor (Auth Required)
**Response:**
```json
{
  "upcoming_sessions": [...],
  "completed_sessions": [...],
  "total_earnings": 2450,
  "rating": 4.9
}
```

## Mock Data Migration Plan

### Current Mock Data in `/app/frontend/src/mockData.js`

**To be replaced:**
1. `mentors` array → Migrate to MongoDB Mentor & User collections
2. `colleges` array → Migrate to MongoDB College collection
3. `reviews` array → Migrate to MongoDB Review collection
4. `pricingPlans` array → Can remain as frontend constant

**Migration Steps:**
1. Create seed script to populate MongoDB with mock data
2. Update frontend API calls to use actual endpoints
3. Remove mockData.js imports from components
4. Replace with axios/fetch calls to backend APIs

## Frontend Integration Changes

### Files to Update:

1. **Home.jsx**
   - Replace `import { mentors, colleges } from '../mockData'`
   - Add API calls: `fetchMentors()`, `fetchColleges()`
   
2. **AllMentors.jsx**
   - Add search/filter API integration
   - Implement pagination
   
3. **MentorProfile.jsx**
   - Fetch mentor details from API
   - Fetch reviews from API
   
4. **BookSession.jsx**
   - Integrate booking creation API
   - Add payment gateway integration
   
5. **Dashboard.jsx**
   - Fetch user-specific session data
   - Show real booking information

## Authentication Flow

### JWT-based Authentication:
1. User registers/logs in
2. Backend generates JWT token
3. Frontend stores token in localStorage
4. Include token in Authorization header for protected routes

### Google OAuth Flow:
1. User clicks "Sign in with Google"
2. Get Google ID token from Google OAuth
3. Send token to backend `/api/auth/google`
4. Backend verifies token and creates/finds user
5. Returns JWT token

## Payment Integration (Razorpay)

### Booking Flow with Payment:
1. User creates booking
2. Backend creates Razorpay order
3. Frontend opens Razorpay checkout
4. On success, update booking status
5. Send confirmation email

## Video Call Integration (Future)

### Options:
1. **Zoom API** - Generate meeting links
2. **Google Meet API** - Generate meeting links
3. **Agora/Twilio** - Custom video solution

## Error Handling

### Standard Error Response:
```json
{
  "error": true,
  "message": "Error description",
  "status_code": 400
}
```

## Security Considerations

1. **Password Hashing**: Use bcrypt with salt rounds
2. **JWT Secret**: Strong secret key stored in environment
3. **Input Validation**: Validate all inputs on backend
4. **Rate Limiting**: Implement rate limiting on auth endpoints
5. **CORS**: Configure proper CORS policies
6. **API Key Protection**: Never expose API keys in frontend

## Environment Variables Needed

### Backend (.env):
```
MONGO_URL=<existing>
DB_NAME=<existing>
JWT_SECRET=<to_add>
JWT_EXPIRY=7d
GOOGLE_CLIENT_ID=<to_add>
GOOGLE_CLIENT_SECRET=<to_add>
RAZORPAY_KEY_ID=<to_add>
RAZORPAY_KEY_SECRET=<to_add>
SMTP_HOST=<to_add>
SMTP_PORT=<to_add>
SMTP_USER=<to_add>
SMTP_PASSWORD=<to_add>
```

### Frontend (.env):
```
REACT_APP_BACKEND_URL=<existing>
REACT_APP_GOOGLE_CLIENT_ID=<to_add>
REACT_APP_RAZORPAY_KEY_ID=<to_add>
```

## Testing Strategy

1. **Unit Tests**: Test individual API endpoints
2. **Integration Tests**: Test complete user flows
3. **E2E Tests**: Test frontend-backend integration
4. **Load Tests**: Test under high traffic

## Deployment Checklist

- [ ] Seed database with initial data
- [ ] Test all API endpoints
- [ ] Verify authentication flows
- [ ] Test payment integration (sandbox)
- [ ] Configure email notifications
- [ ] Set up error monitoring
- [ ] Enable HTTPS
- [ ] Configure production environment variables
