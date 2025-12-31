import axiosInstance from './axiosClient';

interface FormData {
  email: string;
  password: string;
}

export const login = async (data: FormData) => {
  const response = await axiosInstance.post('/auth/login', data);
  return response.data;
};

export const register = async (data: FormData) => {
  const response = await axiosInstance.post('/auth/register', data);
  return response.data;
};

