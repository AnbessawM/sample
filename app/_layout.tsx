import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';
import { AuthProvider } from '@/hooks/useAuth';
import AppNavigator from '@/app/navigation/AppNavigator';
import { CartProvider } from '@/hooks/useCart';
import { WishlistProvider } from '@/hooks/useWishlist';
import { useLoadFonts } from '@/hooks/useLoadFonts';
import { Provider as PaperProvider } from 'react-native-paper';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const loaded = useLoadFonts();

  if (!loaded) {
    return null;
  }

  return (
    <PaperProvider>
      <AuthProvider>
        <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
          <CartProvider>
            <WishlistProvider>
              <AppNavigator />
            </WishlistProvider>
          </CartProvider>
          <StatusBar style="auto" />
        </ThemeProvider>
      </AuthProvider>
    </PaperProvider>
  );
}
