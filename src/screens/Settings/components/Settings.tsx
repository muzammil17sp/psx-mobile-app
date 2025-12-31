import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/Feather';
import { RootStackParamList } from '../../../navigation/AppNavigation';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAuth } from '../../../context/AuthContext';

type NavigationProp = StackNavigationProp<RootStackParamList>;

const SettingsScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState<string | null>('');
  const auth = useAuth();
  

  const handleLoginPress = () => {
    navigation.navigate('Login');
  };

  const handleLogout = () => {
    auth.logout()
    AsyncStorage.removeItem('user');
    AsyncStorage.removeItem('token');
    setIsLogin(false);
    setEmail('');
  };

  useEffect(() => {
    const checkUser = async () => {
      const user = await AsyncStorage.getItem('user');
     if (user) {
       setEmail(user);
       setIsLogin(true);
      }
      setLoading(false);
    };
    checkUser();
  }, []);

  if (loading) return null;

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
    >
      {/* Account Details Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Account Details</Text>
        {isLogin ? (
          <View style={styles.accountInfo}>
            <View style={styles.emailContainer}>
              <Icon name="mail" size={20} color="#BDBDBD" />
              <Text style={styles.emailText}>{email}</Text>
            </View>
          </View>
        ) : (
          <TouchableOpacity
            style={styles.loginButton}
            onPress={handleLoginPress}
            activeOpacity={0.7}
          >
            <Icon name="log-in" size={20} color="#81C784" />
            <Text style={styles.loginButtonText}>Login</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Notifications Section */}
      <View style={styles.section}>
        <View style={styles.notificationRow}>
          <View style={styles.notificationInfo}>
            <Text style={styles.notificationTitle}>Get Portfolio Updates</Text>
            <Text style={styles.notificationSubtitle}>
              Receive notifications about your portfolio
            </Text>
          </View>
          <Switch
            value={notificationsEnabled}
            onValueChange={setNotificationsEnabled}
            trackColor={{ false: '#2C2C2C', true: '#81C784' }}
            thumbColor={notificationsEnabled ? '#FFFFFF' : '#757575'}
            ios_backgroundColor="#2C2C2C"
          />
        </View>
      </View>

      {isLogin && (
        <View style={styles.section}>
          <TouchableOpacity
            style={styles.logoutButton}
            onPress={handleLogout}
            activeOpacity={0.7}
          >
            <Icon name="log-out" size={20} color="#E57373" />
            <Text style={styles.logoutButtonText}>Logout</Text>
          </TouchableOpacity>
        </View>
      )}
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
    fontSize: 16,
    fontWeight: '700',
    color: '#F5F5F5',
    marginBottom: 16,
  },
  accountInfo: {
    backgroundColor: '#1E1E1E',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#2C2C2C',
  },
  emailContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  emailText: {
    fontSize: 15,
    color: '#F5F5F5',
    fontWeight: '500',
  },
  loginButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1E1E1E',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#2C2C2C',
    gap: 8,
  },
  loginButtonText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#81C784',
  },
  notificationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#1E1E1E',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#2C2C2C',
  },
  notificationInfo: {
    flex: 1,
    marginRight: 16,
  },
  notificationTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#F5F5F5',
    marginBottom: 4,
  },
  notificationSubtitle: {
    fontSize: 13,
    color: '#BDBDBD',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1E1E1E',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#2C2C2C',
    gap: 8,
  },
  logoutButtonText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#E57373',
  },
});

export default SettingsScreen;
