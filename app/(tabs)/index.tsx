import React, { useState, useEffect } from 'react';
import ProductCard from '@/components/ProductCard';
import { useCart } from '@/hooks/useCart';
import { useWishlist } from '@/hooks/useWishlist';
import { getProducts } from '@/services/api/productService';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
  FlatList,
} from 'react-native';
import { useTheme, TextInput, Provider as PaperProvider } from 'react-native-paper';

const HomeScreen = () => {
  const { colors } = useTheme();
  const { width } = useWindowDimensions();
  const cardMargin = 10; // Margin between cards
  const numColumns = width > 768 ? 4 : width > 480 ? 3 : 2; // Responsive columns
  const cardWidth = (width - (numColumns + 1) * cardMargin) / numColumns;
  const cardHeight = cardWidth * 1.5;

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, wishlist } = useWishlist();
  const [quantities, setQuantities] = useState({});

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts();
        setProducts(data);
      } catch (err: any) {
        setError(err.message);
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
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [productId]: quantity,
    }));
  };

  const handleAddToCart = (item) => {
    const quantity = quantities[item.id] || 1;
    addToCart({ ...item, name: item.title, quantity });
  };

  const handleWishlistToggle = (item) => {
    if (wishlist.some((wishlistItem) => wishlistItem.id === item.id)) {
      removeFromWishlist(item.id);
    } else {
      addToWishlist(item);
    }
  };

  if (loading) {
    return (
      <View
        style={[styles.loadingContainer, { backgroundColor: colors.background }]}
      >
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  if (error) {
    return (
      <View
        style={[styles.errorContainer, { backgroundColor: colors.background }]}
      >
        <Text style={[styles.errorText, { color: colors.error }]}>
          Error: {error}
        </Text>
      </View>
    );
  }

  return (
    <PaperProvider>
      <View style={{ flex: 1, backgroundColor: colors.background }}>
        <View style={styles.searchContainer}>
          <TextInput
            placeholder="Search products..."
            placeholderTextColor={colors.disabled}
            value={searchTerm}
            onChangeText={setSearchTerm}
            style={[
              styles.searchInput,
              { backgroundColor: colors.surface, color: colors.onSurface },
            ]}
          />
        </View>
        <FlatList
          data={filteredProducts}
          renderItem={({ item }) => (
            <View
              style={{
                width: cardWidth,
                marginBottom: cardMargin,
                marginHorizontal: cardMargin / 2,
              }}
            >
              <ProductCard
                item={item}
                onQuantityChange={handleQuantityChange}
                onButtonPress={handleAddToCart}
                buttonTitle="Add to Cart"
                onWishlistToggle={handleWishlistToggle}
                isInWishlist={wishlist.some((wishlistItem) => wishlistItem.id === item.id)}
                cardWidth={cardWidth}
                cardHeight={cardHeight}
              />
            </View>
          )}
          keyExtractor={(item) => item.id.toString()}
          numColumns={numColumns}
          key={numColumns} // Forces a re-render when numColumns changes
          contentContainerStyle={{ paddingHorizontal: cardMargin }}
        />
      </View>
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    fontSize: 16,
    textAlign: 'center',
  },
  searchContainer: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    elevation: 4,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    backgroundColor: '#f8f9fa', // Slightly off-white for contrast
  },
  searchInput: {
    borderRadius: 25,
    height: 50,
    paddingHorizontal: 15,
    fontSize: 16,
  },
});

export default HomeScreen;