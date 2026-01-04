import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';

interface SummaryTabProps {
  stockName: string;
  stockSymbol?: string;
  totalInvestment: number;
  profit: number;
  purchasedCost: number;
  avgPrice: number;
  totalShares: number;
  currentPrice: number;
}

interface SummaryTabProps {
  stockName: string;
  stockSymbol?: string;
  totalInvestment: number;
  profit: number;
  purchasedCost: number;
  avgPrice: number;
  totalShares: number;
  currentPrice: number;
  realizedPL?: number;
  totalDividends?: number;
  sellCostBasis?: number;
  sellProceeds?: number;
}

const SummaryTab = ({
  stockName,
  stockSymbol,
  totalInvestment,
  profit,
  purchasedCost,
  avgPrice,
  totalShares,
  currentPrice,
  realizedPL = 0,
  totalDividends = 0,
  sellCostBasis = 0,
  sellProceeds = 0,
}: SummaryTabProps) => {
  // Calculate values for the table
  // Buy row: Cost basis of remaining shares, current value, unrealized P&L
  const buyCost = avgPrice * totalShares; // Cost basis of remaining shares
  const buyValue = totalShares * currentPrice; // Current value of remaining shares
  const buyPnl = profit; // Unrealized P&L
  
  // Sell row: Cost basis of sold shares, proceeds from sells, realized P&L
  const sellCost = sellCostBasis; // Cost basis of sold shares
  const sellValue = sellProceeds; // Proceeds from sold shares
  const sellPnl = realizedPL; // Realized P&L from sells
  
  // Total row: Sum of buy and sell
  const totalCost = buyCost + sellCost;
  const totalValue = buyValue + sellValue;
  const totalPnl = buyPnl + sellPnl;

  const BULL_COLOR = '#81C784';
  const BEAR_COLOR = '#E57373';

  const formatCurrency = (value: number) => {
    return value.toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  const formatPnl = (value: number) => {
    const formatted = formatCurrency(Math.abs(value));
    return `${value >= 0 ? '+' : '-'}${formatted}`;
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
    >
      {/* Stock Logo and Name */}
      <View style={styles.stockHeader}>
        <View style={styles.imageContainer}>
          <Image
            style={styles.image}
            resizeMode="contain"
            source={{
              uri: 'https://www.lucky-cement.com/wp-content/uploads/2017/02/lucky-logo.png',
            }}
          />
        </View>
        <View style={styles.stockInfo}>
          <Text style={styles.stockName}>{stockName}</Text>
          {stockSymbol && (
            <Text style={styles.stockSymbol}>{stockSymbol}</Text>
          )}
        </View>
      </View>

      {/* Summary Table */}
      <View style={styles.tableContainer}>
        <View style={styles.tableHeader}>
          <View style={[styles.tableHeaderCell, styles.labelCell]}>
            <Text style={styles.tableHeaderText}></Text>
          </View>
          <View style={styles.tableHeaderCell}>
            <Text style={styles.tableHeaderText}>Cost</Text>
          </View>
          <View style={styles.tableHeaderCell}>
            <Text style={styles.tableHeaderText}>Value</Text>
          </View>
          <View style={styles.tableHeaderCell}>
            <Text style={styles.tableHeaderText}>P&L</Text>
          </View>
        </View>

        {/* Buy Row */}
        <View style={styles.tableRow}>
          <View style={[styles.tableCell, styles.labelCell]}>
            <Text style={styles.tableLabel}>Buy</Text>
          </View>
          <View style={styles.tableCell}>
            <Text style={styles.tableCellText}>{formatCurrency(buyCost)}</Text>
          </View>
          <View style={styles.tableCell}>
            <Text style={styles.tableCellText}>{formatCurrency(buyValue)}</Text>
          </View>
          <View style={styles.tableCell}>
            <Text
              style={[
                styles.tableCellText,
                { color: buyPnl >= 0 ? BULL_COLOR : BEAR_COLOR },
              ]}
            >
              {formatPnl(buyPnl)}
            </Text>
          </View>
        </View>

        {/* Sell Row */}
        <View style={styles.tableRow}>
          <View style={[styles.tableCell, styles.labelCell]}>
            <Text style={styles.tableLabel}>Sell</Text>
          </View>
          <View style={styles.tableCell}>
            <Text style={styles.tableCellText}>{formatCurrency(sellCost)}</Text>
          </View>
          <View style={styles.tableCell}>
            <Text style={styles.tableCellText}>{formatCurrency(sellValue)}</Text>
          </View>
          <View style={styles.tableCell}>
            <Text
              style={[
                styles.tableCellText,
                { color: sellPnl >= 0 ? BULL_COLOR : BEAR_COLOR },
              ]}
            >
              {formatPnl(sellPnl)}
            </Text>
          </View>
        </View>

        {/* Total Row */}
        <View style={[styles.tableRow, styles.totalRow]}>
          <View style={[styles.tableCell, styles.labelCell]}>
            <Text style={[styles.tableLabel, styles.totalLabel]}>Total</Text>
          </View>
          <View style={styles.tableCell}>
            <Text style={[styles.tableCellText, styles.totalText]}>
              {formatCurrency(totalCost)}
            </Text>
          </View>
          <View style={styles.tableCell}>
            <Text style={[styles.tableCellText, styles.totalText]}>
              {formatCurrency(totalValue)}
            </Text>
          </View>
          <View style={styles.tableCell}>
            <Text
              style={[
                styles.tableCellText,
                styles.totalText,
                { color: totalPnl >= 0 ? BULL_COLOR : BEAR_COLOR },
              ]}
            >
              {formatPnl(totalPnl)}
            </Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  contentContainer: {
    padding: 16,
    paddingBottom: 40,
  },
  stockHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
    gap: 12,
  },
  imageContainer: {
    height: 56,
    width: 56,
    borderRadius: 28,
    overflow: 'hidden',
    backgroundColor: '#fff',
  },
  image: {
    height: '100%',
    width: '100%',
  },
  stockInfo: {
    flex: 1,
  },
  stockName: {
    fontSize: 20,
    fontWeight: '700',
    color: '#F5F5F5',
    marginBottom: 4,
  },
  stockSymbol: {
    fontSize: 14,
    color: '#BDBDBD',
    fontWeight: '500',
  },
  tableContainer: {
    backgroundColor: '#1E1E1E',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#2C2C2C',
  },
  tableHeader: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#2C2C2C',
    paddingBottom: 12,
    marginBottom: 12,
  },
  tableHeaderCell: {
    flex: 1,
    alignItems: 'center',
  },
  labelCell: {
    flex: 0.8,
    alignItems: 'flex-start',
  },
  tableHeaderText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#BDBDBD',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  tableRow: {
    flexDirection: 'row',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#2C2C2C',
    alignItems: 'center',
  },
  totalRow: {
    borderTopWidth: 1,
    borderTopColor: '#2C2C2C',
    borderBottomWidth: 0,
    marginTop: 4,
    paddingTop: 16,
  },
  tableCell: {
    flex: 1,
    alignItems: 'center',
  },
  tableLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#F5F5F5',
  },
  totalLabel: {
    fontSize: 15,
    fontWeight: '700',
  },
  tableCellText: {
    fontSize: 14,
    color: '#F5F5F5',
    fontWeight: '500',
    fontVariant: ['tabular-nums'],
  },
  totalText: {
    fontSize: 15,
    fontWeight: '700',
  },
});

export default SummaryTab;

