import { TouchableOpacity, StyleSheet } from 'react-native';
import React, { PropsWithChildren } from 'react';

interface TabButtonProps {
  onPress: () => void;
}

const TabButton = ({
  children,
  onPress,
}: PropsWithChildren<TabButtonProps>) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.tabButon}>
      {children}
    </TouchableOpacity>
  );
};

export default TabButton;

const styles = StyleSheet.create({
  tabButon: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
