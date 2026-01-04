// utils/axiosInstance.ts
import axios, { AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { triggerLogout } from '../context/AuthContext';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3002/api',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    try {
      // Get token from AsyncStorage
      const token = await AsyncStorage.getItem('token');
      
      if (token) {
        // Add token to Authorization header
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (error) {
      console.error('Error getting token from storage:', error);
    }
    
    return config;
  },
  error => Promise.reject(error),
);

axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  async error => {
    if (error.response?.status === 401) {
      triggerLogout();
    }
    return Promise.reject(error);
  },
);

export default axiosInstance;
