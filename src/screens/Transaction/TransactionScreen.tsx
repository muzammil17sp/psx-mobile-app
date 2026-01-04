import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';
import BuyTradeTab from './components/BuyTradeTab';
import SellTradeTab from './components/SellTradeTab';
import AddDividendTab from './components/AddDividendTab';
import { useTransaction } from '../../hooks/usePortfolio';

interface RouteParams {
  transactionId?: string;
  transactionType?: 'buy' | 'sell' | 'dividend';
  symbol?: string;
}

const TransactionScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const params = (route.params as RouteParams) || {};
  const { transactionId, transactionType, symbol } = params;

  const isEditMode = !!transactionId;
  const { data: transactionData, isLoading: isLoadingTransaction } = useTransaction(
    transactionId || ''
  );

  // Determine initial tab based on transaction type or default to 'buy'
  const getInitialTab = (): 'buy' | 'sell' | 'dividend' => {
    if (transactionType) return transactionType;
    if (transactionData?.data?.type) return transactionData.data.type;
    return 'buy';
  };

  const [activeTab, setActiveTab] = useState<'buy' | 'sell' | 'dividend'>(getInitialTab());

  // Update tab when transaction data loads
  useEffect(() => {
    if (transactionData?.data?.type) {
      setActiveTab(transactionData.data.type);
    }
  }, [transactionData]);

  // Update navigation title based on mode
  useEffect(() => {
    if (isEditMode) {
      const typeLabels = {
        buy: 'Edit Buy Transaction',
        sell: 'Edit Sell Transaction',
        dividend: 'Edit Dividend',
      };
      const label = typeLabels[activeTab] || 'Edit Transaction';
      navigation.setOptions({ title: label });
    } else {
      navigation.setOptions({ title: 'Add Transaction' });
    }
  }, [isEditMode, activeTab, navigation]);

  const tabs = [
    { id: 'buy' as const, label: 'Buy Trade', icon: 'arrow-up-circle' },
    { id: 'sell' as const, label: 'Sell Trade', icon: 'arrow-down-circle' },
    { id: 'dividend' as const, label: 'Add Dividend', icon: 'dollar-sign' },
  ];

  const renderTabContent = () => {
    const transaction = transactionData?.data;

    // Show loading state when fetching transaction data in edit mode
    if (isEditMode && isLoadingTransaction) {
      return (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#81C784" />
          <Text style={styles.loadingText}>Loading transaction...</Text>
        </View>
      );
    }

    switch (activeTab) {
      case 'buy':
        return (
          <BuyTradeTab
            transactionId={isEditMode ? transactionId : undefined}
            initialData={isEditMode ? transaction : undefined}
            initialSymbol={symbol}
          />
        );
      case 'sell':
        return (
          <SellTradeTab
            transactionId={isEditMode ? transactionId : undefined}
            initialData={isEditMode ? transaction : undefined}
            initialSymbol={symbol}
          />
        );
      case 'dividend':
        return (
          <AddDividendTab
            transactionId={isEditMode ? transactionId : undefined}
            initialData={isEditMode ? transaction : undefined}
            initialSymbol={symbol}
          />
        );
      default:
        return <BuyTradeTab />;
    }
  };

  return (
    <View style={styles.container}>
      {/* Only show tabs when NOT in edit mode */}
      {!isEditMode && (
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
      )}
      {/* Show edit mode indicator */}
      {isEditMode && (
        <View style={styles.editModeIndicator}>
          <Icon name="edit-2" size={16} color="#81C784" />
          <Text style={styles.editModeText}>
            Editing {activeTab === 'buy' ? 'Buy' : activeTab === 'sell' ? 'Sell' : 'Dividend'} Transaction
          </Text>
        </View>
      )}
      <View style={styles.contentContainer}>{renderTabContent()}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
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
    backgroundColor: '#121212',
  },
  loadingText: {
    color: '#BDBDBD',
    marginTop: 12,
    fontSize: 14,
  },
  editModeIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1E1E1E',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#2C2C2C',
    gap: 8,
  },
  editModeText: {
    color: '#81C784',
    fontSize: 14,
    fontWeight: '600',
  },
});

export default TransactionScreen;


