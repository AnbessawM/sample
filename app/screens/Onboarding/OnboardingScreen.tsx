import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  Button,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '@/types/navigation'; // Adjust the import path as necessary
import { useWindowDimensions } from 'react-native';

const OnboardingScreen: React.FC = () => {
  const { width } = useWindowDimensions();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [currentPage, setCurrentPage] = useState(0); // Moved useState to the top level

  const scrollViewRef = React.useRef<ScrollView>(null);

  const handleScroll = (event: any) => {
    const pageIndex = Math.round(event.nativeEvent.contentOffset.x / width);
    setCurrentPage(pageIndex);
  };

  const navigateToPage = (pageIndex: number) => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo({ x: pageIndex * width, animated: true });
      setCurrentPage(pageIndex);
    }
  };

  const handleGetStarted = () => {
    console.log('Onboarding complete');
    navigation.navigate('Login'); // Navigate to Login after onboarding
  };

  const handleSkip = () => {
    console.log('Onboarding skipped');
    navigation.navigate('Login'); // Navigate to Login after skipping onboarding
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TouchableOpacity style={styles.skipButton} onPress={handleSkip}>
        <Text style={styles.skipButtonText}>Skip</Text>
      </TouchableOpacity>
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      >
        <View style={[styles.page, { width }]}>
          <Image
            source={require('@/assets/images/onboarding/onboarding-image.png')}
            style={styles.image}
          />
          <Text style={styles.title}>Welcome to Our App!</Text>
          <Text style={styles.description}>
            Discover amazing products and features.
          </Text>
        </View>
        <View style={[styles.page, { width }]}>
          <Image
            source={require('@/assets/images/onboarding/onboarding-image.png')}
            style={styles.image}
          />
          <Text style={styles.title}>Fast and Secure</Text>
          <Text style={styles.description}>
            Enjoy a seamless shopping experience.
          </Text>
        </View>
        <View style={[styles.page, { width }]}>
          <Image
            source={require('@/assets/images/onboarding/onboarding-image.png')}
            style={styles.image}
          />
          <Text style={styles.title}>Get Started Now!</Text>
          <Text style={styles.description}>
            Join us and explore the app.
          </Text>
          <Button
            title="Get Started"
            onPress={handleGetStarted}
            color="#007BFF"
          />
        </View>
      </ScrollView>
      <View style={styles.progressBarContainer}>
        <View style={[styles.progressBar, { width: `${(currentPage + 1) / 3 * 100}%` }]} />
      </View>
      <View style={styles.indicatorContainer}>
        {[0, 1, 2].map((_, index) => (
          <TouchableOpacity key={index} onPress={() => navigateToPage(index)}>
            <View
              style={[
                styles.indicator,
                currentPage === index
                  ? styles.activeIndicator
                  : styles.inactiveIndicator,
              ]}
            />
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#fff',
  },
  page: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  image: {
    width: 300,
    height: 300,
    resizeMode: 'contain',
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 40,
  },
  button: {
    backgroundColor: '#007BFF',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  indicatorContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  indicator: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  activeIndicator: {
    backgroundColor: '#007BFF',
  },
  inactiveIndicator: {
    backgroundColor: '#ccc',
  },
  skipButton: {
    position: 'absolute',
    top: 40,
    right: 20,
    zIndex: 1,
  },
  skipButtonText: {
    fontSize: 16,
    color: '#007BFF',
  },
  progressBarContainer: {
    height: 4,
    backgroundColor: '#ccc',
    width: '100%',
    marginTop: 16,
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#007BFF',
  },
});

export default OnboardingScreen;

