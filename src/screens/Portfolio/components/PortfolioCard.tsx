import { View, Text, StyleSheet } from 'react-native';
import React from 'react';

interface PortfolioCardProps {
  totals?: {
    totalInvested: number;
    currentValue: number;
    totalPL: number;
    totalReturnPercent: number;
    totalDividends: number;
  };
}

const PortfolioCard = ({ totals }: PortfolioCardProps) => {
  const BULL_COLOR = '#81C784';
  const BEAR_COLOR = '#E57373';

  const totalReturn = totals?.totalReturn || 0;
  const totalReturnPercent = totals?.totalReturnPercent || 0;
  const currentValue = totals?.currentValue || 0;
  const totalInvested = totals?.totalInvested || 0;
  const totalDividends = totals?.totalDividends || 0;

  const isPositive = totalReturn >= 0;

  return (
    <View style={styles.card}>
      <Text style={styles.title}>My Portfolio</Text>
      <Text style={{ ...styles.title, ...styles.amount }}>
        Rs. {currentValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
      </Text>
      <View style={styles.detailContainer}>
        <View style={styles.detail}>
          <Text style={styles.detailTitle}>Investment</Text>
          <Text style={styles.detailAmount}>
            {totalInvested.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </Text>
        </View>
        <View style={styles.detail}>
          <Text style={styles.detailTitle}>Gain/Loss %</Text>
          <Text
            style={[
              styles.detailAmount,
              { color: isPositive ? BULL_COLOR : BEAR_COLOR },
            ]}
          >
            {isPositive ? '+' : ''}
            {totalReturn.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ({Math.abs(totalReturnPercent).toFixed(2)}%)
          </Text>
        </View>
        <View style={styles.detail}>
          <Text style={styles.detailTitle}>Dividends</Text>
          <Text style={styles.detailAmount}>
            {totalDividends.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default PortfolioCard;

const styles = StyleSheet.create({
  card: {
    marginVertical: 10,
    marginHorizontal: 6,
    backgroundColor: '#1E1E1E',
    borderWidth: 1,
    borderRadius: 6,
    padding: 20,
    borderColor: '#2C2C2C',
  },
  title: {
    fontSize: 16,
    fontWeight: '500',
    color: '#BDBDBD',
    lineHeight: 20,
    marginBottom: 4,
    textAlign: 'center',
  },
  amount: {
    fontSize: 18,
    fontWeight: 700,
    marginVertical: 12,
    color: '#F5F5F5',
  },
  detailContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 12,
  },
  detail: {
    alignItems: 'center',
    gap: 6,
  },
  detailTitle: {
    color: '#BDBDBD',
    fontSize: 14,
  },
  detailAmount: {
    color: '#F5F5F5',
    fontSize: 16,
  },
});
