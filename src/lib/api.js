import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Clothes API
export const getAllClothes = async () => {
  try {
    const response = await api.get('/clothes');
    return response.data.data;
  } catch (error) {
    console.error('Error fetching clothes:', error);
    throw error;
  }
};

export const getClothesByCategory = async (category) => {
  try {
    const response = await api.get(`/clothes/category/${category}`);
    return response.data.data;
  } catch (error) {
    console.error(`Error fetching ${category}:`, error);
    throw error;
  }
};

// Upload API
export const uploadClothing = async (formData) => {
  try {
    const response = await api.post('/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error uploading clothing:', error);
    throw error;
  }
};

// Recommendation API
export const getRecommendations = async (lat, lon, mood) => {
  try {
    const params = {};
    if (lat && lon) {
      params.lat = lat;
      params.lon = lon;
    }
    if (mood) {
      params.mood = mood;
    }
    
    const response = await api.get('/recommend', { params });
    return response.data;
  } catch (error) {
    console.error('Error getting recommendations:', error);
    throw error;
  }
};

export default api;