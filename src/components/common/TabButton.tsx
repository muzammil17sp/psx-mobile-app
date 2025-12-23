import { TouchableOpacity } from 'react-native';
import React, { PropsWithChildren } from 'react';

interface TabButtonProps {
  onPress: () => void;
}

const TabButton = ({
  children,
  onPress,
}: PropsWithChildren<TabButtonProps>) => {
  return (
    <TouchableOpacity onPress={onPress}>
      {children}
    </TouchableOpacity>
  );
};

export default TabButton;
