import React, { useState, useEffect } from 'react';
import { useColorScheme } from 'react-native';
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
import SettingsScreen from '@/app/screens/Profile/SettingsScreen';
import OrderHistory from '@/app/screens/OrderHistory/OrderHistory';
import ForgotPasswordScreen from '@/app/screens/Auth/ForgotPasswordScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const screenOptions = { headerShown: false };
interface TabBarIconProps {
  color: string;
  size: number;
}

const tabBarIcon = (name: keyof typeof Ionicons.glyphMap) => ({ color, size }: TabBarIconProps) => <Ionicons name={name} color={color} size={size} />;

const HomeStackScreen = () => (
  <Stack.Navigator>
    <Stack.Screen name="HomeScreen" component={HomeScreen} options={screenOptions} />
    <Stack.Screen name="ProductDetail" component={ProductDetailScreen} />
  </Stack.Navigator>
);

const CartStackScreen = () => {
  const [loading, setLoading] = useState(false);

  const handlePayment = () => {
    setLoading(true);
    // Implement payment handling logic here
    // After payment logic
    setLoading(false);
  };

  return (
    <Stack.Navigator>
      <Stack.Screen name="CartScreen" component={CartScreen} options={screenOptions} />
      <Stack.Screen 
        name="Payment" 
        initialParams={{ amount: 100, handlePayment }}
      >
        {props => {
          const { amount, handlePayment } = props.route.params as { amount: number; handlePayment: () => void };
          return <PaymentScreen {...props} loading={loading} amount={amount} handlePayment={handlePayment} />;
        }}
      </Stack.Screen>
      <Stack.Screen name="OrderConfirmation" component={OrderConfirmationScreen} />
    </Stack.Navigator>
  );
};

const WishlistStackScreen = () => (
  <Stack.Navigator>
    <Stack.Screen name="WishlistScreen" component={WishlistScreen} options={screenOptions} />
    <Stack.Screen name="ProductDetail" component={ProductDetailScreen} />
  </Stack.Navigator>
);

const ProfileStackScreen = () => (
  <Stack.Navigator>
    <Stack.Screen name="ProfileScreen" component={ProfileScreen} options={screenOptions} />
    <Stack.Screen name="Settings" component={SettingsScreen} />
    <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
  </Stack.Navigator>
);

const MainNavigator = () => {
  const { cartItems } = useCart();
  const colorScheme = useColorScheme();
  const totalItems = cartItems.reduce((acc, cur) => acc + cur.quantity, 0);

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: colorScheme === 'dark' ? '#333' : '#fff',
        },
        tabBarActiveTintColor: colorScheme === 'dark' ? '#fff' : '#000',
        tabBarInactiveTintColor: colorScheme === 'dark' ? '#888' : '#888',
      }}
    >
      <Tab.Screen 
        name="Home" 
        component={HomeStackScreen} 
        options={{
          ...screenOptions,
          tabBarIcon: tabBarIcon("home"),
        }} 
      />
      <Tab.Screen 
        name="Wishlist" 
        component={WishlistStackScreen} 
        options={{
          ...screenOptions,
          tabBarIcon: tabBarIcon("heart"),
        }} 
      />
      <Tab.Screen 
        name="Cart" 
        component={CartStackScreen} 
        options={{
          ...screenOptions,
          tabBarBadge: totalItems > 0 ? totalItems : undefined,
          tabBarIcon: tabBarIcon("cart"),
        }} 
      />
      <Tab.Screen 
        name="OrderHistory" 
        component={OrderHistory} 
        options={{
          ...screenOptions,
          tabBarIcon: tabBarIcon("list"),
        }} 
      />
      <Tab.Screen 
        name="Profile" 
        component={ProfileStackScreen} 
        options={{
          ...screenOptions,
          tabBarIcon: tabBarIcon("person"),
        }} 
      />
    </Tab.Navigator>
  );
};

export default MainNavigator;

