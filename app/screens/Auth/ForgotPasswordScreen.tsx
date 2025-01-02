import { auth } from '@/app/config/firebase';
import { sendPasswordResetEmail } from "firebase/auth";
import React, { useState } from 'react';
import { ActivityIndicator, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Button, HelperText, Snackbar, TextInput, useTheme } from 'react-native-paper';

import { NavigationProp } from '@react-navigation/native';

interface Props {
  navigation: NavigationProp<any>;
}

const ForgotPasswordScreen: React.FC<Props> = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [message, setMessage] = useState('');
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const { colors } = useTheme();

  const handleResetPassword = async () => {
    if (!email.includes('@')) {
      setEmailError('Please enter a valid email address');
      return;
    }

    try {
      setLoading(true);
      await sendPasswordResetEmail(auth, email);
      setMessage(`Password reset link sent to ${email}. Please check your inbox.`);
      setVisible(true);
      setLoading(false);
    } catch (error: any) {
      setEmailError(`An error occurred: ${error.message}`);
      setLoading(false);
    }
  };

  const handleDismissSnackbar = () => {
    navigation.navigate('Login');
    setVisible(false);
  };

  return (
    <ScrollView contentContainerStyle={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.formContainer}>
        <Text style={[styles.title, { color: colors.onSurface }]}>Forgot Password</Text>
        <TextInput
          label="Email"
          value={email}
          onChangeText={(text) => {
            setEmail(text);
            setEmailError('');
            setMessage('');
          }}
          mode="outlined"
          style={[styles.input, { backgroundColor: colors.surface, color: colors.onSurface }]}
          keyboardType="email-address"
          autoCapitalize="none"
          error={!!emailError}
        />
        <HelperText type="error" visible={!!emailError}>
          {emailError}
        </HelperText>
        <Button mode="contained" onPress={handleResetPassword} style={[styles.button, { backgroundColor: colors.primary }]} disabled={loading}>
          {loading ? <ActivityIndicator animating={true} color="#fff" /> : 'Reset Password'}
        </Button>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.linkButtonText}>Back to Login</Text>
        </TouchableOpacity>
      </View>
      <Snackbar
        visible={visible}
        onDismiss={handleDismissSnackbar}
        duration={1000}
      >
        {message}
      </Snackbar>
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
