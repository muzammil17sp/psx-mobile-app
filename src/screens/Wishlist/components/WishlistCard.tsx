import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import MosqueSvg from '../../../components/ui/svg/MosqueSvg';

type RootStackParamList = {
  StockDetail: {
    symbol: string;
    stockName?: string;
  };
};

type NavigationProp = StackNavigationProp<RootStackParamList>;

interface WishlistCardProps {
  data: {
    _id: string;
    symbol: string;
    stockData: any;
    onRemove?: () => void;
  };
}

const WishlistCard = ({ data }: WishlistCardProps) => {
  const navigation = useNavigation<NavigationProp>();
  const BULL_COLOR = '#81C784';
  const BEAR_COLOR = '#E57373';

  if (!data) return null;

  const stockData = data.stockData;
  const isPositive = stockData?.change >= 0 || stockData?.changePercent >= 0;

  const handlePress = () => {
    navigation.navigate('StockDetail', {
      symbol: data.symbol,
    });
  };

  return (
    <TouchableOpacity 
      style={styles.card}
      onPress={handlePress}
      activeOpacity={0.7}
    >
      <View style={styles.info}>
        <View style={styles.imageContainer}>
          {/* Logo would come from stockData if available */}
          <View style={styles.placeholderLogo}>
            <Text style={styles.placeholderText}>{data.symbol[0]}</Text>
          </View>
        </View>
      </View>
      <View style={styles.contentSection}>
        <View style={styles.titleRow}>
          <Text style={styles.title}>{data.symbol}</Text>
          {stockData?.isShariah && (
            <MosqueSvg fill="white" height={16} width={16} />
          )}
        </View>
        {stockData?.sector && (
          <Text style={styles.sector}>Sector: {stockData.sector}</Text>
        )}
        {stockData?.marketCap && (
          <Text style={styles.marketCap}>Market Cap: {stockData.marketCap}</Text>
        )}
        {stockData?.volume && (
          <Text style={styles.volume}>
            Vol: {stockData.volume.toLocaleString()}
          </Text>
        )}
        {(stockData?.high52 || stockData?.low52) && (
          <View style={styles.rangeContainer}>
            {stockData.high52 && (
              <Text style={styles.rangeText}>
                H52: {stockData.high52.toLocaleString(undefined, { minimumFractionDigits: 2 })}
              </Text>
            )}
            {stockData.low52 && (
              <Text style={styles.rangeText}>
                L52: {stockData.low52.toLocaleString(undefined, { minimumFractionDigits: 2 })}
              </Text>
            )}
          </View>
        )}
      </View>
      <View style={styles.priceContainer}>
        {stockData?.price && (
          <Text style={styles.close}>
            {stockData.price.toLocaleString(undefined, { minimumFractionDigits: 2 })}
          </Text>
        )}
        {stockData?.change !== undefined && stockData?.changePercent !== undefined && (
          <Text
            style={[
              styles.change,
              { color: isPositive ? BULL_COLOR : BEAR_COLOR },
            ]}
          >
            {isPositive ? '+' : ''}
            {stockData.change.toFixed(2)} (
            {(stockData.changePercent * 100).toFixed(2) + '%'})
          </Text>
        )}
        {data.onRemove && (
          <TouchableOpacity
            style={styles.removeButton}
            onPress={(e) => {
              e.stopPropagation();
              data.onRemove?.();
            }}
          >
            <Text style={styles.removeText}>Remove</Text>
          </TouchableOpacity>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    gap: 8,
    padding: 16,
    marginHorizontal: 6,
    marginVertical: 4,
    backgroundColor: '#1E1E1E',
    borderRadius: 8,
  },
  imageContainer: {
    height: 42,
    width: 42,
    borderRadius: 50,
    overflow: 'hidden',
  },
  placeholderLogo: {
    height: '100%',
    width: '100%',
    backgroundColor: '#2C2C2C',
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    color: '#F5F5F5',
    fontSize: 18,
    fontWeight: '700',
  },
  info: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  contentSection: {
    flex: 1,
    width: '100%',
    marginLeft: 12,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 4,
  },
  title: {
    fontSize: 15,
    fontWeight: '600',
    color: '#F5F5F5',
    lineHeight: 20,
  },
  sector: {
    fontSize: 11,
    color: '#9E9E9E',
    marginTop: 2,
  },
  marketCap: {
    fontSize: 11,
    color: '#9E9E9E',
    marginTop: 2,
  },
  volume: {
    fontSize: 12,
    color: '#757575',
    marginTop: 2,
  },
  rangeContainer: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 4,
  },
  rangeText: {
    fontSize: 11,
    color: '#9E9E9E',
  },
  priceContainer: {
    alignItems: 'flex-end',
    justifyContent: 'space-between',
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
  removeButton: {
    marginTop: 8,
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: '#E57373',
    borderRadius: 4,
  },
  removeText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
});

export default WishlistCard;

