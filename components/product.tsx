import React, { useEffect, useState } from 'react';
import { StyleSheet, SafeAreaView, FlatList, useWindowDimensions } from 'react-native';
import ProductCard from '@/components/ProductCards';
import productService from '@/services/api/productService';

const App = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { width } = useWindowDimensions();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await productService.getProducts();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const getNumColumns = () => {
    if (width < 768) return 2;
    if (width < 1024) return 3;
    return 4;
  };

  const numColumns = getNumColumns();

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        {/* Add a loading indicator here */}
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={products}
        renderItem={({ item }) => (
          <ProductCard product={{ ...item, discount: '40% OFF', colors: ['black', '#439ECF', '#F9F2E7', '#C6C6C6'] }} />
        )}
        keyExtractor={(item) => item.id.toString()}
        numColumns={numColumns}
        columnWrapperStyle={styles.columnWrapper}
        key={numColumns} // Add key prop to force re-render when numColumns changes
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    padding: 1,
  },
  columnWrapper: {
    justifyContent: 'space-around',
    marginBottom: 5,
  },
});

export default App;