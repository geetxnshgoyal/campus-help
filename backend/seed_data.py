import asyncio
from motor.motor_asyncio import AsyncIOMotorClient
from utils.auth import hash_password
from datetime import datetime
import os
from dotenv import load_dotenv
from pathlib import Path

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

async def seed_colleges():
    print("Seeding colleges...")
    colleges_data = [
        {"name": "Newton School of Technology", "short_name": "NST", "description": "A tech-first university focused on practical learning and industry partnerships", "location": "Pune"},
        {"name": "Scaler School of Technology", "short_name": "SST", "description": "Building the next generation of tech leaders with hands-on experience", "location": "Bangalore"},
        {"name": "Vedam School of Technology", "short_name": "Vedam", "description": "Where ancient wisdom meets modern technology education", "location": "Hyderabad"},
        {"name": "NxtWave Institute of Advanced Technology", "short_name": "NIAT", "description": "Pioneering advanced tech education with industry-ready curriculum", "location": "Hyderabad"},
        {"name": "Polaris School of Technology", "short_name": "Polaris", "description": "Guiding students towards stellar careers in technology", "location": "Chennai"},
        {"name": "100x School of Technology", "short_name": "100x", "description": "Guiding students towards stellar careers in technology", "location": "Bangalore"},
        {"name": "LeapStart School of Technology", "short_name": "LST", "description": "Fast-track your tech career with industry-focused curriculum", "location": "Delhi"}
    ]
    
    for college in colleges_data:
        college["created_at"] = datetime.utcnow()
        college["updated_at"] = datetime.utcnow()
        existing = await db.colleges.find_one({"short_name": college["short_name"]})
        if not existing:
            await db.colleges.insert_one(college)
            print(f"  ✓ Created college: {college['name']}")
        else:
            print(f"  - College already exists: {college['name']}")

async def seed_users_and_mentors():
    print("Seeding users and mentors...")
    
    # Get college IDs
    colleges = await db.colleges.find().to_list(length=10)
    college_map = {c["short_name"]: str(c["_id"]) for c in colleges}
    
    mentors_data = [
        {
            "name": "Harsh Hirawat",
            "email": "harsh@example.com",
            "password": "password123",
            "phone": "+91 9876543210",
            "role": "mentor",
            "profile_image": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
            "mentor_data": {
                "year": "2nd Year Student",
                "college_id": college_map.get("NST"),
                "bio": "Computer Science student passionate about web development and AI. Happy to share insights about NST campus life, placements, and academics.",
                "expertise": ["Campus Life", "Placements", "Academics", "Hostel"],
                "languages": ["English", "Hindi"],
                "price": 49,
                "rating": 4.9,
                "sessions_completed": 45
            }
        },
        {
            "name": "Nitya Jain",
            "email": "nitya@example.com",
            "password": "password123",
            "phone": "+91 9876543211",
            "role": "mentor",
            "profile_image": "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
            "mentor_data": {
                "year": "2nd Year Student",
                "college_id": college_map.get("NST"),
                "bio": "Aspiring software engineer with interests in machine learning. Can guide you through the admission process and what to expect.",
                "expertise": ["Admissions", "Faculty", "Campus Life", "Projects"],
                "languages": ["English", "Hindi"],
                "price": 49,
                "rating": 5.0,
                "sessions_completed": 38
            }
        },
        {
            "name": "Agrima Gupta",
            "email": "agrima@example.com",
            "password": "password123",
            "phone": "+91 9876543212",
            "role": "mentor",
            "profile_image": "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop",
            "mentor_data": {
                "year": "1st year student",
                "college_id": college_map.get("Vedam"),
                "bio": "Freshly admitted student who recently went through the entire admission process. Perfect for understanding the latest procedures.",
                "expertise": ["Admission Process", "NSAT Exam", "Campus Tour", "Hostel Life"],
                "languages": ["English", "Hindi", "Telugu"],
                "price": 49,
                "rating": 5.0,
                "sessions_completed": 12
            }
        },
        {
            "name": "Kellampalli Saathvik",
            "email": "saathvik@example.com",
            "password": "password123",
            "phone": "+91 9876543213",
            "role": "mentor",
            "profile_image": "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop",
            "mentor_data": {
                "year": "1st year student",
                "college_id": college_map.get("LST"),
                "bio": "Tech enthusiast exploring various domains of computer science. Can share fresh perspectives on college life.",
                "expertise": ["Campus Life", "Coding Culture", "Events", "Clubs"],
                "languages": ["English", "Telugu"],
                "price": 49,
                "rating": 5.0,
                "sessions_completed": 8
            }
        },
        {
            "name": "Prince Tiwari",
            "email": "prince@example.com",
            "password": "password123",
            "phone": "+91 9876543214",
            "role": "mentor",
            "profile_image": "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop",
            "mentor_data": {
                "year": "1st year student",
                "college_id": college_map.get("Vedam"),
                "bio": "Passionate about competitive programming and web development. Here to help you make the right college decision.",
                "expertise": ["Coding", "Placements", "Faculty", "Infrastructure"],
                "languages": ["English", "Hindi"],
                "price": 49,
                "rating": 5.0,
                "sessions_completed": 15
            }
        },
        {
            "name": "Devesh Singh",
            "email": "devesh@example.com",
            "password": "password123",
            "phone": "+91 9876543215",
            "role": "mentor",
            "profile_image": "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop",
            "mentor_data": {
                "year": "1st year student",
                "college_id": college_map.get("100x"),
                "bio": "Full-stack developer in making. Can guide you about the intensive curriculum and learning environment at 100x.",
                "expertise": ["Curriculum", "Projects", "Learning Environment", "Career"],
                "languages": ["English", "Hindi"],
                "price": 49,
                "rating": 5.0,
                "sessions_completed": 20
            }
        },
        {
            "name": "Priya Sharma",
            "email": "priya@example.com",
            "password": "password123",
            "phone": "+91 9876543216",
            "role": "mentor",
            "profile_image": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop",
            "mentor_data": {
                "year": "3rd Year Student",
                "college_id": college_map.get("SST"),
                "bio": "Senior student with internship experience at top tech companies. Can share placement insights and interview preparation tips.",
                "expertise": ["Placements", "Internships", "Interview Prep", "Resume Building"],
                "languages": ["English", "Hindi"],
                "price": 49,
                "rating": 4.8,
                "sessions_completed": 67
            }
        },
        {
            "name": "Arjun Mehta",
            "email": "arjun@example.com",
            "password": "password123",
            "phone": "+91 9876543217",
            "role": "mentor",
            "profile_image": "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=400&h=400&fit=crop",
            "mentor_data": {
                "year": "2nd Year Student",
                "college_id": college_map.get("Polaris"),
                "bio": "Data science enthusiast with multiple project wins. Happy to discuss the analytics and AI focus at Polaris.",
                "expertise": ["Data Science", "AI/ML", "Projects", "Hackathons"],
                "languages": ["English", "Tamil", "Hindi"],
                "price": 49,
                "rating": 4.9,
                "sessions_completed": 33
            }
        }
    ]
    
    for mentor_info in mentors_data:
        # Check if user exists
        existing_user = await db.users.find_one({"email": mentor_info["email"]})
        
        if not existing_user:
            # Create user
            user_data = {
                "name": mentor_info["name"],
                "email": mentor_info["email"],
                "password": hash_password(mentor_info["password"]),
                "phone": mentor_info["phone"],
                "role": mentor_info["role"],
                "profile_image": mentor_info["profile_image"],
                "created_at": datetime.utcnow(),
                "updated_at": datetime.utcnow()
            }
            user_result = await db.users.insert_one(user_data)
            user_id = str(user_result.inserted_id)
            print(f"  ✓ Created user: {mentor_info['name']}")
            
            # Create mentor profile
            mentor_data = mentor_info["mentor_data"]
            mentor_data["user_id"] = user_id
            mentor_data["available"] = True
            mentor_data["created_at"] = datetime.utcnow()
            mentor_data["updated_at"] = datetime.utcnow()
            
            await db.mentors.insert_one(mentor_data)
            print(f"  ✓ Created mentor profile: {mentor_info['name']}")
        else:
            print(f"  - User already exists: {mentor_info['name']}")

