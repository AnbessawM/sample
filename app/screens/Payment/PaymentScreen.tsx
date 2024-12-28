import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Button, Card } from 'react-native-paper';
import Stripe from 'stripe';
import { useCart } from '@/hooks/useCart';
import { useNavigation } from '@react-navigation/native';

const PaymentScreen = () => {
  const { cartItems } = useCart();
  const navigation = useNavigation();

  const handlePayment = async () => {
    // Implement Stripe payment integration here
    // Example: Create a payment intent on the server and confirm payment
    try {
      // Assume createPaymentIntent is an API call to your backend
      const response = await createPaymentIntent(cartItems);
      // Handle payment confirmation
      navigation.navigate('OrderConfirmation');
    } catch (error) {
      console.error('Payment failed:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Card>
        <Card.Title title="Payment" />
        <Card.Content>
          <Text>Total Amount: ${cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2)}</Text>
          {/* Add Stripe payment form components here */}
        </Card.Content>
        <Card.Actions>
          <Button onPress={handlePayment} mode="contained">
            Confirm Payment
          </Button>
        </Card.Actions>
      </Card>
    </View>
  );
};

export default PaymentScreen;

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 16 },
});