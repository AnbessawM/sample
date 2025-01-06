import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { Card, Button, Surface, useTheme } from 'react-native-paper';
import { useRouter } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';

const OrderConfirmationScreen: React.FC = () => {
  const router = useRouter();
  const { colors } = useTheme();

  const handleBackToHome = () => {
    router.dismissAll();
    router.push('/');
  };

  return (
    <Surface style={[styles.container, { backgroundColor: colors.background }]}>
      <Card style={styles.card}>
        <Card.Title title="Order Confirmed" titleStyle={{ color: colors.onSurface }} />
        <Card.Content style={styles.content}>
          <MaterialIcons name="check-circle" size={64} color={colors.primary} />
          <Text style={[styles.message, { color: colors.onSurface }]}>Your order has been placed successfully!</Text>
        </Card.Content>
        <Card.Actions style={styles.actions}>
          <Button mode="contained" onPress={handleBackToHome}>
            Back to Home
          </Button>
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
  card: {
    width: '100%',
    maxWidth: 400,
  },
  content: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
  },
  message: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 16,
  },
  actions: {
    justifyContent: 'center',
  },
});

export default OrderConfirmationScreen;