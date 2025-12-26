import { View, Text, StyleSheet } from 'react-native';
import React from 'react';

const PortfolioCard = () => {
  const BULL_COLOR = '#81C784';
  const BEAR_COLOR = '#E57373';

  return (
    <View style={styles.card}>
      <Text style={styles.title}>My Portfolio</Text>
      <Text style={{ ...styles.title, ...styles.amount }}>R: 500000</Text>
      <View style={styles.detailContainer}>
        <View style={styles.detail}>
          <Text style={styles.detailTitle}>Investment</Text>
          <Text style={styles.detailAmount}>50000</Text>
        </View>
        <View style={styles.detail}>
          <Text style={styles.detailTitle}>Gain/Loss %</Text>
          <Text
            style={[
              styles.detailAmount,
              { color: true ? BULL_COLOR : BEAR_COLOR },
            ]}
          >
            {true ? '+' : ''}
            {(0.7837).toFixed(2)} ({Math.abs(0.3033 || 0).toFixed(2)}%)
          </Text>
        </View>
        <View style={styles.detail}>
          <Text style={styles.detailTitle}>Amount</Text>
          <Text style={styles.detailAmount}>10000</Text>
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