async def seed_sample_reviews():
    print("Seeding sample reviews...")
    
    # Get some mentors
    mentors = await db.mentors.find().limit(3).to_list(length=3)
    # Get a student user
    student = await db.users.find_one({"role": "student"})
    
    if not student:
        # Create a demo student
        student_data = {
            "name": "Demo Student",
            "email": "student@example.com",
            "password": hash_password("password123"),
            "phone": "+91 9999999999",
            "role": "student",
            "created_at": datetime.utcnow(),
            "updated_at": datetime.utcnow()
        }
        result = await db.users.insert_one(student_data)
        student_id = str(result.inserted_id)
        print(f"  ✓ Created demo student")
    else:
        student_id = str(student["_id"])
    
    reviews_data = [
        {"rating": 5, "comment": "Harsh was super helpful! Got all my doubts about NST cleared. Highly recommend!"},
        {"rating": 5, "comment": "Very detailed insights about the campus and placements. Worth every rupee!"},
        {"rating": 5, "comment": "Amazing session! Really helped me understand what to expect at the college."}
    ]
    
    for i, mentor in enumerate(mentors):
        if i < len(reviews_data):
            review = reviews_data[i]
            existing_review = await db.reviews.find_one({"mentor_id": str(mentor["_id"]), "student_id": student_id})
            
            if not existing_review:
                review_data = {
                    "mentor_id": str(mentor["_id"]),
                    "student_id": student_id,
                    "booking_id": "demo_booking",
                    "rating": review["rating"],
                    "comment": review["comment"],
                    "created_at": datetime.utcnow(),
                    "updated_at": datetime.utcnow()
                }
                await db.reviews.insert_one(review_data)
                print(f"  ✓ Created review for mentor")
            else:
                print(f"  - Review already exists")

async def main():
    print("\n=== Campus Connect Database Seeding ===\n")
    
    try:
        await seed_colleges()
        await seed_users_and_mentors()
        await seed_sample_reviews()
        
        print("\n=== Seeding completed successfully! ===\n")
        
        # Print summary
        colleges_count = await db.colleges.count_documents({})
        users_count = await db.users.count_documents({})
        mentors_count = await db.mentors.count_documents({})
        reviews_count = await db.reviews.count_documents({})
        
        print(f"Database Summary:")
        print(f"  Colleges: {colleges_count}")
        print(f"  Users: {users_count}")
        print(f"  Mentors: {mentors_count}")
        print(f"  Reviews: {reviews_count}")
        print()
        
    except Exception as e:
        print(f"\n❌ Error during seeding: {e}")
    finally:
        client.close()

if __name__ == "__main__":
    asyncio.run(main())
