import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import MosqueSvg from '../ui/svg/MosqueSvg';

interface Index {
  symbol: string;
  name: string;
  isShariah?: boolean;
}

interface IndexPickerProps {
  selectedIndex: string;
  onSelect: (index: string) => void;
  indices: Index[];
}

const IndexPicker = ({ selectedIndex, onSelect, indices }: IndexPickerProps) => {
  const [isVisible, setIsVisible] = useState(false);

  const selectedIndexData = indices.find(idx => idx.symbol === selectedIndex);

  const handleSelect = (index: string) => {
    onSelect(index);
    setIsVisible(false);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.pickerButton}
        onPress={() => setIsVisible(true)}
        activeOpacity={0.7}
      >
        <View style={styles.pickerLeft}>
          <Text style={styles.pickerText}>
            {selectedIndexData?.name || selectedIndex}
          </Text>
          {selectedIndexData?.isShariah && (
            <View style={styles.mosqueContainer}>
              <MosqueSvg fill="#81C784" height={14} width={14} />
            </View>
          )}
        </View>
        <Icon name="chevron-down" size={20} color="#BDBDBD" />
      </TouchableOpacity>

      <Modal
        visible={isVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setIsVisible(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setIsVisible(false)}
        >
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Select Index</Text>
              <TouchableOpacity
                onPress={() => setIsVisible(false)}
                style={styles.closeButton}
              >
                <Icon name="x" size={24} color="#F5F5F5" />
              </TouchableOpacity>
            </View>
            <FlatList
              data={indices}
              keyExtractor={(item) => item.symbol}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={[
                    styles.indexItem,
                    selectedIndex === item.symbol && styles.indexItemSelected,
                  ]}
                  onPress={() => handleSelect(item.symbol)}
                  activeOpacity={0.7}
                >
                  <View style={styles.indexItemLeft}>
                    <Text
                      style={[
                        styles.indexText,
                        selectedIndex === item.symbol && styles.indexTextSelected,
                      ]}
                    >
                      {item.name}
                    </Text>
                    {item.isShariah && (
                      <View style={styles.mosqueContainer}>
                        <MosqueSvg fill="#81C784" height={14} width={14} />
                      </View>
                    )}
                  </View>
                  {selectedIndex === item.symbol && (
                    <Icon name="check" size={20} color="#81C784" />
                  )}
                </TouchableOpacity>
              )}
              style={styles.list}
            />
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 12,
    marginVertical: 8,
  },
  pickerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#1E1E1E',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#2C2C2C',
  },
  pickerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  pickerText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#F5F5F5',
  },
  mosqueContainer: {
    marginLeft: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#1E1E1E',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '70%',
    borderWidth: 1,
    borderColor: '#2C2C2C',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#2C2C2C',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#F5F5F5',
  },
  closeButton: {
    padding: 4,
  },
  list: {
    maxHeight: 400,
  },
  indexItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#2C2C2C',
  },
  indexItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    flex: 1,
  },
  indexItemSelected: {
    backgroundColor: '#2C2C2C',
  },
  indexText: {
    fontSize: 16,
    color: '#F5F5F5',
    fontWeight: '500',
  },
  indexTextSelected: {
    color: '#81C784',
    fontWeight: '600',
  },
});

export default IndexPicker;

