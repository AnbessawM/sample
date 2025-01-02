import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Button, Card, Surface, useTheme } from 'react-native-paper';
import { useAuth } from '@/hooks/useAuth';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '@/types/navigation';
import Icon from '@expo/vector-icons/MaterialIcons';

type ProfileScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Profile' | 'Settings'
>;

const ProfileScreen = ({ navigation }: { navigation: ProfileScreenNavigationProp }) => {
  const { user, logout } = useAuth();
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const { colors } = useTheme();

  useEffect(() => {
    if (user) {
      setName(user.displayName || '');
      setEmail(user.email || '');
    }
  }, [user]);

  return (
    <Surface style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.onSurface }]}>Your Profile</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
          <Icon name="settings" size={24} color={colors.onSurface} />
        </TouchableOpacity>
      </View>
      <Card style={[styles.card, { backgroundColor: colors.surface }]}>
        <Card.Content>
          <Text style={[styles.label, { color: colors.onSurface }]}>Name</Text>
          <Text style={[styles.value, { color: colors.onSurface }]}>{name}</Text>
          <Text style={[styles.label, { color: colors.onSurface }]}>Email</Text>
          <Text style={[styles.value, { color: colors.onSurface }]}>{email}</Text>
          <Button mode="contained" onPress={logout} style={styles.button}>
            Logout
          </Button>
          <Text style={[styles.status, { color: colors.onSurface }]}>
            {user ? 'Logged in' : 'Not logged in'}
          </Text>
        </Card.Content>
      </Card>
    </Surface>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    padding: 16,
    borderRadius: 8,
    elevation: 2,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  card: {
    padding: 16,
    borderRadius: 8,
    elevation: 2,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 16,
  },
  value: {
    fontSize: 16,
    marginBottom: 16,
  },
  button: {
    marginTop: 16,
  },
  status: {
    marginTop: 16,
    fontSize: 16,
    textAlign: 'center',
  },
});

export default ProfileScreen;
