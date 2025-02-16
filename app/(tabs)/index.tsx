import Header from '@/components/layout/Header/header';
import Product from '@/components/product';
import React, { useState } from 'react';
import { SafeAreaView, ScrollView, StatusBar, StyleSheet, View } from 'react-native';

export default function App() {
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [headerHeight, setHeaderHeight] = useState(0);

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />
      {/* Header with fixed position */}
      <View
        onLayout={(e) => setHeaderHeight(e.nativeEvent.layout.height)}
        style={styles.headerWrapper}
      >
        <Header onSearchFocus={(active) => setIsSearchActive(active)} />
      </View>
      
      {/* ScrollView for content */}
      <ScrollView style={[styles.container, { marginTop: headerHeight }]}>
        <Product />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerWrapper: {
    position: 'absolute', // Fix header at the top
    top: 0,
    left: 0,
    right: 0,
    zIndex: 100, // Ensure header stays above everything
  },
  container: {
    flex: 1,
    marginTop: 0,
  },
});
