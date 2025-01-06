import React from 'react';
import { Stack } from 'expo-router';

const CartLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="PaymentScreen" options={{ headerShown: false }} />
      <Stack.Screen name="OrderConfirmationScreen" options={{ headerShown: false }} />
    </Stack>
  );
};

export default CartLayout;
