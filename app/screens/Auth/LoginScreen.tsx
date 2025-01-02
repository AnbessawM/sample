import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, ScrollView } from 'react-native';
import { TextInput, Button, HelperText } from 'react-native-paper';
import { signInWithEmailAndPassword } from "firebase/auth"; // Import from Firebase Web SDK
import { auth } from '@/app/config/firebase'; // Updated import path
import { RootStackParamList } from '@/types/navigation'; // Import navigation types
import { StackNavigationProp } from '@react-navigation/stack';

type LoginScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Login'>;

const LoginScreen = ({ navigation }: { navigation: LoginScreenNavigationProp }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async () => {
    if (!email.includes('@')) {
      setEmailError('Please enter a valid email address');
      return;
    }
  
    if (password.length < 6) {
      setPasswordError('Password must be at least 6 characters long');
      return;
    }
  
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigation.navigate('Main');
    } catch (error: any) {
      if (error.code === 'auth/user-not-found') {
        setEmailError('No user found with this email.');
      } else if (error.code === 'auth/wrong-password') {
        setPasswordError('Incorrect password.');
      } else {
        setEmailError(`An unexpected error occurred: ${error.message}`);
      }
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.formContainer}>
        <Text style={styles.title}>Login</Text>
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
        <Button mode="contained" onPress={handleLogin} style={styles.button}>
          Login
        </Button>
        <Text style={styles.infoText}>Don't have an account?</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Register')}>
          <Text style={styles.linkButtonText}>Register</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
          <Text style={styles.linkButtonText}>Forgot Password?</Text>
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
    color: '#333',
  },
  input: {
    marginBottom: 12,
  },
  button: {
    marginVertical: 12,
  },
  infoText: {
    color: '#666',
    textAlign: 'center',
    fontSize: 16,
    marginTop: 12,
  },
  linkButtonText: {
    color: '#007BFF',
    textAlign: 'center',
    fontSize: 16,
    marginTop: 12,
    fontWeight: 'bold',
  },
});

export default LoginScreen;
