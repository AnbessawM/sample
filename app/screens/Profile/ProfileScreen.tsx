import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { TextInput, Button, Card, Surface } from 'react-native-paper';
import { useAuth } from '@/hooks/useAuth';

const ProfileScreen = () => {
  const { user, updateUser } = useAuth();
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');

  return (
    <Surface style={styles.container}>
      <Card>
        <Card.Title title="Your Profile" />
        <Card.Content>
          <TextInput
            label="Name"
            value={name}
            onChangeText={setName}
            style={{ marginBottom: 16 }}
          />
          <TextInput
            label="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            style={{ marginBottom: 16 }}
          />
          <Button mode="contained" onPress={() => updateUser({ name, email })}>
            Save
          </Button>
        </Card.Content>
      </Card>
    </Surface>
  );
};

export default ProfileScreen;
