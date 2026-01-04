import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/Feather';
import SummaryTab from './components/SummaryTab';
import HoldingsTab from './components/HoldingsTab';
import HistoryTab from './components/HistoryTab';
import { useHoldingBySymbol, useDeleteTransaction } from '../../hooks/usePortfolio';

type RootStackParamList = {
  MainTabs: undefined;
  Transaction: {
    transactionId?: string;
    transactionType?: 'buy' | 'sell' | 'dividend';
    symbol?: string;
  };
  PortfolioDetail: {
    stockName: string;
    stockSymbol?: string;
  };
};

type NavigationProp = StackNavigationProp<RootStackParamList>;

interface PortfolioDetailScreenProps {
  route: {
    params: {
      stockName: string;
      stockSymbol?: string;
    };
  };
}

const PortfolioDetailScreen = ({ route }: PortfolioDetailScreenProps) => {
  const navigation = useNavigation<NavigationProp>();
  const { stockName, stockSymbol } = route.params;
  const [activeTab, setActiveTab] = useState<'summary' | 'holdings' | 'history'>('summary');
  
  const { data: holdingData, isLoading } = useHoldingBySymbol(stockSymbol || '');
  const deleteTransaction = useDeleteTransaction();

  const holding = holdingData?.data;
  
  // Extract data from holding
  const totalShares = holding?.remainingShares || 0;
  const avgPrice = holding?.averageBuyPrice || 0;
  const currentPrice = holding?.currentPrice || 0;
  const purchasedCost = holding?.totalInvested || 0; // Cost basis of remaining shares
  const totalInvestment = purchasedCost;
  const profit = holding?.unrealizedPL || 0;
  const realizedPL = holding?.realizedPL || 0;
  const totalPL = holding?.totalPL || 0;
  const totalDividends = holding?.totalDividends || 0;
  const sellCostBasis = holding?.sellCostBasis || 0;
  const sellProceeds = holding?.sellProceeds || 0;
  
  // Get buy transactions for holdings tab
  const buyTransactions = holding?.transactions?.filter(
    (tx: any) => tx.type === 'buy'
  ) || [];

  const tabs = [
    { id: 'summary' as const, label: 'Summary', icon: 'pie-chart' },
    { id: 'holdings' as const, label: 'Holdings', icon: 'briefcase' },
    { id: 'history' as const, label: 'History', icon: 'clock' },
  ];

  const handleEdit = (transactionId: string, transactionType: 'buy' | 'sell' | 'dividend') => {
    navigation.navigate('Transaction', {
      transactionId,
      transactionType,
      symbol: stockSymbol,
    });
  };

  const handleDelete = async (transactionId: string) => {
    try {
      await deleteTransaction.mutateAsync(transactionId);
    } catch (error: any) {
      console.error('Error deleting transaction:', error);
    }
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'summary':
        return (
          <SummaryTab
            stockName={stockName}
            stockSymbol={stockSymbol}
            totalInvestment={totalInvestment}
            profit={profit}
            purchasedCost={purchasedCost}
            avgPrice={avgPrice}
            totalShares={totalShares}
            currentPrice={currentPrice}
            realizedPL={realizedPL}
            totalDividends={totalDividends}
            sellCostBasis={sellCostBasis}
            sellProceeds={sellProceeds}
          />
        );
      case 'holdings':
        return (
          <HoldingsTab
            totalInvestment={totalInvestment}
            profit={profit}
            purchasedCost={purchasedCost}
            avgPrice={avgPrice}
            totalShares={totalShares}
            currentPrice={currentPrice}
            transactions={buyTransactions.map((tx: any) => ({
              id: tx._id,
              buyDate: tx.date,
              shares: tx.shares,
              price: tx.price,
              type: tx.type,
            }))}
            onEdit={(id) => {
              const tx = buyTransactions.find((t: any) => t._id === id);
              if (tx) handleEdit(id, tx.type);
            }}
            onDelete={handleDelete}
          />
        );
      case 'history':
        return (
          <HistoryTab
            stockName={stockName}
            stockSymbol={stockSymbol}
          />
        );
      default:
        return (
          <SummaryTab
            stockName={stockName}
            stockSymbol={stockSymbol}
            totalInvestment={totalInvestment}
            profit={profit}
            purchasedCost={purchasedCost}
            avgPrice={avgPrice}
            totalShares={totalShares}
            currentPrice={currentPrice}
          />
        );
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.stockName}>{stockName}</Text>
        {stockSymbol && (
          <Text style={styles.stockSymbol}>{stockSymbol}</Text>
        )}
      </View>

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
      {isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#81C784" />
          <Text style={styles.loadingText}>Loading portfolio data...</Text>
        </View>
      ) : (
        <View style={styles.contentContainer}>{renderTabContent()}</View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  header: {
    padding: 16,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#2C2C2C',
  },
  stockName: {
    fontSize: 24,
    fontWeight: '700',
    color: '#F5F5F5',
    marginBottom: 4,
  },
  stockSymbol: {
    fontSize: 16,
    color: '#BDBDBD',
    fontWeight: '500',
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    color: '#BDBDBD',
    marginTop: 12,
    fontSize: 14,
  },
});

export default PortfolioDetailScreen;


