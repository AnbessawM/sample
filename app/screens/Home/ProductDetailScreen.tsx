import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, ScrollView } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '@/types/navigation';
import { getProductById } from '@/app/services/api/productService';
import { Card, Title, Paragraph, Button, List, TextInput, IconButton } from 'react-native-paper';
import { useCart } from '@/hooks/useCart';
import { useWishlist } from '@/hooks/useWishlist';

type ProductDetailScreenRouteProp = RouteProp<RootStackParamList, 'ProductDetail'>;

const ProductDetailScreen = () => {
  const route = useRoute<ProductDetailScreenRouteProp>();
  const { productId } = route.params;
  interface Product {
    id: number;
    image: string;
    name: string;
    price: number;
    description: string;
    quantity: number;
  }

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addToCart } = useCart();
  const { addToWishlist } = useWishlist();
  const [reviews, setReviews] = useState<string[]>([]);
  const [newReview, setNewReview] = useState('');
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await getProductById(productId);
        setProduct({
          id: data.id,
          image: data.image,
          name: data.name,
          price: data.price,
          description: data.description,
          quantity: 1,
        });
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  const handleAddToCart = () => {
    if (product) {
      addToCart({ ...product, quantity });
    }
  };

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
      {product && (
        <Card style={styles.card}>
          <Card.Cover source={{ uri: product.image }} style={styles.image} />
          <Card.Content>
            <Title style={styles.title}>{product.name}</Title>
            <Paragraph style={styles.price}>${product.price.toFixed(2)}</Paragraph>
            <Paragraph style={styles.description}>{product.description}</Paragraph>
            <View style={styles.quantityContainer}>
              <IconButton icon="minus" onPress={() => setQuantity(Math.max(1, quantity - 1))} />
              <Text style={styles.quantityText}>{quantity}</Text>
              <IconButton icon="plus" onPress={() => setQuantity(quantity + 1)} />
            </View>
            <Button mode="contained" onPress={handleAddToCart}>
              Add to Cart
            </Button>
            <IconButton icon="heart" onPress={() => addToWishlist(product)} />
            <List.Section>
              {reviews.map((r, i) => (
                <List.Item key={i} title={r} />
              ))}
            </List.Section>
            <TextInput
              label="Add a review..."
              value={newReview}
              onChangeText={setNewReview}
              onSubmitEditing={() => {
                setReviews([...reviews, newReview]);
                setNewReview('');
              }}
            />
          </Card.Content>
        </Card>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
    backgroundColor: '#ffffff',
    alignItems: 'center',
  },
  card: {
    margin: 16,
    borderRadius: 8,
    overflow: 'hidden',
    width: '100%',
    maxWidth: 600,
  },
  image: {
    height: 300,
  },
  title: {
    fontSize: 28,
    textAlign: 'center',
  },
  price: {
    fontSize: 24,
    color: '#007BFF',
    textAlign: 'center',
    marginVertical: 8,
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    marginVertical: 8,
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
    justifyContent: 'center',
  },
  quantityText: {
    fontSize: 18,
    marginHorizontal: 8,
  },
});

export default ProductDetailScreen;
