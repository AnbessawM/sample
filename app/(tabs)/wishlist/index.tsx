import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList, useWindowDimensions } from 'react-native';
import { useWishlist } from '@/hooks/useWishlist';
import { Divider, useTheme, Provider as PaperProvider } from 'react-native-paper';
import { useRouter } from 'expo-router';
import ProductCard from '@/components/ProductCard';

const WishlistScreen = () => {
  const { wishlist, removeFromWishlist } = useWishlist();
  const router = useRouter();
  const { width } = useWindowDimensions();
  const { colors } = useTheme();
  const cardMargin = 10; // Margin between cards
  const numColumns = width > 768 ? 4 : width > 480 ? 3 : 2; // Responsive columns
  const cardWidth = (width - (numColumns + 1) * cardMargin) / numColumns;
  const cardHeight = cardWidth * 1.5;

  return (
    <PaperProvider>
      <View style={{ flex: 1, backgroundColor: colors.background }}>
        <FlatList
          data={wishlist}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View
              style={{
                width: cardWidth,
                marginBottom: cardMargin,
                marginHorizontal: cardMargin / 2,
              }}
            >
              <ProductCard
                key={item.id}
                item={item}
                onRemove={removeFromWishlist}
                onQuantityChange={() => {}} // quantity is not required in wishlist
                isInWishlist={true}
                cardWidth={cardWidth}
                cardHeight={cardHeight}
                screen='wishlist'
              />
            </View>
          )}
          numColumns={numColumns}
          key={numColumns} // Forces a re-render when numColumns changes
          contentContainerStyle={{ paddingHorizontal: cardMargin }}
          ItemSeparatorComponent={() => <Divider />}
        />
      </View>
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 8,
  },
});

export default WishlistScreen;