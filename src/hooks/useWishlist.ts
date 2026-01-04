import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  getWishlist,
  addToWishlist,
  removeFromWishlist,
  checkWishlist
} from '../api/wishlist.api';

/**
 * Hook to get user's wishlist
 */
export const useWishlist = () => {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['wishlist'],
    queryFn: getWishlist,
    staleTime: 30000, // Consider data stale after 30 seconds
  });

  return {
    wishlist: data?.data || [],
    isLoading,
    error,
    refetch,
  };
};

/**
 * Hook to add stock to wishlist
 */
export const useAddToWishlist = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addToWishlist,
    onSuccess: () => {
      // Invalidate wishlist to refetch
      queryClient.invalidateQueries({ queryKey: ['wishlist'] });
    },
  });
};

/**
 * Hook to remove stock from wishlist
 */
export const useRemoveFromWishlist = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: removeFromWishlist,
    onSuccess: () => {
      // Invalidate wishlist to refetch
      queryClient.invalidateQueries({ queryKey: ['wishlist'] });
    },
  });
};

/**
 * Hook to check if stock is in wishlist
 */
export const useCheckWishlist = (symbol: string) => {
  return useQuery({
    queryKey: ['wishlist', 'check', symbol],
    queryFn: () => checkWishlist(symbol),
    enabled: !!symbol,
    staleTime: 60000, // Cache for 1 minute
  });
};

