import React from 'react';
import { Card, Title, Paragraph, Button, IconButton, Text, useTheme } from 'react-native-paper';
import { StyleSheet, View, TouchableOpacity, useWindowDimensions } from 'react-native';
import { useRouter } from 'expo-router';

interface ProductCardProps {
  item: { id: number; image: string; title: string; price: number; description?: string; quantity?: number };
  onQuantityChange?: (id: number, quantity: number) => void;
  onRemove?: (id: number) => void;
  onWishlistToggle?: (item: any) => void;
  isInWishlist?: boolean;
  buttonTitle?: string;
  onButtonPress?: (item: any) => void;
  onImagePress?: (id: number) => void;
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
}) => {
  const { colors } = useTheme();
  const router = useRouter();
  const { width, height } = useWindowDimensions();

  // Define a fixed aspect ratio, e.g., 3:4
  const cardWidth = width * 0.45; // Adjust for spacing (45% of screen width)
  const cardHeight = cardWidth * (4 / 3); // For 3:4 ratio (height = width * 4/3)

  // Calculate scaling factor based on card width
  const scaleFactor = cardWidth / 300; // Assuming 300 is the default width for content scaling

  // Maximum card height to prevent overflow on smaller screens
  const maxCardHeight = height * 0.7;

  // Ensure the card height doesn't exceed max height
  const adjustedCardHeight = Math.min(cardHeight, maxCardHeight);

  return (
    <Card
      style={[
        styles.productContainer,
        {
          backgroundColor: colors.surface,
          width: cardWidth,
          height: adjustedCardHeight,
        },
      ]}
      onPress={() => router.push(`/ProductDetailScreen?id=${item.id}`)}
    >
      {/* Touchable opacity for the image */}
      <TouchableOpacity onPress={() => onImagePress && onImagePress(item.id)} style={{ height: adjustedCardHeight * 0.4, width: cardWidth }}>
        <Card.Cover
          source={{ uri: item.image }}
          style={[styles.productImage, { height: '100%', width: '100%' }]}
        />
      </TouchableOpacity>

      <Card.Content style={[styles.cardContent, { paddingHorizontal: cardWidth * 0.05 }]}>
        <Title
          style={[
            styles.productTitle,
            { color: colors.onSurface, fontSize: 16 * scaleFactor },
          ]}
          numberOfLines={2}
          ellipsizeMode="tail"
        >
          {item.title}
        </Title>
        <Paragraph style={[styles.productPrice, { color: colors.onSurface, fontSize: 14 * scaleFactor }]}>
          ${item.price.toFixed(2)}
        </Paragraph>

        {/* Quantity control */}
        {onQuantityChange && (
          <View style={[styles.quantityContainer, { marginVertical: adjustedCardHeight * 0.04 }]}>
            <IconButton
              icon="minus"
              onPress={() => onQuantityChange(item.id, Math.max(1, (item.quantity || 1) - 1))}
              size={20 * scaleFactor} // Scaling icon size
            />
            <Text style={[styles.quantityText, { fontSize: 16 * scaleFactor, color: colors.onSurface }]}>
              {item.quantity || 1}
            </Text>
            <IconButton
              icon="plus"
              onPress={() => onQuantityChange(item.id, (item.quantity || 1) + 1)}
              size={20 * scaleFactor} // Scaling icon size
            />
          </View>
        )}

        {/* Actions container */}
        <View style={[styles.cardActions, { marginTop: adjustedCardHeight * 0.05 }]}>
          {onRemove && (
            <Button
              mode="contained"
              onPress={() => onRemove(item.id)}
              labelStyle={{ fontSize: 14 * scaleFactor }}
              contentStyle={{ paddingVertical: 6, paddingHorizontal: 12 }} // Smaller button size
              style={{ width: cardWidth * 0.4 }} // Adjust button width
            >
              Remove
            </Button>
          )}
          {onWishlistToggle && (
            <IconButton
              icon={isInWishlist ? 'heart' : 'heart-outline'}
              onPress={() => onWishlistToggle(item)}
              size={24 * scaleFactor} // Scaling icon size
            />
          )}
          {onButtonPress && (
            <Button
              mode="contained"
              onPress={() => onButtonPress(item)}
              labelStyle={{ fontSize: 14 * scaleFactor }}
              contentStyle={{ paddingVertical: 6, paddingHorizontal: 12 }} // Smaller button size
              style={{ width: cardWidth * 0.4 }} // Adjust button width
            >
              {buttonTitle}
            </Button>
          )}
        </View>
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  productContainer: {
    margin: 8,
    borderRadius: 8,
    overflow: 'hidden',
    elevation: 4,
    flexDirection: 'column', // Ensure items align vertically
    justifyContent: 'space-between', // Ensures content is distributed
  },
  productImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  cardContent: {
    flex: 1,
    justifyContent: 'space-between',
    paddingVertical: 8,
  },
  productTitle: {
    fontWeight: 'bold',
    marginBottom: 8,
  },
  productPrice: {
    fontWeight: 'bold',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  quantityText: {
    marginHorizontal: 8,
  },
  cardActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
});

export default ProductCard;
