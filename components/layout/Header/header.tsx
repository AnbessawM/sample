import CategoryBar from '@/components/CategoryBar';
import SearchBar from '@/components/layout/Header/SearchBar';
import SubcategoryBar from '@/components/SubcategoryBar';
import { Feather, FontAwesome } from '@expo/vector-icons';
import { useTheme } from '@react-navigation/native';
import React, { useEffect, useRef, useState } from 'react';
import { Dimensions, ScrollView, Text, View, StyleSheet } from 'react-native';

const { width } = Dimensions.get('window');

const Header = ({ onSearchFocus }: { onSearchFocus: (active: boolean) => void }) => {
  const { colors } = useTheme();
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
    <Text style={[styles.logo, { color: colors.text }]}>
      Sample <Text style={{ fontWeight: 'bold' }}>Shop</Text>
    </Text>
  );

  const renderIcons = () => (
    <View style={styles.iconContainer}>
      <FontAwesome name="user-o" size={24} color={colors.text} style={styles.icon} />
      <FontAwesome name="heart-o" size={24} color={colors.text} style={styles.icon} />
      <FontAwesome name="shopping-bag" size={24} color={colors.text} style={styles.icon} />
      <Feather name="menu" size={24} color={colors.text} style={styles.icon} />
    </View>
  );

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.topContainer}>
        {renderLogo()}
        {isSmallScreen ? (
          renderIcons()
        ) : (
          <View style={styles.searchBarContainer}>
            <SearchBar onSearchActive={onSearchFocus} />
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

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    paddingTop: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    paddingHorizontal: 10,
    position: 'relative',
  },
  topContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    zIndex: 20,
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

