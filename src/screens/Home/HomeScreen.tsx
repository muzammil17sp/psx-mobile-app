import React from 'react';
import { Text } from 'react-native';
import SafeScreen from '../../components/common/SafeArea';

const HomeScreen = () => {
  return (
    <SafeScreen>
      <Text style={{margin:20}}>Home Screen</Text>
    </SafeScreen>
  );
};

export default HomeScreen;
