import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Dimensions, ScrollView } from 'react-native';
import { Feather, FontAwesome } from '@expo/vector-icons';
import SearchBar from '@/components/search/components/SearchBar';
import CategoryBar from '@/components/CategoryBar';
import SubcategoryBar from '@/components/SubcategoryBar';
import styles from './HeaderStyles';

const { width } = Dimensions.get('window');

const Header = () => {
  const [isSmallScreen, setIsSmallScreen] = useState(width < 768);
  const scrollViewRef = useRef<ScrollView>(null);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(Dimensions.get('window').width < 768);
    };

    const subscription = Dimensions.addEventListener('change', handleResize);
    return () => {
      subscription.remove();
    };
  }, []);

  const renderLogo = () => (
    <Text style={styles.logo}>
      Sample
      <Text style={{ fontWeight: 'bold' }}> Shop</Text>
    </Text>
  );

  const renderIcons = () => (
    <View style={styles.iconContainer}>
      <FontAwesome name="user-o" size={24} color="black" style={styles.icon} />
      <FontAwesome name="heart-o" size={24} color="black" style={styles.icon} />
      <FontAwesome name="shopping-bag" size={24} color="black" style={styles.icon} />
      <Feather name="menu" size={24} color="black" style={styles.icon} />
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        {renderLogo()}
        {isSmallScreen ? renderIcons() : (
          <View style={styles.searchBarContainer}>
            <SearchBar />
            {renderIcons()}
          </View>
        )}
      </View>
      <CategoryBar />
      <SubcategoryBar />
    </View>
  );
};

export default Header;
