import axiosInstance from './axiosClient';

export const getStockDetail = async (symbol: string) => {
  const response = await axiosInstance.get(`/stock-detail/${symbol}`);
  return response.data;
};

export const getStockTick = async (symbol: string) => {
  const response = await axiosInstance.get(`/stock-detail/${symbol}/tick`);
  return response.data;
};

export const getStockFundamentals = async (symbol: string) => {
  const response = await axiosInstance.get(`/stock-detail/${symbol}/fundamentals`);
  return response.data;
};

export const getStockCompany = async (symbol: string) => {
  const response = await axiosInstance.get(`/stock-detail/${symbol}/company`);
  return response.data;
};

export const getStockDividends = async (symbol: string) => {
  const response = await axiosInstance.get(`/stock-detail/${symbol}/dividends`);
  return response.data;
};

export const getStockChart = async (symbol: string, timeframe: string = '1m', limit: number = 100) => {
  const response = await axiosInstance.get(`/stock-detail/${symbol}/chart?timeframe=${timeframe}&limit=${limit}`);
  return response.data;
};

