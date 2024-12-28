import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '@/app/screens/Home/HomeScreen';
import ProductDetailScreen from '@/app/screens/Home/ProductDetailScreen';
import CartScreen from '@/app/screens/Cart/CartScreen';
import ProfileScreen from '@/app/screens/Profile/ProfileScreen';
import PaymentScreen from '@/app/screens/Payment/PaymentScreen';
import { Text } from 'react-native';
import { useCart } from '@/hooks/useCart';
import { Menu, IconButton } from 'react-native-paper';
import OrderConfirmationScreen from '@/app/screens/OrderConfirmation/OrderConfirmationScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function HomeStackScreen() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="HomeScreen" component={HomeScreen} 
      options={{ headerShown: false }} />
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

const MainNavigator = () => {
  const { cartItems } = useCart();
  const totalItems = cartItems.reduce((acc, cur) => acc + cur.quantity, 0);

  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeStackScreen} options={{
        headerShown: false,
      }} />
      <Tab.Screen name="Cart" component={CartStackScreen} options={{
        headerShown: false,
        tabBarBadge: totalItems > 0 ? totalItems : undefined,
      }} />
      <Tab.Screen name="Profile" component={ProfileScreen} options={{
        headerShown: false,
      }} />
    </Tab.Navigator>
  );
};
export default MainNavigator;

