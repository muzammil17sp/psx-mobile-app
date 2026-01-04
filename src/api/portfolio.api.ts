import axiosInstance from './axiosClient';

// Transaction APIs
export const createTransaction = async (data: {
  type: 'buy' | 'sell' | 'dividend';
  symbol: string;
  shares: number;
  price: number;
  commissionPerShare?: number;
  date?: string;
  notes?: string;
}) => {
  const response = await axiosInstance.post('/portfolio/transactions', data);
  return response.data;
};

export const getTransactions = async (params?: {
  symbol?: string;
  type?: 'buy' | 'sell' | 'dividend';
  page?: number;
  limit?: number;
}) => {
  const queryParams = new URLSearchParams();
  if (params?.symbol) queryParams.append('symbol', params.symbol);
  if (params?.type) queryParams.append('type', params.type);
  if (params?.page) queryParams.append('page', params.page.toString());
  if (params?.limit) queryParams.append('limit', params.limit.toString());

  const response = await axiosInstance.get(
    `/portfolio/transactions?${queryParams.toString()}`
  );
  return response.data;
};

export const getTransaction = async (id: string) => {
  const response = await axiosInstance.get(`/portfolio/transactions/${id}`);
  return response.data;
};

export const updateTransaction = async (
  id: string,
  data: {
    shares?: number;
    price?: number;
    commissionPerShare?: number;
    date?: string;
    notes?: string;
  }
) => {
  const response = await axiosInstance.put(`/portfolio/transactions/${id}`, data);
  return response.data;
};

export const deleteTransaction = async (id: string) => {
  const response = await axiosInstance.delete(`/portfolio/transactions/${id}`);
  return response.data;
};

// Portfolio APIs
export const getPortfolioSummary = async () => {
  const response = await axiosInstance.get('/portfolio/summary');
  return response.data;
};

export const getHoldings = async () => {
  const response = await axiosInstance.get('/portfolio/holdings');
  return response.data;
};

export const getHoldingBySymbol = async (symbol: string) => {
  const response = await axiosInstance.get(`/portfolio/holdings/${symbol}`);
  return response.data;
};

