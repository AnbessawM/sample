import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import OnboardingScreen from '@/app/screens/Onboarding/OnboardingScreen';
import LoginScreen from '@/app/screens/Auth/LoginScreen';
import RegisterScreen from '@/app/screens/Auth/RegisterScreen';
import ForgotPasswordScreen from '@/app/screens/Auth/ForgotPasswordScreen';

const Stack = createStackNavigator();

const AuthNavigator = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Onboarding" component={OnboardingScreen} />
    <Stack.Screen name="Login" component={LoginScreen} />
    <Stack.Screen name="Register" component={RegisterScreen} />
    <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
  </Stack.Navigator>
);

export default AuthNavigator;