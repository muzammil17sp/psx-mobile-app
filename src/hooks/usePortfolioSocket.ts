import { useEffect, useState, useMemo } from 'react';
import { io, Socket } from 'socket.io-client';
import { Platform } from 'react-native';

const SOCKET_URL = Platform.select({
  ios: 'https://psx-market-api-production.up.railway.app',
  android: 'https://psx-market-api-production.up.railway.app',
  default: 'https://psx-market-api-production.up.railway.app',
});

interface StockUpdate {
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

export const usePortfolioSocket = (symbols: string[]) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [stockUpdates, setStockUpdates] = useState<Map<string, StockUpdate>>(new Map());
  const [isConnected, setIsConnected] = useState(false);

  const symbolsKey = useMemo(() => [...symbols].sort().join(','), [symbols.length, symbols.join(',')]);

  useEffect(() => {
    if (!symbols || symbols.length === 0) return;

    const newSocket = io(SOCKET_URL);

    newSocket.on('connect', () => {
      setIsConnected(true);
      newSocket.emit('subscribe-portfolio', symbols);
    });

    newSocket.on('disconnect', () => {
      setIsConnected(false);
    });

    newSocket.on('stock-update', (data: StockUpdate) => {
      console.log("prev", data)
      setStockUpdates(prev => {
        const updated = new Map(prev);
        updated.set(data.symbol, data);
        return updated;
      });
    });

    newSocket.on('portfolio-updates', (updates: StockUpdate[]) => {
      const updatesMap = new Map();
      updates.forEach(update => {
        updatesMap.set(update.symbol, update);
      });
      setStockUpdates(updatesMap);
    });

    setSocket(newSocket);

    return () => {
      if (symbols.length > 0) {
        newSocket.emit('unsubscribe-portfolio', symbols);
      }
      newSocket.close();
    };
  }, [symbolsKey]); // Re-subscribe when symbols change
console.log("stockUpdates", stockUpdates)
  return {
    stockUpdates,
    isConnected,
    getStockUpdate: (symbol: string) => stockUpdates.get(symbol) || null,
  };
};

