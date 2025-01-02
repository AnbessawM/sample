import { getProducts } from '@/app/services/api/productService';
import { useCart } from '@/hooks/useCart';
import { useWishlist } from '@/hooks/useWishlist';
import { RootStackParamList } from '@/types/navigation';
import { RouteProp, useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Button, Card, IconButton, List, Paragraph, TextInput, Title } from 'react-native-paper';

type ProductDetailScreenRouteProp = RouteProp<RootStackParamList, 'ProductDetail'>;

const ProductDetailScreen = () => {
  const route = useRoute<ProductDetailScreenRouteProp>();
  const { productId } = route.params;
  interface Product {
    id: number;
    image: string;
    title: string; // Changed from 'name' to 'title'
    price: number;
    description: string;
    quantity: number;
    rating: { rate: number; count: number }; // Changed rating to an object
  }

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { addToCart, removeFromCart, cartItems } = useCart();
  const { addToWishlist, removeFromWishlist, wishlist } = useWishlist();
  const [reviews, setReviews] = useState<string[]>([]);
  const [newReview, setNewReview] = useState('');
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data: Product = (await getProducts()).find((product: Product) => product.id === productId) as Product;
        setProduct({
          id: data.id,
          image: data.image,
          title: data.title, // Changed from 'name' to 'title'
          price: data.price,
          description: data.description,
          quantity: 1,
          rating: data.rating, // New property for product rating
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
      addToCart({ ...product, name: product.title, quantity });
    }
  };

  const handleRemoveFromCart = () => {
    if (product) {
      removeFromCart(product.id);
    }
  };

  const handleAddReview = () => {
    if (newReview.trim()) {
      setReviews([...reviews, newReview]);
      setNewReview('');
    }
  };

  const handleWishlistToggle = () => {
    if (product) {
      if (wishlist.some((wishlistItem) => wishlistItem.id === product.id)) {
        removeFromWishlist(product.id);
      } else {
        addToWishlist(product);
      }
    }
  };

  const isInCart = product ? cartItems.some((item) => item.id === product.id) : false;

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
            <Title style={styles.title}>{product.title}</Title>
            <Paragraph style={styles.price}>${product.price.toFixed(2)}</Paragraph>
            <Paragraph style={styles.description}>{product.description}</Paragraph>
            <Paragraph style={styles.rating}>Rating: {product.rating.rate} / 5 ({product.rating.count} reviews)</Paragraph> {/* Updated rating display */}
            <View style={styles.quantityContainer}>
              <IconButton icon="minus" onPress={() => setQuantity(Math.max(1, quantity - 1))} />
              <Text style={styles.quantityText}>{quantity}</Text>
              <IconButton icon="plus" onPress={() => setQuantity(quantity + 1)} />
            </View>
            <Button mode="contained" onPress={handleAddToCart} style={styles.addToCartButton}>
              Add to Cart
            </Button>
            {isInCart && (
              <Button mode="contained" onPress={handleRemoveFromCart} style={styles.removeFromCartButton}>
                Remove from Cart
              </Button>
            )}
            <IconButton
              icon={wishlist.some((wishlistItem) => wishlistItem.id === product.id) ? 'heart' : 'heart-outline'}
              onPress={handleWishlistToggle}
              style={styles.wishlistButton}
            />
            <List.Section>
              {reviews.map((r, i) => (
                <List.Item key={i} title={r} />
              ))}
            </List.Section>
            <TextInput
              label="Add a review..."
              value={newReview}
              onChangeText={setNewReview}
              onSubmitEditing={handleAddReview}
              style={styles.reviewInput}
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
    boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)', // Added boxShadow
  },
  image: {
    height: 300,
  },
  title: {
    fontSize: 28,
    textAlign: 'center',
    marginVertical: 8,
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
  rating: {
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
  addToCartButton: {
    marginVertical: 16,
  },
  removeFromCartButton: {
    marginVertical: 16,
  },
  wishlistButton: {
    alignSelf: 'center',
  },
  reviewInput: {
    marginTop: 16,
  },
});

export default ProductDetailScreen;
