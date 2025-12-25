/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-native/no-inline-styles */
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/Home/HomeScreen';
import Icon from 'react-native-vector-icons/Feather';
import AntIcon from 'react-native-vector-icons/AntDesign';
import TabButton from '../components/common/TabButton';
import LogoTitle from '../components/ui/logo';
import { TouchableOpacity } from 'react-native';
import StockListScreen from '../screens/Stocks/StockListScreen';

const Tab = createBottomTabNavigator();

const AppNavigation = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerTitle: () => <LogoTitle />,
        headerTitleAlign: 'left',
        headerRight: () => (
          <TouchableOpacity style={{ marginRight: 15 }}>
            <Icon name="settings" size={28} color="#F5F5F5" />
          </TouchableOpacity>
        ),
        headerStyle: {
          backgroundColor: '#1E1E1E',
          borderBottomWidth: 0,
          elevation: 0,
          shadowOpacity: 0,
        },
        headerTintColor: '#F5F5F5',

        tabBarStyle: {
          backgroundColor: '#1E1E1E',
          borderTopWidth: 0,
          height: 70,
          paddingBottom: 10,
          paddingTop: 10,
        },
        tabBarActiveTintColor: '#81C784',
        tabBarInactiveTintColor: '#757575',

        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => (
            <Icon name="home" size={size} color={color} />
          ),
          tabBarButton: props => <TabButton {...props} />,
        }}
      />

      <Tab.Screen
        name="Stocks"
        component={StockListScreen}
        options={{
          tabBarLabel: 'Stocks',
          tabBarIcon: ({ color, size }) => (
            <AntIcon name="sound" size={size} color={color} />
          ),
          tabBarButton: props => <TabButton {...props} />,
        }}
      />
    </Tab.Navigator>
  );
};

export default AppNavigation;
