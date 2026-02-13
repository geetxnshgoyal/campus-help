#!/usr/bin/env python3
"""
Campus Connect Backend API Test Suite
Tests all backend endpoints comprehensively
"""

import requests
import json
import sys
from datetime import datetime, timedelta
import uuid

# Configuration
BASE_URL = "https://campus-pulse-166.preview.emergentagent.com/api"
TIMEOUT = 30

class Colors:
    GREEN = '\033[92m'
    RED = '\033[91m'
    YELLOW = '\033[93m'
    BLUE = '\033[94m'
    ENDC = '\033[0m'
    BOLD = '\033[1m'

class TestResult:
    def __init__(self):
        self.passed = 0
        self.failed = 0
        self.errors = []
        
    def success(self, message):
        self.passed += 1
        print(f"{Colors.GREEN}✓{Colors.ENDC} {message}")
        
    def failure(self, message, error=None):
        self.failed += 1
        error_msg = f"{Colors.RED}✗{Colors.ENDC} {message}"
        if error:
            error_msg += f" - {error}"
        print(error_msg)
        self.errors.append(f"{message}: {error}" if error else message)
        
    def info(self, message):
        print(f"{Colors.BLUE}ℹ{Colors.ENDC} {message}")
        
    def warning(self, message):
        print(f"{Colors.YELLOW}⚠{Colors.ENDC} {message}")

def make_request(method, endpoint, data=None, headers=None, expected_status=200):
    """Make HTTP request with error handling"""
    url = f"{BASE_URL}{endpoint}"
    
    try:
        if method.upper() == 'GET':
            response = requests.get(url, headers=headers, timeout=TIMEOUT)
        elif method.upper() == 'POST':
            response = requests.post(url, json=data, headers=headers, timeout=TIMEOUT)
        elif method.upper() == 'PATCH':
            response = requests.patch(url, json=data, headers=headers, timeout=TIMEOUT)
        else:
            raise ValueError(f"Unsupported method: {method}")
            
        return response
        
    except requests.exceptions.RequestException as e:
        return None, str(e)

def test_health_check(result):
    """Test API health check"""
    result.info("Testing API health check...")
    
    response = make_request('GET', '/')
    if response is None:
        result.failure("Health check failed - Connection error")
        return False
        
    if response.status_code == 200:
        try:
            data = response.json()
            if data.get('status') == 'ok':
                result.success("API health check passed")
                return True
            else:
                result.failure("Health check returned unexpected response", data)
        except json.JSONDecodeError:
            result.failure("Health check returned invalid JSON")
    else:
        result.failure(f"Health check failed with status {response.status_code}")
    
    return False

def test_authentication(result):
    """Test authentication endpoints"""
    result.info("Testing authentication endpoints...")
    
    # Generate unique test user data
    test_email = f"testuser_{uuid.uuid4().hex[:8]}@example.com"
    test_password = "TestPassword123!"
    test_name = "Test User"
    test_phone = "+91 9876543210"
    
    # Test user registration
    register_data = {
        "name": test_name,
        "email": test_email,
        "password": test_password,
        "phone": test_phone,
        "role": "student"
    }
    
    response = make_request('POST', '/auth/register', register_data)
    if response is None:
        result.failure("Registration failed - Connection error")
        return None, None
        
    if response.status_code == 201:
        try:
            data = response.json()
            if 'token' in data and 'user' in data:
                result.success("User registration successful")
                token = data['token']
                user_id = data['user']['_id']
            else:
                result.failure("Registration response missing token or user data")
                return None, None
        except json.JSONDecodeError:
            result.failure("Registration returned invalid JSON")
            return None, None
    else:
        result.failure(f"Registration failed with status {response.status_code}", response.text)
        return None, None
    
    # Test user login
    login_data = {
        "email": test_email,
        "password": test_password
    }
    
    response = make_request('POST', '/auth/login', login_data)
    if response is None:
        result.failure("Login failed - Connection error")
        return None, None
        
    if response.status_code == 200:
        try:
            data = response.json()
            if 'token' in data and 'user' in data:
                result.success("User login successful")
                login_token = data['token']
            else:
                result.failure("Login response missing token or user data")
                return None, None
        except json.JSONDecodeError:
            result.failure("Login returned invalid JSON")
            return None, None
    else:
        result.failure(f"Login failed with status {response.status_code}", response.text)
        return None, None
    
    # Test get current user (protected endpoint)
    headers = {"Authorization": f"Bearer {token}"}
    response = make_request('GET', '/auth/me', headers=headers)
    
    if response is None:
        result.failure("Get current user failed - Connection error")
        return token, user_id
        
    if response.status_code == 200:
        try:
            data = response.json()
            if 'user' in data and data['user']['email'] == test_email:
                result.success("Get current user successful")
            else:
                result.failure("Get current user returned unexpected data")
        except json.JSONDecodeError:
            result.failure("Get current user returned invalid JSON")
    else:
        result.failure(f"Get current user failed with status {response.status_code}")
    
    # Test invalid login
    invalid_login = {
        "email": test_email,
        "password": "wrongpassword"
    }
    
    response = make_request('POST', '/auth/login', invalid_login)
    if response and response.status_code == 401:
        result.success("Invalid login properly rejected")
    else:
        result.failure("Invalid login should return 401 status")
    
    return token, user_id

