import { useAuth } from '@/hooks/useAuth';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Surface, Button } from 'react-native-paper';
import { useRouter } from 'expo-router';

const SettingsScreen = () => {
  const { user } = useAuth();
  const router = useRouter();

  const handleBackToProfile = () => {
    router.back();
  };

  return (
    <Surface style={styles.container}>
      <Text style={styles.text}>Settings Screen</Text>
      <Text style={styles.status}>
      </Text>
      <Button onPress={handleBackToProfile} mode="contained" style={styles.button}>
        Back to Profile
      </Button>
    </Surface>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  text: {
    fontSize: 24,
    marginBottom: 16,
  },
  status: {
    fontSize: 18,
    marginBottom: 16,
  },
  button: {
    marginTop: 16,
  },
});

export default SettingsScreen;