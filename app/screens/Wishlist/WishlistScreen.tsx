import React, { useEffect } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '@/types/navigation';
import { Card, Title, Paragraph, Button, IconButton } from 'react-native-paper';
import { useWishlist, WishlistProvider } from '@/hooks/useWishlist';

const WishlistScreen = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const { wishlist, removeFromWishlist } = useWishlist();

  useEffect(() => {
    console.log('Wishlist in WishlistScreen:', wishlist);
  }, [wishlist]);

  const renderItem = ({ item }: { item: { id: number; image: string; title: string; price: number; description: string } }) => (
    <Card style={styles.productContainer}>
      <Card.Cover source={{ uri: item.image }} style={styles.productImage} />
      <Card.Content>
        <Title>{item.title}</Title>
        <Paragraph>${item.price.toFixed(2)}</Paragraph>
        <Button mode="contained" onPress={() => navigation.navigate('ProductDetail', { productId: item.id })}>
          View Details
        </Button>
        <IconButton icon="delete" onPress={() => removeFromWishlist(item.id)} />
      </Card.Content>
    </Card>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Wishlist</Text>
      <FlatList
        data={wishlist}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  },
  productImage: {
    height: 150,
  },
});

const WishlistScreenWithProvider = () => (
  <WishlistProvider>
    <WishlistScreen />
  </WishlistProvider>
);

export default WishlistScreenWithProvider;
