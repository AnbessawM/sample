import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '@/app/screens/Home/HomeScreen';
import ProductDetailScreen from '@/app/screens/Home/ProductDetailScreen';
import CartScreen from '@/app/screens/Cart/CartScreen';
import ProfileScreen from '@/app/screens/Profile/ProfileScreen';
import PaymentScreen from '@/app/screens/Payment/PaymentScreen';
import WishlistScreen from '@/app/screens/Wishlist/WishlistScreen';
import { Ionicons } from '@expo/vector-icons';
import OrderConfirmationScreen from '@/app/screens/OrderConfirmation/OrderConfirmationScreen';
import { useCart } from '@/hooks/useCart';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function HomeStackScreen() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="HomeScreen" component={HomeScreen} options={{ headerShown: false }} />
      <Stack.Screen name="ProductDetail" component={ProductDetailScreen} />
    </Stack.Navigator>
  );
}

function CartStackScreen() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="CartScreen" component={CartScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Payment" component={PaymentScreen} />
      <Stack.Screen name="OrderConfirmation" component={OrderConfirmationScreen} />
    </Stack.Navigator>
  );
}

function WishlistStackScreen() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="WishlistScreen" component={WishlistScreen} options={{ headerShown: false }} />
      <Stack.Screen name="ProductDetail" component={ProductDetailScreen} />
    </Stack.Navigator>
  );
}

const MainNavigator = () => {
  const { cartItems } = useCart();
  const totalItems = cartItems.reduce((acc, cur) => acc + cur.quantity, 0);

  return (
    <Tab.Navigator>
      <Tab.Screen 
        name="Home" 
        component={HomeStackScreen} 
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" color={color} size={size} />
          ),
        }} 
      />
      <Tab.Screen 
        name="Wishlist" 
        component={WishlistStackScreen} 
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="heart" color={color} size={size} />
          ),
        }} 
      />
      <Tab.Screen 
        name="Cart" 
        component={CartStackScreen} 
        options={{
          headerShown: false,
          tabBarBadge: totalItems > 0 ? totalItems : undefined,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="cart" color={color} size={size} />
          ),
        }} 
      />
      <Tab.Screen 
        name="Profile" 
        component={ProfileScreen} 
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person" color={color} size={size} />
          ),
        }} 
      />
    </Tab.Navigator>
  );
};

export default MainNavigator;

