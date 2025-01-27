import React from 'react';
import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useColorScheme } from 'react-native';
import { useCart } from '@/hooks/useCart';
const TabsLayout = () => {
  const colorScheme = useColorScheme();
  const { cartItems } = useCart();
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
        name="index" 
        options={{
          tabBarIcon: ({ color, size }) => <Ionicons name="home" color={color} size={size} />,
          title: 'Home',
          headerShown: false,
        }} 
      />
      <Tabs.Screen 
        name="wishlist" 
        options={{
          tabBarIcon: ({ color, size }) => <Ionicons name="heart" color={color} size={size} />,
          title: 'Wishlist',
          headerShown: false,
        }} 
      />
      <Tabs.Screen 
        name="cart" 
        options={{
          tabBarBadge: totalItems > 0 ? totalItems : undefined,
          tabBarIcon: ({ color, size }) => <Ionicons name="cart" color={color} size={size} />,
          title: 'Cart',
          headerShown: false,
        }} 
      />
      <Tabs.Screen 
        name="history" 
        options={{
          tabBarIcon: ({ color, size }) => <Ionicons name="list" color={color} size={size} />,
          title: 'History',
          headerShown: false,
        }} 
      />
      <Tabs.Screen 
        name="profile" 
        options={{
          tabBarIcon: ({ color, size }) => <Ionicons name="person" color={color} size={size} />,
          title: 'Profile',
          headerShown: false,
        }} 
      />
    </Tabs>
  );
};

export default TabsLayout;