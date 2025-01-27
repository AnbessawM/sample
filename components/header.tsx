import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, ScrollView } from 'react-native';
import { Feather, FontAwesome } from '@expo/vector-icons';
import SearchBar from '@/components/search/components/SearchBar';

const { width } = Dimensions.get('window');

const Header = () => {
  const [isSmallScreen, setIsSmallScreen] = useState(width < 768); // Adjust the breakpoint as needed
  const scrollViewRef = useRef<ScrollView>(null);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(Dimensions.get('window').width < 768);
    };

    Dimensions.addEventListener('change', handleResize);
    return () => {
      Dimensions.removeEventListener('change', handleResize);
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

  const renderCategories = () => (
    <View style={styles.categoryBar}>
      {['WOMEN', 'CURVE', 'MEN', 'KIDS', 'BEAUTY'].map((category, index) => (
        <TouchableOpacity key={index} style={styles.categoryItem}>
          <Text style={styles.categoryText}>{category}</Text>
          {index === 0 && <View style={styles.categoryUnderline} />}
        </TouchableOpacity>
      ))}
    </View>
  );

  const renderSubcategories = () => (
    <View style={styles.subcategoryContainer}>
      <TouchableOpacity onPress={() => scrollViewRef.current?.scrollTo({ x: 0, animated: true })} style={styles.scrollButton}>
        <Feather name="chevron-left" size={24} color="black" />
      </TouchableOpacity>
      <ScrollView horizontal ref={scrollViewRef} showsHorizontalScrollIndicator={false} contentContainerStyle={styles.subcategoryBar}>
        {['NEW IN', 'CLOTHING', 'SALE', 'NOVA DEALS', 'DRESSES', 'MATCHING SETS', 'TOPS', 'JEANS', 'BOTTOMS', 'JACKETS & COATS', 'SWEATERS', 'JUMPSUITS'].map((subcategory, index) => (
          <TouchableOpacity key={index} style={styles.subcategoryItem}>
            <Text style={styles.subcategoryText}>{subcategory}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <TouchableOpacity onPress={() => scrollViewRef.current?.scrollToEnd({ animated: true })} style={styles.scrollButton}>
        <Feather name="chevron-right" size={24} color="black" />
      </TouchableOpacity>
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
      {renderCategories()}
      {renderSubcategories()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    paddingTop: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    paddingHorizontal: 10,
  },
  topContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logo: {
    fontSize: 20,
    fontWeight: '500',
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginLeft: 15,
  },
  searchBarContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  categoryBar: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginTop: 10,
    paddingBottom: 5,
  },
  categoryItem: {
    marginRight: 20,
  },
  categoryText: {
    fontWeight: 'bold',
    fontSize: 12,
  },
  categoryUnderline: {
    height: 3,
    width: '100%',
    backgroundColor: 'black',
    marginTop: 3,
  },
  subcategoryContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  subcategoryBar: {
    flexDirection: 'row',
    flexWrap: 'nowrap',
  },
  subcategoryItem: {
    marginRight: 10,
    marginBottom: 5,
  },
  subcategoryText: {
    fontSize: 10,
  },
  scrollButton: {
    padding: 5,
  },
});

export default Header;
