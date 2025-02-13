import { useTheme } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const CategoryBar = () => {
  const { colors } = useTheme();

  return (
    <View style={[styles.categoryBar, { borderBottomColor: colors.border }]}>
      {['WOMEN', 'CURVE', 'MEN', 'KIDS', 'BEAUTY'].map((category, index) => (
        <TouchableOpacity key={index} style={styles.categoryItem}>
          <Text style={[styles.categoryText, { color: colors.text }]}>{category}</Text>
          {index === 0 && <View style={[styles.categoryUnderline, { backgroundColor: colors.primary }]} />}
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  categoryBar: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginTop: 10,
    paddingBottom: 5,
    borderBottomWidth: 1,
  },
  categoryItem: {
    marginRight: 20,
  },
  categoryText: {
    fontWeight: 'bold',
    fontSize: 12,
  },
  categoryUnderline: {
    height: 3,
    width: '100%',
    marginTop: 3,
  },
});

export default CategoryBar;