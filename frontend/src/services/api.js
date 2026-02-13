import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

// Create axios instance with default config
const apiClient = axios.create({
  baseURL: API,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if available
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth APIs
export const authAPI = {
  register: (data) => apiClient.post('/auth/register', data),
  login: (data) => apiClient.post('/auth/login', data),
  googleAuth: (token) => apiClient.post('/auth/google', { token }),
  getMe: () => apiClient.get('/auth/me'),
};

// Mentor APIs
export const mentorAPI = {
  getAll: (params) => apiClient.get('/mentors', { params }),
  getById: (id) => apiClient.get(`/mentors/${id}`),
};

// College APIs
export const collegeAPI = {
  getAll: () => apiClient.get('/colleges'),
  getById: (id) => apiClient.get(`/colleges/${id}`),
};

// Booking APIs
export const bookingAPI = {
  create: (data) => apiClient.post('/bookings', data),
  getAll: () => apiClient.get('/bookings'),
  update: (id, data) => apiClient.patch(`/bookings/${id}`, data),
};

// Review APIs
export const reviewAPI = {
  create: (data) => apiClient.post('/reviews', data),
  getByMentor: (mentorId) => apiClient.get(`/reviews/mentor/${mentorId}`),
};

// Dashboard APIs
export const dashboardAPI = {
  getStudent: () => apiClient.get('/dashboard/student'),
  getMentor: () => apiClient.get('/dashboard/mentor'),
};

export default apiClient;