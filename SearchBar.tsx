import Search from '@/app/(search)/search';
import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, TouchableOpacity, View, useWindowDimensions } from 'react-native';
import { IconButton, Searchbar, useTheme } from 'react-native-paper';

const SearchBar: React.FC<{ onFocus?: () => void; onSearchActive: (active: boolean) => void; isSearchModalVisible: boolean; onCloseSearchModal: () => void }> = ({
  onFocus,
  onSearchActive,
  isSearchModalVisible,
  onCloseSearchModal,
}) => {
  const { colors } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const { width } = useWindowDimensions();
  const searchBarRef = React.useRef<React.ElementRef<typeof Searchbar> | null>(null);

  const handleClear = () => setSearchQuery('');

  const handleSearchFocus = () => {
    onSearchActive(true);
    onFocus?.();
    // Ensure the search bar is focused and ready for input
    setTimeout(() => {
      (searchBarRef.current as any)?.focus();
    }, 100);
  };

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
  };

  const renderRightIcons = () => (
    <View style={styles.rightContainer}>
      {['dots-vertical', 'camera', 'microphone', 'keyboard'].map((icon, index) => (
        <IconButton key={index} style={styles.iconButton} icon={icon} size={24} iconColor="#4285F4" />
      ))}
    </View>
  );

  return (
    <SafeAreaView
      style={[styles.header, { backgroundColor: colors.surface }]}
    >
      {width < 768 && (
        <TouchableOpacity style={{ margin: 10, backgroundColor: colors.surface }} onPress={onCloseSearchModal}>
          <Ionicons name="chevron-back" size={24} color="#333" />
        </TouchableOpacity>
      )}
      <Searchbar
        ref={searchBarRef}
        placeholder="Search"
        value={searchQuery}
        style={[
          styles.searchbar,
          { 
            backgroundColor: colors.surface,
            borderBottomLeftRadius: isSearchModalVisible ? 0 : 24,
            borderBottomRightRadius: isSearchModalVisible ? 0 : 24,
          },
        ]}
        inputStyle={styles.inputStyle}
        onIconPress={handleClear}
        onFocus={handleSearchFocus}
        onChangeText={handleSearchChange}
        right={renderRightIcons}
      />
      {isSearchModalVisible && (
        <Search
          onClose={onCloseSearchModal}
        />
      )}
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
  },
  searchbar: {
    flex: 1,
    borderRadius: 24,
    elevation: 2,
    height: 35,
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
