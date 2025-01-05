import React, { useEffect, useState } from 'react';
import { View, StyleSheet, FlatList, useWindowDimensions } from 'react-native';
import { useCart } from '@/hooks/useCart';
import { Divider, useTheme, Button } from 'react-native-paper';
import { useRouter } from 'expo-router';
import ProductCard from '@/components/ProductCard';

const CartScreen = () => {
  const { cartItems, removeFromCart, updateQuantity } = useCart();
  const router = useRouter();
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
    router.push({ pathname: './tabs/cart/PaymentScreen', params: { title: 'Order Payment', amount: totalAmount } });
  };

  const handleImagePress = (productId: number) => {
    router.push(`/ProductDetailScreen?id=${productId}`);
  };

  const renderItem = ({ item }: { item: { id: number; name: string; price: number; quantity: number; image: string; title: string } }) => (
    <ProductCard
      key={item.id}
      item={item}
      onRemove={() => removeFromCart(item.id)}
      onQuantityChange={(quantity) => updateQuantity(item.id, quantity)}
      onImagePress={handleImagePress}
    />
  );

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <FlatList
        data={cartItems.map(item => ({ ...item, title: item.name }))}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.list}
        ItemSeparatorComponent={() => <Divider />}
        numColumns={numColumns}
        key={numColumns}
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
    padding: 8,
  },
  list: {
    paddingBottom: 16,
  },
  checkoutButton: {
    marginTop: 16,
    backgroundColor: '#007BFF',
  },
});

export default CartScreen;