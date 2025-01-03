import React from 'react';
import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useColorScheme } from 'react-native';
import { useCart } from '@/hooks/useCart';

const MainNavigator = () => {
  const { cartItems } = useCart();
  const colorScheme = useColorScheme();
  const totalItems = cartItems.reduce((acc, cur) => acc + cur.quantity, 0);

  return (
    <Tabs
      screenOptions={{
        tabBarStyle: {
          backgroundColor: colorScheme === 'dark' ? '#333' : '#fff',
        },
        tabBarActiveTintColor: colorScheme === 'dark' ? '#fff' : '#000',
        tabBarInactiveTintColor: colorScheme === 'dark' ? '#888' : '#888',
      }}
    >
      <Tabs.Screen 
        name="home" 
        options={{
          tabBarIcon: ({ color, size }) => <Ionicons name="home" color={color} size={size} />,
        }} 
      />
      <Tabs.Screen 
        name="wishlist" 
        options={{
          tabBarIcon: ({ color, size }) => <Ionicons name="heart" color={color} size={size} />,
        }} 
      />
      <Tabs.Screen 
        name="cart" 
        options={{
          tabBarBadge: totalItems > 0 ? totalItems : undefined,
          tabBarIcon: ({ color, size }) => <Ionicons name="cart" color={color} size={size} />,
        }} 
      />
      <Tabs.Screen 
        name="order-history" 
        options={{
          tabBarIcon: ({ color, size }) => <Ionicons name="list" color={color} size={size} />,
        }} 
      />
      <Tabs.Screen 
        name="profile" 
        options={{
          tabBarIcon: ({ color, size }) => <Ionicons name="person" color={color} size={size} />,
        }} 
      />
    </Tabs>
  );
};

export default MainNavigator;

