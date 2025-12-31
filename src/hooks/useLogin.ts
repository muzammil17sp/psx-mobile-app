import { useMutation } from '@tanstack/react-query';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { login } from '../api/auth.api';
import { useAuth } from '../context/AuthContext';

type LoginPayload = {
  email: string;
  password: string;
};

export const useLogin = () => {
    const auth = useAuth();
    
  return useMutation({
    mutationFn: (payload: LoginPayload) => login(payload),

    onSuccess: async ({ data }) => {
      AsyncStorage.setItem("token", data.token);
      AsyncStorage.setItem("user", data.user.email);
      auth.login()
    },
  });
};
