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
import { PaperProvider } from 'react-native-paper';
import { OrderHistoryProvider } from '@/hooks/useOrderHistory';

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <PaperProvider>
    <AuthProvider>
      <CartProvider>
        <WishlistProvider>
          <OrderHistoryProvider>
            <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
              <Stack>
                <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                <Stack.Screen name="shared/onboarding" />
                <Stack.Screen name="shared/ProductDetailScreen" options={{ headerShown: false }} />
                <Stack.Screen name="auth/LoginScreen" options={{headerShown: false}} />
                <Stack.Screen name="auth/RegisterScreen" options={{headerShown: false}} />
                <Stack.Screen name="auth/ForgotPasswordScreen" options={{headerShown: false}} />
                <Stack.Screen name="+not-found" />
              </Stack>
              <StatusBar style="auto" />
            </ThemeProvider>
          </OrderHistoryProvider>
        </WishlistProvider>
      </CartProvider>
    </AuthProvider>
    </PaperProvider>
  );
}