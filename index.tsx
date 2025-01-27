import { Ionicons, MaterialCommunityIcons, Feather, FontAwesome } from '@expo/vector-icons';
import React, { useRef } from 'react';
import { ScrollView, View, TextInput, TouchableOpacity, Text } from 'react-native';

const App: React.FC = () => {
  const Header = () => {
    const scrollViewRef = useRef<ScrollView>(null);
  
    const scrollLeft = () => {
      scrollViewRef.current?.scrollTo({ x: 0, animated: true });
    };
  
    const scrollRight = () => {
      scrollViewRef.current?.scrollToEnd({ animated: true });
    };
  
    return (
      <View style={styles.headerContainer}>
        {/* First row */}
        <View style={styles.firstRow}>
          {/* Left Section: Logo and categories */}
          <View style={styles.leftSection}>
            {/* <Image
              source={require('@/assets/images/favicon.png')} // Replace with your logo path
              style={styles.logo}
              resizeMode="contain"
            /> */}
            <View style={styles.categories}>
              <Text style={styles.categoryText}>WOMEN</Text>
              <Text style={styles.categoryText}>CURVE</Text>
              <Text style={styles.categoryText}>MEN</Text>
              <Text style={styles.categoryText}>KIDS</Text>
              <Text style={styles.categoryText}>BEAUTY</Text>
            </View>
          </View>
  
          {/* Right Section: Search input and icons */}
          <View style={styles.rightSection}>
            <View style={styles.searchContainer}>
              <Ionicons name="search" size={20} color="black" style={styles.searchIcon} />
              <TextInput
                placeholder="Search"
                style={styles.searchInput}
                placeholderTextColor="#999"
              />
              <MaterialCommunityIcons name="camera-outline" size={20} color="black" />
            </View>
  
            <View style={styles.iconContainer}>
              <Text style={styles.eu}>EU</Text>
              <Feather name="rotate-cw" size={20} color="black" />
              <Feather name="user" size={20} color="black" />
              <Feather name="heart" size={20} color="black" />
              <Feather name="shopping-bag" size={20} color="black" />
            </View>
  
          </View>
        </View>
  
  
        {/* Second row */}
        <View style={styles.secondRowContainer}>
          <TouchableOpacity onPress={scrollLeft} style={styles.scrollButton}>
            <FontAwesome name="angle-left" size={16} color="black" />
          </TouchableOpacity>
          <ScrollView
            ref={scrollViewRef}
            style={styles.secondRow}
            horizontal
            showsHorizontalScrollIndicator={false}
          >
            <Text style={styles.secondaryText}>NEW IN</Text>
            <Text style={styles.secondaryText}>CLOTHING</Text>
            <Text style={[styles.secondaryText, styles.sale]}>SALE</Text>
            <Text style={styles.secondaryText}>NOVA DEALS</Text>
            <Text style={styles.secondaryText}>DRESSES</Text>
            <Text style={styles.secondaryText}>MATCHING SETS</Text>
            <Text style={styles.secondaryText}>TOPS</Text>
            <Text style={styles.secondaryText}>JEANS</Text>
            <Text style={styles.secondaryText}>BOTTOMS</Text>
            <Text style={styles.secondaryText}>JACKETS & COATS</Text>
            <Text style={styles.secondaryText}>SWEATERS</Text>
            <Text style={styles.secondaryText}>JUMPSUITS</Text>
            <Text style={styles.secondaryText}>LINGERIE & SLEEP</Text>
            <Text style={styles.secondaryText}>SHOES</Text>
            <Text style={styles.secondaryText}>ACCESSORIES</Text>
          </ScrollView>
          <TouchableOpacity onPress={scrollRight} style={styles.scrollButton}>
            <FontAwesome name="angle-right" size={16} color="black" />
          </TouchableOpacity>
        </View>
      </View>
    );
  };
  return (
    <div>
      <h1>Hello, world!</h1>
    </div>
  );
};

export default App;
const styles = StyleSheet.create({
  secondRowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 10,
    paddingVertical: isSmallDevice ? 5 : 10,
    paddingHorizontal: isSmallDevice ? 10 : 15,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  secondRow: {
    flexDirection: 'row',
    flex: 1,
  },
  secondaryText: {
    fontSize: isSmallDevice ? 12 : 14,
    marginRight: isSmallDevice ? 10 : 15,
    color: '#333',
    fontWeight: '500',
  },
  sale: {
    color: '#ff6347', // Tomato color for sale items
    fontWeight: '700',
  },
  scrollButton: {
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 20,
    marginHorizontal: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
});