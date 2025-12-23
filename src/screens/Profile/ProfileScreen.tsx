import React from 'react';
import { Text } from 'react-native';
import SafeScreen from '../../components/common/SafeArea';

const ProfileScreen = () => {
  return (
    <SafeScreen>
      <Text style={{ margin: 20 }}>Profile Screen</Text>
    </SafeScreen>
  );
};

export default ProfileScreen;
