import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/Home/HomeScreen';
import ProfileScreen from '../screens/Profile/ProfileScreen';
import Icon from 'react-native-vector-icons/Feather';
import TabButton from '../components/common/TabButton';

const Tab = createBottomTabNavigator();

const AppNavigation = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#007AFF',
        tabBarInactiveTintColor: '#999',
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: (props) => (
            <TabButton  {...props}>
              <Icon name="home" size={props.size} color={props.color} />
            </TabButton>
          ),
        }}
      />

      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: (props) => (
            <TabButton {...props}>
              <Icon name="home" size={props.size} color={props.color} />
            </TabButton>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default AppNavigation;
