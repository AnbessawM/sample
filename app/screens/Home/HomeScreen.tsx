import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator, ScrollView, useWindowDimensions } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '@/types/navigation';
import { getProducts } from '@/app/services/api/productService';
import { Card, Title, Paragraph, Divider, Button, IconButton, TextInput } from 'react-native-paper';
import { useCart } from '@/hooks/useCart';
import { useWishlist } from '@/hooks/useWishlist';

const HomeScreen = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [products, setProducts] = useState<{ id: number; image: string; name: string; price: number; description: string }[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const { width } = useWindowDimensions();
  const { addToCart } = useCart();
  const { addToWishlist } = useWishlist();
  const [quantities, setQuantities] = useState<{ [key: number]: number }>({});

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

  const numColumns = width > 1200 ? 4 : width > 800 ? 3 : 2;

  const filteredProducts = products.filter((p) => {
    const productName = p?.name || '';
    return productName.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const handleQuantityChange = (productId: number, quantity: number) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [productId]: quantity,
    }));
  };

  const handleAddToCart = (item: { id: number; image: string; name: string; price: number; description: string }) => {
    const quantity = quantities[item.id] || 1;
    addToCart({ ...item, quantity });
  };

  const renderItem = ({ item }: { item: { id: number; image: string; name: string; price: number; description: string } }) => (
    <Card
      style={styles.productContainer}
      onPress={() => navigation.navigate('ProductDetail', { productId: item.id })}
    >
      <Card.Cover source={{ uri: item.image }} style={styles.productImage} />
      <Card.Content>
        <Title>{item.name}</Title>
        <Paragraph>${item.price.toFixed(2)}</Paragraph>
        <Paragraph>{item.description.slice(0, 50)}...</Paragraph>
        <View style={styles.quantityContainer}>
          <IconButton icon="minus" onPress={() => handleQuantityChange(item.id, Math.max(1, (quantities[item.id] || 1) - 1))} />
          <Text style={styles.quantityText}>{quantities[item.id] || 1}</Text>
          <IconButton icon="plus" onPress={() => handleQuantityChange(item.id, (quantities[item.id] || 1) + 1)} />
        </View>
        <Button mode="contained" onPress={() => handleAddToCart(item)}>
          Add to Cart
        </Button>
        <IconButton icon="heart" onPress={() => addToWishlist(item)} />
      </Card.Content>
    </Card>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007BFF" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Error: {error}</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Products</Text>
      <TextInput
        placeholder="Search products..."
        value={searchTerm}
        onChangeText={setSearchTerm}
        style={{ marginBottom: 16 }}
      />
      <Divider style={{ marginBottom: 16 }} />
      <FlatList
        data={filteredProducts}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.list}
        numColumns={numColumns}
        key={numColumns} // Change the key prop to force a fresh render
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
    backgroundColor: '#ffffff',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
    color: '#333',
  },
  list: {
    paddingBottom: 16,
  },
  productContainer: {
    margin: 8,
    borderRadius: 8,
    overflow: 'hidden',
    flex: 1,
  },
  productImage: {
    height: 150,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 18,
    color: 'red',
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
});

export default HomeScreen;
