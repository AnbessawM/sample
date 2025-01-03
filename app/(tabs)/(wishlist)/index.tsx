import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList, useWindowDimensions } from 'react-native';
import { useWishlist } from '@/hooks/useWishlist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Divider, useTheme } from 'react-native-paper';
import { useRouter } from 'expo-router';
import ProductCard from '@/components/ProductCard';

const WishlistScreen = () => {
  const { wishlist, removeFromWishlist } = useWishlist();
  const router = useRouter();
  const { width } = useWindowDimensions();
  const { colors } = useTheme();
  const [numColumns, setNumColumns] = useState(Math.max(3, Math.floor(width / 300)));

  useEffect(() => {
    const loadNumColumns = async () => {
      const savedNumColumns = await AsyncStorage.getItem('numColumns');
      if (savedNumColumns) {
        setNumColumns(parseInt(savedNumColumns, 10));
      }
    };

    loadNumColumns();
  }, []);

  useEffect(() => {
    const handleOrientationChange = () => {
      setNumColumns(Math.max(3, Math.floor(width / 300)));
    };

    handleOrientationChange();
  }, [width]);

  const handleProductPress = (productId: string) => {
    router.push(`./tabs/home/${productId}`);
  };

  const handleImagePress = (productId: number) => {
    router.push(`/ProductDetailScreen?id=${productId}`);
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <FlatList
        data={wishlist}
        keyExtractor={(item) => item.id.toString()}
        numColumns={numColumns}
        renderItem={({ item }) => (
          <ProductCard
            key={item.id}
            item={item}
            onRemove={removeFromWishlist}
            onWishlistToggle={removeFromWishlist}
            isInWishlist={true}
            onImagePress={handleImagePress}
          />
        )}
        ItemSeparatorComponent={() => <Divider />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 8,
  },
});

export default WishlistScreen;