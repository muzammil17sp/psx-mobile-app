import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface MarketSummaryProps {
  data: {
    symbol: string;
    close: number;
    change: number;
    changePercent: number; 
  };
}

const MarketSummaryCard: React.FC<MarketSummaryProps> = ({ data }) => {
  const isUp = data.change >= 0;

  const BULL_COLOR = '#81C784';
  const BEAR_COLOR = '#E57373';

  return (
    <View style={styles.card}>
      <View style={styles.info}>
        <View>
          <Text style={styles.symbol}>{data.symbol}</Text>
        </View>

        <View style={styles.priceContainer}>
          <Text style={styles.close}>
            {data.close.toLocaleString(undefined, { minimumFractionDigits: 2 })}
          </Text>
          <Text
            style={[styles.change, { color: isUp ? BULL_COLOR : BEAR_COLOR }]}
          >
            {isUp ? '+' : ''}
            {data.change.toFixed(2)} (
            {Math.abs(data.changePercent || 0).toFixed(2)}%)
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 16,
    marginHorizontal: 6,
    marginVertical: 12,
    borderRadius: 12,
    backgroundColor: '#1E1E1E',
    borderWidth: 1,
    borderColor: '#2C2C2C',
  },
  info: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  symbol: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  marketLabel: {
    fontSize: 12,
    color: '#757575',
    marginTop: 2,
  },
  priceContainer: {
    alignItems: 'flex-end',
  },
  close: {
    fontSize: 17,
    color: '#F5F5F5',
    fontWeight: '600',
    fontVariant: ['tabular-nums'],
  },
  change: {
    fontSize: 13,
    fontWeight: '500',
    marginTop: 2,
  },
});

export default MarketSummaryCard;
