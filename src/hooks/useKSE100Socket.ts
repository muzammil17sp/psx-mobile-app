import { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import { SOCKET_URL } from '@env';

interface KSE100Data {
  symbol: string;
  market: string;
  price: number;
  change: number;
  changePercent: number;
  volume: number;
  trades: number;
  value: number;
  high: number;
  low: number;
  status: string;
  timestamp: number;
}

export const useKSE100Socket = () => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [kse100Data, setKse100Data] = useState<KSE100Data | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const newSocket = io(SOCKET_URL);

    newSocket.on('connect', () => {
      console.log('Connected to backend WebSocket');
      setIsConnected(true);
    });

    newSocket.on('disconnect', () => {
      console.log('Disconnected from backend WebSocket');
      setIsConnected(false);
    });

    newSocket.on('kse100-update', (data: KSE100Data) => {
      setKse100Data(data);
    });

    setSocket(newSocket);

    return () => {
      newSocket.close();
    };
  }, []);

  return {
    data: kse100Data,
    isConnected,
    isLoading: !kse100Data && !isConnected,
  };
};


