import { useQuery } from '@tanstack/react-query';
import { getKSE100 } from '../api/index.api';
import { useKSE100Socket } from './useKSE100Socket';


export const useKSE100 = () => {
  const { data: wsData, isConnected } = useKSE100Socket();

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['kse100'],
    queryFn: getKSE100,
    // refetchInterval: isConnected ? false : 30000,
    // enabled: !isConnected,
  });

  const finalData = wsData || data?.data || null;
  console.log("finalData", finalData)

  return {
    data: finalData,
    isLoading: isLoading && !isConnected,
    error,
    refetch,
    isRealTime: isConnected,
  };
};
