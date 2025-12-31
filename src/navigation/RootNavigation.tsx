import { useAuth } from '../context/AuthContext';
import AppNavigation from './AppNavigation';
import AuthNavigation from './AuthNavigation';

const RootNavigation = () => {
  const { isLogin }: {isLogin: boolean} = useAuth();
  return isLogin ? <AppNavigation /> : <AuthNavigation />;
};

export default RootNavigation;
