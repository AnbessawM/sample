import React, { useState } from 'react';
import { View, StyleSheet, FlatList, Text, ActivityIndicator, useWindowDimensions, TouchableOpacity } from 'react-native';
import { useTheme, TextInput, Card, Title, Paragraph, Divider } from 'react-native-paper';
import { useOrderHistory } from '@/hooks/useOrderHistory';
import { useNavigation } from '@react-navigation/native';

const OrderHistory = () => {
  const { colors } = useTheme();
  const { width } = useWindowDimensions();
  const { orders } = useOrderHistory();
  const [searchTerm, setSearchTerm] = useState('');
  const navigation = useNavigation();

  const filteredOrders = orders.filter((order) =>
    order.items.some((item) => item.title.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  if (!orders.length) {
    return (
      <View style={[styles.centerContainer, { backgroundColor: colors.background }]}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
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
      <FlatList
        data={filteredOrders}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Card style={[styles.card, { backgroundColor: colors.surface }]}>
            <Card.Content>
              <Title style={[styles.title, { color: colors.onSurface }]}>Order #{item.id}</Title>
              <Paragraph style={[styles.date, { color: colors.onSurface }]}>Date: {item.date}</Paragraph>
              <Paragraph style={[styles.total, { color: colors.primary }]}>Total: ${item.total.toFixed(2)}</Paragraph>
              <Divider style={styles.divider} />
              {item.items.map((orderItem, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.itemContainer}
                  onPress={() => navigation.navigate('shared/ProductDetailScreen', { productId: item.id })}
                >
                  <Text style={[styles.itemTitle, { color: colors.onSurface }]}>{orderItem.title}</Text>
                  <Text style={[styles.itemQuantity, { color: colors.onSurface }]}>x{orderItem.quantity}</Text>
                </TouchableOpacity>
              ))}
            </Card.Content>
          </Card>
        )}
        contentContainerStyle={{ padding: 16 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
    fontSize: 16,
  },
  errorText: {
    fontSize: 16,
    textAlign: 'center',
  },
});

export default OrderHistory;
