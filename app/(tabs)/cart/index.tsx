import React, { useEffect, useState } from 'react';
import { View, StyleSheet, FlatList, useWindowDimensions, Text } from 'react-native';
import { useCart } from '@/hooks/useCart';
import { Divider, useTheme, Button } from 'react-native-paper';
import { useRouter } from 'expo-router';
import ProductCard from '@/components/ProductCard';
import { useWishlist } from '@/hooks/useWishlist';
import { MaterialIcons } from '@expo/vector-icons';
import { blue } from 'react-native-reanimated/lib/typescript/Colors';

const CartScreen = () => {
  const { cartItems, removeFromCart, updateQuantity } = useCart();
  const router = useRouter();
  const { width } = useWindowDimensions();
  const { colors } = useTheme();
  const { addToWishlist, removeFromWishlist, wishlist } = useWishlist();
  const cardMargin = 10;
  const numColumns = width > 768 ? 4 : width > 480 ? 3 : 2;
  const cardWidth = (width - (numColumns + 1) * cardMargin) / numColumns;
  const cardHeight = cardWidth * 1.5;

  const totalAmount = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleCheckout = () => {
    router.push({ pathname: '/(tabs)/cart/PaymentScreen', params: { amount: totalAmount.toString() } });
  };

  const handleWishlistToggle = (item: any) => {
    wishlist.some((wishlistItem) => wishlistItem.id === item.id)
      ? removeFromWishlist(item.id)
      : addToWishlist(item);
  };

  const renderItem = ({ item }: { item: { id: number; name: string; price: number; quantity: number; image: string; title: string } }) => (
    <View
      style={{
        width: cardWidth,
        marginBottom: cardMargin,
        marginHorizontal: cardMargin / 2,
      }}
    >
      <ProductCard
        key={item.id}
        item={item}
        onRemove={() => removeFromCart(item.id)}
        onQuantityChange={(quantity) => updateQuantity(item.id, quantity)}
        onWishlistToggle={handleWishlistToggle}
        isInWishlist={wishlist.some((wishlistItem) => wishlistItem.id === item.id)}
        cardWidth={cardWidth}
        cardHeight={cardHeight}
        screen='cart'
      />
    </View>
  );

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <FlatList
        data={cartItems.map(item => ({ ...item, title: item.name }))}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ paddingHorizontal: cardMargin }}
        ItemSeparatorComponent={() => <Divider />}
        numColumns={numColumns}
        key={numColumns}
      />
      <View style={styles.footer}>
        <Text style={[styles.totalText, { color: colors.onSurface }]}>Total: ${totalAmount.toFixed(2)}</Text>
        <Button mode="contained" onPress={handleCheckout} style={styles.checkoutButton} contentStyle={styles.buttonContent}>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
          <MaterialIcons name="payment" size={24} color={colors.onPrimary} style={styles.icon} />
          <Text style={styles.checkoutText}>Checkout</Text></View>
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 8,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
  totalText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  checkoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    margin: 8,
  },
  checkoutText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default CartScreen;