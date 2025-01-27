import React, { useState } from 'react';
import { useTheme } from 'react-native-paper';
import { SafeAreaView, StyleSheet, TouchableOpacity, View, useWindowDimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { IconButton, Searchbar } from 'react-native-paper';
import Search from '@/components/search/index';

const SearchBar: React.FC<{ onFocus?: () => void }> = ({ onFocus }) => {
  const { colors } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchModalVisible, setIsSearchModalVisible] = useState(false);
  const { width } = useWindowDimensions();

  const onChangeSearch = (query: string) => setSearchQuery(query);

  const handleClear = () => {
    setSearchQuery('');
  };

  const handleSearchFocus = () => {
    setIsSearchModalVisible(true);
    if (onFocus) {
      onFocus();
    }
  };

  return (
    <SafeAreaView style={[styles.header, { backgroundColor: colors.surface }]}>
      {width < 768 && (
        <TouchableOpacity style={{ margin: 10, backgroundColor: colors.surface, }}>
          <Ionicons name="chevron-back" size={24} color="#333" />
        </TouchableOpacity>
      )}
      <Searchbar
        placeholder="Search "
        onChangeText={onChangeSearch}
        value={searchQuery}
        style={[styles.searchbar, { backgroundColor: colors.surface }]}
        inputStyle={styles.inputStyle}
        onIconPress={handleClear}
        onFocus={handleSearchFocus}
        right={() => (
          <View style={styles.rightContainer}>
            {searchQuery ? (
              <IconButton
                icon="close"
                size={20}
                iconColor="#4285F4"
                style={styles.iconButton}
                onPress={handleClear}
              />
            ) : null}
            <IconButton style={styles.iconButton} icon="dots-vertical" size={24} iconColor="#4285F4" />
            <IconButton style={styles.iconButton} icon="camera" size={24} iconColor="#4285F4" />
            <IconButton style={styles.iconButton} icon="microphone" size={24} iconColor="#4285F4" />
            <IconButton style={styles.iconButton} icon="keyboard" size={24} iconColor="#4285F4" />
          </View>
        )}
      />
      <Search isModal={isSearchModalVisible} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 20,
  },
  searchbar: {
    elevation: 2,
    borderRadius: 24,
    flex: 1,
    marginRight: 8,
  },
  inputStyle: {
    fontSize: 16,
  },
  iconButton: {
    padding: 0,
    margin: 0,
    marginBottom: 0,
  },
  rightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default SearchBar;
