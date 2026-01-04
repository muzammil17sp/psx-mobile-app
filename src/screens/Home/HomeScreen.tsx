import React from 'react';
import { View} from 'react-native';
import MarketSummaryCard from './components/MarketSummary';
import NewsFeed from './components/NewsFeed';
import { useKSE100 } from '../../hooks/useKSE100';

const HomeScreen = () => {
  const { data: kse100Data} = useKSE100();

  const changePercentStr = kse100Data?.changePercent 
    ? `${(kse100Data.changePercent * 100).toFixed(2)}%`
    : '0.00%';

  return (
    <View style={{ backgroundColor: '#121212', flex: 1 }}>

        <MarketSummaryCard
          data={{
            symbol: kse100Data?.symbol || 'KSE100',
            close: kse100Data?.price || 0,
            change: kse100Data?.change || 0,
            changePercent: changePercentStr,
          }}
        />
      <NewsFeed />
    </View>
  );
};

export default HomeScreen;
