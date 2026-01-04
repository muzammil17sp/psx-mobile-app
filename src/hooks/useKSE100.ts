import { useQuery } from '@tanstack/react-query';
import { getKSE100 } from '../api/index.api';

/**
 * Hook to get KSE100 index data
 */
export const useKSE100 = () => {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['kse100'],
    queryFn: getKSE100,
  });

  return {
    data: data?.data || null,
    isLoading,
    error,
    refetch,
  };
};
