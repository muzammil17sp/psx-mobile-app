import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/Feather';
import ChartsTab from './components/ChartsTab';
import FundamentalsTab from './components/FundamentalsTab';
import DividendsTab from './components/DividendsTab';
import { useStockDetail, useStockTick } from '../../hooks/useStockDetail';

type RootStackParamList = {
  MainTabs: undefined;
  StockDetail: {
    symbol: string;
    stockName?: string;
  };
};

type NavigationProp = StackNavigationProp<RootStackParamList>;

interface StockDetailScreenProps {
  route: {
    params: {
      symbol: string;
      stockName?: string;
    };
  };
}

const StockDetailScreen = () => {
  const route = useRoute();
  const navigation = useNavigation<NavigationProp>();
  const params = (route.params as any) || {};
  const { symbol, stockName } = params;

  const [activeTab, setActiveTab] = useState<'charts' | 'fundamentals' | 'dividends'>('charts');
  
  const { data: stockDetailData, isLoading: isLoadingDetail } = useStockDetail(symbol);
  const { data: tickData } = useStockTick(symbol);

  const currentPrice = tickData?.data?.price || stockDetailData?.data?.tick?.price || 0;
  const change = tickData?.data?.change || stockDetailData?.data?.tick?.change || 0;
  const changePercent = tickData?.data?.changePercent || stockDetailData?.data?.tick?.changePercent || 0;

  const tabs = [
    { id: 'charts' as const, label: 'Charts', icon: 'trending-up' },
    { id: 'fundamentals' as const, label: 'Fundamentals', icon: 'bar-chart-2' },
    { id: 'dividends' as const, label: 'Dividends', icon: 'dollar-sign' },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'charts':
        return <ChartsTab symbol={symbol} />;
      case 'fundamentals':
        return <FundamentalsTab symbol={symbol} />;
      case 'dividends':
        return <DividendsTab symbol={symbol} />;
      default:
        return <ChartsTab symbol={symbol} />;
    }
  };

  return (
    <View style={styles.container}>
      {/* Header with stock info */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <View style={styles.headerLeft}>
            <Text style={styles.stockSymbol}>{symbol || 'N/A'}</Text>
            {stockName && (
              <Text style={styles.stockName}>{stockName}</Text>
            )}
          </View>
          <View style={styles.headerRight}>
            <Text style={styles.price}>
              Rs. {currentPrice.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </Text>
            <Text
              style={[
                styles.change,
                { color: change >= 0 ? '#81C784' : '#E57373' },
              ]}
            >
              {change >= 0 ? '+' : ''}
              {change.toFixed(2)} ({Math.abs(changePercent).toFixed(2)}%)
            </Text>
          </View>
        </View>
      </View>

      {/* Tab Navigation */}
      <View style={styles.tabContainer}>
        {tabs.map(tab => (
          <TouchableOpacity
            key={tab.id}
            style={[
              styles.tab,
              activeTab === tab.id && styles.activeTab,
            ]}
            onPress={() => setActiveTab(tab.id)}
            activeOpacity={0.7}
          >
            <Icon
              name={tab.icon}
              size={18}
              color={activeTab === tab.id ? '#81C784' : '#757575'}
            />
            <Text
              style={[
                styles.tabLabel,
                activeTab === tab.id && styles.activeTabLabel,
              ]}
            >
              {tab.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Tab Content */}
      <View style={styles.contentContainer}>
        {renderTabContent()}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  header: {
    backgroundColor: '#1E1E1E',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#2C2C2C',
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerLeft: {
    flex: 1,
  },
  headerRight: {
    alignItems: 'flex-end',
  },
  stockSymbol: {
    fontSize: 24,
    fontWeight: '700',
    color: '#F5F5F5',
    marginBottom: 4,
  },
  stockName: {
    fontSize: 14,
    color: '#BDBDBD',
    fontWeight: '500',
  },
  price: {
    fontSize: 20,
    fontWeight: '700',
    color: '#F5F5F5',
    marginBottom: 4,
  },
  change: {
    fontSize: 14,
    fontWeight: '600',
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#1E1E1E',
    borderBottomWidth: 1,
    borderBottomColor: '#2C2C2C',
    paddingHorizontal: 6,
    paddingVertical: 8,
  },
  tab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderRadius: 8,
    gap: 6,
  },
  activeTab: {
    backgroundColor: '#2C2C2C',
  },
  tabLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: '#757575',
  },
  activeTabLabel: {
    color: '#81C784',
  },
  contentContainer: {
    flex: 1,
  },
});

export default StockDetailScreen;

