import { useAuth } from '@/hooks/useAuth';
import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { Surface } from 'react-native-paper';

const SettingsScreen = () => {
  const { user } = useAuth();

  return (
    <Surface style={styles.container}>
      <Text style={styles.text}>Settings Screen</Text>
      <Text style={styles.status}>
        {user ? 'Logged in' : 'Not logged in'}
      </Text>
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
    fontSize: 18,
    fontWeight: 'bold',
  },
  status: {
    marginTop: 16,
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
  },
});

export default SettingsScreen;
