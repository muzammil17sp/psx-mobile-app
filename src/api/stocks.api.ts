import axiosInstance from './axiosClient';

export const getStocks = async (page = 1, limit = 50, index = 'KSE100') => {
  const response = await axiosInstance.get(`/stocks?page=${page}&limit=${limit}&index=${index}`);
  return response.data;
};

export const getStockBySymbol = async (symbol: string) => {
  const response = await axiosInstance.get(`/stocks/${symbol}`);
  return response.data;
};
