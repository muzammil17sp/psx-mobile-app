import { useQuery } from '@tanstack/react-query';
import { searchStocks } from '../api/autocomplete.api';
import { useState, useEffect } from 'react';

/**
 * Hook for efficient stock autocomplete with debouncing
 */
export const useAutocomplete = (query: string, limit = 10) => {
  const [debouncedQuery, setDebouncedQuery] = useState(query);

  // Debounce the query to avoid too many API calls
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
    }, 300); // Wait 300ms after user stops typing

    return () => clearTimeout(timer);
  }, [query]);

  const { data, isLoading, error } = useQuery({
    queryKey: ['autocomplete', debouncedQuery, limit],
    queryFn: () => searchStocks(debouncedQuery, limit),
    enabled: debouncedQuery.length >= 1, // Only search if at least 1 character
    staleTime: 60000, // Cache results for 1 minute
  });

  return {
    results: data?.data || [],
    isLoading: isLoading && debouncedQuery.length >= 1,
    error,
    query: debouncedQuery,
  };
};

