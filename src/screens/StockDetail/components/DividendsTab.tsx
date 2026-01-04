import React from 'react';
import { View, Text, StyleSheet, ScrollView, FlatList, ActivityIndicator } from 'react-native';
import { useStockDividends } from '../../../hooks/useStockDetail';

interface DividendsTabProps {
  symbol: string;
}

interface Dividend {
  symbol?: string;
  exDate: string;
  paymentDate: string;
  recordDate: string;
  amount: number;
  year: number;
}

const DividendsTab = ({ symbol }: DividendsTabProps) => {
  const { data: dividendsData, isLoading } = useStockDividends(symbol);
  
  const dividends: Dividend[] = dividendsData?.data || [];

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
    } catch {
      return dateString;
    }
  };

  const renderDividendItem = ({ item, index }: { item: Dividend; index: number }) => (
    <View style={styles.dividendRow}>
      <View style={styles.dividendInfo}>
        <Text style={styles.dividendYear}>{item.year}</Text>
        <Text style={styles.dividendDateText}>
          Ex-Date: {formatDate(item.exDate)}
        </Text>
        <Text style={styles.dividendSubtext}>
          Payment: {formatDate(item.paymentDate)}
        </Text>
      </View>
      <View style={styles.dividendAmount}>
        <Text style={styles.dividendAmountText}>
          Rs. {item.amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}
        </Text>
        <Text style={styles.dividendType}>Per Share</Text>
      </View>
    </View>
  );

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Dividend History</Text>
        
        {isLoading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="small" color="#81C784" />
            <Text style={styles.loadingText}>Loading dividends...</Text>
          </View>
        ) : dividends.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No dividend history available</Text>
            <Text style={styles.emptySubtext}>Dividend data will be displayed here when available</Text>
          </View>
        ) : (
          <View style={styles.dividendTable}>
            <View style={styles.tableHeader}>
              <View style={styles.headerCell}>
                <Text style={styles.headerText}>Year & Date</Text>
              </View>
              <View style={styles.headerCell}>
                <Text style={styles.headerText}>Amount</Text>
              </View>
            </View>
            <FlatList
              data={dividends}
              renderItem={renderDividendItem}
              keyExtractor={(item, index) => `${item.symbol}-${item.exDate}-${index}`}
              scrollEnabled={false}
            />
          </View>
        )}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Dividend Summary</Text>
        <View style={styles.summaryCard}>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Total Dividends</Text>
            <Text style={styles.summaryValue}>
              Rs. {dividends.reduce((sum, d) => sum + d.amount, 0).toLocaleString(undefined, { minimumFractionDigits: 2 })}
            </Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Dividend Count</Text>
            <Text style={styles.summaryValue}>{dividends.length}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Last Dividend</Text>
            <Text style={styles.summaryValue}>
              {dividends.length > 0 && dividends[0].exDate 
                ? formatDate(dividends[0].exDate) 
                : '--'}
            </Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Last Payment</Text>
            <Text style={styles.summaryValue}>
              {dividends.length > 0 && dividends[0].paymentDate 
                ? formatDate(dividends[0].paymentDate) 
                : '--'}
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
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#F5F5F5',
    marginBottom: 16,
  },
  emptyContainer: {
    backgroundColor: '#1E1E1E',
    borderRadius: 12,
    padding: 40,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#2C2C2C',
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
  dividendTable: {
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
    marginBottom: 8,
  },
  headerCell: {
    flex: 1,
  },
  headerText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#BDBDBD',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  dividendRow: {
    flexDirection: 'row',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#2C2C2C',
  },
  dividendInfo: {
    flex: 1,
  },
  dividendYear: {
    fontSize: 14,
    color: '#F5F5F5',
    fontWeight: '600',
    marginBottom: 4,
  },
  dividendDateText: {
    fontSize: 13,
    color: '#BDBDBD',
    fontWeight: '500',
    marginBottom: 2,
  },
  dividendSubtext: {
    fontSize: 11,
    color: '#757575',
  },
  dividendAmount: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  dividendAmountText: {
    fontSize: 16,
    color: '#F5F5F5',
    fontWeight: '600',
    marginBottom: 2,
  },
  dividendType: {
    fontSize: 12,
    color: '#757575',
  },
  summaryCard: {
    backgroundColor: '#1E1E1E',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#2C2C2C',
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#2C2C2C',
  },
  summaryLabel: {
    fontSize: 14,
    color: '#BDBDBD',
    fontWeight: '500',
  },
  summaryValue: {
    fontSize: 14,
    color: '#F5F5F5',
    fontWeight: '600',
  },
  loadingContainer: {
    padding: 20,
    alignItems: 'center',
  },
  loadingText: {
    color: '#BDBDBD',
    marginTop: 8,
    fontSize: 12,
  },
});

export default DividendsTab;

