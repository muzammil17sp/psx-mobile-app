import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SvgUri } from 'react-native-svg';
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

interface StockCardProps {
  data: {
    symbol: string;
    curr: number;
    change: number;
    changePercent: number;
    logo?: string;
    volume?: number;
    marketCap?: number;
    isShariah?: boolean;
    high52?: number;
    low52?: number;
  };
}

const StockCard = ({ data }: StockCardProps) => {
  const navigation = useNavigation<NavigationProp>();
  const BULL_COLOR = '#81C784';
  const BEAR_COLOR = '#E57373';

  if (!data) return null;

  const isPositive = data.change >= 0;

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
          <SvgUri uri={data.logo} width={'100%'} height={'100%'} />
        </View>
      </View>
      <View style={styles.contentSection}>
        <View style={styles.titleRow}>
          <Text style={styles.title}>{data.symbol}</Text>
          {data.isShariah && (
            <View style={styles.mosqueContainer}>
              <MosqueSvg fill="#81C784" height={16} width={16} />
            </View>
          )}
        </View>
        {data.volume && (
          <Text style={styles.volume}>
            Vol: {data.volume.toLocaleString()}
          </Text>
        )}
        {(data.high52 || data.low52) && (
          <View style={styles.rangeContainer}>
            {data.high52 && (
              <Text style={styles.rangeText}>
                H52: {data.high52.toLocaleString(undefined, { minimumFractionDigits: 2 })}
              </Text>
            )}
            {data.low52 && (
              <Text style={styles.rangeText}>
                L52: {data.low52.toLocaleString(undefined, { minimumFractionDigits: 2 })}
              </Text>
            )}
          </View>
        )}
      </View>
      <View style={styles.priceContainer}>
        <Text style={styles.close}>
          {data.curr?.toLocaleString(undefined, { minimumFractionDigits: 2 }) ||
            '0.00'}
        </Text>
        <Text
          style={[
            styles.change,
            { color: isPositive ? BULL_COLOR : BEAR_COLOR },
          ]}
        >
          {isPositive ? '+' : ''}
          {data.change?.toFixed(2) || '0.00'} (
          {Math.abs(data.changePercent || 0).toFixed(2)}%)
        </Text>
      </View>
    </TouchableOpacity>
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
    width: '100%',
    marginLeft: 12,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 4,
  },
  mosqueContainer: {
    marginLeft: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 15,
    fontWeight: '600',
    color: '#F5F5F5',
    lineHeight: 20,
  },
  volume: {
    fontSize: 12,
    color: '#757575',
    marginBottom: 2,
  },
  rangeContainer: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 2,
  },
  rangeText: {
    fontSize: 11,
    color: '#9E9E9E',
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
});
