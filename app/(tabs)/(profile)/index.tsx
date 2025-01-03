import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Button, Card, Surface, useTheme } from 'react-native-paper';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'expo-router';
import Icon from '@expo/vector-icons/MaterialIcons';

const ProfileScreen = () => {
  const { user, logout } = useAuth();
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const { colors } = useTheme();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      setName(user.displayName || '');
      setEmail(user.email || '');
    }
  }, [user]);

  const handleLogout = async () => {
    await logout();
    router.replace('./auth/LoginScreen');
  };

  const handleSettings = () => {
    router.push('./tabs/profile/SettingsScreen');
  };

  return (
    <Surface style={[styles.container, { backgroundColor: colors.background }]}>
      <Card>
        <Card.Title title="Profile" titleStyle={{ color: colors.onSurface }} />
        <Card.Content>
          <Text style={{ color: colors.onSurface }}>Name: {name}</Text>
          <Text style={{ color: colors.onSurface }}>Email: {email}</Text>
        </Card.Content>
        <Card.Actions>
          <Button onPress={handleSettings} mode="contained" style={styles.button}>
            Settings
          </Button>
          <Button onPress={handleLogout} mode="contained" style={styles.button}>
            Logout
          </Button>
        </Card.Actions>
      </Card>
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
  button: {
    marginTop: 16,
  },
});

export default ProfileScreen;