import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/Feather';
import SummaryTab from './components/SummaryTab';
import HoldingsTab from './components/HoldingsTab';
import HistoryTab from './components/HistoryTab';

type RootStackParamList = {
  MainTabs: undefined;
  Transaction: undefined;
  PortfolioDetail: {
    stockName: string;
    stockSymbol?: string;
  };
  EditStock: {
    stockName: string;
    stockSymbol?: string;
    transactionId?: string;
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

// Mock transaction data - replace with real data later
const mockTransactions = [
  { id: '1', buyDate: '2025-01-15', shares: 100, price: 150.5 },
  { id: '2', buyDate: '2025-02-20', shares: 50, price: 155.75 },
  { id: '3', buyDate: '2025-03-10', shares: 75, price: 152.25 },
];

const PortfolioDetailScreen = ({ route }: PortfolioDetailScreenProps) => {
  const navigation = useNavigation<NavigationProp>();
  const { stockName, stockSymbol } = route.params;
  const [activeTab, setActiveTab] = useState<'summary' | 'holdings' | 'history'>('summary');

  // Mock calculations - replace with real data later
  const totalShares = 225;
  const avgPrice = 152.83;
  const currentPrice = 158.5;
  const purchasedCost = totalShares * avgPrice;
  const totalInvestment = purchasedCost;
  const profit = (currentPrice - avgPrice) * totalShares;

  const tabs = [
    { id: 'summary' as const, label: 'Summary', icon: 'pie-chart' },
    { id: 'holdings' as const, label: 'Holdings', icon: 'briefcase' },
    { id: 'history' as const, label: 'History', icon: 'clock' },
  ];

  const handleEdit = (transactionId: string) => {
    navigation.navigate('EditStock', {
      stockName,
      stockSymbol: stockSymbol || '',
      transactionId,
    });
  };

  const handleDelete = (transactionId: string) => {
    // TODO: Implement delete functionality
    console.log('Delete transaction:', transactionId);
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
            transactions={mockTransactions}
            onEdit={handleEdit}
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
      <View style={styles.contentContainer}>{renderTabContent()}</View>
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
});

export default PortfolioDetailScreen;


