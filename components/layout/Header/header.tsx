import CategoryBar from '@/components/CategoryBar';
import SearchBar from '@/components/layout/Header/SearchBar';
import SubcategoryBar from '@/components/SubcategoryBar';
import { Feather, MaterialIcons } from '@expo/vector-icons';
import { useTheme } from '@react-navigation/native';
import React, { useEffect, useState, useMemo, useRef } from 'react';
import { Dimensions, Modal, ScrollView, StyleSheet, Text, View } from 'react-native';

const { width } = Dimensions.get('window');

const Header = ({ onSearchFocus }: { onSearchFocus: (active: boolean) => void }) => {
  const { colors } = useTheme();
  const [isSmallScreen, setIsSmallScreen] = useState(width < 768);
  const [isSearchModalVisible, setIsSearchModalVisible] = useState(false);
  const scrollViewRef = useRef<ScrollView>(null);

  useEffect(() => {
    const handleResize = () => setIsSmallScreen(Dimensions.get('window').width < 768);
    const subscription = Dimensions.addEventListener('change', handleResize);
    return () => subscription.remove();
  }, []);

  const renderLogo = useMemo(() => (
    <Text style={[styles.logo, { color: colors.text }]}>
      Sample <Text style={{ fontWeight: 'bold' }}>Shop</Text>
    </Text>
  ), [colors.text]);

  const renderIcons = useMemo(() => (
    <View style={styles.iconContainer}>
      {isSmallScreen && (
        <Feather
          name="search"
          size={20}
          color={colors.text}
          style={styles.icon}
          onPress={() => setIsSearchModalVisible(true)}
        />
      )}
      {(['person-outline', 'favorite-border', 'shopping-bag', 'menu'] as const).map((icon, idx) => (
        <MaterialIcons key={idx} name={icon} size={20} color={colors.text} style={styles.icon} />
      ))}
    </View>
  ), [colors.text, isSmallScreen]);

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.topContainer}>
        {renderLogo}
        <View style={styles.rightContainer}>
          {!isSmallScreen && (
            <SearchBar
              onSearchActive={onSearchFocus}
              isSearchModalVisible={isSearchModalVisible}
              onCloseSearchModal={() => setIsSearchModalVisible(false)}
              onFocus={() => console.log('Search bar focused')}
              onSearch={() => setIsSearchModalVisible(true)}
            />
          )}
          {renderIcons}
        </View>
      </View>
      <Modal
        visible={isSmallScreen && isSearchModalVisible}
        animationType="slide"
        onRequestClose={() => setIsSearchModalVisible(false)}
      >
        <View style={styles.fullscreenSearchBar}>
          <SearchBar
            onSearchActive={onSearchFocus}
            isSearchModalVisible={isSearchModalVisible}
            onCloseSearchModal={() => setIsSearchModalVisible(false)}
            onFocus={() => console.log('Search bar focused')}
            onSearch={() => setIsSearchModalVisible(true)}
          />
        </View>
      </Modal>
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
    fontSize: 18,
    fontWeight: '500',
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginLeft: 15,
    fontSize: 20,
  },
  rightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  fullscreenSearchBar: {
    backgroundColor: '#fff',
    justifyContent: 'flex-start',
  },
});
