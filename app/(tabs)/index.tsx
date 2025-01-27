import Header from '@/components/header';
import React, {  } from 'react';
import {
  ScrollView,
  Text,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import Product from '@/components/product';

export default function App() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container}>
        <Header />
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
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});