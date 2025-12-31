import { useMutation } from '@tanstack/react-query';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { register } from '../api/auth.api';
import { useAuth } from '../context/AuthContext';

type RegisterPayload = {
  email: string;
  password: string;
};

export const useRegister = () => {
      const auth = useAuth();
  
  return useMutation({
    mutationFn: (payload: RegisterPayload) => register(payload),

    onSuccess: async ({ data }) => {
      AsyncStorage.setItem("token", data.token);
      AsyncStorage.setItem("user", data.user.email);
      auth.login()
    },
  });
};
