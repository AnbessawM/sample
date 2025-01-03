import { DarkTheme, DefaultTheme, ThemeProvider as NavigationThemeProvider } from '@react-navigation/native';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import { View, Platform, StatusBar as RNStatusBar } from 'react-native';

import { useColorScheme } from '@/hooks/useColorScheme';
import { AuthProvider } from '@/hooks/useAuth';
import AppNavigator from '@/app/navigation/AppNavigator';
import { CartProvider } from '@/hooks/useCart';
import { WishlistProvider } from '@/hooks/useWishlist';
import { useLoadFonts } from '@/hooks/useLoadFonts';
import { Provider as PaperProvider, MD3DarkTheme, MD3LightTheme } from 'react-native-paper';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const loaded = useLoadFonts();

  if (!loaded) {
    return null;
  }

  const paperTheme = colorScheme === 'dark' ? MD3DarkTheme : MD3LightTheme;
  const navigationTheme = colorScheme === 'dark' ? DarkTheme : DefaultTheme;

  return (
    <PaperProvider theme={paperTheme}>
      <AuthProvider>
        <NavigationThemeProvider value={navigationTheme}>
          <CartProvider>
            <WishlistProvider>
              <View style={{ flex: 1, paddingTop: Platform.OS === 'android' ? RNStatusBar.currentHeight : 0 }}>
                <AppNavigator />
              </View>
              <StatusBar style="auto" backgroundColor={paperTheme.colors.background} />
            </WishlistProvider>
          </CartProvider>
        </NavigationThemeProvider>
      </AuthProvider>
    </PaperProvider>
  );
}
