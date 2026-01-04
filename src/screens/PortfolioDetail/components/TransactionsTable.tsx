import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

interface Transaction {
  id: string;
  buyDate: string;
  shares: number;
  price: number;
  type?: string;
}

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toISOString().split('T')[0];
};

interface TransactionsTableProps {
  transactions: Transaction[];
  onEdit: (transactionId: string) => void;
  onDelete: (transactionId: string) => void;
}

const TransactionsTable = ({
  transactions,
  onEdit,
  onDelete,
}: TransactionsTableProps) => {
  const renderTransactionItem = ({ item }: { item: Transaction }) => (
    <View style={styles.tableRow}>
      <View style={[styles.tableCell, styles.tableCellDate]}>
        <Text style={styles.tableCellText}>{formatDate(item.buyDate)}</Text>
      </View>
      <View style={[styles.tableCell, styles.tableCellShares]}>
        <Text style={styles.tableCellText}>{item.shares}</Text>
      </View>
      <View style={[styles.tableCell, styles.tableCellPrice]}>
        <Text style={styles.tableCellText}>{item.price.toFixed(2)}</Text>
      </View>
      <View style={[styles.tableCell, styles.tableCellActions]}>
        <TouchableOpacity
          style={styles.iconButton}
          onPress={() => onEdit(item.id)}
          activeOpacity={0.7}
        >
          <Icon name="edit-2" size={18} color="#64B5F6" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.iconButton}
          onPress={() => onDelete(item.id)}
          activeOpacity={0.7}
        >
          <Icon name="trash-2" size={18} color="#E57373" />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Transactions</Text>
      <View style={styles.tableHeader}>
        <View style={[styles.tableHeaderCell, styles.tableCellDate]}>
          <Text style={styles.tableHeaderText}>Date</Text>
        </View>
        <View style={[styles.tableHeaderCell, styles.tableCellShares]}>
          <Text style={styles.tableHeaderText}>Shares</Text>
        </View>
        <View style={[styles.tableHeaderCell, styles.tableCellPrice]}>
          <Text style={styles.tableHeaderText}>Price</Text>
        </View>
        <View style={[styles.tableHeaderCell, styles.tableCellActions]}>
          <Text style={styles.tableHeaderText}>Actions</Text>
        </View>
      </View>
      <FlatList
        data={transactions}
        renderItem={renderTransactionItem}
        keyExtractor={item => item.id}
        scrollEnabled={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1E1E1E',
    borderRadius: 12,
    padding: 8,
    borderWidth: 1,
    borderColor: '#2C2C2C',
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: '#F5F5F5',
    marginBottom: 20,
  },
  tableHeader: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#2C2C2C',
    paddingBottom: 14,
    marginBottom: 4,
  },
  tableHeaderCell: {
    paddingHorizontal: 12,
  },
  tableHeaderText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#BDBDBD',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  tableRow: {
    flexDirection: 'row',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#2C2C2C',
    alignItems: 'center',
  },
  tableCell: {
    paddingHorizontal: 4,
    justifyContent: 'center',
  },
  tableCellDate: {
    flex: 2.5,
  },
  tableCellShares: {
    flex: 1.2,
    alignItems: 'center',
  },
  tableCellPrice: {
    flex: 1.5,
    alignItems: 'flex-end',
  },
  tableCellActions: {
    flex: 1.2,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 16,
    alignItems: 'center',
  },
  tableCellText: {
    fontSize: 14,
    color: '#F5F5F5',
    fontWeight: '500',
  },
  iconButton: {
    padding: 8,
  },
});

export default TransactionsTable;


