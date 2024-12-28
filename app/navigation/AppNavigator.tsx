import React from 'react';
import AuthNavigator from '@/app/navigation/AuthNavigator';
import MainNavigator from '@/app/navigation/MainNavigator';
import { useAuth } from '@/hooks/useAuth';

const AppNavigator = () => {
  const { user } = useAuth();

  return user ? <MainNavigator /> : <AuthNavigator />;
};

export default AppNavigator;
