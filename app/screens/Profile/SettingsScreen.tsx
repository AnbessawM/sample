import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Surface } from 'react-native-paper';

const SettingsScreen = () => {
  return (
    <Surface style={styles.container}>
      <Text style={styles.text}>Settings Screen</Text>
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
});

export default SettingsScreen;
