import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Button, Surface, useTheme } from 'react-native-paper';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'expo-router';
import Icon from '@expo/vector-icons/MaterialIcons';
import Animated, { useSharedValue, useAnimatedStyle, interpolate, Extrapolate, useAnimatedScrollHandler } from 'react-native-reanimated';
import { ScrollView } from 'react-native-gesture-handler';

const ProfileScreen = () => {
  const { user, logout } = useAuth();
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [bio, setBio] = useState<string>('A short bio about the user.');
  const [phone, setPhone] = useState<string>('123-456-7890');
  const [address, setAddress] = useState<string>('123 Main St, City, Country');
  const { colors } = useTheme();
  const router = useRouter();

  const scrollY = useSharedValue(0);

  useEffect(() => {
    if (user) {
      setName(user.displayName || '');
      setEmail(user.email || '');
      // Set other user information if available
    }
  }, [user]);

  const handleLogout = async () => {
    await logout();
    router.replace('./auth/LoginScreen');
  };

  const handleSettings = () => {
    router.push('/(tabs)/profile/SettingsScreen');
  };

  const handleEditProfile = () => {
    router.push('/(tabs)/profile/EditProfileScreen');
  };

  const animatedHeaderStyle = useAnimatedStyle(() => {
    return {
      height: interpolate(scrollY.value, [0, 200], [200, 70], Extrapolate.CLAMP),
    };
  });

  const animatedImageStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: interpolate(scrollY.value, [-200, 0, 200], [2, 1, 0.8], Extrapolate.CLAMP),
        },
      ],
    };
  });

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollY.value = event.contentOffset.y;
    },
  });

  return (
    <Surface style={[styles.container, { backgroundColor: colors.background }]}>
      <Animated.View style={[styles.imageContainer, animatedHeaderStyle]}>
        <Animated.Image source={require('@/assets/images/onboarding/onboarding-image1.jpg')} style={[styles.headerImage, animatedImageStyle]} />
      </Animated.View>
      <View style={styles.header}>
        <TouchableOpacity style={styles.editProfile} onPress={handleEditProfile}>
          <Icon name="edit" size={24} color={colors.onSurface} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.settings} onPress={handleSettings}>
          <Icon name="settings" size={24} color={colors.onSurface} />
        </TouchableOpacity>
      </View>
      <Animated.ScrollView
        contentContainerStyle={styles.scrollContent}
        onScroll={scrollHandler}
        scrollEventThrottle={16}
        
      >
        <View style={styles.content}>
          <View style={styles.profileHeader}>
            <View style={styles.profileInfo}>
              <Text style={[styles.profileName, { color: colors.onSurface }]}>{name}</Text>
              <Text style={{ color: colors.onSurface }}>{email}</Text>
              <Text style={{ color: colors.onSurface }}>{phone}</Text>
              <Text style={{ color: colors.onSurface }}>{address}</Text>
            </View>
          </View>
          <Text style={[styles.bio, { color: colors.onSurface }]}>{bio}</Text>
        </View>
      </Animated.ScrollView>
    </Surface>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 0, // Remove padding to ensure full-width image
  },
  header: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    zIndex: 1,
    paddingHorizontal: 16, // Add padding to header instead
    position: 'absolute',
    top: 0,
  },
  imageContainer: {
    width: '100%',
    height: 200,
    zIndex: 0,
    overflow: 'hidden',
  },
  headerImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  editProfile: {
    marginLeft: 16,
  },
  settings: {
    marginRight: 16,
  },
  scrollContent: {
    paddingHorizontal: 16, // Add padding to scroll content
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 200,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  profileInfo: {
    flex: 1,
    alignItems: 'center',
    marginHorizontal: 16,
  },
  profileName: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  bio: {
    marginTop: 16,
    fontStyle: 'italic',
    textAlign: 'center',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 16,
  },
  button: {
    marginHorizontal: 8,
  },
  placeholderContent: {
    marginTop: 16,
    alignItems: 'center',
  },
});

export default ProfileScreen;