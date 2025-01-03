import React, { useState, useRef, useEffect } from 'react';
import { View, ScrollView, StyleSheet, Text, Image, useWindowDimensions, TouchableOpacity } from 'react-native';
import { Button, useTheme } from 'react-native-paper';
import { useRouter } from 'expo-router';

const OnboardingScreen: React.FC = () => {
  const { width, height } = useWindowDimensions();
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(0);
  const { colors } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const scrollViewRef = useRef<ScrollView>(null);

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
    if (mounted) {
      console.log('Onboarding complete');
      router.replace('../(tabs)/(home)');
    }
  };

  const handleSkip = () => {
    if (mounted) {
      console.log('Onboarding skipped');
      router.replace('../(tabs)/(home)');
    }
  };

  const images = [
    require('@/assets/images/onboarding/onboarding-image1.jpg'),
    require('@/assets/images/onboarding/onboarding-image2.jpg'),
    require('@/assets/images/onboarding/onboarding-image3.jpg'),
  ];

  return (
    <View style={[styles.container, { backgroundColor: colors.background, height }]}>
      <TouchableOpacity style={styles.skipButton} onPress={handleSkip}>
        <Text style={[styles.skipButtonText, { color: colors.primary }]}>Skip</Text>
      </TouchableOpacity>
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      >
        {images.map((image, index) => (
          <View key={index} style={[styles.page, { width, height }]}>
            <Image
              source={image}
              resizeMode="cover"
              style={styles.backgroundImage}
            />
            <View style={styles.overlay}>
              <Text style={[styles.title, { color: colors.onSurface }]}>
                {/* {index === 0 ? "Welcome to Our App!" : index === 1 ? "Fast and Secure" : "Get Started Now!"} */}
              </Text>
              <Text style={[styles.description, { color: colors.onSurface }]}>
                {/* {index === 0 ? "Discover amazing products and features." : index === 1 ? "Enjoy a seamless shopping experience." : "Join us and explore the app."} */}
              </Text>
            </View>
          </View>
        ))}
      </ScrollView>
      <View style={[styles.indicatorContainer, { alignSelf: 'center' }]}>
        {[0, 1, 2].map((_, index) => (
          <TouchableOpacity key={index} onPress={() => navigateToPage(index)}>
            <View
              style={[
                styles.indicator,
                currentPage === index
                  ? [styles.activeIndicator, { backgroundColor: colors.primary }]
                  : [styles.inactiveIndicator, { backgroundColor: colors.onSurfaceDisabled }],
              ]}
            />
          </TouchableOpacity>
        ))}
      </View>
      <View style={[styles.buttonContainer, { alignSelf: 'center' }]}>
        <Button
          mode="contained"
          onPress={currentPage === 2 ? handleGetStarted : () => navigateToPage(currentPage + 1)}
          contentStyle={{ backgroundColor: colors.primary }}
        >
          <Text style={styles.buttonText}>
            {currentPage === 2 ? "Get Started" : "Next"}
          </Text>
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
  page: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  backgroundImage: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 40,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 20,
    width: '60%',
    alignSelf: 'center',
    borderRadius: 25,
    overflow: 'hidden',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  indicatorContainer: {
    position: 'absolute',
    bottom: 80,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
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
  },
});

export default OnboardingScreen;