import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, ScrollView } from 'react-native';
import { TextInput, Button, HelperText } from 'react-native-paper';
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from '@/app/config/firebase';

import { NavigationProp } from '@react-navigation/native';

interface Props {
  navigation: NavigationProp<any>;
}

const ForgotPasswordScreen: React.FC<Props> = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [message, setMessage] = useState('');

  const handleResetPassword = async () => {
    if (!email.includes('@')) {
      setEmailError('Please enter a valid email address');
      return;
    }

    try {
      await sendPasswordResetEmail(auth, email);
      setMessage('Password reset email sent. Please check your inbox.');
    } catch (error: any) {
      setEmailError(`An error occurred: ${error.message}`);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.formContainer}>
        <Text style={styles.title}>Forgot Password</Text>
        <TextInput
          label="Email"
          value={email}
          onChangeText={(text) => {
            setEmail(text);
            setEmailError('');
            setMessage('');
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
        <HelperText type="info" visible={!!message}>
          {message}
        </HelperText>
        <Button mode="contained" onPress={handleResetPassword} style={styles.button}>
          Reset Password
        </Button>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.linkButtonText}>Back to Login</Text>
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
  linkButtonText: {
    color: '#007BFF',
    textAlign: 'center',
    fontSize: 16,
    marginTop: 12,
    fontWeight: 'bold',
  },
});

export default ForgotPasswordScreen;
