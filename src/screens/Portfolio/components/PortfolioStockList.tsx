import { View, Text, StyleSheet, FlatList } from 'react-native';
import React from 'react';
import PortfolioStock from './PortfolioStock';

interface PortfolioStockListProps {
  holdings: any[];
}

const PortfolioStockList = ({ holdings }: PortfolioStockListProps) => {
  if (holdings.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.heading}>Stock List</Text>
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No holdings yet</Text>
          <Text style={styles.emptySubtext}>Add a buy transaction to get started</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Stock List</Text>
      <FlatList
        data={holdings}
        keyExtractor={item => item.symbol}
        renderItem={({ item }) => (
          <PortfolioStock 
            stockName={item.symbol}
            stockSymbol={item.symbol}
            holding={item}
          />
        )}
        style={styles.list}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={true}
        nestedScrollEnabled={true}
      />
    </View>
  );
};

export default PortfolioStockList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 6,
  },
  heading: {
    color: '#F5F5F5',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
    marginTop: 12,
  },
  list: {
    flex: 1,
  },
  listContent: {
    paddingBottom: 50,
  },
  emptyContainer: {
    padding: 40,
    alignItems: 'center',
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
});
