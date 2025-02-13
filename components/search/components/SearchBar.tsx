import Search from '@/components/search';
import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { SafeAreaView, TouchableOpacity, View, useWindowDimensions } from 'react-native';
import { IconButton, Searchbar, useTheme } from 'react-native-paper';
import styles from './SearchBarStyles';

const SearchBar: React.FC<{ onFocus?: () => void }> = ({ onFocus }) => {
  const { colors } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchModalVisible, setIsSearchModalVisible] = useState(false);
  const { width } = useWindowDimensions();

  const handleClear = () => setSearchQuery('');

  const handleSearchFocus = () => {
    setIsSearchModalVisible(true);
    onFocus?.();
  };

  const renderRightIcons = () => (
    <View style={styles.rightContainer}>
      {['dots-vertical', 'camera', 'microphone', 'keyboard'].map((icon, index) => (
        <IconButton key={index} style={styles.iconButton} icon={icon} size={24} iconColor="#4285F4" />
      ))}
    </View>
  );

  return (
    <SafeAreaView style={[styles.header, isSearchModalVisible && styles.searchbarActive, { backgroundColor: colors.surface}]}>
      {width < 768 && (
        <TouchableOpacity style={{ margin: 10, backgroundColor: colors.surface }}>
          <Ionicons name="chevron-back" size={24} color="#333" />
        </TouchableOpacity>
      )}
      <Searchbar
        placeholder="Search"
        value={searchQuery}
        style={[
          styles.searchbar,
          { backgroundColor: colors.surface },
          isSearchModalVisible && styles.searchbarActive,
        ]}
        inputStyle={styles.inputStyle}
        onIconPress={handleClear}
        onFocus={handleSearchFocus}
        right={renderRightIcons}
      />
      {isSearchModalVisible && <Search />}
    </SafeAreaView>
  );
};

export default SearchBar;
