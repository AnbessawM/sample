import Search from '@/components/(search)/search';
import productService from '@/services/api/productService';
import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useRef, useState } from 'react';
import { SafeAreaView, StyleSheet, TouchableOpacity, useWindowDimensions, View } from 'react-native';
import { IconButton, Searchbar, useTheme } from 'react-native-paper';

const SearchBar: React.FC<{
  onFocus?: () => void;
  onSearchActive: (active: boolean) => void;
  isSearchModalVisible: boolean;
  onCloseSearchModal: () => void;
  onSearch: () => void;
}> = ({ onFocus, onSearchActive, isSearchModalVisible, onCloseSearchModal, onSearch }) => {
  const { colors } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const { width } = useWindowDimensions();
  const searchBarRef = useRef<React.ElementRef<typeof Searchbar> | null>(null);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    if (isSearchModalVisible) {
      setTimeout(() => searchBarRef.current?.focus(), 100);
    }
  }, [isSearchModalVisible]);

  const handleClear = () => setSearchQuery('');

  const handleSearchFocus = () => {
    onSearchActive(true);
    onFocus?.();
    onSearch();
    setTimeout(() => searchBarRef.current?.focus(), 100);
  };

  const handleSearchChange = async (query: string) => {
    setSearchQuery(query);
    if (query.length > 2) {
      try {
        const fetchedSuggestions = await productService.getSearchSuggestions(query);
        setSuggestions(fetchedSuggestions);
        const fetchedProducts = await productService.searchProducts(query);
        setProducts(fetchedProducts);
      } catch (error) {
        console.error('Error fetching search suggestions or products:', error);
      }
    } else {
      setSuggestions([]);
      setProducts([]);
    }
  };

  const renderRightIcons = () => (
    <View style={styles.rightContainer}>
      {['dots-vertical', 'camera', 'microphone', 'keyboard'].map((icon, idx) => (
        <IconButton key={idx} style={styles.iconButton} icon={icon} size={24} iconColor="#4285F4" />
      ))}
    </View>
  );

  return (
    <SafeAreaView style={[styles.header, { backgroundColor: colors.surface }]}>
      {width < 768 && (
        <TouchableOpacity style={{ margin: 10, backgroundColor: colors.surface }} onPress={onCloseSearchModal}>
          <Ionicons name="chevron-back" size={24} color="#333" />
        </TouchableOpacity>
      )}
      <Searchbar
        ref={searchBarRef}
        placeholder="Search"
        value={searchQuery}
        style={[styles.searchbar, { backgroundColor: colors.surface, borderBottomLeftRadius: isSearchModalVisible ? 0 : 24, borderBottomRightRadius: isSearchModalVisible ? 0 : 24 }]}
        inputStyle={styles.inputStyle}
        onIconPress={handleClear}
        onFocus={handleSearchFocus}
        onChangeText={handleSearchChange}
        right={renderRightIcons}
      />
      {isSearchModalVisible && <Search onClose={onCloseSearchModal} suggestions={suggestions} products={products} />}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 24,
    zIndex: 100,
  },
  searchbar: {
    flex: 1,
    borderRadius: 24,
    elevation: 2,
    height: 35,
    zIndex: 100,
  },
  inputStyle: {
    fontSize: 14,
    paddingBottom: 20,
  },
  iconButton: {
    padding: 0,
    margin: 0,
  },
  rightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default SearchBar;
