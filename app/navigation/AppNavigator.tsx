import React from 'react';
import AuthNavigator from '@/app/navigation/AuthNavigator';
import MainNavigator from '@/app/navigation/MainNavigator';
import { useAuth } from '@/hooks/useAuth';
import { Provider as PaperProvider } from 'react-native-paper';
import { CartProvider } from '@/hooks/useCart';

const AppNavigator = () => {
  const { user } = useAuth();

  return (
    <PaperProvider>
      <CartProvider>
        {user ? <MainNavigator /> : <AuthNavigator />}
      </CartProvider>
    </PaperProvider>
  );
};

export default AppNavigator;
