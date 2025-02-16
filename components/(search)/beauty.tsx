import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';

const Beauty: React.FC<{ suggestions: string[], products: any[] }> = ({ suggestions, products }) => {
  return (
    <View style={styles.container}>
      <FlatList
        data={suggestions}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => <Text style={styles.suggestion}>{item}</Text>}
      />
      <FlatList
        data={products}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => <Text style={styles.product}>{item.name}</Text>}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  suggestion: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  product: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
});

export default Beauty;