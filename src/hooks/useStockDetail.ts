import { useQuery } from '@tanstack/react-query';
import {
  getStockDetail,
  getStockTick,
  getStockFundamentals,
  getStockCompany,
  getStockDividends,
  getStockChart,
} from '../api/stockDetail.api';

export const useStockDetail = (symbol: string) => {
  return useQuery({
    queryKey: ['stockDetail', symbol],
    queryFn: () => getStockDetail(symbol),
    enabled: !!symbol,
    staleTime: 30000, // 30 seconds
  });
};

export const useStockTick = (symbol: string) => {
  return useQuery({
    queryKey: ['stockTick', symbol],
    queryFn: () => getStockTick(symbol),
    enabled: !!symbol,
    staleTime: 10000, // 10 seconds for real-time data
    refetchInterval: 30000, // Refetch every 30 seconds
  });
};

export const useStockFundamentals = (symbol: string) => {
  return useQuery({
    queryKey: ['stockFundamentals', symbol],
    queryFn: () => getStockFundamentals(symbol),
    enabled: !!symbol,
    staleTime: 300000, // 5 minutes
  });
};

export const useStockCompany = (symbol: string) => {
  return useQuery({
    queryKey: ['stockCompany', symbol],
    queryFn: () => getStockCompany(symbol),
    enabled: !!symbol,
    staleTime: 300000, // 5 minutes
  });
};

export const useStockDividends = (symbol: string) => {
  return useQuery({
    queryKey: ['stockDividends', symbol],
    queryFn: () => getStockDividends(symbol),
    enabled: !!symbol,
    staleTime: 300000, // 5 minutes
  });
};

export const useStockChart = (symbol: string, timeframe: string = '1m', limit: number = 100) => {
  return useQuery({
    queryKey: ['stockChart', symbol, timeframe, limit],
    queryFn: () => getStockChart(symbol, timeframe, limit),
    enabled: !!symbol,
    staleTime: 30000, // 30 seconds for chart data
    refetchInterval: 60000, // Refetch every minute
  });
};

