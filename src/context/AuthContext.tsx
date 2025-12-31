// auth/AuthContext.tsx
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import { jwtDecode, JwtPayload } from 'jwt-decode';

const AuthContext = createContext(null);

let globalLogout: () => void;


export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isLogin, setIsLogin] = useState(false);

  const isTokenExpired = (token: string) => {
    const { exp } = jwtDecode<JwtPayload>(token);
    return Date.now() >= exp * 1000;
  };


  const logout = async () => {
    await AsyncStorage.removeItem('token');
    await AsyncStorage.removeItem('user');
    setIsLogin(false);
  };

  globalLogout = logout;

  useEffect(() => {
    const checkUser = async () => {
      const token = await AsyncStorage.getItem('token');
      if (token && isTokenExpired(token)) {
       logout()
      } else if (token && !isTokenExpired(token)) {
        setIsLogin(true);
      }
    };
    checkUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isLogin,
        login: () => setIsLogin(true),
        logout: () => setIsLogin(false),
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

export const triggerLogout = () => {
  if (globalLogout) globalLogout();
};
