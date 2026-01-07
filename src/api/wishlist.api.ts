import axiosInstance from './axiosClient';

export const getWishlist = async () => {
  const response = await axiosInstance.get('/wishlist');
  return response.data;
};

export const addToWishlist = async (symbol: string) => {
  const response = await axiosInstance.post('/wishlist', { symbol });
  return response.data;
};

export const removeFromWishlist = async (symbol: string) => {
  const response = await axiosInstance.delete(`/wishlist/${symbol}`);
  return response.data;
};

export const checkWishlist = async (symbol: string) => {
  const response = await axiosInstance.get(`/wishlist/check/${symbol}`);
  return response.data;
};


