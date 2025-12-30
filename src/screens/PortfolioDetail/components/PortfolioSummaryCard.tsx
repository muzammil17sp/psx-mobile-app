import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface PortfolioSummaryCardProps {
  totalInvestment: number;
  profit: number;
}

const PortfolioSummaryCard = ({
  totalInvestment,
  profit,
}: PortfolioSummaryCardProps) => {
  return (
    <View style={styles.card}>
      <View style={styles.row}>
        <View style={styles.item}>
          <Text style={styles.label}>Total Investment</Text>
          <Text style={styles.value}>
            {totalInvestment.toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </Text>
        </View>
        <View style={styles.item}>
          <Text style={styles.label}>Profit</Text>
          <Text
            style={[
              styles.value,
              { color: profit >= 0 ? '#81C784' : '#E57373' },
            ]}
          >
            {profit >= 0 ? '+' : ''}
            {profit.toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </Text>
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
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#2C2C2C',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
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
    fontSize: 20,
    fontWeight: '700',
    color: '#F5F5F5',
  },
});

export default PortfolioSummaryCard;


