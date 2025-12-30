import React from 'react';
import { View, Text, StyleSheet, ScrollView, FlatList } from 'react-native';

interface HistoryTabProps {
  stockName: string;
  stockSymbol?: string;
}

interface SellTrade {
  id: string;
  date: string;
  qty: number;
  price: number;
  value: number;
  pnl: number;
}

interface Dividend {
  id: string;
  date: string;
  shares: number;
  divPerShare: number;
  totalDividend: number;
}

const HistoryTab = ({ stockName, stockSymbol }: HistoryTabProps) => {
  // Mock data - replace with real data later
  const mockSellTrades: SellTrade[] = [
    {
      id: '1',
      date: '2025-03-15',
      qty: 50,
      price: 160.25,
      value: 8012.5,
      pnl: 371.0,
    },
    {
      id: '2',
      date: '2025-02-10',
      qty: 25,
      price: 157.5,
      value: 3937.5,
      pnl: 116.75,
    },
  ];

  const mockDividends: Dividend[] = [
    {
      id: '1',
      date: '2025-03-01',
      shares: 225,
      divPerShare: 2.5,
      totalDividend: 562.5,
    },
    {
      id: '2',
      date: '2024-12-15',
      shares: 225,
      divPerShare: 2.0,
      totalDividend: 450.0,
    },
  ];

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

  const renderSellTradeItem = ({ item }: { item: SellTrade }) => (
    <View style={styles.tableRow}>
      <View style={[styles.tableCell, styles.dateQtyCell]}>
        <Text style={styles.tableCellText}>{item.date}</Text>
        <Text style={styles.tableCellSubtext}>Qty: {item.qty}</Text>
      </View>
      <View style={styles.tableCell}>
        <Text style={styles.tableCellText}>{item.price.toFixed(2)}</Text>
      </View>
      <View style={styles.tableCell}>
        <Text style={styles.tableCellText}>{formatCurrency(item.value)}</Text>
      </View>
      <View style={styles.tableCell}>
        <Text
          style={[
            styles.tableCellText,
            { color: item.pnl >= 0 ? BULL_COLOR : BEAR_COLOR },
          ]}
        >
          {formatPnl(item.pnl)}
        </Text>
      </View>
    </View>
  );

  const renderDividendItem = ({ item }: { item: Dividend }) => (
    <View style={styles.tableRow}>
      <View style={styles.tableCell}>
        <Text style={styles.tableCellText}>{item.date}</Text>
      </View>
      <View style={styles.tableCell}>
        <Text style={styles.tableCellText}>{item.shares}</Text>
      </View>
      <View style={styles.tableCell}>
        <Text style={styles.tableCellText}>
          {item.divPerShare.toFixed(2)}
        </Text>
      </View>
      <View style={styles.tableCell}>
        <Text style={styles.tableCellText}>
          {formatCurrency(item.totalDividend)}
        </Text>
      </View>
    </View>
  );

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
    >
      {/* Sell Trades Table */}
      <View style={styles.tableContainer}>
        <Text style={styles.tableTitle}>Sell Trades</Text>
        <View style={styles.tableHeader}>
          <View style={[styles.tableHeaderCell, styles.dateQtyCell]}>
            <Text style={styles.tableHeaderText}>Date/Qty</Text>
          </View>
          <View style={styles.tableHeaderCell}>
            <Text style={styles.tableHeaderText}>Price</Text>
          </View>
          <View style={styles.tableHeaderCell}>
            <Text style={styles.tableHeaderText}>Value</Text>
          </View>
          <View style={styles.tableHeaderCell}>
            <Text style={styles.tableHeaderText}>P&L</Text>
          </View>
        </View>
        {mockSellTrades.length > 0 ? (
          <FlatList
            data={mockSellTrades}
            renderItem={renderSellTradeItem}
            keyExtractor={item => item.id}
            scrollEnabled={false}
          />
        ) : (
          <View style={styles.emptyState}>
            <Text style={styles.emptyStateText}>No sell trades</Text>
          </View>
        )}
      </View>

      {/* Dividends Table */}
      <View style={[styles.tableContainer, styles.dividendTable]}>
        <Text style={styles.tableTitle}>Dividends</Text>
        <View style={styles.tableHeader}>
          <View style={styles.tableHeaderCell}>
            <Text style={styles.tableHeaderText}>Date</Text>
          </View>
          <View style={styles.tableHeaderCell}>
            <Text style={styles.tableHeaderText}>Shares</Text>
          </View>
          <View style={styles.tableHeaderCell}>
            <Text style={styles.tableHeaderText}>Div per Share</Text>
          </View>
          <View style={styles.tableHeaderCell}>
            <Text style={styles.tableHeaderText}>Total Dividend</Text>
          </View>
        </View>
        {mockDividends.length > 0 ? (
          <FlatList
            data={mockDividends}
            renderItem={renderDividendItem}
            keyExtractor={item => item.id}
            scrollEnabled={false}
          />
        ) : (
          <View style={styles.emptyState}>
            <Text style={styles.emptyStateText}>No dividends</Text>
          </View>
        )}
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
  tableContainer: {
    backgroundColor: '#1E1E1E',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#2C2C2C',
  },
  dividendTable: {
    marginBottom: 0,
  },
  tableTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#F5F5F5',
    marginBottom: 16,
  },
  tableHeader: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#2C2C2C',
    paddingBottom: 12,
    marginBottom: 4,
  },
  tableHeaderCell: {
    flex: 1,
    alignItems: 'center',
  },
  dateQtyCell: {
    flex: 1.2,
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
  tableCell: {
    flex: 1,
    alignItems: 'center',
  },
  tableCellText: {
    fontSize: 14,
    color: '#F5F5F5',
    fontWeight: '500',
    fontVariant: ['tabular-nums'],
  },
  tableCellSubtext: {
    fontSize: 12,
    color: '#BDBDBD',
    marginTop: 2,
  },
  emptyState: {
    paddingVertical: 24,
    alignItems: 'center',
  },
  emptyStateText: {
    fontSize: 14,
    color: '#757575',
  },
});

export default HistoryTab;

