import React from 'react';
import { View, Text, StyleSheet, ScrollView, FlatList, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useHoldingBySymbol, useDeleteTransaction } from '../../../hooks/usePortfolio';

type RootStackParamList = {
  Transaction: {
    transactionId?: string;
    transactionType?: 'buy' | 'sell' | 'dividend';
    symbol?: string;
  };
};

type NavigationProp = StackNavigationProp<RootStackParamList>;

interface HistoryTabProps {
  stockName: string;
  stockSymbol?: string;
}

const HistoryTab = ({ stockName, stockSymbol }: HistoryTabProps) => {
  const navigation = useNavigation<NavigationProp>();
  const { data: holdingData, isLoading } = useHoldingBySymbol(stockSymbol || '');
  const deleteTransaction = useDeleteTransaction();

  const sellTrades = holdingData?.data?.transactions?.filter(
    (tx: any) => tx.type === 'sell'
  ) || [];

  const dividends = holdingData?.data?.transactions?.filter(
    (tx: any) => tx.type === 'dividend'
  ) || [];

  // Calculate P&L for sell trades (simplified - using average price)
  const avgPrice = holdingData?.data?.averageBuyPrice || 0;
  const sellTradesWithPL = sellTrades.map((tx: any) => ({
    ...tx,
    value: tx.totalAmount || tx.shares * tx.price,
    pnl: (tx.price - avgPrice) * tx.shares,
  }));

  const handleEdit = (transaction: any) => {
    navigation.navigate('Transaction', {
      transactionId: transaction._id,
      transactionType: transaction.type,
      symbol: transaction.symbol,
    });
  };

  const handleDelete = (transaction: any) => {
    Alert.alert(
      'Delete Transaction',
      `Are you sure you want to delete this ${transaction.type} transaction?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              await deleteTransaction.mutateAsync(transaction._id);
              Alert.alert('Success', 'Transaction deleted successfully');
            } catch (error: any) {
              Alert.alert('Error', error.response?.data?.message || 'Failed to delete transaction');
            }
          },
        },
      ]
    );
  };

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

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toISOString().split('T')[0];
  };

  const renderSellTradeItem = ({ item }: { item: any }) => (
    <TouchableOpacity
      style={styles.tableRow}
      onPress={() => handleEdit(item)}
      onLongPress={() => handleDelete(item)}
      activeOpacity={0.7}
    >
      <View style={[styles.tableCell, styles.dateQtyCell]}>
        <Text style={styles.tableCellText}>{formatDate(item.date)}</Text>
        <Text style={styles.tableCellSubtext}>Qty: {item.shares}</Text>
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
    </TouchableOpacity>
  );

  const renderDividendItem = ({ item }: { item: any }) => {
    const totalDividend = item.price * item.shares; // price is dividendPerShare
    return (
      <TouchableOpacity
        style={styles.tableRow}
        onPress={() => handleEdit(item)}
        onLongPress={() => handleDelete(item)}
        activeOpacity={0.7}
      >
        <View style={styles.tableCell}>
          <Text style={styles.tableCellText}>{formatDate(item.date)}</Text>
        </View>
        <View style={styles.tableCell}>
          <Text style={styles.tableCellText}>{item.shares}</Text>
        </View>
        <View style={styles.tableCell}>
          <Text style={styles.tableCellText}>
            {item.price.toFixed(2)}
          </Text>
        </View>
        <View style={styles.tableCell}>
          <Text style={styles.tableCellText}>
            {formatCurrency(totalDividend)}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

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
        {isLoading ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyStateText}>Loading...</Text>
          </View>
        ) : sellTradesWithPL.length > 0 ? (
          <FlatList
            data={sellTradesWithPL}
            renderItem={renderSellTradeItem}
            keyExtractor={item => item._id}
            scrollEnabled={false}
          />
        ) : (
          <View style={styles.emptyState}>
            <Text style={styles.emptyStateText}>No sell trades</Text>
            <Text style={styles.emptyStateSubtext}>Tap and hold to edit, long press to delete</Text>
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
        {isLoading ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyStateText}>Loading...</Text>
          </View>
        ) : dividends.length > 0 ? (
          <FlatList
            data={dividends}
            renderItem={renderDividendItem}
            keyExtractor={item => item._id}
            scrollEnabled={false}
          />
        ) : (
          <View style={styles.emptyState}>
            <Text style={styles.emptyStateText}>No dividends</Text>
            <Text style={styles.emptyStateSubtext}>Tap to edit, long press to delete</Text>
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
  emptyStateSubtext: {
    fontSize: 12,
    color: '#9E9E9E',
    marginTop: 4,
  },
});

export default HistoryTab;

