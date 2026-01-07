import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Platform,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import AutoComplete from '../../components/common/AutoComplete';
import { useNavigation, useRoute } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

type RootStackParamList = {
  MainTabs: undefined;
  Transaction: undefined;
  StockDetail: {
    stockName: string;
    stockSymbol?: string;
  };
  EditStock: {
    stockName: string;
    stockSymbol?: string;
    transactionId?: string;
  };
};

type NavigationProp = StackNavigationProp<RootStackParamList>;

const EditStockScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute();
  const params = route.params as RootStackParamList['EditStock'];

  const [stockSymbol, setStockSymbol] = useState(params?.stockSymbol || '');
  const [shares, setShares] = useState('');
  const [buyPrice, setBuyPrice] = useState('');
  const [commissionPerShare, setCommissionPerShare] = useState('');
  const [purchaseDate, setPurchaseDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  // TODO: Load existing transaction data based on transactionId
  useEffect(() => {
    if (params?.transactionId) {
      // Load transaction data here
      // setShares(...)
      // setBuyPrice(...)
      // etc.
    }
  }, [params?.transactionId]);

  const formatDate = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const handleDateChange = (event: any, selectedDate?: Date) => {
    if (Platform.OS === 'android') {
      setShowDatePicker(false);
    }
    if (selectedDate) {
      setPurchaseDate(selectedDate);
    }
  };

  const handleSubmit = () => {
    // TODO: Implement update transaction functionality
    console.log('Edit Stock Submitted:', {
      transactionId: params?.transactionId,
      stockSymbol,
      shares: Number(shares),
      buyPrice: Number(buyPrice),
      commissionPerShare: Number(commissionPerShare),
      purchaseDate: formatDate(purchaseDate),
    });
    // Navigate back after update
    navigation.goBack();
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.formGroup}>
        <Text style={styles.label}>Stock Symbol</Text>
        <View style={styles.autocompleteWrapper}>
          <AutoComplete value={stockSymbol} onChange={setStockSymbol} />
        </View>
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Shares</Text>
        <TextInput
          style={styles.input}
          value={shares}
          onChangeText={setShares}
          placeholder="Enter number of shares"
          placeholderTextColor="#757575"
          keyboardType="numeric"
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Buy Price</Text>
        <TextInput
          style={styles.input}
          value={buyPrice}
          onChangeText={setBuyPrice}
          placeholder="Enter buy price"
          placeholderTextColor="#757575"
          keyboardType="numeric"
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Commission Per Share</Text>
        <TextInput
          style={styles.input}
          value={commissionPerShare}
          onChangeText={setCommissionPerShare}
          placeholder="Enter commission per share"
          placeholderTextColor="#757575"
          keyboardType="numeric"
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Purchase Date</Text>
        <TouchableOpacity
          style={styles.dateInput}
          onPress={() => setShowDatePicker(true)}
          activeOpacity={0.7}
        >
          <Text style={styles.dateText}>{formatDate(purchaseDate)}</Text>
        </TouchableOpacity>
        {showDatePicker && (
          <View style={styles.datePickerContainer}>
            <DateTimePicker
              value={purchaseDate}
              mode="date"
              display={Platform.OS === 'ios' ? 'spinner' : 'default'}
              onChange={handleDateChange}
              maximumDate={new Date()}
              themeVariant="dark"
              textColor="#F5F5F5"
              style={styles.datePicker}
            />
            {Platform.OS === 'ios' && (
              <TouchableOpacity
                style={styles.datePickerButton}
                onPress={() => setShowDatePicker(false)}
                activeOpacity={0.8}
              >
                <Text style={styles.datePickerButtonText}>Done</Text>
              </TouchableOpacity>
            )}
          </View>
        )}
      </View>

      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>Update Stock</Text>
      </TouchableOpacity>
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
  formGroup: {
    marginBottom: 24,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#F5F5F5',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#1E1E1E',
    padding: 16,
    color: '#F5F5F5',
    borderRadius: 8,
    fontSize: 14,
    borderWidth: 1,
    borderColor: '#2C2C2C',
    minHeight: 50,
  },
  autocompleteWrapper: {
    marginHorizontal: 0,
  },
  dateInput: {
    backgroundColor: '#1E1E1E',
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#2C2C2C',
    minHeight: 50,
    justifyContent: 'center',
  },
  dateText: {
    color: '#F5F5F5',
    fontSize: 14,
  },
  datePickerContainer: {
    marginTop: 12,
    backgroundColor: '#1E1E1E',
    borderRadius: 8,
    padding: 12,
    borderWidth: 1,
    borderColor: '#2C2C2C',
  },
  datePicker: {
    backgroundColor: '#1E1E1E',
  },
  datePickerButton: {
    marginTop: 12,
    padding: 14,
    backgroundColor: '#81C784',
    borderRadius: 8,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  datePickerButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  submitButton: {
    backgroundColor: '#81C784',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 24,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  submitButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
});

export default EditStockScreen;



