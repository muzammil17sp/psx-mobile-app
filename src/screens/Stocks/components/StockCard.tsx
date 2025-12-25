import { View, Text, StyleSheet, Image } from 'react-native';
import React from 'react';

const StockCard = () => {
  const BULL_COLOR = '#81C784';
  const BEAR_COLOR = '#E57373';

  return (
    <View style={styles.card}>
      <View style={styles.info}>
        <View style={styles.imageContainer}>
          <Image
            style={styles.image}
            resizeMode="contain"
            source={{
              uri: 'https://www.lucky-cement.com/wp-content/uploads/2017/02/lucky-logo.png',
            }}
          />
        </View>
      </View>
      <View style={styles.contentSection}>
        <Text style={styles.title}>Hubco</Text>
        <Text style={styles.description}>POWER GENERATION & DISTRIBUTION</Text>
      </View>
      <View style={styles.priceContainer}>
        <Text style={styles.close}>
          {(221.22).toLocaleString(undefined, { minimumFractionDigits: 2 })}
        </Text>
        <Text
          style={[styles.change, { color: true ? BULL_COLOR : BEAR_COLOR }]}
        >
          {true ? '+' : ''}
          {(243.51).toFixed(2)} ({Math.abs(12.009).toFixed(2)}%)
        </Text>
      </View>
    </View>
  );
};

export default StockCard;

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    gap: 8,
    padding: 16,
    marginHorizontal: 6,
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

  contentSection: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '100%',
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
  priceContainer: {
    alignItems: 'flex-end',
  },
  close: {
    fontSize: 17,
    color: '#F5F5F5', 
    fontWeight: '600',
    fontVariant: ['tabular-nums'],
  },
  change: {
    fontSize: 13,
    fontWeight: '500',
    marginTop: 2,
  },
});
