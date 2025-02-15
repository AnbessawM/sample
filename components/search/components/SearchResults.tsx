import { useTheme } from '@react-navigation/native';
import React from 'react';
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface Product {
  _id: string;
  name: string;
  image: string;
}

interface SearchResultsProps {
  results: Product[];
  onProductPress: (productId: string) => void;
}

const SearchResults: React.FC<SearchResultsProps> = ({ results, onProductPress }) => {
  const { colors } = useTheme();

  return (
    <FlatList
      data={results}
      keyExtractor={(item) => item._id}
      renderItem={({ item }) => (
        <TouchableOpacity onPress={() => onProductPress(item._id)}>
          <View style={[styles.resultItem, { backgroundColor: colors.card }]}>
            <Image source={{ uri: item.image }} style={styles.resultImage} />
            <Text style={{ color: colors.text }}>{item.name}</Text>
          </View>
        </TouchableOpacity>
      )}
    />
  );
};

const styles = StyleSheet.create({
  resultItem: {
    flexDirection: 'row',
    padding: 10,
    alignItems: 'center',
  },
  resultImage: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
});

export default SearchResults;
