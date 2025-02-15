import CategoryBar from '@/components/CategoryBar';
import SearchBar from '@/components/layout/Header/SearchBar';
import SubcategoryBar from '@/components/SubcategoryBar';
import { Feather, MaterialIcons } from '@expo/vector-icons';
import { useTheme } from '@react-navigation/native';
import React, { useEffect, useRef, useState } from 'react';
import { Dimensions, ScrollView, StyleSheet, Text, View } from 'react-native';

const { width } = Dimensions.get('window');

const Header = ({ onSearchFocus }: { onSearchFocus: (active: boolean) => void }) => {
  const { colors } = useTheme();
  const [isSmallScreen, setIsSmallScreen] = useState(width < 768);
  const [isSearchModalVisible, setIsSearchModalVisible] = useState(false);
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
      {isSmallScreen && (
        <Feather name="search" size={20} color={colors.text} style={styles.icon} onPress={() => setIsSearchModalVisible(true)} />
      )}
      <MaterialIcons name="person-outline" size={20} color={colors.text} style={styles.icon} />
      <MaterialIcons name="favorite-border" size={20} color={colors.text} style={styles.icon} />
      <MaterialIcons name="shopping-bag" size={20} color={colors.text} style={styles.icon} />
      <Feather name="menu" size={20} color={colors.text} style={styles.icon} />
    </View>
  );

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.topContainer}>
        {renderLogo()}
        <View style={styles.rightContainer}>
          {!isSmallScreen && <SearchBar onSearchActive={onSearchFocus} isSearchModalVisible={isSearchModalVisible} onCloseSearchModal={() => setIsSearchModalVisible(false)} />}
          {renderIcons()}
        </View>
      </View>
      {isSmallScreen && isSearchModalVisible && (
        <SearchBar onSearchActive={onSearchFocus} isSearchModalVisible={isSearchModalVisible} onCloseSearchModal={() => setIsSearchModalVisible(false)} />
      )}
      <CategoryBar />
      <SubcategoryBar />
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    paddingTop: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    paddingHorizontal: 15,
    position: 'relative',
  },
  topContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    zIndex: 20,
  },
  logo: {
    fontSize: 18, // Decreased the font size
    fontWeight: '500',
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginLeft: 15,
    fontSize: 20, // Decreased the icon size
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
    fontSize: 10, // Decreased the font size
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
    fontSize: 8, // Decreased the font size
  },
  scrollButton: {
    padding: 5,
  },
  rightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

