import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import OnboardingScreen from '@/app/screens/Onboarding/OnboardingScreen';
import LoginScreen from '@/app/screens/Auth/LoginScreen';
import RegisterScreen from '@/app/screens/Auth/RegisterScreen';

const Stack = createStackNavigator();

const AuthNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen name="Onboarding" component={OnboardingScreen} />
    <Stack.Screen name="Login" component={LoginScreen} />
    <Stack.Screen name="Register" component={RegisterScreen} />
  </Stack.Navigator>
);

export default AuthNavigator;
