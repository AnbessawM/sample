import Search from '@/app/(search)/search';
import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, TouchableOpacity, View, useWindowDimensions } from 'react-native';
import { IconButton, Searchbar, useTheme } from 'react-native-paper';

const SearchBar: React.FC<{ onFocus?: () => void; onSearchActive: (active: boolean) => void }> = ({
  onFocus,
  onSearchActive,
}) => {
  const { colors } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchModalVisible, setIsSearchModalVisible] = useState(false);
  const { width } = useWindowDimensions();

  const handleClear = () => setSearchQuery('');

  const handleSearchFocus = () => {
    setIsSearchModalVisible(true);
    onSearchActive(true);
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
    <SafeAreaView
      style={[
        styles.header,
        isSearchModalVisible && styles.searchbarActive,
        { backgroundColor: colors.surface },
      ]}
    >
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
      {isSearchModalVisible && (
        <Search
          onClose={() => {
            setIsSearchModalVisible(false);
            onSearchActive(false);
          }}
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
    borderRadius: 20,
    zIndex: 200,
    overflow: 'visible',
  },
  searchbar: {
    elevation: 2,
    borderRadius: 24,
    flex: 1,
    marginRight: 8,
  },
  searchbarActive: {
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  inputStyle: {
    fontSize: 16,
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
