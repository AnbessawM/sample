import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';
import { AuthProvider } from '@/hooks/useAuth';
import { CartProvider } from '@/hooks/useCart';
import { WishlistProvider } from '@/hooks/useWishlist';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (loaded && !error) {
      SplashScreen.hideAsync().then(() => setIsReady(true));
    } else if (error) {
      console.error('Error loading fonts', error);
    }
  }, [loaded, error]);

  if (!isReady) {
    return null;
  }

  return (
    <AuthProvider>
      <CartProvider>
        <WishlistProvider>
          <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
            <Stack>
              <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
              <Stack.Screen name="onboarding" />
              <Stack.Screen name="auth/LoginScreen" options={{headerShown: false}} />
              <Stack.Screen name="auth/RegisterScreen" options={{headerShown: false}} />
              <Stack.Screen name="auth/ForgotPasswordScreen" options={{headerShown: false}} />
              <Stack.Screen name="not-found" />
            </Stack>
            <StatusBar style="auto" />
          </ThemeProvider>
        </WishlistProvider>
      </CartProvider>
    </AuthProvider>
  );
}