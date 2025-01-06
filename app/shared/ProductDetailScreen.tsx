import { getProducts } from '@/services/api/productService';
import { useCart } from '@/hooks/useCart';
import { useWishlist } from '@/hooks/useWishlist';
import { useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState, useCallback } from 'react';
import { ActivityIndicator, ScrollView, StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import { Button, Card, IconButton, List, Paragraph, Snackbar, TextInput, Title, useTheme } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

const handleOrientationChange = (width: number, height: number, setIsLandscape: (value: boolean) => void) => {
  const newIsLandscape = width > height;
  setIsLandscape(newIsLandscape);
  AsyncStorage.setItem('isLandscape', newIsLandscape.toString());
};

const ProductDetailScreen = () => {
  const { id } = useLocalSearchParams();
  const { addToCart, cartItems } = useCart();
  const { addToWishlist, removeFromWishlist, wishlist } = useWishlist();
  const { colors } = useTheme();
  const [product, setProduct] = useState<Product | null>(null);
  const [status, setStatus] = useState({ loading: true, error: null });
  const [reviews, setReviews] = useState<string[]>([]);
  const [newReview, setNewReview] = useState('');
  const [quantity, setQuantity] = useState(1);
  const { width, height } = useWindowDimensions();
  const [isLandscape, setIsLandscape] = useState(width > height);
  const [snackbarVisible, setSnackbarVisible] = useState(false);

  interface Product {
    id: number;
    image: string;
    title: string;
    price: number;
    description: string;
    quantity: number;
    rating: { rate: number; count: number };
  }

  useEffect(() => {
    const loadOrientation = async () => {
      const savedOrientation = await AsyncStorage.getItem('isLandscape');
      if (savedOrientation) {
        setIsLandscape(savedOrientation === 'true');
      }
    };

    loadOrientation();
  }, []);

  useEffect(() => {
    handleOrientationChange(width, height, setIsLandscape);
  }, [width, height]);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data: Product = (await getProducts()).find((product: Product) => product.id === Number(id)) as Product;
        setProduct({
          id: data.id,
          image: data.image,
          title: data.title,
          price: data.price,
          description: data.description,
          quantity: 1,
          rating: data.rating,
        });
      } catch (err: any) {
        setStatus({ loading: false, error: err.message });
      } finally {
        setStatus({ loading: false, error: null });
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = useCallback(() => {
    if (product) {
      addToCart({ ...product, name: product.title, quantity });
      setSnackbarVisible(true);
    }
  }, [product, addToCart, quantity]);

  const handleAddReview = useCallback(() => {
    if (newReview.trim()) {
      setReviews([...reviews, newReview]);
      setNewReview('');
    }
  }, [newReview, reviews]);

  const handleWishlistToggle = useCallback(() => {
    if (product) {
      if (wishlist.some((wishlistItem) => wishlistItem.id === product.id)) {
        removeFromWishlist(product.id);
      } else {
        addToWishlist(product);
      }
    }
  }, [product, wishlist, addToWishlist, removeFromWishlist]);

  if (status.loading) {
    return (
      <View style={[styles.loadingContainer, { backgroundColor: colors.background }]}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  if (status.error) {
    return (
      <View style={[styles.errorContainer, { backgroundColor: colors.background }]}>
        <Text style={[styles.errorText, { color: colors.error }]}>Error: {status.error}</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={[styles.container, { backgroundColor: colors.background }]}>
      {product && (
        <Card style={[styles.card, { backgroundColor: colors.surface }]}>
          <Card.Cover source={{ uri: product.image }} style={styles.image} />
          <Card.Content>
            <Title style={[styles.title, { color: colors.onSurface }]}>{product.title}</Title>
            <Paragraph style={[styles.price, { color: colors.primary }]}>${product.price.toFixed(2)}</Paragraph>
            <Paragraph style={[styles.description, { color: colors.onSurface }]}>{product.description}</Paragraph>
            <Paragraph style={[styles.rating, { color: colors.onSurface }]}>Rating: {product.rating.rate} / 5 ({product.rating.count} reviews)</Paragraph>
            <View style={styles.quantityContainer}>
              <IconButton icon="minus" onPress={() => setQuantity(Math.max(1, quantity - 1))} />
              <Text style={styles.quantityText}>{quantity}</Text>
              <IconButton icon="plus" onPress={() => setQuantity(quantity + 1)} />
            </View>
            <View style={styles.buttonRow}>
              <IconButton
                icon={wishlist.some((wishlistItem) => wishlistItem.id === product.id) ? 'heart' : 'heart-outline'}
                onPress={handleWishlistToggle}
                style={styles.wishlistButton}
              />
              <Button mode="contained" onPress={handleAddToCart} style={styles.addToCartButton}>
                Add to Cart
              </Button>
            </View>
            <ReviewList reviews={reviews} />
            <ReviewInput newReview={newReview} setNewReview={setNewReview} handleAddReview={handleAddReview} />
          </Card.Content>
        </Card>
      )}
      <Snackbar
        visible={snackbarVisible}
        onDismiss={() => setSnackbarVisible(false)}
        duration={3000}
        action={{
          label: 'Dismiss',
          onPress: () => setSnackbarVisible(false),
        }}
      >
        Item added to cart
      </Snackbar>
    </ScrollView>
  );
};

const ReviewList = ({ reviews }: { reviews: string[] }) => (
  <List.Section>
    {reviews.map((r, i) => (
      <List.Item key={i} title={r} />
    ))}
  </List.Section>
);

const ReviewInput = ({ newReview, setNewReview, handleAddReview }: { newReview: string, setNewReview: (value: string) => void, handleAddReview: () => void }) => (
  <TextInput
    label="Add a review..."
    value={newReview}
    onChangeText={setNewReview}
    onSubmitEditing={handleAddReview}
    style={styles.reviewInput}
  />
);

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
    maxWidth: '100%',
    boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
  },
  image: {
    height: 300,
    width: '100%',
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
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 16,
  },
  addToCartButton: {
    flex: 1,
    marginLeft: 8,
  },
  wishlistButton: {
    marginRight: 8,
  },
  reviewInput: {
    marginTop: 16,
  },
});

export default ProductDetailScreen;