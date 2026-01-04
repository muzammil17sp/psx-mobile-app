import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator, TouchableOpacity } from 'react-native';
import { useStockTick, useStockChart } from '../../../hooks/useStockDetail';
import SimpleLineChart from './SimpleLineChart';

interface ChartsTabProps {
  symbol: string;
}

const ChartsTab = ({ symbol }: ChartsTabProps) => {
  const [timeframe, setTimeframe] = useState('1m');
  const [limit, setLimit] = useState(100);
  
  const { data: tickData, isLoading: isLoadingTick } = useStockTick(symbol);
  const { data: chartData, isLoading: isLoadingChart } = useStockChart(symbol, timeframe, limit);

  const tick = tickData?.data;
  const klines = chartData?.data?.klines || [];

  // Extract close prices for chart
  const chartPrices = klines.map((kline: any) => parseFloat(kline.close || kline.open || 0));
  
  // Format timestamps for labels
  const chartLabels = klines.map((kline: any) => {
    if (kline.timestamp) {
      const date = new Date(kline.timestamp);
      return `${date.getHours()}:${String(date.getMinutes()).padStart(2, '0')}`;
    }
    return '';
  });

  const timeframes = [
    { value: '1m', label: '1m' },
    { value: '5m', label: '5m' },
    { value: '15m', label: '15m' },
    { value: '30m', label: '30m' },
    { value: '1h', label: '1h' },
    { value: '1d', label: '1d' },
  ];

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.chartContainer}>
        <View style={styles.chartHeader}>
          <Text style={styles.sectionTitle}>Price Chart</Text>
          <View style={styles.timeframeSelector}>
            {timeframes.map((tf) => (
              <TouchableOpacity
                key={tf.value}
                style={[
                  styles.timeframeButton,
                  timeframe === tf.value && styles.timeframeButtonActive,
                ]}
                onPress={() => setTimeframe(tf.value)}
              >
                <Text
                  style={[
                    styles.timeframeButtonText,
                    timeframe === tf.value && styles.timeframeButtonTextActive,
                  ]}
                >
                  {tf.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
        
        {isLoadingChart ? (
          <View style={styles.chartPlaceholder}>
            <ActivityIndicator size="large" color="#81C784" />
            <Text style={styles.placeholderText}>Loading chart data...</Text>
          </View>
        ) : chartPrices.length > 0 ? (
          <View style={styles.chartWrapper}>
            <SimpleLineChart
              data={chartPrices}
              labels={chartLabels}
              color={tick?.change >= 0 ? '#81C784' : '#E57373'}
            />
            <View style={styles.chartInfo}>
              <Text style={styles.chartInfoText}>
                Current: Rs. {tick?.price?.toLocaleString(undefined, { minimumFractionDigits: 2 }) || '--'}
              </Text>
              <Text style={styles.chartInfoText}>
                Data Points: {klines.length}
              </Text>
            </View>
          </View>
        ) : (
          <View style={styles.chartPlaceholder}>
            <Text style={styles.placeholderText}>No chart data available</Text>
            <Text style={styles.placeholderSubtext}>Symbol: {symbol}</Text>
          </View>
        )}
      </View>

      <View style={styles.statsContainer}>
        <Text style={styles.sectionTitle}>Market Statistics</Text>
        {isLoadingTick ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="small" color="#81C784" />
          </View>
        ) : (
          <View style={styles.statsGrid}>
            <View style={styles.statCard}>
              <Text style={styles.statLabel}>Open</Text>
              <Text style={styles.statValue}>
                {tick?.open ? `Rs. ${tick.open.toLocaleString(undefined, { minimumFractionDigits: 2 })}` : '--'}
              </Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statLabel}>High</Text>
              <Text style={styles.statValue}>
                {tick?.high ? `Rs. ${tick.high.toLocaleString(undefined, { minimumFractionDigits: 2 })}` : '--'}
              </Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statLabel}>Low</Text>
              <Text style={styles.statValue}>
                {tick?.low ? `Rs. ${tick.low.toLocaleString(undefined, { minimumFractionDigits: 2 })}` : '--'}
              </Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statLabel}>Volume</Text>
              <Text style={styles.statValue}>
                {tick?.volume ? tick.volume.toLocaleString() : '--'}
              </Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statLabel}>Trades</Text>
              <Text style={styles.statValue}>
                {tick?.trades ? tick.trades.toLocaleString() : '--'}
              </Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statLabel}>Value</Text>
              <Text style={styles.statValue}>
                {tick?.value ? `Rs. ${(tick.value / 1000000).toFixed(2)}M` : '--'}
              </Text>
            </View>
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
  chartContainer: {
    marginBottom: 24,
  },
  chartHeader: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#F5F5F5',
    marginBottom: 12,
  },
  timeframeSelector: {
    flexDirection: 'row',
    gap: 8,
    flexWrap: 'wrap',
  },
  timeframeButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    backgroundColor: '#2C2C2C',
    borderWidth: 1,
    borderColor: '#3A3A3A',
  },
  timeframeButtonActive: {
    backgroundColor: '#81C784',
    borderColor: '#81C784',
  },
  timeframeButtonText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#BDBDBD',
  },
  timeframeButtonTextActive: {
    color: '#121212',
  },
  chartWrapper: {
    backgroundColor: '#1E1E1E',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#2C2C2C',
  },
  chartInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#2C2C2C',
  },
  chartInfoText: {
    fontSize: 12,
    color: '#BDBDBD',
  },
  chartPlaceholder: {
    backgroundColor: '#1E1E1E',
    borderRadius: 12,
    padding: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#2C2C2C',
    minHeight: 300,
  },
  placeholderText: {
    color: '#BDBDBD',
    fontSize: 16,
    marginBottom: 8,
    marginTop: 12,
  },
  placeholderSubtext: {
    color: '#757575',
    fontSize: 14,
    marginTop: 4,
  },
  loadingContainer: {
    padding: 20,
    alignItems: 'center',
  },
  statsContainer: {
    marginBottom: 24,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  statCard: {
    backgroundColor: '#1E1E1E',
    borderRadius: 8,
    padding: 16,
    borderWidth: 1,
    borderColor: '#2C2C2C',
    flex: 1,
    minWidth: '45%',
    alignItems: 'center',
  },
  statLabel: {
    fontSize: 12,
    color: '#BDBDBD',
    marginBottom: 8,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  statValue: {
    fontSize: 18,
    fontWeight: '700',
    color: '#F5F5F5',
  },
});

export default ChartsTab;

