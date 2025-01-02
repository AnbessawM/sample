import React, { useState, useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import AuthNavigator from '@/app/navigation/AuthNavigator';
import MainNavigator from '@/app/navigation/MainNavigator';
import SplashScreen from '@/app/screens/SplashScreen';
import { useAuth } from '@/hooks/useAuth';
import { CartProvider } from '@/hooks/useCart';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createStackNavigator();

const AppNavigator = () => {
  const { user, isFirstTimeUser, setIsFirstTimeUser } = useAuth();
  const [isInitializing, setIsInitializing] = useState(true);

  useEffect(() => {
    const checkFirstLaunch = async () => {
      try {
        const hasLaunched = await AsyncStorage.getItem('hasLaunched');
        if (hasLaunched === null) {
          await AsyncStorage.setItem('hasLaunched', 'true');
          setIsFirstTimeUser(true);
        } else {
          setIsFirstTimeUser(false);
        }
      } catch (error) {
        console.error('Error checking first launch:', error);
      }
      setIsInitializing(false);
    };

    checkFirstLaunch();
  }, []);

  if (isInitializing) {
    return <SplashScreen />;
  }

  return (
    <CartProvider>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {user ? (
          <Stack.Screen name="Main" component={MainNavigator} />
        ) : (
          <Stack.Screen name="Auth" component={AuthNavigator} />
        )}
      </Stack.Navigator>
    </CartProvider>
  );
};

export default AppNavigator;
