import axiosInstance from './axiosClient';

export const searchStocks = async (query: string, limit = 10) => {
  if (!query || query.trim().length === 0) {
    return { success: true, data: [], count: 0 };
  }
  
  const response = await axiosInstance.get(
    `/autocomplete/stocks?query=${encodeURIComponent(query)}&limit=${limit}`
  );
  return response.data;
};


