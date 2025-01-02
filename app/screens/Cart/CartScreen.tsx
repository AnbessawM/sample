import React from 'react';
import { View, StyleSheet, FlatList, useWindowDimensions } from 'react-native';
import { useCart } from '@/hooks/useCart';
import { Card, Title, Paragraph, Button, IconButton, Text, Divider } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

type RootStackParamList = {
  Cart: undefined;
  Payment: { title: string; amount: number };
};

const CartScreen = () => {
  const { cartItems, removeFromCart, updateQuantity } = useCart();
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const { width } = useWindowDimensions();

  const handleCheckout = () => {
    const totalAmount = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    navigation.navigate('Payment', { title: 'Order Payment', amount: totalAmount });
  };

  const numColumns = width > 1200 ? 4 : width > 800 ? 3 : 2;

  const renderItem = ({ item }: { item: { id: number; name: string; price: number; quantity: number; image: string } }) => (
    <Card style={styles.card}>
      <Card.Cover source={{ uri: item.image }} style={styles.image} />
      <Card.Content>
        <Title>{item.name}</Title>
        <Paragraph>${item.price.toFixed(2)}</Paragraph>
        <View style={styles.quantityContainer}>
          <IconButton icon="minus" onPress={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))} />
          <Text style={styles.quantityText}>{item.quantity}</Text>
          <IconButton icon="plus" onPress={() => updateQuantity(item.id, item.quantity + 1)} />
        </View>
        <Button mode="text" onPress={() => removeFromCart(item.id)} color="#FF0000">
          Remove
        </Button>
      </Card.Content>
    </Card>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={cartItems}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.list}
        ItemSeparatorComponent={() => <Divider />}
        numColumns={numColumns}
        key={numColumns} // Change the key prop to force a fresh render
      />
      <Button mode="contained" onPress={handleCheckout} style={styles.checkoutButton}>
        Proceed to Checkout
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#ffffff',
  },
  list: {
    paddingBottom: 16,
  },
  card: {
    margin: 8,
    borderRadius: 8,
    overflow: 'hidden',
    flex: 1,
    boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)', // Added boxShadow
  },
  image: {
    height: 150,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 16,
  },
  quantityText: {
    fontSize: 18,
    marginHorizontal: 8,
  },
  checkoutButton: {
    marginTop: 16,
    backgroundColor: '#007BFF',
  },
});

export default CartScreen;