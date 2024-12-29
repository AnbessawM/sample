import React from 'react';
import { View, FlatList, StyleSheet, useWindowDimensions } from 'react-native';
import { Card, Title, Paragraph, Button, Text, Divider } from 'react-native-paper';
import { useWishlist } from '@/hooks/useWishlist';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '@/types/navigation';

const WishlistScreen = () => {
  const { wishlist, removeFromWishlist } = useWishlist();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const { width } = useWindowDimensions();

  const numColumns = width > 1200 ? 4 : width > 800 ? 3 : 2;

  const renderItem = ({ item }: { item: { id: number; image: string; title: string; price: number; description: string } }) => (
    <Card style={styles.card}>
      <Card.Cover source={{ uri: item.image }} style={styles.image} />
      <Card.Content style={styles.cardContent}>
        <Title style={styles.productTitle} numberOfLines={2} ellipsizeMode="tail">{item.title}</Title>
        <Paragraph style={styles.productPrice}>${item.price.toFixed(2)}</Paragraph>
        <View style={styles.cardActions}>
          <Button mode="contained" onPress={() => navigation.navigate('ProductDetail', { productId: item.id })}>
            View
          </Button>
          <Button mode="outlined" onPress={() => removeFromWishlist(item.id)} color="#FF0000">
            Remove
          </Button>
        </View>
      </Card.Content>
    </Card>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Wishlist</Text>
      {wishlist.length === 0 ? (
        <Text style={styles.emptyText}>Your wishlist is empty.</Text>
      ) : (
        <FlatList
          data={wishlist}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.list}
          ItemSeparatorComponent={() => <Divider />}
          numColumns={numColumns}
          key={numColumns} // Change the key prop to force a fresh render
        />
      )}
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
  card: {
    margin: 8,
    borderRadius: 8,
    overflow: 'hidden',
    flex: 1,
  },
  image: {
    height: 150,
  },
  cardContent: {
    flex: 1,
    justifyContent: 'space-between',
    height: 240, // Adjust this height as needed
  },
  productTitle: {
    height: 60, // Adjust this height as needed
    marginBottom: 12, // Add margin to separate title and price
    paddingTop: 4, // Add padding to ensure text is not cut off
  },
  productPrice: {
    height: 20, // Adjust this height as needed
  },
  cardActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 16,
  },
  emptyText: {
    fontSize: 18,
    textAlign: 'center',
    color: '#999',
    marginTop: 20,
  },
});

export default WishlistScreen;
