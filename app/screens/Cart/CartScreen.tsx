import React, { useEffect, useState } from 'react';
import { View, StyleSheet, FlatList, useWindowDimensions } from 'react-native';
import { useCart } from '@/hooks/useCart';
import { Card, Title, Paragraph, Button, IconButton, Text, Divider, useTheme } from 'react-native-paper';
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
  const { colors } = useTheme();
  const [numColumns, setNumColumns] = useState(width > 1200 ? 4 : width > 800 ? 3 : 2);

  useEffect(() => {
    const handleOrientationChange = () => {
      setNumColumns(width > 1200 ? 4 : width > 800 ? 3 : 2);
    };

    handleOrientationChange();
  }, [width]);

  const handleCheckout = () => {
    const totalAmount = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    navigation.navigate('Payment', { title: 'Order Payment', amount: totalAmount });
  };

  const renderItem = ({ item }: { item: { id: number; name: string; price: number; quantity: number; image: string } }) => (
    <Card style={[styles.card, { backgroundColor: colors.surface }]}>
      <Card.Cover source={{ uri: item.image }} style={styles.image} />
      <Card.Content>
        <Title style={{ color: colors.onSurface }}>{item.name}</Title>
        <Paragraph style={{ color: colors.onSurface }}>${item.price.toFixed(2)}</Paragraph>
        <View style={styles.quantityContainer}>
          <IconButton icon="minus" onPress={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))} />
          <Text style={[styles.quantityText, { color: colors.onSurface }]}>{item.quantity}</Text>
          <IconButton icon="plus" onPress={() => updateQuantity(item.id, item.quantity + 1)} />
        </View>
        <Button mode="text" onPress={() => removeFromCart(item.id)} color="#FF0000">
          Remove
        </Button>
      </Card.Content>
    </Card>
  );

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <FlatList
        data={cartItems}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.list}
        ItemSeparatorComponent={() => <Divider />}
        numColumns={numColumns}
        key={numColumns} // Change the key prop to force a fresh render
      />
      <Button mode="contained" onPress={handleCheckout} style={[styles.checkoutButton, { backgroundColor: colors.primary }]}>
        Proceed to Checkout
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  list: {
    paddingBottom: 16,
  },
  card: {
    margin: 8,
    borderRadius: 8,
    overflow: 'hidden',
    flex: 1,
    boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)', // Replaced shadow* with boxShadow
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