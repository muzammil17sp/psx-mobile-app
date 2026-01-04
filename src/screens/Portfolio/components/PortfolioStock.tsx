import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

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

interface PortfolioStockProps {
  stockName?: string;
  stockSymbol?: string;
  holding?: {
    symbol: string;
    averageBuyPrice: number;
    remainingShares: number;
    totalInvested: number;
    currentValue: number;
    totalPL: number;
    totalReturnPercent: number;
    unrealizedPL: number;
    unrealizedPLPercent: number;
  };
}

const PortfolioStock = ({ 
  stockName, 
  stockSymbol,
  holding
}: PortfolioStockProps) => {
  const navigation = useNavigation<NavigationProp>();
  const BULL_COLOR = '#81C784';
  const BEAR_COLOR = '#E57373';

  const symbol = stockSymbol || holding?.symbol || stockName || 'N/A';
  const name = stockName || symbol;
  const averagePrice = holding?.averageBuyPrice || 0;
  const totalShares = holding?.remainingShares || 0;
  // Investment should be calculated as average price * remaining shares (cost basis of current holdings)
  const investment = averagePrice * totalShares;
  const currentValue = holding?.currentValue || 0;
  const totalPL = holding?.totalPL || 0;
  
  // Calculate total return percentage if not provided or calculate it
  let totalReturnPercent = holding?.totalReturnPercent;
  if (totalReturnPercent === undefined || totalReturnPercent === null) {
    totalReturnPercent = investment > 0 ? (totalPL / investment) * 100 : 0;
  }
  
  const isPositive = totalPL >= 0;

  const handlePress = () => {
    navigation.navigate('PortfolioDetail', {
      stockName: name,
      stockSymbol: symbol,
    });
  };

  return (
    <TouchableOpacity 
      style={styles.container}
      onPress={handlePress}
      activeOpacity={0.7}
    >
      <View style={styles.detailContainer}>
        <View>
          <Text style={styles.title}>{name}</Text>
        </View>
      </View>
      <View style={styles.stockDetailContainer}>
        <View style={styles.detail}>
          <Text style={styles.detailTitle}>Avg Price</Text>
          <Text style={styles.detailAmount}>
            Rs. {averagePrice.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </Text>
        </View>
        <View style={styles.detail}>
          <Text style={styles.detailTitle}>Total Shares</Text>
          <Text style={styles.detailAmount}>
            {totalShares.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 4 })}
          </Text>
        </View>
        <View style={styles.detail}>
          <Text style={styles.detailTitle}>Investment</Text>
          <Text style={styles.detailAmount}>
            Rs. {investment.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </Text>
        </View>
      </View>
      <View style={styles.stockDetailContainer}>
        <View style={styles.detail}>
          <Text style={styles.detailTitle}>Current Value</Text>
          <Text style={styles.detailAmount}>
            Rs. {currentValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </Text>
        </View>
        <View style={styles.detail}>
          <Text style={styles.detailTitle}>Total Profit</Text>
          <Text
            style={[
              styles.detailAmount,
              { color: isPositive ? BULL_COLOR : BEAR_COLOR },
            ]}
          >
            {isPositive ? '+' : ''}
            Rs. {totalPL.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </Text>
        </View>
        <View style={styles.detail}>
          <Text style={styles.detailTitle}>Gain/Loss %</Text>
          <Text
            style={[
              styles.detailAmount,
              { color: isPositive ? BULL_COLOR : BEAR_COLOR },
            ]}
          >
            {isPositive ? '+' : ''}
            {Math.abs(totalReturnPercent).toFixed(2)}%
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default PortfolioStock;

const styles = StyleSheet.create({
  container: {
    padding: 12,
    marginVertical: 8,
    borderBottomColor: '#2E3032',
    borderBottomWidth: 1
  },
  detailContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  imageContainer: {
    height: 42,
    width: 42,
    borderRadius: 50,
    overflow: 'hidden',
    backgroundColor: '#fff',
  },
  image: {
    height: '100%',
    width: '100%',
  },
  info: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 15,
    fontWeight: '600',
    color: '#F5F5F5',
    lineHeight: 20,
    marginBottom: 4,
  },
  description: {
    fontSize: 13,
    color: '#BDBDBD',
    lineHeight: 18,
  },
  stockDetailContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 12,
    gap: 8,
  },
  detail: {
    alignItems: 'center',
    gap: 4,
    flex: 1,
  },
  detailTitle: {
    color: '#BDBDBD',
    fontSize: 12,
    textAlign: 'center',
  },
  detailAmount: {
    color: '#F5F5F5',
    fontSize: 13,
    fontWeight: '600',
    textAlign: 'center',
  },
});
