import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
} from 'react-native';
import { useTheme } from '@react-navigation/native';

const Women = () => {
  const { colors } = useTheme();
  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView style={styles.scrollContent}>
        {/* Hot Searches */}
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Hot Searches</Text>
        <View style={styles.hotSearchesContainer}>
          {["NBA & NFL", "Fur Coats", "Leather Pants", "Red Dress", "Puffer Jackets", "Going Out Outfits", "Sweater Dresses"].map((search, index) => (
            <View key={index} style={[styles.hotSearchButton, { backgroundColor: colors.card }]}>
              <Text style={[styles.hotSearchText, { color: colors.text }]}>{search}</Text>
            </View>
          ))}
        </View>

        {/* Main Content Sections */}
        <View style={styles.mainContent}>
          <Section title="Top Searches" items={topSearchesItems} />
          <Section title="Occasion" items={occasionItems} />
          <Section title="Trending" items={trendingItems} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

// Section Component
interface SectionProps {
  title: string;
  items: { number: string; image: string; label: string }[];
}

const Section: React.FC<SectionProps> = ({ title, items }) => (
  <View style={styles.sectionContainer}>
    <Text style={styles.sectionTitle}>{title}</Text>
    {items.map((item, index) => (
      <View key={index} style={styles.sectionRow}>
        <Text style={styles.itemNumber}>{item.number}</Text>
        <Image source={{ uri: item.image }} style={styles.itemImage} />
        <Text style={styles.itemLabel}>{item.label}</Text>
      </View>
    ))}
  </View>
);

// Data for Sections
const topSearchesItems = [
  { number: "1", image: "https://i.ibb.co/hLd1106/image.png", label: "Cardigans" },
  { number: "2", image: "https://i.ibb.co/KqT086J/image.png", label: "Sweater Dresses" },
  { number: "3", image: "https://i.ibb.co/vV0Z9B4/image.png", label: "Denim" },
  { number: "4", image: "https://i.ibb.co/7z7s87z/image.png", label: "Boots" },
];
const occasionItems = [
  { number: "1", image: "https://i.ibb.co/0nK17Lz/image.png", label: "Girls Night Out" },
  { number: "2", image: "https://i.ibb.co/gW487vY/image.png", label: "Office Outfits" },
  { number: "3", image: "https://i.ibb.co/Y0Q518V/image.png", label: "Going Out Outfits" },
  { number: "4", image: "https://i.ibb.co/X5n9652/image.png", label: "Lounge Sets" },
];
const trendingItems = [
  { number: "1", image: "https://i.ibb.co/k50ZqXb/image.png", label: "Faux Suede & Faux Leather" },
  { number: "2", image: "https://i.ibb.co/B4g1wM8/image.png", label: "Burgundy" },
  { number: "3", image: "https://i.ibb.co/Bf7B0Qj/image.png", label: "Leopard Print" },
  { number: "4", image: "https://i.ibb.co/Hn7y00w/image.png", label: "Suiting" },
];

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    flex: 1,
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
  hotSearchesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  hotSearchButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    alignSelf: 'flex-start',
  },
  hotSearchText: {
    fontSize: 14,
  },
  mainContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    flexWrap: 'wrap',
  },
  sectionContainer: {
    width: '32%', // This assumes 3 column layout
    marginBottom: 20,
  },
  sectionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  itemNumber: {
    marginRight: 5,
    fontSize: 14,
    color: '#999',
  },
  itemImage: {
    width: 40,
    height: 40,
    resizeMode: 'cover',
    marginRight: 5,
    borderRadius: 5,
  },
  itemLabel: {
    fontSize: 14,
  }
});

export default Women;
