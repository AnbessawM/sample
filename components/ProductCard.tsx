import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useCallback, useState } from 'react';
import { Animated, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Button, Card, Dialog, IconButton, Paragraph, Portal, Text, Title, useTheme } from 'react-native-paper';

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

  const handleConfirmAddToCart = () => {
    hideModal();
    onButtonPress && onButtonPress({ ...item, quantity });
  };

  // Calculate responsive font sizes
  const priceFontSize = Math.max(10, Math.min(16, cardWidth * 0.5));

  return (
    <Animated.View
      style={[styles.productContainer, { transform: [{ scale }] }]}
      onTouchStart={() => {
        Animated.spring(scale, { toValue: 0.98, useNativeDriver: true }).start();
      }}
      onTouchEnd={() => {
        Animated.spring(scale, { toValue: 1, useNativeDriver: true }).start();
      }}
    >
      <Card style={[styles.card, { width: cardWidth, height: cardHeight }]}>
        <TouchableOpacity onPress={() => router.push(`/shared/ProductDetailScreen?id=${item.id}`)}>
          <Card.Cover
            source={{ uri: item.image || 'https://via.placeholder.com/150' }}
            style={[styles.productImage, { height: cardHeight / 2 }]}
          />
        </TouchableOpacity>
        <Card.Content style={[styles.cardContent, { height: cardHeight / 2 }]}>
          <View style={styles.priceQuantityContainer}>
            <Paragraph style={[styles.price, { color: colors.onSurface, fontSize: priceFontSize }]}>
              ${item.price.toFixed(2)}
            </Paragraph>
            {screen === 'cart' && (
              <Text style={{ fontSize: priceFontSize }}>x{quantity}</Text>
            )}
          </View>
          <View style={styles.actions}>
            {screen !== 'wishlist' && onWishlistToggle && (
              <IconButton
                icon={isInWishlist ? 'heart' : 'heart-outline'}
                onPress={() => onWishlistToggle(item)}
                size={18}
                iconColor={isInWishlist ? colors.error : colors.onSurface}
                underlayColor="red"
                animated
              />
            )}
            {screen === 'wishlist' ? (
              <View style={styles.wishlistActions}>
                <IconButton
                  icon="delete"
                  onPress={handleButtonPress}
                  size={18}
                  style={styles.iconButton}
                  iconColor={colors.error}
                  underlayColor="red"
                  animated
                />
                {!isInCart && (
                  <IconButton
                    icon="cart-plus"
                    onPress={handleConfirmAddToCart}
                    size={18}
                    style={styles.iconButton}
                    iconColor={colors.primary}
                    underlayColor="red"
                    animated
                  />
                )}
              </View>
            ) : (
              <IconButton
                icon={screen === 'cart' ? 'cart-remove' : 'cart-plus'}
                onPress={handleButtonPress}
                size={18}
                style={styles.iconButton}
                iconColor={colors.primary}
                underlayColor="red"
                animated
              />
            )}
          </View>
        </Card.Content>
      </Card>

      <Portal>
        <Dialog visible={modalState.visible} onDismiss={hideModal} style={styles.modal}>
          <Dialog.Title style={styles.modalTitle}>Adjust Quantity</Dialog.Title>
          <Dialog.Content>
            <View style={styles.quantityContainer}>
              <TouchableOpacity onPress={decrementQuantity} style={styles.quantityButton} activeOpacity={0.7}>
                <MaterialIcons name="remove" size={24} color={colors.primary} />
              </TouchableOpacity>
              <Text style={styles.quantityText}>{quantity}</Text>
              <TouchableOpacity onPress={incrementQuantity} style={styles.quantityButton} activeOpacity={0.7}>
                <MaterialIcons name="add" size={24} color={colors.primary} />
              </TouchableOpacity>
            </View>
          </Dialog.Content>
          <Dialog.Actions style={styles.modalActions}>
            <Button onPress={hideModal} labelStyle={styles.modalCancelText}>Cancel</Button>
            <Button onPress={handleConfirmAddToCart} labelStyle={styles.modalAddText}>Add to Cart</Button>
          </Dialog.Actions>
        </Dialog>

        <Dialog visible={modalState.confirmVisible} onDismiss={hideConfirmModal} style={styles.modal}>
          <Dialog.Title style={styles.modalTitle}>Confirm Removal</Dialog.Title>
          <Dialog.Content>
            <Text>Are you sure you want to remove this item from the {screen === 'wishlist' ? 'wishlist' : 'cart'}?</Text>
          </Dialog.Content>
          <Dialog.Actions style={styles.modalActions}>
            <Button onPress={hideConfirmModal} labelStyle={styles.modalCancelText}>Cancel</Button>
            <Button onPress={handleConfirmRemove} labelStyle={styles.modalAddText}>Remove</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  productContainer: {
    flex: 1,
    borderRadius: 10,
    overflow: 'visible',
    elevation: 4,
    // marginVertical: 10,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    flex: 1,
    borderRadius: 10,
    overflow: 'visible',
  },
  productImage: {
    borderRadius: 10,
  },
  cardContent: {
    flex: 1,
    justifyContent: 'center',
    // backgroundColor: 'yellow',
    alignItems: 'center',
  },
  priceQuantityContainer: {
    flex: 1,
    // backgroundColor: 'red',
    width: '100%', // Ensures full width
  },
  actions: {
    flex: 1,
    // backgroundColor: 'green',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  wishlistActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  iconButton: {
    // marginHorizontal: 5,
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
    padding: 10,
    borderRadius: 5,
    marginHorizontal: 15,
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  modalCancelText: {
    color: '#FF5733',
  },
  modalAddText: {
    color: '#28A745',
  },
});



export default ProductCard;
