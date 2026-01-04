import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getStocks } from '../api/stocks.api';

/**
 * Hook to get stocks list with pagination
 */
export const useStocks = (page = 1, limit = 50, index = 'KSE100') => {
  const queryClient = useQueryClient();
  
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['stocks', page, limit, index],
    queryFn: () => getStocks(page, limit, index),
    keepPreviousData: false, // Don't keep previous data to ensure fresh data on refresh
    staleTime: 0, // Always consider data stale to force refetch
  });

  // Helper function to reset and refetch from page 1
  const resetAndRefetch = async () => {
    // Remove all cached stock queries
    queryClient.removeQueries({ 
      queryKey: ['stocks'],
      exact: false 
    });
    // Invalidate and refetch page 1 with fresh data
    await queryClient.invalidateQueries({ 
      queryKey: ['stocks', 1, limit, index],
      exact: true 
    });
    // Refetch the query
    return queryClient.refetchQueries({ 
      queryKey: ['stocks', 1, limit, index],
      exact: true 
    });
  };

  return {
    data: data?.data || [],
    pagination: data?.pagination || null,
    isLoading,
    error,
    refetch,
    resetAndRefetch,
  };
};
