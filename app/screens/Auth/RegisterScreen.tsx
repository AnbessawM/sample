import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { TextInput, Button, HelperText } from 'react-native-paper';
import { useAuth } from '@/hooks/useAuth';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '@/types/navigation';

type RegisterScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Register'
>;

const RegisterScreen = ({ navigation }: { navigation: RegisterScreenNavigationProp }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { register } = useAuth();
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const handleRegister = () => {
    if (!email.includes('@')) {
      setEmailError('Please enter a valid email address');
      return;
    }
    if (password.length < 6) {
      setPasswordError('Password must be at least 6 characters long');
      return;
    }
    register(email, password);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register</Text>
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
        secureTextEntry
        error={!!passwordError}
      />
      <HelperText type="error" visible={!!passwordError}>
        {passwordError}
      </HelperText>
      <Button mode="contained" onPress={handleRegister} style={styles.button}>
        Register
      </Button>
      <Text style={styles.infoText}>Already have an account?</Text>
      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={styles.linkButtonText}>Login</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
    backgroundColor: '#f5f5f5',
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

export default RegisterScreen;
