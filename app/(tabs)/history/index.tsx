import React, { useState } from 'react';
import { View, StyleSheet, FlatList, Text, useWindowDimensions, TouchableOpacity, Image } from 'react-native';
import { useTheme, TextInput, Card, Title, Paragraph, Divider, IconButton, FAB, Button } from 'react-native-paper';
import { useOrderHistory } from '@/hooks/useOrderHistory';
import { useRouter } from 'expo-router';
import { format } from 'date-fns';

const OrderHistory = () => {
  const { colors } = useTheme();
  const { width } = useWindowDimensions();
  const { orders, clearOrderHistory, removeOrder } = useOrderHistory();
  const [searchTerm, setSearchTerm] = useState('');
  const router = useRouter();

  const filteredOrders = orders.filter((order) =>
    order.items.some((item) => item.title.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  if (!orders.length) {
    return (
      <View style={[styles.centerContainer, { backgroundColor: colors.background }]}>
        <Text style={[styles.emptyMessage, { color: colors.onSurface }]}>No orders found.</Text>
        <Button mode="contained" onPress={() => router.push('/')} style={styles.browseButton}>
          Browse Products
        </Button>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} colors={colors} />
      <FlatList
        data={filteredOrders}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <OrderCard item={item} colors={colors} router={router} removeOrder={removeOrder} />
        )}
        contentContainerStyle={{ padding: 16 }}
      />
      <FAB
        icon="delete-sweep"
        onPress={clearOrderHistory}
        style={styles.fab}
        color={colors.error}
      />
    </View>
  );
};

const SearchBar = ({ searchTerm, setSearchTerm, colors }: { searchTerm: string; setSearchTerm: (text: string) => void; colors: any }) => (
  <View style={styles.searchContainer}>
    <TextInput
      placeholder="Search orders..."
      value={searchTerm}
      onChangeText={setSearchTerm}
      style={[
        styles.searchInput,
        { backgroundColor: colors.surface, color: colors.onSurface },
      ]}
      placeholderTextColor={colors.onSurface}
    />
  </View>
);

interface OrderItem {
  id: number;
  title: string;
  image: string;
  quantity: number;
}

interface Order {
  id: number;
  items: OrderItem[];
  date: string;
  total: number;
}

const OrderCard = ({ item, colors, router, removeOrder }: { item: Order; colors: any; router: any; removeOrder: (id: number) => void }) => (
  <Card style={[styles.card, { backgroundColor: colors.surface }]}>
    <Card.Content>
      {item.items.map((orderItem, index) => (
        <React.Fragment key={index}>
          <View style={styles.cardHeader}>
            <Title style={[styles.title, { color: colors.onSurface }]}>Order Item ID: {orderItem.id}</Title>
            <IconButton
              icon="delete"
              onPress={() => removeOrder(item.id)}
              size={24}
              style={styles.removeButton}
              iconColor={colors.error}
              underlayColor='red'
              animated={true}
            />
          </View>
          <TouchableOpacity
            key={orderItem.id}
            style={[styles.itemContainer]}
            onPress={() => router.push(`/shared/ProductDetailScreen?id=${orderItem.id}`)}
          >
            <View style={styles.itemDetails}>
              <Text style={[styles.itemTitle, { color: colors.onSurface }]}>{orderItem.title}</Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Image source={{ uri: orderItem.image }} style={styles.itemImage} />
              <Text style={[styles.itemQuantity, { color: colors.onSurface }]}>x{orderItem.quantity}</Text>
            </View>
          </TouchableOpacity>
        </React.Fragment>
      ))}
      <Divider style={styles.divider} />
      <Paragraph style={[styles.date, { color: colors.onSurface }]}>
        Date: {format(new Date(item.date), 'MMMM dd, yyyy')}
      </Paragraph>
      <Paragraph style={[styles.total, { color: colors.primary }]}>Total: ${item.total.toFixed(2)}</Paragraph>
    </Card.Content>
  </Card>
);

const styles = StyleSheet.create({
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyMessage: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 16,
  },
  browseButton: {
    marginTop: 16,
  },
  searchContainer: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    backgroundColor: '#f8f9fa',
  },
  searchInput: {
    borderRadius: 25,
    height: 50,
    paddingHorizontal: 15,
    fontSize: 16,
  },
  card: {
    marginBottom: 16,
    borderRadius: 8,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    marginBottom: 8,
  },
  date: {
    fontSize: 16,
    marginBottom: 8,
  },
  total: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  divider: {
    marginVertical: 8,
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
    paddingVertical: 8,
  },
  itemTitle: {
    fontSize: 16,
  },
  itemQuantity: {
    fontSize: 40,
  },
  errorText: {
    fontSize: 16,
    textAlign: 'center',
  },
  removeButton: {
    marginTop: 10,
  },
  fab: {
    position: 'absolute',
    right: 16,
    bottom: 16,
  },
  itemDetails: {
    flex: 1,
  },
  itemImage: {
    width: 50,
    height: 50,
    borderRadius: 5,
  },
  itemPrice: {
    fontSize: 14,
  },
});

export default OrderHistory;
