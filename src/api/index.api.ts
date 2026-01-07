import axiosInstance from './axiosClient';

export const getKSE100 = async () => {
  const response = await axiosInstance.get('/index/kse100');
  return response.data;
};


