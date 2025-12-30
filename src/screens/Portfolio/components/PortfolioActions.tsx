import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/Feather';

interface PortfolioActionsProps {
  onEditPortfolio?: () => void;
  onAddTransaction?: () => void;
}

const PortfolioActions = ({
  onEditPortfolio,
  onAddTransaction,
}: PortfolioActionsProps) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        onPress={onEditPortfolio}
        activeOpacity={0.8}
      >
        <Icon name="edit-2" size={18} color="#81C784" />
        <Text style={styles.buttonText}>Edit Portfolio</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={onAddTransaction}
        activeOpacity={0.8}
      >
        <Icon name="plus-circle" size={18} color="#64B5F6" />
        <Text style={styles.buttonText}>Add Transaction</Text>
      </TouchableOpacity>
    </View>
  );
};

export default PortfolioActions;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 6,
    marginVertical: 10,
    gap: 12,
  },
  button: {
    flex: 1,
    backgroundColor: '#1E1E1E',
    borderRadius: 8,
    paddingVertical: 14,
    paddingHorizontal: 16,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  buttonText: {
    color: '#F5F5F5',
    fontSize: 14,
    fontWeight: '600',
    letterSpacing: 0.3,
  },
});

