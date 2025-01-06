import React, { useState, useCallback } from 'react';
import { Card, Title, Paragraph, Dialog, Portal, IconButton, Button, Text, useTheme } from 'react-native-paper';
import { View, TouchableOpacity, Animated, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';

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
  screen: 'home' | 'wishlist' | 'cart';
  isInCart?: boolean;
}

const handlePressIn = (scale: Animated.Value) => {
  Animated.spring(scale, {
    toValue: 0.98,
    useNativeDriver: true,
  }).start();
};

const handlePressOut = (scale: Animated.Value) => {
  Animated.spring(scale, {
    toValue: 1,
    useNativeDriver: true,
  }).start();
};

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
  screen,
  isInCart,
}) => {
  const { colors } = useTheme();
  const router = useRouter();
  const [scale] = useState(new Animated.Value(1));
  const [quantity, setQuantity] = useState(item.quantity || 1);
  const [modalState, setModalState] = useState({ visible: false, confirmVisible: false });

  const showModal = useCallback(() => setModalState(state => ({ ...state, visible: true })), []);
  const hideModal = useCallback(() => setModalState(state => ({ ...state, visible: false })), []);
  const showConfirmModal = useCallback(() => setModalState(state => ({ ...state, confirmVisible: true })), []);
  const hideConfirmModal = useCallback(() => setModalState(state => ({ ...state, confirmVisible: false })), []);

  const handleConfirmRemove = useCallback(() => {
    hideConfirmModal();
    onRemove && onRemove(item.id);
  }, [hideConfirmModal, onRemove, item.id]);

  const incrementQuantity = useCallback(() => {
    const newQuantity = quantity + 1;
    setQuantity(newQuantity);
    onQuantityChange && onQuantityChange(item.id, newQuantity);
  }, [quantity, onQuantityChange, item.id]);

  const decrementQuantity = useCallback(() => {
    const newQuantity = Math.max(1, quantity - 1);
    setQuantity(newQuantity);
    onQuantityChange && onQuantityChange(item.id, newQuantity);
  }, [quantity, onQuantityChange, item.id]);

  const getButtonTitle = () => screen === 'wishlist' ? 'Remove from Wishlist' : screen === 'cart' ? 'Remove from Cart' : buttonTitle || 'Add to Cart';

  const handleButtonPress = () => {
    if (screen === 'wishlist' || screen === 'cart') {
      showConfirmModal();
    } else {
      showModal();
    }
  };

  const handleAddToCart = () => {
    showModal();
  };

  const handleConfirmAddToCart = () => {
    hideModal();
    onButtonPress && onButtonPress({ ...item, quantity });
  };

  return (
    <Animated.View
      style={[styles.productContainer, { transform: [{ scale }] }]}
      onTouchStart={() => handlePressIn(scale)}
      onTouchEnd={() => handlePressOut(scale)}
    >
      <Card style={[styles.card, { width: cardWidth, height: cardHeight }]}>
        <TouchableOpacity onPress={() => router.push(`/shared/ProductDetailScreen?id=${item.id}`)}>
          <Card.Cover
            source={{ uri: item.image || 'https://via.placeholder.com/150' }}
            style={[styles.productImage, { height: cardHeight / 2 }]}
          />
        </TouchableOpacity>
        <Card.Content style={[styles.cardContent, { flex: 1, justifyContent: 'space-between' }]}>
          <View>
            <Title numberOfLines={1} ellipsizeMode="tail" style={styles.title}>
              {item.title}
            </Title>
            <View style={styles.priceQuantityContainer}>
              <Paragraph style={styles.price}>${item.price.toFixed(2)}</Paragraph>
              {screen === 'cart' && (
                <Text style={styles.quantityText}>x{quantity}</Text>
              )}
            </View>
          </View>
          <View style={styles.actions}>
            {screen !== 'wishlist' && onWishlistToggle && (
              <IconButton
                icon={isInWishlist ? 'heart' : 'heart-outline'}
                onPress={() => onWishlistToggle(item)}
                size={24}
                style={styles.wishlistIcon}
              />
            )}
            {screen === 'wishlist' ? (
              <View style={styles.wishlistActions}>
                <TouchableOpacity
                  onPress={handleButtonPress}
                  style={[styles.removeButton, { flex: 1, marginRight: 5 }]}
                  activeOpacity={0.7}
                >
                  <MaterialIcons name="delete" size={24} color={colors.error} />
                </TouchableOpacity>
                {!isInCart && (
                  <TouchableOpacity
                    onPress={handleAddToCart}
                    style={[styles.addToCartButton, { flex: 1, marginLeft: 5 }]}
                    activeOpacity={0.7}
                  >
                    <MaterialIcons name="add-shopping-cart" size={24} color={colors.primary} />
                  </TouchableOpacity>
                )}
              </View>
            ) : (
              <TouchableOpacity
                onPress={handleButtonPress}
                style={[styles.addToCartButton]}
                activeOpacity={0.7}
              >
                <MaterialIcons name={screen === 'cart' ? 'remove-shopping-cart' : 'add-shopping-cart'} size={24} color={colors.primary} />
              </TouchableOpacity>
            )}
          </View>
        </Card.Content>
      </Card>

      <Portal>
        <Dialog visible={modalState.visible} onDismiss={hideModal} style={styles.modal}>
          <Dialog.Title style={styles.modalTitle}>Adjust Quantity</Dialog.Title>
          <Dialog.Content>
            <View style={styles.quantityContainer}>
              <TouchableOpacity
                onPress={decrementQuantity}
                style={[styles.quantityButton ]}
                activeOpacity={0.7}
              >
                <MaterialIcons name="remove" size={24} color={colors.primary} />
              </TouchableOpacity>
              <Text style={styles.quantityText}>{quantity}</Text>
              <TouchableOpacity
                onPress={incrementQuantity}
                style={[styles.quantityButton ]}
                activeOpacity={0.7}
              >
                <MaterialIcons name="add" size={24} color={colors.primary} />
              </TouchableOpacity>
            </View>
          </Dialog.Content>
          <Dialog.Actions style={styles.modalActions}>
            <Button onPress={hideModal} labelStyle={styles.modalCancelText}>
              Cancel
            </Button>
            <Button
              onPress={handleConfirmAddToCart}
              labelStyle={styles.modalAddText}
            >
              {'Add to Cart'}
            </Button>
          </Dialog.Actions>
        </Dialog>

        <Dialog visible={modalState.confirmVisible} onDismiss={hideConfirmModal} style={styles.modal}>
          <Dialog.Title style={styles.modalTitle}>Confirm Removal</Dialog.Title>
          <Dialog.Content>
            <Text>Are you sure you want to remove this item from the {screen === 'wishlist' ? 'wishlist' : 'cart'}?</Text>
          </Dialog.Content>
          <Dialog.Actions style={styles.modalActions}>
            <Button onPress={hideConfirmModal} labelStyle={styles.modalCancelText}>
              Cancel
            </Button>
            <Button onPress={handleConfirmRemove} labelStyle={styles.modalAddText}>
              Remove
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  productContainer: {
    borderRadius: 10,
    overflow: 'hidden',
    elevation: 4,
    marginVertical: 10,
    backgroundColor: '#fff',
  },
  card: {
    flex: 1,
    borderRadius: 10,
    overflow: 'hidden',
  },
  productImage: {
    borderRadius: 10,
  },
  cardContent: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 12,
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  price: {
    fontSize: 14,
    color: '#555',
    marginVertical: 5,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  wishlistActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  wishlistIcon: {
    marginLeft: -10,
  },
  addToCartButton: {
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  addToCartText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
    marginLeft: 5,
  },
  removeButton: {
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  removeButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
    marginLeft: 5,
  },
  modal: {
    borderRadius: 10,
  },
  modalTitle: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
  },
  quantityContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 15,
  },
  quantityButton: {
    backgroundColor: '#007BFF',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 20,
  },
  quantityText: {
    fontSize: 14,
    color: '#555',
    marginLeft: 10,
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  modalCancelText: {
    color: '#555',
  },
  modalAddText: {
    color: '#007BFF',
  },
  priceQuantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconButton: {
    margin: 0,
  },
});

export default ProductCard;
