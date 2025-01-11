import React, { useState, useEffect } from 'react';
import ProductCard from '@/components/ProductCard';
import { useCart } from '@/hooks/useCart';
import { useWishlist } from '@/hooks/useWishlist';
import { getProducts } from '@/services/api/productService';
import useScreenSize from '@/constants/ScreenSize';
import {
  ActivityIndicator,
  StyleSheet,
  FlatList,
  View,
  Text,
  useWindowDimensions,
} from 'react-native';
import { useTheme, TextInput } from 'react-native-paper';

const HomeScreen = () => {
  const { colors } = useTheme();
  const { cardMargin, numColumns, cardWidth, cardHeight } = useScreenSize();

  const [products, setProducts] = useState<Array<{ id: number; title: string; image: string; price: number }>>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [quantities, setQuantities] = useState<Record<number, number>>({});
  
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, wishlist } = useWishlist();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data: Array<{ id: number; title: string; image: string; price: number }> = await getProducts();
        setProducts(data);
      } catch (err) {
        setError((err as Error)?.message || 'Failed to fetch products.');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleQuantityChange = (productId: number, quantity: number) => {
    setQuantities((prev) => ({ ...prev, [productId]: quantity }));
  };

  const handleAddToCart = (item: any) => {
    const quantity = quantities[item.id] || 1;
    addToCart({ ...item, name: item.title, quantity });
  };

  const handleWishlistToggle = (item: any) => {
    wishlist.some((wishlistItem) => wishlistItem.id === item.id)
      ? removeFromWishlist(item.id)
      : addToWishlist(item);
  };

  if (loading) {
    return (
      <View style={[styles.centerContainer, { backgroundColor: colors.background }]}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  if (error) {
    return (
      <View style={[styles.centerContainer, { backgroundColor: colors.background }]}>
        <Text style={[styles.errorText, { color: colors.error }]}>
          {`Error: ${error}`}
        </Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <View style={styles.searchContainer}>
        <TextInput
          placeholder="Search products..."
          value={searchTerm}
          onChangeText={setSearchTerm}
          style={[
            styles.searchInput,
            { backgroundColor: colors.surface, color: colors.onSurface },
          ]}
          placeholderTextColor={colors.onSurface}
        />
      </View>
      <FlatList
        data={filteredProducts}
        keyExtractor={(item) => item.id.toString()}
        numColumns={numColumns}
        renderItem={({ item }) => (
          <View style={[styles.cardContainer, { width: cardWidth, margin: cardMargin / 2 }]}>
            <ProductCard
              item={item}
              onQuantityChange={handleQuantityChange}
              onButtonPress={handleAddToCart}
              onWishlistToggle={handleWishlistToggle}
              isInWishlist={wishlist.some((wishlistItem) => wishlistItem.id === item.id)}
              cardWidth={cardWidth}
              cardHeight={cardHeight}
              screen="home"
            />
          </View>
        )}
        contentContainerStyle={{ paddingHorizontal: cardMargin }}
        key={numColumns} // Forces re-render when numColumns changes
      />
    </View>
  );
};

const styles = StyleSheet.create({
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchContainer: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    backgroundColor: '#f8f9fa',
  },
  searchInput: {
    borderRadius: 25,
    height: 50,
    paddingHorizontal: 15,
    fontSize: 16,
  },
  cardContainer: {
    marginBottom: 10,
  },
  errorText: {
    fontSize: 16,
    textAlign: 'center',
  },
});

export default HomeScreen;
