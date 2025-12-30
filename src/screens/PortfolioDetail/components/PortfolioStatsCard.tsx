import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface PortfolioStatsCardProps {
  purchasedCost: number;
  avgPrice: number;
  totalShares: number;
  currentPrice: number;
}

const PortfolioStatsCard = ({
  purchasedCost,
  avgPrice,
  totalShares,
  currentPrice,
}: PortfolioStatsCardProps) => {
  return (
    <View style={styles.card}>
      <View style={styles.row}>
        <View style={styles.item}>
          <Text style={styles.label}>Purchased Cost</Text>
          <Text style={styles.value}>
            {purchasedCost.toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </Text>
        </View>
        <View style={styles.item}>
          <Text style={styles.label}>Avg Price</Text>
          <Text style={styles.value}>{avgPrice.toFixed(2)}</Text>
        </View>
      </View>
      <View style={styles.row}>
        <View style={styles.item}>
          <Text style={styles.label}>Total Shares</Text>
          <Text style={styles.value}>{totalShares}</Text>
        </View>
        <View style={styles.item}>
          <Text style={styles.label}>Current Price</Text>
          <Text style={styles.value}>{currentPrice.toFixed(2)}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#1E1E1E',
    borderRadius: 12,
    padding: 20,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#2C2C2C',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  item: {
    flex: 1,
    alignItems: 'center',
  },
  label: {
    fontSize: 13,
    color: '#BDBDBD',
    marginBottom: 8,
    fontWeight: '500',
  },
  value: {
    fontSize: 18,
    fontWeight: '600',
    color: '#F5F5F5',
  },
});

export default PortfolioStatsCard;


