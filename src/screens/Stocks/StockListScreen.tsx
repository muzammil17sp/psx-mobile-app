import React from 'react';
import { FlatList, View } from 'react-native';
import StockList from './components/StockList';
import { news } from '../../data/news';
import MarketSummaryCard from '../Home/components/MarketSummary';

const StockListScreen = () => {
  return (
    <View style={{ backgroundColor: '#121212', flex: 1 }}>
      <MarketSummaryCard
        data={{
          symbol: 'KSE100',
          close: 170830.22,
          change: -243.51,
        }}
      />
      <FlatList data={news} renderItem={() => <StockList />} />
    </View>
  );
};

export default StockListScreen;
