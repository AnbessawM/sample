import ProductCard from '@/components/ProductCard';
import productService from '@/services/api/productService';
import { useTheme } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, SafeAreaView, StyleSheet, useWindowDimensions, Text } from 'react-native';

const App = () => {
  const { colors } = useTheme();
  
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

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null); // Add error state
  const { width } = useWindowDimensions();

  useEffect(() => {
    console.log('Component mounted'); 
    const fetchProducts = async () => {
      try {
        console.log('Fetching products...');
        const data = await productService.getProducts(); // Ensure this returns data.products
        console.log('Fetched products:', data);
        setProducts(data.products); // Update to access `products` array
      } catch (error) {
        console.error('Error fetching products:', error);
        setError('Failed to load products. Please try again later.');
      } finally {
        setLoading(false);
        console.log('Loading state set to false');
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    console.log('Products state updated:', products);
  }, [products]);

  useEffect(() => {
    console.log('Loading state updated:', loading);
  }, [loading]);

  const getNumColumns = () => {
    if (width < 768) return 2;
    if (width < 1024) return 3;
    return 4;
  };

  const numColumns = getNumColumns();

  if (loading) {
    console.log('Loading products...');
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
        <ActivityIndicator size="large" color={colors.primary} />
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
        <Text style={{ color: colors.text, textAlign: 'center', marginTop: 20 }}>
          {error}
        </Text>
      </SafeAreaView>
    );
  }

  console.log('Rendering product list');

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <FlatList
        data={products}
        renderItem={({ item }) => (
          <ProductCard product={item} />
        )}
        keyExtractor={(item) => item._id.toString()}
        numColumns={numColumns}
        columnWrapperStyle={styles.columnWrapper}
        key={numColumns}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 1,
  },
  columnWrapper: {
    justifyContent: 'space-around',
    marginBottom: 5,
  },
});

export default App;
