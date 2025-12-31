// utils/axiosInstance.ts
import axios, { AxiosResponse, InternalAxiosRequestConfig } from 'axios';
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
    // if (accessToken) {
    //   config.headers.Authorization = `Bearer ${accessToken}`;
    // }
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