def test_colleges(result):
    """Test college endpoints"""
    result.info("Testing college endpoints...")
    
    # Test get all colleges
    response = make_request('GET', '/colleges')
    if response is None:
        result.failure("Get colleges failed - Connection error")
        return None
        
    if response.status_code == 200:
        try:
            data = response.json()
            if 'colleges' in data and isinstance(data['colleges'], list):
                colleges = data['colleges']
                if len(colleges) > 0:
                    result.success(f"Get colleges successful - found {len(colleges)} colleges")
                    college_id = colleges[0]['_id']
                else:
                    result.warning("No colleges found in database")
                    return None
            else:
                result.failure("Get colleges returned unexpected format")
                return None
        except json.JSONDecodeError:
            result.failure("Get colleges returned invalid JSON")
            return None
    else:
        result.failure(f"Get colleges failed with status {response.status_code}")
        return None
    
    # Test get specific college
    if college_id:
        response = make_request('GET', f'/colleges/{college_id}')
        if response is None:
            result.failure("Get specific college failed - Connection error")
        elif response.status_code == 200:
            try:
                data = response.json()
                if 'college' in data:
                    result.success("Get specific college successful")
                else:
                    result.failure("Get specific college returned unexpected format")
            except json.JSONDecodeError:
                result.failure("Get specific college returned invalid JSON")
        else:
            result.failure(f"Get specific college failed with status {response.status_code}")
    
    return college_id

def test_mentors(result, college_id=None):
    """Test mentor endpoints"""
    result.info("Testing mentor endpoints...")
    
    # Test get all mentors
    response = make_request('GET', '/mentors')
    if response is None:
        result.failure("Get mentors failed - Connection error")
        return None
        
    if response.status_code == 200:
        try:
            data = response.json()
            if 'mentors' in data and isinstance(data['mentors'], list):
                mentors = data['mentors']
                if len(mentors) > 0:
                    result.success(f"Get mentors successful - found {len(mentors)} mentors")
                    mentor_id = mentors[0]['_id']
                else:
                    result.warning("No mentors found in database")
                    return None
            else:
                result.failure("Get mentors returned unexpected format")
                return None
        except json.JSONDecodeError:
            result.failure("Get mentors returned invalid JSON")
            return None
    else:
        result.failure(f"Get mentors failed with status {response.status_code}")
        return None
    
    # Test get mentors with college filter
    if college_id:
        response = make_request('GET', f'/mentors?college_id={college_id}')
        if response is None:
            result.failure("Get mentors with filter failed - Connection error")
        elif response.status_code == 200:
            try:
                data = response.json()
                if 'mentors' in data:
                    result.success("Get mentors with college filter successful")
                else:
                    result.failure("Get mentors with filter returned unexpected format")
            except json.JSONDecodeError:
                result.failure("Get mentors with filter returned invalid JSON")
        else:
            result.failure(f"Get mentors with filter failed with status {response.status_code}")
    
    # Test get specific mentor
    if mentor_id:
        response = make_request('GET', f'/mentors/{mentor_id}')
        if response is None:
            result.failure("Get specific mentor failed - Connection error")
        elif response.status_code == 200:
            try:
                data = response.json()
                if 'mentor' in data:
                    result.success("Get specific mentor successful")
                else:
                    result.failure("Get specific mentor returned unexpected format")
            except json.JSONDecodeError:
                result.failure("Get specific mentor returned invalid JSON")
        else:
            result.failure(f"Get specific mentor failed with status {response.status_code}")
    
    return mentor_id

