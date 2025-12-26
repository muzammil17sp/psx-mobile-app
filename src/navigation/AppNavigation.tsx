/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-native/no-inline-styles */
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/Home/HomeScreen';
import Icon from 'react-native-vector-icons/Feather';
import TabButton from '../components/common/TabButton';
import LogoTitle from '../components/ui/logo';
import { TouchableOpacity } from 'react-native';
import StockListScreen from '../screens/Stocks/StockListScreen';
import StockSvg from '../components/ui/svg/StockSvg';
import WishlistScreen from '../screens/Wishlist/WishlistScreen';
import PortfolioScreen from '../screens/Portfolio/PortfolioScreen';
import PortfolioSvg from '../components/ui/svg/PortfolioSvg';

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
          name="Portfolio"
          component={PortfolioScreen}
          options={{
            tabBarLabel: 'Portfolio',
            tabBarIcon: ({ color, size }) => (
              <Icon name='shopping-bag' size={size}  color={color} />
            ),
            tabBarButton: props => <TabButton {...props} />,
          }}
        />
      <Tab.Screen
        name="Wishlist"
        component={WishlistScreen}
        options={{
          tabBarLabel: 'Wishlist',
          tabBarIcon: ({ color, size }) => (
            <Icon name="heart" size={size} color={color} />
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
            <StockSvg height={size} width={size} fill={color} />
          ),
          tabBarButton: props => <TabButton {...props} />,
        }}
      />
    </Tab.Navigator>
  );
};

export default AppNavigation;
