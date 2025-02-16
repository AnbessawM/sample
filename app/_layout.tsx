import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native';
import 'react-native-reanimated';

import { AuthProvider } from '@/hooks/useAuth';
import { CartProvider } from '@/hooks/useCart';
import { useColorScheme } from '@/hooks/useColorScheme';
import { OrderHistoryProvider } from '@/hooks/useOrderHistory';
import { WishlistProvider } from '@/hooks/useWishlist';
import { PaperProvider } from 'react-native-paper';

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <PaperProvider>
      <AuthProvider>
        <CartProvider>
          <WishlistProvider>
            <OrderHistoryProvider>
              <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
                <SafeAreaView style={{ flex: 1 }}>
                  <Stack>
                    <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                    <Stack.Screen name="(shared)" options={{ headerShown: false }} />
                    <Stack.Screen name="(auth)" options={{ headerShown: false }} />
                    <Stack.Screen name="+not-found" options={{ headerShown: false }} />
                  </Stack>
                  <StatusBar style="auto" />
                </SafeAreaView>
              </ThemeProvider>
            </OrderHistoryProvider>
          </WishlistProvider>
        </CartProvider>
      </AuthProvider>
    </PaperProvider>
  );
}