import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import { useTheme } from 'react-native-paper';
import { useRouter } from 'expo-router';

const CheckoutScreen = () => {
  const { colors } = useTheme();
  const router = useRouter();

  const handleConfirmOrder = () => {
    router.push('/(tabs)/cart/PaymentScreen');
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={{ color: colors.primary }}>Checkout Screen</Text>
      <Button
        mode="contained"
        onPress={handleConfirmOrder}
        style={styles.button}
      >
        Confirm Order
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    marginTop: 16,
  },
});

export default CheckoutScreen;