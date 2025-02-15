import { useTheme } from '@react-navigation/native';
import React from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface SearchSuggestionsProps {
  suggestions: string[];
  onSuggestionPress: (suggestion: string) => void;
}

const SearchSuggestions: React.FC<SearchSuggestionsProps> = ({ suggestions, onSuggestionPress }) => {
  const { colors } = useTheme();

  return (
    <FlatList
      data={suggestions}
      keyExtractor={(item) => item}
      renderItem={({ item }) => (
        <TouchableOpacity onPress={() => onSuggestionPress(item)}>
          <View style={[styles.suggestionItem, { backgroundColor: colors.card }]}>
            <Text style={{ color: colors.text }}>{item}</Text>
          </View>
        </TouchableOpacity>
      )}
    />
  );
};

const styles = StyleSheet.create({
  suggestionItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});

export default SearchSuggestions;
