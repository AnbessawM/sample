import { useCart } from '@/hooks/useCart';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button, Snackbar, Surface, useTheme } from 'react-native-paper';
import { useOrderHistory } from '@/hooks/useOrderHistory';

const PaymentScreen: React.FC = () => {
  const router = useRouter();
  const { amount = '0' } = useLocalSearchParams();
  const parsedAmount = parseFloat(amount as string);
  const { cartItems, clearCart } = useCart();
  const { addOrder } = useOrderHistory();
  const [loading, setLoading] = useState(false);
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const { colors } = useTheme();

  const handleConfirmPayment = async () => {
    setLoading(true);
    // Simulate payment processing
    setTimeout(async () => {
      setLoading(false);
      setSnackbarVisible(true);

      // Store order details in local storage
      const order = {
        id: Date.now(),
        date: new Date().toISOString(),
        total: parsedAmount,
        items: cartItems,
      };
      addOrder(order);

      clearCart();
      setTimeout(() => {
        router.dismissAll();
        router.push('/');
      }, 1000);
    }, 2000);
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Surface style={styles.surface}>
        <Text style={[styles.title, { color: colors.onSurface }]}>Payment</Text>
        <Text style={[styles.amountText, { color: colors.onSurface }]}>Total Amount: ${parsedAmount.toFixed(2)}</Text>
        <Button onPress={handleConfirmPayment} mode="contained" loading={loading} disabled={loading} style={styles.button}>
          Confirm Payment
        </Button>
      </Surface>
      <Snackbar
        visible={snackbarVisible}
        onDismiss={() => setSnackbarVisible(false)}
        duration={3000}
      >
        Payment Successful!
      </Snackbar>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  surface: {
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
    borderRadius: 8,
    width: '100%',
    maxWidth: 400,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  amountText: {
    fontSize: 18,
    marginBottom: 16,
  },
  button: {
    marginTop: 16,
  },
});

export default PaymentScreen;