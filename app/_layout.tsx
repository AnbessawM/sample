import React, { useEffect, useState } from 'react';
import { SplashScreen, Slot } from 'expo-router';
import { useColorScheme } from 'react-native';
import { AuthProvider, useAuth } from '@/hooks/useAuth';
import { CartProvider } from '@/hooks/useCart';
import { WishlistProvider } from '@/hooks/useWishlist';
import { useLoadFonts } from '@/hooks/useLoadFonts';
import { Provider as PaperProvider, MD3DarkTheme, MD3LightTheme } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import OnboardingScreen from '@/app/(onboarding)/index';
import LoginScreen from '@/app/(auth)/LoginScreen';

SplashScreen.preventAutoHideAsync();

const RootLayoutContent = () => {
  const colorScheme = useColorScheme();
  const loaded = useLoadFonts();
  const { user, isFirstTimeUser, setIsFirstTimeUser } = useAuth();
  const [isFirstTime, setIsFirstTime] = useState<boolean | null>(null);

  useEffect(() => {
    const checkFirstTimeUser = async () => {
      const firstTime = await AsyncStorage.getItem('isFirstTimeUser');
      if (firstTime === null) {
        setIsFirstTimeUser(true);
        await AsyncStorage.setItem('isFirstTimeUser', 'false');
      } else {
        setIsFirstTimeUser(false);
      }
      setIsFirstTime(firstTime === null);
    };

    checkFirstTimeUser();
  }, []);

  // useEffect(() => {
  //   if (loaded) {
  //     SplashScreen.hideAsync();
  //   }
  // }, [loaded]);

  // if (!loaded || isFirstTime === null) {
  //   return null; // or a loading spinner
  // }

  const theme = colorScheme === 'dark' ? MD3DarkTheme : MD3LightTheme;

  return (
    <PaperProvider theme={theme}>
      {isFirstTimeUser ? (
        <OnboardingScreen />
      ) : user ? (
        <Slot />
      ) : (
        <LoginScreen />
      )}
    </PaperProvider>
  );
};

const RootLayout = () => (
  <AuthProvider>
    <CartProvider>
      <WishlistProvider>
        <RootLayoutContent />
      </WishlistProvider>
    </CartProvider>
  </AuthProvider>
);

export default RootLayout;