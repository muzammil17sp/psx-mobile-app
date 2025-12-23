import AppNavigation from './AppNavigation';
import AuthNavigation from './AuthNavigation';

const RootNavigation = () => {
  const isLogin: boolean = true;
  return isLogin ? <AppNavigation/> : <AuthNavigation/>;
};

export default RootNavigation;
