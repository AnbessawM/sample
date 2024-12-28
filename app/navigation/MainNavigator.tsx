import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '@/app/screens/Home/HomeScreen';
import CartScreen from '@/app/screens/Cart/CartScreen';
import ProfileScreen from '@/app/screens/Profile/ProfileScreen';

const Tab = createBottomTabNavigator();

const MainNavigator = () => (
  <Tab.Navigator>
    <Tab.Screen name="Home" component={HomeScreen} />
    <Tab.Screen name="Cart" component={CartScreen} />
    <Tab.Screen name="Profile" component={ProfileScreen} />
  </Tab.Navigator>
);

export default MainNavigator;
