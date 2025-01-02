import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import axios from 'axios';
import React, { useState } from 'react';
import { Alert, Linking, StyleSheet, View } from 'react-native';
import { Button, Card, Text } from 'react-native-paper';
import PropTypes from 'prop-types';

type RootStackParamList = {
  Payment: { title: string; amount: number };
  OrderConfirmation: undefined;
};

type PaymentScreenRouteProp = RouteProp<RootStackParamList, 'Payment'>;

type PaymentScreenProps = {
  amount: number;
  handlePayment: () => void;
  loading: boolean;
};

const PaymentScreen: React.FC<PaymentScreenProps> = ({ amount = 0, handlePayment, loading }) => {
  return (
    <View style={styles.container}>
      <Card>
        <Card.Title title="Payment" />
        <Card.Content>
          <Text style={styles.amountText}>Total Amount: ${amount.toFixed(2)}</Text>
        </Card.Content>
        <Card.Actions>
          <Button onPress={handlePayment} mode="contained" loading={loading} disabled={loading} style={styles.button}>
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

export default PaymentScreen;

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    justifyContent: 'center', 
    padding: 16, 
    backgroundColor: '#f5f5f5' 
  },
  amountText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  button: {
    backgroundColor: '#6200ee',
    borderRadius: 4,
  },
});