def test_bookings(result, token, mentor_id):
    """Test booking endpoints"""
    result.info("Testing booking endpoints...")
    
    if not token or not mentor_id:
        result.warning("Skipping booking tests - missing authentication token or mentor ID")
        return None
    
    headers = {"Authorization": f"Bearer {token}"}
    
    # Test create booking
    tomorrow = datetime.now() + timedelta(days=1)
    booking_data = {
        "mentor_id": mentor_id,
        "session_type": "quick",
        "date": tomorrow.strftime("%Y-%m-%d"),
        "time": "14:00",
        "notes": "Test booking for API testing"
    }
    
    response = make_request('POST', '/bookings', booking_data, headers)
    if response is None:
        result.failure("Create booking failed - Connection error")
        return None
        
    if response.status_code == 201:
        try:
            data = response.json()
            if 'booking' in data and '_id' in data['booking']:
                result.success("Create booking successful")
                booking_id = data['booking']['_id']
            else:
                result.failure("Create booking returned unexpected format")
                return None
        except json.JSONDecodeError:
            result.failure("Create booking returned invalid JSON")
            return None
    else:
        result.failure(f"Create booking failed with status {response.status_code}", response.text)
        return None
    
    # Test get user bookings
    response = make_request('GET', '/bookings', headers=headers)
    if response is None:
        result.failure("Get bookings failed - Connection error")
    elif response.status_code == 200:
        try:
            data = response.json()
            if 'bookings' in data and isinstance(data['bookings'], list):
                result.success(f"Get bookings successful - found {len(data['bookings'])} bookings")
            else:
                result.failure("Get bookings returned unexpected format")
        except json.JSONDecodeError:
            result.failure("Get bookings returned invalid JSON")
    else:
        result.failure(f"Get bookings failed with status {response.status_code}")
    
    return booking_id

def test_reviews(result, token, mentor_id, booking_id):
    """Test review endpoints"""
    result.info("Testing review endpoints...")
    
    if not token or not mentor_id:
        result.warning("Skipping review tests - missing authentication token or mentor ID")
        return
    
    headers = {"Authorization": f"Bearer {token}"}
    
    # Test get mentor reviews (public endpoint)
    response = make_request('GET', f'/reviews/mentor/{mentor_id}')
    if response is None:
        result.failure("Get mentor reviews failed - Connection error")
    elif response.status_code == 200:
        try:
            data = response.json()
            if 'reviews' in data and 'average_rating' in data:
                result.success(f"Get mentor reviews successful - found {len(data['reviews'])} reviews")
            else:
                result.failure("Get mentor reviews returned unexpected format")
        except json.JSONDecodeError:
            result.failure("Get mentor reviews returned invalid JSON")
    else:
        result.failure(f"Get mentor reviews failed with status {response.status_code}")
    
    # Test create review (requires booking_id)
    if booking_id:
        review_data = {
            "mentor_id": mentor_id,
            "booking_id": booking_id,
            "rating": 5,
            "comment": "Excellent session! Very helpful and knowledgeable mentor."
        }
        
        response = make_request('POST', '/reviews', review_data, headers)
        if response is None:
            result.failure("Create review failed - Connection error")
        elif response.status_code == 201:
            try:
                data = response.json()
                if 'review' in data:
                    result.success("Create review successful")
                else:
                    result.failure("Create review returned unexpected format")
            except json.JSONDecodeError:
                result.failure("Create review returned invalid JSON")
        else:
            result.failure(f"Create review failed with status {response.status_code}", response.text)
    else:
        result.warning("Skipping create review test - no booking ID available")

