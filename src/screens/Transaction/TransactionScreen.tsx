import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import BuyTradeTab from './components/BuyTradeTab';
import SellTradeTab from './components/SellTradeTab';
import AddDividendTab from './components/AddDividendTab';

const TransactionScreen = () => {
  const [activeTab, setActiveTab] = useState<'buy' | 'sell' | 'dividend'>('buy');

  const tabs = [
    { id: 'buy' as const, label: 'Buy Trade', icon: 'arrow-up-circle' },
    { id: 'sell' as const, label: 'Sell Trade', icon: 'arrow-down-circle' },
    { id: 'dividend' as const, label: 'Add Dividend', icon: 'dollar-sign' },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'buy':
        return <BuyTradeTab />;
      case 'sell':
        return <SellTradeTab />;
      case 'dividend':
        return <AddDividendTab />;
      default:
        return <BuyTradeTab />;
    }
  };

  return (
    <View style={styles.container}>
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

export default TransactionScreen;


