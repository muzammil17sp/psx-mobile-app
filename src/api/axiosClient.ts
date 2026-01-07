import { Platform } from 'react-native';
import axios, { AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { triggerLogout } from '../context/AuthContext';

const BASE_URL = Platform.select({
  ios: 'https://psx-market-api-production.up.railway.app/api',
  android: 'https://psx-market-api-production.up.railway.app/api', // Emulator
  default: 'https://psx-market-api-production.up.railway.app/api', // fallback
});

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (token) {
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
  (response: AxiosResponse) => response,
  async error => {
    if (error.response?.status === 401) {
      triggerLogout();
    }
    return Promise.reject(error);
  },
);

export default axiosInstance;