def test_dashboard(result, token):
    """Test dashboard endpoints"""
    result.info("Testing dashboard endpoints...")
    
    if not token:
        result.warning("Skipping dashboard tests - missing authentication token")
        return
    
    headers = {"Authorization": f"Bearer {token}"}
    
    # Test student dashboard
    response = make_request('GET', '/dashboard/student', headers=headers)
    if response is None:
        result.failure("Get student dashboard failed - Connection error")
    elif response.status_code == 200:
        try:
            data = response.json()
            expected_keys = ['upcoming_sessions', 'past_sessions', 'total_sessions', 'total_hours']
            if all(key in data for key in expected_keys):
                result.success("Get student dashboard successful")
            else:
                result.failure("Get student dashboard returned unexpected format")
        except json.JSONDecodeError:
            result.failure("Get student dashboard returned invalid JSON")
    else:
        result.failure(f"Get student dashboard failed with status {response.status_code}")

def test_error_handling(result):
    """Test error handling for invalid requests"""
    result.info("Testing error handling...")
    
    # Test invalid endpoint
    response = make_request('GET', '/invalid-endpoint')
    if response and response.status_code == 404:
        result.success("Invalid endpoint properly returns 404")
    else:
        result.failure("Invalid endpoint should return 404")
    
    # Test invalid mentor ID
    response = make_request('GET', '/mentors/invalid-id')
    if response and response.status_code in [400, 404]:
        result.success("Invalid mentor ID properly handled")
    else:
        result.failure("Invalid mentor ID should return 400 or 404")
    
    # Test unauthorized access
    response = make_request('GET', '/auth/me')
    if response and response.status_code == 401:
        result.success("Unauthorized access properly rejected")
    else:
        result.failure("Unauthorized access should return 401")

def main():
    """Main test runner"""
    print(f"\n{Colors.BOLD}Campus Connect Backend API Test Suite{Colors.ENDC}")
    print(f"Testing API at: {BASE_URL}")
    print("=" * 60)
    
    result = TestResult()
    
    # Test API health
    if not test_health_check(result):
        print(f"\n{Colors.RED}❌ API is not accessible. Stopping tests.{Colors.ENDC}")
        return 1
    
    # Test authentication
    token, user_id = test_authentication(result)
    
    # Test colleges
    college_id = test_colleges(result)
    
    # Test mentors
    mentor_id = test_mentors(result, college_id)
    
    # Test bookings (requires authentication)
    booking_id = test_bookings(result, token, mentor_id)
    
    # Test reviews (requires authentication)
    test_reviews(result, token, mentor_id, booking_id)
    
    # Test dashboard (requires authentication)
    test_dashboard(result, token)
    
    # Test error handling
    test_error_handling(result)
    
    # Print summary
    print("\n" + "=" * 60)
    print(f"{Colors.BOLD}Test Summary{Colors.ENDC}")
    print(f"{Colors.GREEN}Passed: {result.passed}{Colors.ENDC}")
    print(f"{Colors.RED}Failed: {result.failed}{Colors.ENDC}")
    
    if result.failed > 0:
        print(f"\n{Colors.RED}Failed Tests:{Colors.ENDC}")
        for error in result.errors:
            print(f"  • {error}")
    
    success_rate = (result.passed / (result.passed + result.failed)) * 100 if (result.passed + result.failed) > 0 else 0
    print(f"\nSuccess Rate: {success_rate:.1f}%")
    
    if result.failed == 0:
        print(f"\n{Colors.GREEN}🎉 All tests passed!{Colors.ENDC}")
        return 0
    else:
        print(f"\n{Colors.RED}❌ Some tests failed. Check the errors above.{Colors.ENDC}")
        return 1

if __name__ == "__main__":
    sys.exit(main())