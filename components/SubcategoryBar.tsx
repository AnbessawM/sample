import { Feather } from '@expo/vector-icons';
import { useTheme } from '@react-navigation/native';
import React, { useRef } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const SubcategoryBar = () => {
  const { colors } = useTheme();
  const scrollViewRef = useRef<ScrollView>(null);

  return (
    <View style={[styles.subcategoryContainer, { borderBottomColor: colors.border }]}>
      <TouchableOpacity onPress={() => scrollViewRef.current?.scrollTo({ x: 0, animated: true })} style={styles.scrollButton}>
        <Feather name="chevron-left" size={24} color={colors.text} />
      </TouchableOpacity>
      <ScrollView horizontal ref={scrollViewRef} showsHorizontalScrollIndicator={false} contentContainerStyle={styles.subcategoryBar}>
        {['NEW IN', 'CLOTHING', 'SALE', 'NOVA DEALS', 'DRESSES', 'MATCHING SETS', 'TOPS', 'JEANS', 'BOTTOMS', 'JACKETS & COATS', 'SWEATERS', 'JUMPSUITS'].map((subcategory, index) => (
          <TouchableOpacity key={index} style={styles.subcategoryItem}>
            <Text style={[styles.subcategoryText, { color: colors.text }]}>{subcategory}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <TouchableOpacity onPress={() => scrollViewRef.current?.scrollToEnd({ animated: true })} style={styles.scrollButton}>
        <Feather name="chevron-right" size={24} color={colors.text} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  subcategoryContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
    borderBottomWidth: 1,
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
    fontSize: 10,
  },
  scrollButton: {
    padding: 5,
  },
});

export default SubcategoryBar;