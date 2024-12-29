import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator, ScrollView, useWindowDimensions } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '@/types/navigation';
import { getProducts } from '@/app/services/api/productService';
import { Card, Title, Paragraph, Divider, Button, IconButton, TextInput, Menu } from 'react-native-paper';
import { useCart } from '@/hooks/useCart';
import { useWishlist } from '@/hooks/useWishlist';

const HomeScreen = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [products, setProducts] = useState<{ id: number; image: string; title: string; price: number; description: string; category: string }[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const { width } = useWindowDimensions();
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, wishlist } = useWishlist();
  const [quantities, setQuantities] = useState<{ [key: number]: number }>({});
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [sortOption, setSortOption] = useState<string>('price-asc');
  const [categoryMenuVisible, setCategoryMenuVisible] = useState(false);
  const [sortMenuVisible, setSortMenuVisible] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts();
        setProducts(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    console.log('Selected Category:', selectedCategory);
  }, [selectedCategory]);

  const numColumns = width > 1200 ? 4 : width > 800 ? 3 : 2;

  const filteredProducts = products
    .filter((p) => {
      const productName = p?.title || ''; // Use 'title' instead of 'name'
      const productCategory = p?.category || '';
      console.log('Product Name:', productName);
      console.log('Product Category:', productCategory);
      console.log('Search Term:', searchTerm);
      console.log('Selected Category:', selectedCategory);
      const matchesSearch = productName.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory ? productCategory === selectedCategory : true;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      if (sortOption === 'price-asc') return a.price - b.price;
      if (sortOption === 'price-desc') return b.price - a.price;
      if (sortOption === 'name-asc') return (a.title || '').localeCompare(b.title || ''); // Use 'title' instead of 'name'
      if (sortOption === 'name-desc') return (b.title || '').localeCompare(a.title || ''); // Use 'title' instead of 'name'
      return 0;
    });

  const handleQuantityChange = (productId: number, quantity: number) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [productId]: quantity,
    }));
  };

  const handleAddToCart = (item: { id: number; image: string; title: string; price: number; description: string }) => {
    const quantity = quantities[item.id] || 1;
    addToCart({ ...item, name: item.title, quantity });
  };

  const handleWishlistToggle = (item: { id: number; image: string; title: string; price: number; description: string }) => {
    if (wishlist.some((wishlistItem) => wishlistItem.id === item.id)) {
      removeFromWishlist(item.id);
    } else {
      addToWishlist(item);
    }
  };

  const handleCategoryChange = (category: string | null) => {
    setSelectedCategory(category);
    setCategoryMenuVisible(false);
  };

  const handleSortChange = (option: string) => {
    setSortOption(option);
    setSortMenuVisible(false);
  };

  const getSortText = (option: string) => {
    switch (option) {
      case 'price-asc':
        return 'Price: Low to High';
      case 'price-desc':
        return 'Price: High to Low';
      case 'name-asc':
        return 'Name: A to Z';
      case 'name-desc':
        return 'Name: Z to A';
      default:
        return 'Sort by';
    }
  };

  const getSortIcon = (option: string) => {
    switch (option) {
      case 'price-asc':
        return 'sort-ascending';
      case 'price-desc':
        return 'sort-descending';
      case 'name-asc':
        return 'sort-alphabetical-ascending';
      case 'name-desc':
        return 'sort-alphabetical-descending';
      default:
        return 'sort';
    }
  };

  const getCategoryIcon = (category: string | null) => {
    return category ? 'filter' : 'filter-outline';
  };

  const renderItem = ({ item }: { item: { id: number; image: string; title: string; price: number; description: string } }) => (
    <Card
      style={styles.productContainer}
      onPress={() => navigation.navigate('ProductDetail', { productId: item.id })}
    >
      <Card.Cover source={{ uri: item.image }} style={styles.productImage} />
      <Card.Content style={styles.cardContent}>
        <Title style={styles.productTitle} numberOfLines={2} ellipsizeMode="tail">{item.title}</Title>
        <Paragraph style={styles.productPrice}>${item.price.toFixed(2)}</Paragraph>
        <View style={styles.quantityContainer}>
          <IconButton icon="minus" onPress={() => handleQuantityChange(item.id, Math.max(1, (quantities[item.id] || 1) - 1))} />
          <Text style={styles.quantityText}>{quantities[item.id] || 1}</Text>
          <IconButton icon="plus" onPress={() => handleQuantityChange(item.id, (quantities[item.id] || 1) + 1)} />
        </View>
        <View style={styles.cardActions}>
          <Button mode="contained" onPress={() => handleAddToCart(item)}>
            Add to Cart
          </Button>
          <IconButton
            icon={wishlist.some((wishlistItem) => wishlistItem.id === item.id) ? 'heart' : 'heart-outline'}
            onPress={() => handleWishlistToggle(item)}
          />
        </View>
      </Card.Content>
    </Card>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007BFF" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Error: {error}</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Products</Text>
      <TextInput
        placeholder="Search products..."
        value={searchTerm}
        onChangeText={setSearchTerm}
        style={styles.searchInput}
      />
      <View style={styles.filterContainer}>
        <View style={styles.filterIconsContainer}>
          <Menu
            visible={categoryMenuVisible}
            onDismiss={() => setCategoryMenuVisible(false)}
            anchor={
              <IconButton
                icon={getCategoryIcon(selectedCategory)}
                onPress={() => setCategoryMenuVisible(true)}
                style={styles.filterButton}
              />
            }
          >
            <Menu.Item onPress={() => handleCategoryChange(null)} title="All Categories" />
            <Menu.Item onPress={() => handleCategoryChange('men\'s clothing')} title="Men's Clothing" />
            <Menu.Item onPress={() => handleCategoryChange('women\'s clothing')} title="Women's Clothing" />
            <Menu.Item onPress={() => handleCategoryChange('jewelery')} title="Jewelery" />
            <Menu.Item onPress={() => handleCategoryChange('electronics')} title="Electronics" />
          </Menu>
          <Menu
            visible={sortMenuVisible}
            onDismiss={() => setSortMenuVisible(false)}
            anchor={
              <IconButton
                icon={getSortIcon(sortOption)}
                onPress={() => setSortMenuVisible(true)}
                style={styles.filterButton}
              />
            }
          >
            <Menu.Item onPress={() => handleSortChange('price-asc')} title="Price: Low to High" />
            <Menu.Item onPress={() => handleSortChange('price-desc')} title="Price: High to Low" />
            <Menu.Item onPress={() => handleSortChange('name-asc')} title="Name: A to Z" />
            <Menu.Item onPress={() => handleSortChange('name-desc')} title="Name: Z to A" />
          </Menu>
        </View>
      </View>
      <Divider style={{ marginBottom: 16 }} />
      <FlatList
        data={filteredProducts}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.list}
        numColumns={numColumns}
        key={numColumns} // Change the key prop to force a fresh render
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
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
  searchInput: {
    marginBottom: 16,
  },
  list: {
    paddingBottom: 16,
  },
  productContainer: {
    margin: 8,
    borderRadius: 8,
    overflow: 'hidden',
    flex: 1,
  },
  productImage: {
    height: 150,
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
  },
  quantityText: {
    fontSize: 18,
    marginHorizontal: 8,
  },
  filterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginBottom: 16,
  },
  filterIconsContainer: {
    flexDirection: 'row',
  },
  filterButton: {
    marginHorizontal: 8,
  },
  filterText: {
    fontSize: 16,
    color: '#333',
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
  },
});

export default HomeScreen;
