import { View, Text, StyleSheet, FlatList } from 'react-native';
import React from 'react';
import PortfolioStock from './PortfolioStock';
import { news } from '../../../data/news';

const PortfolioStockList = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Stock List</Text>
      <FlatList
        data={news}
        keyExtractor={item => item.article_id}
        renderItem={() => <PortfolioStock />}
      />
    </View>
  );
};

export default PortfolioStockList;

const styles = StyleSheet.create({
  container: {
    marginVertical: 12,
    marginHorizontal: 6,
  },
  heading: {
    color: '#F5F5F5',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16
  },
});
