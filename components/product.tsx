import ProductCard from '@/components/ProductCard';
import productService from '@/services/api/productService';
import { useTheme } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, SafeAreaView, StyleSheet, Text, useWindowDimensions } from 'react-native';

// Define Product interface
interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  color: string[];
  size: string[];
  brand: string;
  images: string[];
  countInStock: number;
  rating: number;
  numReviews: number;
  material: string;
  discount: number;
  featured: boolean;
}

const App = () => {
  const { colors } = useTheme();
  const { width } = useWindowDimensions();

  // State hooks
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch products on component mount
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await productService.getProducts();
        setProducts(data.products);
      } catch (error) {
        setError('Failed to load products. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Determine number of columns based on screen width
  const getNumColumns = () => {
    if (width < 768) return 2;
    if (width < 1024) return 3;
    return 4;
  };

  const numColumns = getNumColumns();

  // Render loading state
  if (loading) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
        <ActivityIndicator size="large" color={colors.primary} />
      </SafeAreaView>
    );
  }

  // Render error state
  if (error) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
        <Text style={{ color: colors.text, textAlign: 'center', marginTop: 20 }}>
          {error}
        </Text>
      </SafeAreaView>
    );
  }

  // Render product list
  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <FlatList
        data={products}
        renderItem={({ item }) => (
          <ProductCard product={item} onPress={() => console.log('Product pressed:', item._id)} />
        )}
        keyExtractor={(item) => item._id.toString()}
        numColumns={numColumns}
        columnWrapperStyle={styles.columnWrapper}
        key={numColumns}
      />
    </SafeAreaView>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 15,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  columnWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',

  },
});

export default App;
