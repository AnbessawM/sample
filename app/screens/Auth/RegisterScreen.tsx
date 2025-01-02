import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Button, HelperText, TextInput } from 'react-native-paper';
import { auth } from '@/app/config/firebase'; // Updated import path
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";

import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '@/types/navigation'; // Adjust the import path as needed

type RegisterScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Register'>;

interface Props {
  navigation: RegisterScreenNavigationProp;
}

const RegisterScreen = ({ navigation }: Props) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleRegister = async () => {
    setError(''); // Clear any previous error
    if (!name.trim()) {
      setError('Name is required');
      return;
    }
    if (!email.includes('@')) {
      setEmailError('Please enter a valid email address');
      return;
    }
    if (password.length < 6) {
      setPasswordError('Password must be at least 6 characters long');
      return;
    }
    if (password !== confirmPassword) {
      setConfirmPasswordError('Passwords do not match');
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Update user profile with display name
      await updateProfile(user, { displayName: name });

      // Navigate to Home or show success
      navigation.navigate('Home');
    } catch (error: any) {
      if (error.code === 'auth/email-already-in-use') {
        setError('Email address is already in use');
      } else if (error.code === 'auth/invalid-email') {
        setError('Invalid email address');
      } else {
        setError('An error occurred. Please try again.');
      }
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.formContainer}>
        <Text style={styles.title}>Register</Text>
        <TextInput
          label="Name"
          value={name}
          onChangeText={setName}
          mode="outlined"
          style={styles.input}
        />
        <TextInput
          label="Email"
          value={email}
          onChangeText={(text) => {
            setEmail(text);
            setEmailError('');
          }}
          mode="outlined"
          style={styles.input}
          keyboardType="email-address"
          autoCapitalize="none"
          error={!!emailError}
        />
        <HelperText type="error" visible={!!emailError}>
          {emailError}
        </HelperText>
        <TextInput
          label="Password"
          value={password}
          onChangeText={(text) => {
            setPassword(text);
            setPasswordError('');
          }}
          mode="outlined"
          style={styles.input}
          secureTextEntry={!showPassword}
          right={
            <TextInput.Icon
              icon={showPassword ? "eye-off" : "eye"}
              onPress={() => setShowPassword(!showPassword)}
            />
          }
          error={!!passwordError}
        />
        <HelperText type="error" visible={!!passwordError}>
          {passwordError}
        </HelperText>
        <TextInput
          label="Confirm Password"
          value={confirmPassword}
          onChangeText={(text) => {
            setConfirmPassword(text);
            setConfirmPasswordError('');
          }}
          mode="outlined"
          style={styles.input}
          secureTextEntry={!showPassword}
          right={
            <TextInput.Icon
              icon={showPassword ? "eye-off" : "eye"}
              onPress={() => setShowPassword(!showPassword)}
            />
          }
          error={!!confirmPasswordError}
        />
        <HelperText type="error" visible={!!confirmPasswordError}>
          {confirmPasswordError}
        </HelperText>
        <Button mode="contained" onPress={handleRegister} style={styles.button}>
          Register
        </Button>
        <Text style={styles.infoText}>Already have an account?</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.linkButtonText}>Login</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  formContainer: {
    width: '100%',
    alignSelf: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center',
  },
  input: {
    marginBottom: 12,
  },
  button: {
    marginVertical: 12,
  },
  infoText: {
    textAlign: 'center',
    fontSize: 16,
  },
  linkButtonText: {
    color: '#007BFF',
    textAlign: 'center',
    fontSize: 16,
    marginTop: 12,
  },
});

export default RegisterScreen;
