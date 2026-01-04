import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Platform,
  Alert,
  ActivityIndicator,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import AutoComplete from '../../../components/common/AutoComplete';
import { useCreateTransaction, useUpdateTransaction } from '../../../hooks/usePortfolio';
import { useNavigation } from '@react-navigation/native';
import { getStockPrice } from '../../../api/stock.api';

interface BuyTradeTabProps {
  transactionId?: string;
  initialData?: any;
  initialSymbol?: string;
}

const BuyTradeTab = ({ transactionId, initialData, initialSymbol }: BuyTradeTabProps) => {
  const navigation = useNavigation();
  const isEditMode = !!transactionId;
  const createTransaction = useCreateTransaction();
  const updateTransaction = useUpdateTransaction();

  const [stockSymbol, setStockSymbol] = useState(initialSymbol || initialData?.symbol || '');
  const [shares, setShares] = useState(initialData?.shares?.toString() || '');
  const [buyPrice, setBuyPrice] = useState(initialData?.price?.toString() || '');
  const [commissionPerShare, setCommissionPerShare] = useState(
    initialData?.commissionPerShare?.toString() || ''
  );
  const [purchaseDate, setPurchaseDate] = useState(
    initialData?.date ? new Date(initialData.date) : new Date()
  );
  const [notes, setNotes] = useState(initialData?.notes || '');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoadingPrice, setIsLoadingPrice] = useState(false);

  const handleStockSelect = async (symbol: string, price?: number) => {
    setStockSymbol(symbol);
    
    // If price is provided from autocomplete, use it
    if (price) {
      setBuyPrice(price.toString());
    } else {
      // Otherwise, fetch current price from PSX Terminal API
      setIsLoadingPrice(true);
      try {
        const response = await getStockPrice(symbol);
        if (response.success && response.data) {
          const currentPrice = response.data.price || response.data.curr;
          if (currentPrice) {
            setBuyPrice(currentPrice.toString());
          }
        }
      } catch (error) {
        console.error('Error fetching stock price:', error);
        // Don't show error, just leave price empty
      } finally {
        setIsLoadingPrice(false);
      }
    }
  };

  useEffect(() => {
    if (initialData) {
      setStockSymbol(initialData.symbol || '');
      setShares(initialData.shares?.toString() || '');
      setBuyPrice(initialData.price?.toString() || '');
      setCommissionPerShare(initialData.commissionPerShare?.toString() || '');
      setPurchaseDate(initialData.date ? new Date(initialData.date) : new Date());
      setNotes(initialData.notes || '');
    } else if (initialSymbol && !stockSymbol) {
      setStockSymbol(initialSymbol);
    }
  }, [initialData, initialSymbol]);

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

  const handleSubmit = async () => {
    // Validation
    if (!stockSymbol.trim()) {
      Alert.alert('Error', 'Please select a stock symbol');
      return;
    }

    if (!shares || Number(shares) <= 0) {
      Alert.alert('Error', 'Please enter a valid number of shares');
      return;
    }

    if (!buyPrice || Number(buyPrice) < 0) {
      Alert.alert('Error', 'Please enter a valid buy price');
      return;
    }

    setIsSubmitting(true);

    try {
      const transactionData = {
        type: 'buy' as const,
        symbol: stockSymbol.toUpperCase(),
        shares: Number(shares),
        price: Number(buyPrice),
        commissionPerShare: Number(commissionPerShare || 0),
        date: formatDate(purchaseDate),
        notes: notes.trim(),
      };

      if (isEditMode && transactionId) {
        await updateTransaction.mutateAsync({
          id: transactionId,
          data: {
            shares: transactionData.shares,
            price: transactionData.price,
            commissionPerShare: transactionData.commissionPerShare,
            date: transactionData.date,
            notes: transactionData.notes,
          },
        });
        Alert.alert('Success', 'Buy transaction updated successfully', [
          { text: 'OK', onPress: () => navigation.goBack() },
        ]);
      } else {
        await createTransaction.mutateAsync(transactionData);
        Alert.alert('Success', 'Buy transaction created successfully', [
          { text: 'OK', onPress: () => navigation.goBack() },
        ]);
      }
    } catch (error: any) {
      Alert.alert(
        'Error',
        error.response?.data?.message || 'Failed to save transaction'
      );
    } finally {
      setIsSubmitting(false);
    }
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
          <AutoComplete
            value={stockSymbol}
            onChange={setStockSymbol}
            onSelect={handleStockSelect}
          />
          {isLoadingPrice && (
            <View style={styles.priceLoadingContainer}>
              <ActivityIndicator size="small" color="#81C784" />
              <Text style={styles.priceLoadingText}>Loading current price...</Text>
            </View>
          )}
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
          placeholder="Enter buy price (auto-filled from current price)"
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
        <Text style={styles.label}>Notes (Optional)</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          value={notes}
          onChangeText={setNotes}
          placeholder="Add any notes..."
          placeholderTextColor="#757575"
          multiline
          numberOfLines={3}
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

      <TouchableOpacity
        style={[styles.submitButton, isSubmitting && styles.submitButtonDisabled]}
        onPress={handleSubmit}
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <ActivityIndicator color="#FFFFFF" />
        ) : (
          <Text style={styles.submitButtonText}>
            {isEditMode ? 'Update Buy Trade' : 'Submit Buy Trade'}
          </Text>
        )}
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
    width: '100%',
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
  submitButtonDisabled: {
    opacity: 0.6,
  },
  textArea: {
    minHeight: 80,
    textAlignVertical: 'top',
  },
  priceLoadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    gap: 8,
  },
  priceLoadingText: {
    color: '#81C784',
    fontSize: 12,
  },
});

export default BuyTradeTab;
