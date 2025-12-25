import React from 'react';
import { View } from 'react-native';
import MarketSummaryCard from './components/MarketSummary';
import NewsFeed from './components/NewsFeed';

const HomeScreen = () => {
  return (
    <View style={{ backgroundColor: '#121212', flex: 1 }}>
      <MarketSummaryCard
        data={{
          symbol: 'KSE100',
          close: 170830.22,
          change: -243.51,
        }}
      />
      <NewsFeed />
    </View>
  );
};

export default HomeScreen;
