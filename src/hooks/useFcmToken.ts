import { useEffect, useState, useRef } from 'react';
import messaging from '@react-native-firebase/messaging';
import { useAuth } from '../context/AuthContext';
import { useFcmTokenUpdate } from './useFcmTokenUpdate';

export const useFcmToken = () => {
  const [fcmToken, setFcmToken] = useState<string | null>(null);
  const [hasPermission, setHasPermission] = useState<boolean>(false);
  const { isLogin } = useAuth();
  const updateFcmTokenMutation = useFcmTokenUpdate();
  const lastSentTokenRef = useRef<string | null>(null);

  const sendTokenToBackend = (token: string) => {
    if (isLogin && token && lastSentTokenRef.current !== token) {
      lastSentTokenRef.current = token;
      updateFcmTokenMutation.mutate(token);
    }
  };

  useEffect(() => {
    const requestPermissionAndToken = async () => {
      try {
        const authStatus = await messaging().requestPermission();
        const enabled =
          authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
          authStatus === messaging.AuthorizationStatus.PROVISIONAL;

        setHasPermission(enabled);
        if (!enabled) return;

        await messaging().registerDeviceForRemoteMessages();

        const token = await messaging().getToken();
        setFcmToken(token);
        console.log("FCM Token:", token);

        sendTokenToBackend(token);

        const unsubscribe = messaging().onTokenRefresh(async (newToken) => {
          console.log("FCM Token refreshed:", newToken);
          setFcmToken(newToken);
          sendTokenToBackend(newToken);
        });

        return unsubscribe;
      } catch (err) {
        console.log('FCM permission/token error:', err);
      }
    };

    requestPermissionAndToken();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    if (isLogin && fcmToken) {
      sendTokenToBackend(fcmToken);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLogin, fcmToken]);

  return { fcmToken, hasPermission };
};
