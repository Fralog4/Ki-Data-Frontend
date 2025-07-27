import axios from 'axios';

// Base URL for your Spring Boot backend
const BASE_URL = 'http://localhost:8080';

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add JWT token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('ki_data_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Character API calls
export const characterAPI = {
  getAll: () => api.get('/kiData/characters'),
  getById: (id) => api.get(`/kiData/characters/${id}`),
  create: (character) => api.post('/kiData/characters', character),
  delete: (id) => api.delete(`/kiData/characters/${id}`),
};

// Auth API calls
export const authAPI = {
  login: (credentials) => api.post('/kiData/auth/authentication', credentials),
  register: (userData) => api.post('/kiData/auth/registrationUsrOnly', userData),
};

// AI API calls
export const aiAPI = {
  dendechat: (message) => api.get('/kiData/ai/dendechat', { params: { message } }),
};

export default api;