import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { Card, Button, Surface, useTheme } from 'react-native-paper';
import { useRouter } from 'expo-router';

const OrderConfirmationScreen: React.FC = () => {
  const router = useRouter();
  const { colors } = useTheme();

  return (
    <Surface style={[styles.container, { backgroundColor: colors.background }]}>
      <Card>
        <Card.Title title="Order Confirmed" titleStyle={{ color: colors.onSurface }} />
        <Card.Content>
          <Text style={{ color: colors.onSurface }}>Your order has been placed successfully!</Text>
        </Card.Content>
        <Card.Actions>
          <Button onPress={() => router.push('./tabs/home')}>Back to Home</Button>
        </Card.Actions>
      </Card>
    </Surface>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
});

export default OrderConfirmationScreen;