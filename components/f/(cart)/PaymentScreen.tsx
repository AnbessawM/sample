import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Card, Button } from 'react-native-paper';
import { useRouter } from 'expo-router';
import PropTypes from 'prop-types';

interface PaymentScreenProps {
  amount: number;
  handlePayment: () => void;
  loading: boolean;
}

const PaymentScreen: React.FC<PaymentScreenProps> = ({ amount, handlePayment, loading }) => {
  const router = useRouter();

  const handleConfirmPayment = () => {
    handlePayment();
    router.push('./tabs/cart/OrderConfirmationScreen');
  };

  return (
    <View style={styles.container}>
      <Card>
        <Card.Title title="Payment" />
        <Card.Content>
          <Text style={styles.amountText}>Total Amount: ${amount.toFixed(2)}</Text>
        </Card.Content>
        <Card.Actions>
          <Button onPress={handleConfirmPayment} mode="contained" loading={loading} disabled={loading} style={styles.button}>
            Confirm Payment
          </Button>
        </Card.Actions>
      </Card>
    </View>
  );
};

PaymentScreen.propTypes = {
  amount: PropTypes.number.isRequired,
  handlePayment: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
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