import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Button, Card, Surface } from 'react-native-paper';
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

  useEffect(() => {
    if (user) {
      setName(user.displayName || '');
      setEmail(user.email || '');
    }
  }, [user]);

  return (
    <Surface style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Your Profile</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
          <Icon name="settings" size={24} color="#000" />
        </TouchableOpacity>
      </View>
      <Card style={styles.card}>
        <Card.Content>
          <Text style={styles.label}>Name</Text>
          <Text style={styles.value}>{name}</Text>
          <Text style={styles.label}>Email</Text>
          <Text style={styles.value}>{email}</Text>
          <Button mode="contained" onPress={logout} style={styles.button}>
            Logout
          </Button>
          <Text style={styles.status}>
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
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    elevation: 2,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  card: {
    padding: 16,
    borderRadius: 8,
    elevation: 2,
    backgroundColor: '#fff',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 16,
  },
  value: {
    fontSize: 16,
    color: '#333',
    marginBottom: 16,
  },
  button: {
    marginTop: 16,
  },
  status: {
    marginTop: 16,
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
  },
});

export default ProfileScreen;
