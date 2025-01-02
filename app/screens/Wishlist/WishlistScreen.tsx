import React, { useEffect, useState } from 'react';
import { View, FlatList, StyleSheet, useWindowDimensions } from 'react-native';
import { Card, Title, Paragraph, Button, Text, Divider, useTheme } from 'react-native-paper';
import { useWishlist } from '@/hooks/useWishlist';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '@/types/navigation';
import AsyncStorage from '@react-native-async-storage/async-storage';

const WishlistScreen = () => {
  const { wishlist, removeFromWishlist } = useWishlist();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const { width } = useWindowDimensions();
  const { colors } = useTheme();

  const [numColumns, setNumColumns] = useState(width > 1200 ? 4 : width > 800 ? 3 : 2);

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
      const newNumColumns = width > 1200 ? 4 : width > 800 ? 3 : 2;
      setNumColumns(newNumColumns);
      AsyncStorage.setItem('numColumns', newNumColumns.toString());
    };

    handleOrientationChange();
  }, [width]);

  const renderItem = ({ item }: { item: { id: number; image: string; title: string; price: number; description: string } }) => (
    <Card style={[styles.card, { backgroundColor: colors.surface }]}>
      <Card.Cover source={{ uri: item.image }} style={styles.image} />
      <Card.Content style={styles.cardContent}>
        <Title style={[styles.productTitle, { color: colors.onSurface }]} numberOfLines={2} ellipsizeMode="tail">{item.title}</Title>
        <Paragraph style={[styles.productPrice, { color: colors.onSurface }]}>${item.price.toFixed(2)}</Paragraph>
        <View style={[styles.cardActions, width < 400 && styles.cardActionsVertical]}>
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
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.title, { color: colors.onBackground }]}>Wishlist</Text>
      {wishlist.length === 0 ? (
        <Text style={[styles.emptyText, { color: colors.onBackground }]}>Your wishlist is empty.</Text>
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
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
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
  cardActionsVertical: {
    flexDirection: 'column',
  },
  emptyText: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 20,
  },
});

export default WishlistScreen;
