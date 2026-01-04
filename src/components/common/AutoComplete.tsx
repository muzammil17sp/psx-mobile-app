import {
  View,
  TextInput,
  StyleSheet,
  Text,
  TouchableOpacity,
  FlatList,
  Animated,
  Easing,
  ActivityIndicator,
} from 'react-native';
import React, { useEffect, useRef } from 'react';
import { useAutocomplete } from '../../hooks/useAutocomplete';

interface Props {
  value: string;
  onChange: (value: string) => void;
  onSelect?: (symbol: string, price?: number) => void;
}

const AutoComplete = (props: Props) => {
  const { results, isLoading } = useAutocomplete(props.value, 10);
  const listHeight = useRef(new Animated.Value(0)).current;
  const listOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Check if the current value exactly matches a result (meaning it was selected)
    const isExactMatch = results.some(r => r.symbol.toUpperCase() === props.value.toUpperCase());
    
    // Show dropdown if there's a query, results exist, and it's not an exact match (not selected yet)
    const shouldShow = props.value.length >= 1 && results.length > 0 && !isExactMatch;
    
    if (shouldShow || isLoading) {
      Animated.parallel([
        Animated.timing(listHeight, {
          toValue: Math.min(results.length * 60, 300), // Dynamic height based on results
          duration: 300,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: false,
        }),
        Animated.timing(listOpacity, {
          toValue: 1,
          duration: 200,
          useNativeDriver: false,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(listHeight, {
          toValue: 0,
          duration: 250,
          easing: Easing.in(Easing.cubic),
          useNativeDriver: false,
        }),
        Animated.timing(listOpacity, {
          toValue: 0,
          duration: 150,
          useNativeDriver: false,
        }),
      ]).start();
    }
  }, [props.value, results, isLoading]);

  const handleSelect = (symbol: string, price?: number) => {
    // Set the symbol first
    props.onChange(symbol);
    
    // Call onSelect callback with symbol and price
    if (props.onSelect) {
      props.onSelect(symbol, price);
    }
    
    // The dropdown will close automatically because the value changes
    // and the useEffect will trigger the closing animation
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={props.value}
        placeholder="Search stock symbol (e.g., HUBC)..."
        placeholderTextColor="#757575"
        onChangeText={(e: string) => props.onChange(e)}
        autoCapitalize="characters"
      />
      {props.value.length >= 1 && (
        <Animated.View
          style={[
            styles.optionListContainer,
            {
              height: listHeight,
              opacity: listOpacity,
              transform: [
                {
                  translateY: listOpacity.interpolate({
                    inputRange: [0, 1],
                    outputRange: [-10, 0],
                  }),
                },
              ],
            },
          ]}
        >
          {isLoading ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="small" color="#81C784" />
              <Text style={styles.loadingText}>Searching...</Text>
            </View>
          ) : results.length > 0 ? (
            <FlatList
              data={results}
              showsVerticalScrollIndicator={false}
              keyExtractor={(item) => item.symbol}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.optionContainer}
                  onPress={() => handleSelect(item.symbol, item.price)}
                  activeOpacity={0.7}
                >
                  <View style={styles.optionContent}>
                    <Text style={styles.symbol}>{item.symbol}</Text>
                    {item.price && (
                      <Text style={styles.price}>
                        Rs. {item.price.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                      </Text>
                    )}
                  </View>
                  {item.changePercent !== undefined && (
                    <Text
                      style={[
                        styles.change,
                        { color: item.changePercent >= 0 ? '#81C784' : '#E57373' },
                      ]}
                    >
                      {item.changePercent >= 0 ? '+' : ''}
                      {item.changePercent.toFixed(2)}%
                    </Text>
                  )}
                </TouchableOpacity>
              )}
            />
          ) : props.value.length >= 1 && !isLoading ? (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>No stocks found</Text>
            </View>
          ) : null}
        </Animated.View>
      )}
    </View>
  );
};

export default AutoComplete;

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    width: '100%',
  },
  input: {
    backgroundColor: '#1E1E1E',
    padding: 16,
    color: '#F5F5F5',
    borderRadius: 6,
    fontSize: 14,
    borderWidth: 1,
    borderColor: '#2C2C2C',
  },
  optionListContainer: {
    backgroundColor: '#1E1E1E',
    marginTop: 4,
    borderRadius: 6,
    maxHeight: 300,
    paddingVertical: 4,
    position: 'absolute',
    width: '100%',
    zIndex: 1000,
    top: 56,
    borderWidth: 1,
    borderColor: '#2C2C2C',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  optionContainer: {
    flexDirection: 'row',
    gap: 6,
    marginVertical: 4,
    padding: 10,
  },
  imageContainer: {
    height: 24,
    width: 24,
    borderRadius: 50,
    overflow: 'hidden',
    backgroundColor: '#fff',
  },
  image: {
    height: '100%',
    width: '100%',
  },
  optionContent: {
    flex: 1,
  },
  symbol: {
    fontSize: 15,
    fontWeight: '600',
    color: '#F5F5F5',
    lineHeight: 20,
  },
  price: {
    fontSize: 12,
    color: '#BDBDBD',
    marginTop: 2,
  },
  change: {
    fontSize: 12,
    fontWeight: '500',
  },
  loadingContainer: {
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingText: {
    color: '#BDBDBD',
    marginTop: 8,
    fontSize: 12,
  },
  emptyContainer: {
    padding: 20,
    alignItems: 'center',
  },
  emptyText: {
    color: '#757575',
    fontSize: 14,
  },
});
