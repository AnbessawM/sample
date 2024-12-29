import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { TextInput, Button, Card, Surface } from 'react-native-paper';
import { useAuth } from '@/hooks/useAuth';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '@/types/navigation';
import Icon from '@expo/vector-icons/MaterialIcons';

type ProfileScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Profile' | 'Settings'
>;

const ProfileScreen = ({ navigation }: { navigation: ProfileScreenNavigationProp }) => {
  const { user, updateUser } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
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
      <Card>
        <Card.Content>
          <TextInput
            label="Name"
            value={name}
            onChangeText={setName}
            style={styles.input}
          />
          <TextInput
            label="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            style={styles.input}
          />
          <Button mode="contained" onPress={() => updateUser({ name, email })}>
            Save
          </Button>
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
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  input: {
    marginBottom: 16,
  },
});

export default ProfileScreen;
