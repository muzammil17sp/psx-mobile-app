import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import PortfolioSummaryCard from './PortfolioSummaryCard';
import PortfolioStatsCard from './PortfolioStatsCard';
import TransactionsTable from './TransactionsTable';

interface Transaction {
  id: string;
  buyDate: string;
  shares: number;
  price: number;
}

interface HoldingsTabProps {
  totalInvestment: number;
  profit: number;
  purchasedCost: number;
  avgPrice: number;
  totalShares: number;
  currentPrice: number;
  transactions: Transaction[];
  onEdit: (transactionId: string) => void;
  onDelete: (transactionId: string) => void;
}

const HoldingsTab = ({
  totalInvestment,
  profit,
  purchasedCost,
  avgPrice,
  totalShares,
  currentPrice,
  transactions,
  onEdit,
  onDelete,
}: HoldingsTabProps) => {
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
    >
      <PortfolioSummaryCard
        totalInvestment={totalInvestment}
        profit={profit}
      />

      <PortfolioStatsCard
        purchasedCost={purchasedCost}
        avgPrice={avgPrice}
        totalShares={totalShares}
        currentPrice={currentPrice}
      />

      <TransactionsTable
        transactions={transactions}
        onEdit={onEdit}
        onDelete={onDelete}
      />
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
});

export default HoldingsTab;

