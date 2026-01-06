import { useMutation } from '@tanstack/react-query';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { register } from '../api/auth.api';
import { useAuth } from '../context/AuthContext';
import messaging from '@react-native-firebase/messaging';

type RegisterPayload = {
  email: string;
  password: string;
  fcmToken?: string;
};

export const useRegister = () => {
  const auth = useAuth();
  
  return useMutation({
    mutationFn: async (payload: RegisterPayload) => {
      try {
        const fcmToken = await messaging().getToken();
        return register({ ...payload, fcmToken });
      } catch (error) {
        console.log('FCM token not available during registration:', error);
        return register(payload);
      }
    },

    onSuccess: async ({ data }) => {
      AsyncStorage.setItem("token", data.token);
      AsyncStorage.setItem("user", data.user.email);
      auth.login()
    },
  });
};
