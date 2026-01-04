import { useQuery } from '@tanstack/react-query';
import { getNews } from '../api/news.api';

export const useGetNews = () => {
  return useQuery({
    queryKey: ['news'],
    queryFn: getNews,
    staleTime: 1000 * 60 * 5,
  });
};
