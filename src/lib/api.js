import axios from 'axios';

// ✅ Fixed API URL to match backend port (3001)
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10 second timeout
});

// Add request interceptor for debugging
api.interceptors.request.use(
  (config) => {
    console.log(`🔵 API Request: ${config.method?.toUpperCase()} ${config.baseURL}${config.url}`);
    return config;
  },
  (error) => {
    console.error('❌ API Request Error:', error);
    return Promise.reject(error);
  }
);

// Add response interceptor for debugging
api.interceptors.response.use(
  (response) => {
    console.log(`✅ API Response: ${response.status} ${response.config.url}`);
    return response;
  },
  (error) => {
    console.error('❌ API Response Error:', error.response?.status, error.response?.data || error.message);
    return Promise.reject(error);
  }
);

// Clothes API
export const getAllClothes = async () => {
  try {
    const response = await api.get('/clothes');
    console.log('📄 Clothes data received:', response.data);
    return response.data.data || response.data; // Handle different response formats
  } catch (error) {
    console.error('Error fetching clothes:', error);
    throw error;
  }
};

export const getClothesByCategory = async (category) => {
  try {
    const response = await api.get(`/clothes?category=${category}`);
    console.log(`📄 ${category} clothes data received:`, response.data);
    return response.data.data || response.data;
  } catch (error) {
    console.error(`Error fetching ${category}:`, error);
    throw error;
  }
};

export const getClothingById = async (id) => {
  try {
    const response = await api.get(`/clothes/${id}`);
    return response.data.data || response.data;
  } catch (error) {
    console.error(`Error fetching clothing item ${id}:`, error);
    throw error;
  }
};

export const deleteClothing = async (id) => {
  try {
    const response = await api.delete(`/clothes/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting clothing item ${id}:`, error);
    throw error;
  }
};

// Upload API
export const uploadClothing = async (formData) => {
  try {
    console.log('🔵 Uploading clothing item...');
    const response = await api.post('/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    console.log('✅ Upload successful:', response.data);
    return response.data;
  } catch (error) {
    console.error('❌ Error uploading clothing:', error);
    throw error;
  }
};

// Recommendation API
export const getRecommendations = async (mood, weather) => {
  try {
    const params = {};
    if (mood) params.mood = mood;
    if (weather) params.weather = weather;
    
    const response = await api.get('/recommend', { params });
    return response.data;
  } catch (error) {
    console.error('Error getting recommendations:', error);
    throw error;
  }
};

// Test API connection
export const testConnection = async () => {
  try {
    const response = await api.get('/test');
    return response.data;
  } catch (error) {
    console.error('Error testing connection:', error);
    throw error;
  }
};

export default api;