
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Button, Card, Surface } from 'react-native-paper';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '@/types/navigation'; // Adjust the import path as necessary

  const OrderConfirmationScreen: React.FC = () => {
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  return (
    <Surface style={styles.container}>
      <Card>
        <Card.Title title="Order Confirmed" />
        <Card.Content>
          <Text>Your order has been placed successfully!</Text>
        </Card.Content>
        <Card.Actions>
          <Button onPress={() => navigation.navigate('Home')}>Back to Home</Button>
        </Card.Actions>
      </Card>
    </Surface>
  );
};

export default OrderConfirmationScreen;

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 16, backgroundColor: '#ffffff' },
});