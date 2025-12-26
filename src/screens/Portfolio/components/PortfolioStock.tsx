import { View, Text, StyleSheet, Image } from 'react-native';
import React from 'react';

const PortfolioStock = () => {
  const BULL_COLOR = '#81C784';
  const BEAR_COLOR = '#E57373';

  return (
    <View style={styles.container}>
      <View style={styles.detailContainer}>
        <View style={styles.imageContainer}>
          <Image
            style={styles.image}
            resizeMode="contain"
            source={{
              uri: 'https://www.lucky-cement.com/wp-content/uploads/2017/02/lucky-logo.png',
            }}
          />
        </View>
        <View>
          <Text style={styles.title}>Hubco</Text>
          <Text style={styles.description}>
            POWER GENERATION & DISTRIBUTION
          </Text>
        </View>
      </View>
      <View style={styles.stockDetailContainer}>
        <View style={styles.detail}>
          <Text style={styles.detailTitle}>Investment</Text>
          <Text style={styles.detailAmount}>50000</Text>
        </View>
        <View style={styles.detail}>
          <Text style={styles.detailTitle}>Gain/Loss %</Text>
          <Text
            style={[
              styles.detailAmount,
              { color: true ? BULL_COLOR : BEAR_COLOR },
            ]}
          >
            {true ? '+' : ''}
            {(0.7837).toFixed(2)} ({Math.abs(0.3033 || 0).toFixed(2)}%)
          </Text>
        </View>
        <View style={styles.detail}>
          <Text style={styles.detailTitle}>Amount</Text>
          <Text style={styles.detailAmount}>10000</Text>
        </View>
      </View>
    </View>
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
  },
  detail: {
    alignItems: 'center',
    gap: 6,
  },
  detailTitle: {
    color: '#BDBDBD',
    fontSize: 14,
  },
  detailAmount: {
    color: '#F5F5F5',
    fontSize: 16,
  },
});
