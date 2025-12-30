import { createStackNavigator } from '@react-navigation/stack';
import MainTabNavigator from './MainTabNavigator';
import TransactionScreen from '../screens/Transaction/TransactionScreen';
import PortfolioDetailScreen from '../screens/PortfolioDetail/PortfolioDetailScreen';
import EditStockScreen from '../screens/EditStock/EditStockScreen';
import SettingsScreen from '../screens/Settings/SettingsScreen';
import LoginScreen from '../screens/Login/LoginScreen';
import SignUpScreen from '../screens/SignUp/SignUpScreen';
import Icon from 'react-native-vector-icons/Feather';
import { TouchableOpacity } from 'react-native';

export type RootStackParamList = {
  MainTabs: undefined;
  Transaction: undefined;
  PortfolioDetail: {
    stockName: string;
    stockSymbol?: string;
  };
  EditStock: {
    stockName: string;
    stockSymbol?: string;
    transactionId?: string;
  };
  Settings: undefined;
  Login: undefined;
  SignUp: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const AppNavigation = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#1E1E1E',
          borderBottomWidth: 0,
          elevation: 0,
          shadowOpacity: 0,
        },
        headerTintColor: '#F5F5F5',
        headerTitleStyle: {
          fontWeight: '600',
          fontSize: 18,
        },
      }}
    >
      <Stack.Screen
        name="MainTabs"
        component={MainTabNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Transaction"
        component={TransactionScreen}
        options={{
          title: 'Transaction',
          headerLeft: ({ onPress }) => (
            <TouchableOpacity
              onPress={onPress}
              style={{ marginLeft: 15 }}
              activeOpacity={0.7}
            >
              <Icon name="arrow-left" size={24} color="#F5F5F5" />
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name="PortfolioDetail"
        component={PortfolioDetailScreen}
        options={({ route }) => ({
          title: route.params?.stockName || 'Portfolio Details',
          headerLeft: ({ onPress }) => (
            <TouchableOpacity
              onPress={onPress}
              style={{ marginLeft: 15 }}
              activeOpacity={0.7}
            >
              <Icon name="arrow-left" size={24} color="#F5F5F5" />
            </TouchableOpacity>
          ),
        })}
      />
      <Stack.Screen
        name="EditStock"
        component={EditStockScreen}
        options={({ route }) => ({
          title: `Edit ${route.params?.stockName || 'Stock'}`,
          headerLeft: ({ onPress }) => (
            <TouchableOpacity
              onPress={onPress}
              style={{ marginLeft: 15 }}
              activeOpacity={0.7}
            >
              <Icon name="arrow-left" size={24} color="#F5F5F5" />
            </TouchableOpacity>
          ),
        })}
      />
      <Stack.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          title: 'Settings',
          headerLeft: ({ onPress }) => (
            <TouchableOpacity
              onPress={onPress}
              style={{ marginLeft: 15 }}
              activeOpacity={0.7}
            >
              <Icon name="arrow-left" size={24} color="#F5F5F5" />
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{
          title: 'Login',
          headerLeft: ({ onPress }) => (
            <TouchableOpacity
              onPress={onPress}
              style={{ marginLeft: 15 }}
              activeOpacity={0.7}
            >
              <Icon name="arrow-left" size={24} color="#F5F5F5" />
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name="SignUp"
        component={SignUpScreen}
        options={{
          title: 'Sign Up',
          headerLeft: ({ onPress }) => (
            <TouchableOpacity
              onPress={onPress}
              style={{ marginLeft: 15 }}
              activeOpacity={0.7}
            >
              <Icon name="arrow-left" size={24} color="#F5F5F5" />
            </TouchableOpacity>
          ),
        }}
      />
    </Stack.Navigator>
  );
};

export default AppNavigation;
