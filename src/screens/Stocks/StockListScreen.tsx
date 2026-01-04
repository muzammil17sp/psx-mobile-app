import React, { useState, useEffect } from 'react';
import { FlatList, View, ActivityIndicator, Text, StyleSheet, RefreshControl } from 'react-native';
import StockCard from './components/StockCard';
import MarketSummaryCard from '../Home/components/MarketSummary';
import IndexPicker from '../../components/common/IndexPicker';
import { useKSE100 } from '../../hooks/useKSE100';
import { useStocks } from '../../hooks/useStocks';

// Available indices
const AVAILABLE_INDICES = [
  { symbol: 'KSE100', name: 'KSE 100', isShariah: false },
  { symbol: 'KSE30', name: 'KSE 30', isShariah: false },
  { symbol: 'KSE100PR', name: 'KSE 100 PR', isShariah: false },
  { symbol: 'ALLSHR', name: 'All Share', isShariah: false },
  { symbol: 'KMI30', name: 'KMI 30', isShariah: true },
  { symbol: 'KMIALLSHR', name: 'KMI All Share', isShariah: true },
  { symbol: 'JSMFI', name: 'JS MSCI Financial', isShariah: false },
  { symbol: 'JSGBKTI', name: 'JS Government Bond KTI', isShariah: false },
  { symbol: 'BKTI', name: 'Bond KTI', isShariah: false },
  { symbol: 'ACI', name: 'ACI', isShariah: false },
];

const StockListScreen = () => {
  const [page, setPage] = useState(1);
  const [allStocks, setAllStocks] = useState<any[]>([]);
  const [selectedIndex, setSelectedIndex] = useState<string>('KSE100');
  const limit = 50;
  
  const { data: kse100Data } = useKSE100();
  const { data: stocks, pagination, isLoading, resetAndRefetch } = useStocks(page, limit, selectedIndex);
  
  // Reset stocks when index changes
  useEffect(() => {
    setPage(1);
    setAllStocks([]);
    // The useStocks hook will automatically refetch when selectedIndex changes
    // because it's part of the queryKey
  }, [selectedIndex]);

  // Accumulate stocks as we load more pages
  useEffect(() => {
    // Only process if we have stocks data
    if (stocks !== undefined) {
      if (stocks.length > 0) {
        if (page === 1) {
          // Reset and set new stocks for page 1
          setAllStocks(stocks);
        } else {
          // Append new stocks for subsequent pages
          setAllStocks(prev => {
            // Avoid duplicates
            const existingSymbols = new Set(prev.map(s => s.symbol));
            const newStocks = stocks.filter(s => !existingSymbols.has(s.symbol));
            return [...prev, ...newStocks];
          });
        }
      } else if (page === 1) {
        // If page 1 returns empty, clear the list
        setAllStocks([]);
      }
    }
  }, [stocks, page, selectedIndex]);

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    // Reset to page 1
    setPage(1);
    // Clear stocks first
    setAllStocks([]);
    
    try {
      // Reset and refetch from page 1
      await resetAndRefetch();
      // Wait a moment for the query to complete
      await new Promise(resolve => setTimeout(resolve, 100));
    } catch (error) {
      console.error('Error refreshing stocks:', error);
    } finally {
      setRefreshing(false);
    }
  };

  const loadMore = () => {
    if (pagination?.hasNextPage && !isLoading) {
      setPage(prev => prev + 1);
    }
  };

  const changePercentStr = kse100Data?.changePercent 
    ? `${(kse100Data.changePercent * 100).toFixed(2)}%`
    : '0.00%';

  const renderStock = ({ item }: { item: any }) => (
    <StockCard data={item} />
  );

  return (
    <View style={styles.container}>
      <MarketSummaryCard
        data={{
          symbol: kse100Data?.symbol || 'KSE100',
          close: kse100Data?.price || 0,
          change: kse100Data?.change || 0,
          changePercent: changePercentStr,
        }}
      />
      
      <IndexPicker
        selectedIndex={selectedIndex}
        onSelect={setSelectedIndex}
        indices={AVAILABLE_INDICES}
      />

      {isLoading && allStocks.length === 0 && !refreshing ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#81C784" />
          <Text style={styles.loadingText}>Loading stocks...</Text>
        </View>
      ) : allStocks.length === 0 && !isLoading && !refreshing ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No stocks found</Text>
          <Text style={styles.emptySubtext}>Try selecting a different index</Text>
        </View>
      ) : (
        <FlatList
          key={selectedIndex}
          data={allStocks}
          renderItem={renderStock}
          keyExtractor={(item) => item.symbol}
          onEndReached={loadMore}
          onEndReachedThreshold={0.5}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              tintColor="#81C784"
            />
          }
          ListFooterComponent={
            isLoading && allStocks.length > 0 ? (
              <View style={styles.footerLoader}>
                <ActivityIndicator size="small" color="#81C784" />
              </View>
            ) : null
          }
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#121212',
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    color: '#BDBDBD',
    marginTop: 12,
    fontSize: 14,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    color: '#E57373',
    fontSize: 16,
    marginBottom: 8,
  },
  errorSubtext: {
    color: '#757575',
    fontSize: 14,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyText: {
    color: '#F5F5F5',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  emptySubtext: {
    color: '#757575',
    fontSize: 14,
  },
  footerLoader: {
    padding: 20,
    alignItems: 'center',
  },
});

export default StockListScreen;
