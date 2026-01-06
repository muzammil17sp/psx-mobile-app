import React, { useEffect } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Platform, PermissionsAndroid } from 'react-native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import RootNavigation from './src/navigation/RootNavigation';
import { NavigationContainer } from '@react-navigation/native';
import { AuthProvider } from './src/context/AuthContext';
import RNBootSplash from 'react-native-bootsplash';
import { useFcmToken } from './src/hooks/useFcmToken';
import messaging from '@react-native-firebase/messaging';
import notifee, { AndroidImportance } from '@notifee/react-native';

const AppContent = () => {
  useFcmToken();

  useEffect(() => {
    const requestPermission = async () => {
      if (Platform.OS === 'android' && Platform.Version >= 33) {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS
        );
        console.log('Notification permission:', granted);
      }
    };
    requestPermission();

    RNBootSplash.hide({ fade: true });

    notifee.createChannel({
      id: 'default',
      name: 'Default Channel',
      importance: AndroidImportance.HIGH,
    });

    const unsubscribeForeground = messaging().onMessage(async remoteMessage => {
      console.log('FCM Foreground Message:', remoteMessage);

      try {
        await notifee.displayNotification({
          title: remoteMessage.notification?.title ?? 'Notification',
          body: remoteMessage.notification?.body ?? '',
          android: {
            channelId: 'default',
            smallIcon: 'ic_launcher', 
            importance: AndroidImportance.HIGH,
          },
          data: remoteMessage.data,
        });
      } catch (err) {
        console.log('Error displaying foreground notification:', err);
      }
    });

    return () => {
      unsubscribeForeground();
    };
  }, []);

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <RootNavigation />
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default function App() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: 2,
        staleTime: 1000 * 60,
      },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </QueryClientProvider>
  );
}
