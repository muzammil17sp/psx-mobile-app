import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  createTransaction,
  getTransactions,
  getTransaction,
  updateTransaction,
  deleteTransaction,
  getPortfolioSummary,
  getHoldings,
  getHoldingBySymbol,
} from '../api/portfolio.api';

/**
 * Hook to get portfolio summary
 */
export const usePortfolioSummary = () => {
  return useQuery({
    queryKey: ['portfolio', 'summary'],
    queryFn: getPortfolioSummary,
    staleTime: 30000, // 30 seconds
  });
};

/**
 * Hook to get all holdings
 */
export const useHoldings = () => {
  return useQuery({
    queryKey: ['portfolio', 'holdings'],
    queryFn: getHoldings,
    staleTime: 30000,
  });
};

/**
 * Hook to get holding by symbol
 */
export const useHoldingBySymbol = (symbol: string) => {
  return useQuery({
    queryKey: ['portfolio', 'holding', symbol],
    queryFn: () => getHoldingBySymbol(symbol),
    enabled: !!symbol,
    staleTime: 30000,
  });
};

/**
 * Hook to get transactions
 */
export const useTransactions = (params?: {
  symbol?: string;
  type?: 'buy' | 'sell' | 'dividend';
  page?: number;
  limit?: number;
}) => {
  return useQuery({
    queryKey: ['portfolio', 'transactions', params],
    queryFn: () => getTransactions(params),
    staleTime: 30000,
  });
};

/**
 * Hook to get single transaction
 */
export const useTransaction = (id: string) => {
  return useQuery({
    queryKey: ['portfolio', 'transaction', id],
    queryFn: () => getTransaction(id),
    enabled: !!id,
  });
};

/**
 * Hook to create transaction
 */
export const useCreateTransaction = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createTransaction,
    onSuccess: () => {
      // Invalidate all portfolio queries
      queryClient.invalidateQueries({ queryKey: ['portfolio'] });
    },
  });
};

/**
 * Hook to update transaction
 */
export const useUpdateTransaction = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) =>
      updateTransaction(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['portfolio'] });
    },
  });
};

/**
 * Hook to delete transaction
 */
export const useDeleteTransaction = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteTransaction,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['portfolio'] });
    },
  });
};

