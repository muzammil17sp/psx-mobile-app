import React from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { useStockFundamentals, useStockCompany } from '../../../hooks/useStockDetail';

interface FundamentalsTabProps {
  symbol: string;
}

const FundamentalsTab = ({ symbol }: FundamentalsTabProps) => {
  const { data: fundamentalsData, isLoading: isLoadingFundamentals } = useStockFundamentals(symbol);
  const { data: companyData, isLoading: isLoadingCompany } = useStockCompany(symbol);

  const fundamentals = fundamentalsData?.data;
  const company = companyData?.data;

  if (isLoadingFundamentals || isLoadingCompany) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#81C784" />
        <Text style={styles.loadingText}>Loading fundamentals...</Text>
      </View>
    );
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Company Overview</Text>
        <View style={styles.infoCard}>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Sector</Text>
            <Text style={styles.infoValue}>{fundamentals?.sector || company?.sector || '--'}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Market Cap</Text>
            <Text style={styles.infoValue}>
              {fundamentals?.marketCap 
                ? `Rs. ${fundamentals.marketCap}` 
                : '--'}
            </Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Listed In</Text>
            <Text style={styles.infoValue}>
              {(() => {
                const listedIn = fundamentals?.listedIn || company?.listedIn;
                if (Array.isArray(listedIn)) {
                  return listedIn.join(', ');
                }
                if (typeof listedIn === 'string') {
                  // Split comma-separated string and format nicely
                  return listedIn.split(',').map(s => s.trim()).join(', ');
                }
                return '--';
              })()}
            </Text>
          </View>
          {fundamentals?.freeFloat && (
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Free Float</Text>
              <Text style={styles.infoValue}>
                {fundamentals.freeFloat}
              </Text>
            </View>
          )}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Financial Metrics</Text>
        <View style={styles.infoCard}>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>P/E Ratio</Text>
            <Text style={styles.infoValue}>
              {fundamentals?.peRatio ? fundamentals.peRatio.toFixed(2) : '--'}
            </Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Dividend Yield</Text>
            <Text style={styles.infoValue}>
              {fundamentals?.dividendYield !== undefined
                ? `${fundamentals.dividendYield.toFixed(2)}%` 
                : '--'}
            </Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>EPS</Text>
            <Text style={styles.infoValue}>
              {fundamentals?.eps 
                ? `Rs. ${fundamentals.eps.toFixed(2)}` 
                : '--'}
            </Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Book Value</Text>
            <Text style={styles.infoValue}>
              {fundamentals?.bookValue 
                ? `Rs. ${fundamentals.bookValue.toFixed(2)}` 
                : '--'}
            </Text>
          </View>
          {fundamentals?.volume30Avg && (
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>30-Day Avg Volume</Text>
              <Text style={styles.infoValue}>
                {fundamentals.volume30Avg.toLocaleString()}
              </Text>
            </View>
          )}
          {fundamentals?.yearChange !== undefined && (
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Year Change</Text>
              <Text
                style={[
                  styles.infoValue,
                  { color: fundamentals.yearChange >= 0 ? '#81C784' : '#E57373' },
                ]}
              >
                {fundamentals.yearChange >= 0 ? '+' : ''}
                {fundamentals.yearChange.toFixed(2)}%
              </Text>
            </View>
          )}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Company Information</Text>
        <View style={styles.infoCard}>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Shariah Compliant</Text>
            <Text style={styles.infoValue}>
              {fundamentals?.isNonCompliant !== undefined 
                ? (fundamentals.isNonCompliant ? 'No' : 'Yes')
                : fundamentals?.isShariah !== undefined
                ? (fundamentals.isShariah ? 'Yes' : 'No')
                : '--'}
            </Text>
          </View>
          {fundamentals?.sector && (
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Sector Code</Text>
              <Text style={styles.infoValue}>{fundamentals.sector}</Text>
            </View>
          )}
          {company?.description && (
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Business Description</Text>
              <Text style={styles.infoValue}>{company.description}</Text>
            </View>
          )}
        </View>
      </View>
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
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#F5F5F5',
    marginBottom: 16,
  },
  infoCard: {
    backgroundColor: '#1E1E1E',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#2C2C2C',
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#2C2C2C',
  },
  infoLabel: {
    fontSize: 14,
    color: '#BDBDBD',
    fontWeight: '500',
  },
  infoValue: {
    fontSize: 14,
    color: '#F5F5F5',
    fontWeight: '600',
    textAlign: 'right',
    flex: 1,
    marginLeft: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  loadingText: {
    color: '#BDBDBD',
    marginTop: 12,
    fontSize: 14,
  },
});

export default FundamentalsTab;

