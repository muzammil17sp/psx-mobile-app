import { View } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import PortfolioCard from './components/PortfolioCard';
import PortfolioStockList from './components/PortfolioStockList';
import PortfolioActions from './components/PortfolioActions';

type RootStackParamList = {
  MainTabs: undefined;
  Transaction: undefined;
  PortfolioDetail: {
    stockName: string;
    stockSymbol?: string;
  };
};

type NavigationProp = StackNavigationProp<RootStackParamList>;

const PortfolioScreen = () => {
  const navigation = useNavigation<NavigationProp>();

  const handleEditPortfolio = () => {
    // TODO: Implement edit portfolio functionality
    console.log('Edit Portfolio pressed');
  };

  const handleAddTransaction = () => {
    navigation.navigate('Transaction');
  };

  return (
    <View style={{ backgroundColor: '#121212', flex: 1 }}>
      <PortfolioActions
        onEditPortfolio={handleEditPortfolio}
        onAddTransaction={handleAddTransaction}
      />
      <PortfolioCard />
      <PortfolioStockList />
    </View>
  );
};

export default PortfolioScreen;