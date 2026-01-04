import { View, ActivityIndicator, Text, StyleSheet } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import PortfolioCard from './components/PortfolioCard';
import PortfolioStockList from './components/PortfolioStockList';
import PortfolioActions from './components/PortfolioActions';
import { usePortfolioSummary } from '../../hooks/usePortfolio';

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

const PortfolioScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const { data: portfolioData, isLoading } = usePortfolioSummary();

  const handleEditPortfolio = () => {
    // TODO: Implement edit portfolio functionality
    console.log('Edit Portfolio pressed');
  };

  const handleAddTransaction = () => {
    navigation.navigate('Transaction');
  };

  const totals = portfolioData?.data?.totals;

  return (
    <View style={styles.mainContainer}>
      <PortfolioActions
        onEditPortfolio={handleEditPortfolio}
        onAddTransaction={handleAddTransaction}
      />
      {isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#81C784" />
          <Text style={styles.loadingText}>Loading portfolio...</Text>
        </View>
      ) : (
        <>
          <PortfolioCard totals={totals} />
          <PortfolioStockList holdings={portfolioData?.data?.holdings || []} />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: '#121212',
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

export default PortfolioScreen;