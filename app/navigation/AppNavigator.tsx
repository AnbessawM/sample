import React, { useState, useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import AuthNavigator from '@/app/navigation/AuthNavigator';
import MainNavigator from '@/app/navigation/MainNavigator';
import OnboardingScreen from '@/app/screens/Onboarding/OnboardingScreen';
import { useAuth } from '@/hooks/useAuth';
import { CartProvider } from '@/hooks/useCart';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoginScreen from '@/app/screens/Auth/LoginScreen'; // Adjust the import path as necessary

const Stack = createStackNavigator();

const AppNavigator = () => {
  const { user, isFirstTimeUser, setIsFirstTimeUser } = useAuth();

  useEffect(() => {
    const checkFirstTimeUser = async () => {
      const firstTime = await AsyncStorage.getItem('isFirstTimeUser');
      if (firstTime === null) {
        setIsFirstTimeUser(true);
        await AsyncStorage.setItem('isFirstTimeUser', 'false');
      } else {
        setIsFirstTimeUser(false);
      }
    };

    checkFirstTimeUser();
  }, []);

  return (
    <CartProvider>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {isFirstTimeUser ? (
          <Stack.Screen name="Onboarding" component={OnboardingScreen} />
        ) : user ? (
          <Stack.Screen name="Onboarding" component={OnboardingScreen} />
        ) : (
          <>
            <Stack.Screen name="Auth" component={AuthNavigator} />
          </>
        )}
      </Stack.Navigator>
    </CartProvider>
  );
};

export default AppNavigator;