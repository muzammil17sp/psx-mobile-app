import { View, Text, FlatList } from 'react-native';
import React, { useState } from 'react';
import AutoComplete from '../../components/common/AutoComplete';
import { news } from '../../data/news';
import StockList from '../Stocks/components/StockList';

const WishlistScreen = () => {
  const [input, setInput] = useState('');
  return (
    <View style={{ backgroundColor: '#121212', flex: 1 }}>
      <AutoComplete value={input} onChange={setInput} />
      <FlatList data={news} renderItem={() => <StockList />} />
    </View>
  );
};

export default WishlistScreen;
