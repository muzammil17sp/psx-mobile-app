import { View, Text, FlatList, ActivityIndicator, StyleSheet, Alert } from 'react-native';
import React, { useState } from 'react';
import AutoComplete from '../../components/common/AutoComplete';
import WishlistCard from './components/WishlistCard';
import { useWishlist, useAddToWishlist, useRemoveFromWishlist } from '../../hooks/useWishlist';

const WishlistScreen = () => {
  const [input, setInput] = useState('');
  const { wishlist, isLoading, error } = useWishlist();
  const addToWishlist = useAddToWishlist();
  const removeFromWishlist = useRemoveFromWishlist();

  const handleSelectStock = async (symbol: string) => {
    try {
      await addToWishlist.mutateAsync(symbol);
      setInput(''); // Clear input after adding
    } catch (error: any) {
      Alert.alert(
        'Error',
        error.response?.data?.message || 'Failed to add to wishlist'
      );
    }
  };

  const handleRemoveStock = async (symbol: string) => {
    Alert.alert(
      'Remove Stock',
      `Are you sure you want to remove ${symbol} from your wishlist?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Remove',
          style: 'destructive',
          onPress: async () => {
            try {
              await removeFromWishlist.mutateAsync(symbol);
            } catch (error: any) {
              Alert.alert(
                'Error',
                error.response?.data?.message || 'Failed to remove from wishlist'
              );
            }
          },
        },
      ]
    );
  };

  const renderWishlistItem = ({ item }: { item: any }) => (
    <WishlistCard
      data={{
        ...item,
        onRemove: () => handleRemoveStock(item.symbol),
      }}
    />
  );

  return (
    <View style={styles.container}>
      <View style={styles.autocompleteContainer}>
        <AutoComplete
          value={input}
          onChange={setInput}
          onSelect={handleSelectStock}
        />
      </View>

      {isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#81C784" />
          <Text style={styles.loadingText}>Loading wishlist...</Text>
        </View>
      ) : error ? (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Failed to load wishlist</Text>
          <Text style={styles.errorSubtext}>Please try again later</Text>
        </View>
      ) : wishlist.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>Your wishlist is empty</Text>
          <Text style={styles.emptySubtext}>
            Search for stocks above to add them to your wishlist
          </Text>
        </View>
      ) : (
        <FlatList
          data={wishlist}
          renderItem={renderWishlistItem}
          keyExtractor={(item) => item._id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContent}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#121212',
    flex: 1,
  },
  autocompleteContainer: {
    paddingHorizontal: 12,
    paddingTop: 12,
    paddingBottom: 8,
    backgroundColor: '#121212',
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
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    color: '#E57373',
    fontSize: 16,
    marginBottom: 8,
  },
  errorSubtext: {
    color: '#757575',
    fontSize: 14,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyText: {
    color: '#F5F5F5',
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },
  emptySubtext: {
    color: '#757575',
    fontSize: 14,
    textAlign: 'center',
  },
  listContent: {
    paddingBottom: 20,
  },
});

export default WishlistScreen;
