import React, { useState } from 'react';
import { Card, Title, Paragraph, Dialog, Portal, IconButton, Button, Text, useTheme } from 'react-native-paper';
import { View, TouchableOpacity, Animated, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router'; // Import useRouter

interface ProductCardProps {
  item: { id: number; image: string; title: string; price: number; description?: string; quantity?: number };
  onQuantityChange?: (id: number, quantity: number) => void;
  onRemove?: (id: number) => void;
  onWishlistToggle?: (item: any) => void;
  isInWishlist?: boolean;
  buttonTitle?: string;
  onButtonPress?: (item: any) => void;
  onImagePress?: (id: number) => void;
  cardWidth: number;
  cardHeight: number;
}

const ProductCard: React.FC<ProductCardProps> = ({
  item,
  onQuantityChange,
  onRemove,
  onWishlistToggle,
  isInWishlist,
  buttonTitle,
  onButtonPress,
  onImagePress,
  cardWidth,
  cardHeight,
}) => {
  const { colors } = useTheme();
  const router = useRouter(); // Initialize router
  const [scale] = useState(new Animated.Value(1));
  const [visible, setVisible] = useState(false);
  const [quantity, setQuantity] = useState(item.quantity || 1);

  const handlePressIn = () => {
    Animated.spring(scale, {
      toValue: 0.98,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scale, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  const incrementQuantity = () => {
    const newQuantity = quantity + 1;
    setQuantity(newQuantity);
    onQuantityChange && onQuantityChange(item.id, newQuantity);
  };

  const decrementQuantity = () => {
    const newQuantity = Math.max(1, quantity - 1);
    setQuantity(newQuantity);
    onQuantityChange && onQuantityChange(item.id, newQuantity);
  };

  return (
    <Animated.View
      style={[styles.productContainer, { transform: [{ scale }] }]}
      onTouchStart={handlePressIn}
      onTouchEnd={handlePressOut}
    >
      <Card style={[styles.card, { width: cardWidth, height: cardHeight }]}>
        <TouchableOpacity onPress={() => router.push(`/shared/ProductDetailScreen?id=${item.id}`)}>
          <Card.Cover
            source={{ uri: item.image || 'https://via.placeholder.com/150' }}
            style={[styles.productImage, { height: cardHeight / 2 }]}
          />
        </TouchableOpacity>
        <Card.Content style={styles.cardContent}>
          <Title numberOfLines={1} ellipsizeMode="tail" style={styles.title}>
            {item.title}
          </Title>
          <Paragraph style={styles.price}>
            ${item.price.toFixed(2)}
          </Paragraph>
        </Card.Content>
        <View style={styles.actions}>
          {onWishlistToggle && (
            <IconButton
              icon={isInWishlist ? 'heart' : 'heart-outline'}
              onPress={() => onWishlistToggle(item)}
              size={30}
              style={styles.wishlistIcon}
            />
          )}
          {onButtonPress && (
            <TouchableOpacity
              onPress={showModal}
              style={styles.addtocart}
              activeOpacity={0.7}
            >
              <Text style={styles.addtocartText}>{buttonTitle || 'Add to Cart'}</Text>
            </TouchableOpacity>
          )}
          {onRemove && (
            <Button
              mode="contained"
              onPress={() => onRemove(item.id)}
              labelStyle={styles.buttonLabel}
              contentStyle={styles.buttonContent}
              style={styles.button}
            >
              Remove
            </Button>
          )}
        </View>
      </Card>

      <Portal>
        <Dialog
          visible={visible}
          onDismiss={hideModal}
          style={styles.modal}
        >
          <Dialog.Title style={styles.modalTitle}>Adjust Quantity</Dialog.Title>
          <Dialog.Content>
            <View style={styles.quantityContainer}>
              <TouchableOpacity
                onPress={decrementQuantity}
                style={styles.quantityButton}
                activeOpacity={0.7}
              >
                <Text style={styles.quantityButtonText}>-</Text>
              </TouchableOpacity>
              <Text style={styles.quantityText}>{quantity}</Text>
              <TouchableOpacity
                onPress={incrementQuantity}
                style={styles.quantityButton}
                activeOpacity={0.7}
              >
                <Text style={styles.quantityButtonText}>+</Text>
              </TouchableOpacity>
            </View>
          </Dialog.Content>
          <Dialog.Actions style={styles.modalActions}>
            <TouchableOpacity onPress={hideModal} style={styles.modalCancelButton}>
              <Text style={styles.modalCancelText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                hideModal();
                onButtonPress && onButtonPress(item);
              }}
              style={styles.modalAddButton}
            >
              <Text style={styles.modalAddText}>{buttonTitle || 'Add to Cart'}</Text>
            </TouchableOpacity>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  productContainer: {
    borderRadius: 8,
    overflow: 'hidden',
    elevation: 4,
    marginVertical: 10,
  },
  card: {
    borderRadius: 8,
    borderWidth: 1,
    overflow: 'hidden',
  },
  productImage: {
    borderRadius: 8,
  },
  cardContent: {
    flex: 1,
    justifyContent: 'space-between',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 14,
    flex: 1,
  },
  price: {
    fontSize: 12,
  },
  actions: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  wishlistIcon: {
    marginRight: 10,
  },
  addtocart: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    elevation: 4,
    backgroundColor: '#007BFF',
    marginRight: 10,
  },
  addtocartText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  modal: {
    paddingVertical: 20,
    borderRadius: 12,
    elevation: 10,
    maxWidth: 350,
    marginHorizontal: 20,
    backgroundColor: '#fff',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  quantityButton: {
    width: 40,
    height: 40,
    borderRadius: 50,
    backgroundColor: '#007BFF',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
    marginHorizontal: 10,
  },
  quantityButtonText: {
    fontSize: 24,
    color: 'white',
    fontWeight: 'bold',
  },
  quantityText: {
    fontSize: 20,
    marginHorizontal: 10,
  },
  modalActions: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    flexDirection: 'row',
    paddingBottom: 10,
  },
  modalCancelButton: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginRight: 10,
    backgroundColor: '#ddd',
    elevation: 3,
  },
  modalCancelText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#555',
  },
  modalAddButton: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    backgroundColor: '#28a745',
    elevation: 3,
  },
  modalAddText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  button: {
    borderRadius: 5,
  },
  buttonLabel: {
    fontSize: 14,
  },
  buttonContent: {
    paddingHorizontal: 10,
  },
});

export default ProductCard;
