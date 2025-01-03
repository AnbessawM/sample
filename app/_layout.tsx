import React, { useEffect } from 'react';
import { SplashScreen, Slot, useRouter } from 'expo-router';
import { useColorScheme } from 'react-native';
import { Provider as PaperProvider, MD3DarkTheme, MD3LightTheme } from 'react-native-paper';
import { useLoadFonts } from '@/hooks/useLoadFonts';
import { AuthProvider } from '@/hooks/useAuth';
import { CartProvider } from '@/hooks/useCart';
import { WishlistProvider } from '@/hooks/useWishlist';

SplashScreen.preventAutoHideAsync();

const RootLayoutContent = () => {
  const colorScheme = useColorScheme();
  const loaded = useLoadFonts();
  const router = useRouter();

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
      router.replace('/(tabs)/(home)');
    }
  }, [loaded]);

  if (!loaded) {
    return null; // or a loading spinner
  }

  const theme = colorScheme === 'dark' ? MD3DarkTheme : MD3LightTheme;

  return (
    <PaperProvider theme={theme}>
      <Slot />
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