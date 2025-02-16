import Beauty from "@/components/(search)/beauty";
import Kids from "@/components/(search)/kids";
import Men from "@/components/(search)/men";
import Women from "@/components/(search)/women";
import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useTheme } from 'react-native-paper';

const Search: React.FC<{ onClose: () => void; suggestions: string[]; products: any[] }> = ({ onClose, suggestions, products }) => {
  const { colors } = useTheme();
  const [activeTab, setActiveTab] = useState('Women');

  const renderContent = () => {
    switch (activeTab) {
      case 'Women':
        return <Women suggestions={suggestions} products={products} />;
      case 'Men':
        return <Men suggestions={suggestions} products={products} />;
      case 'Kids':
        return <Kids suggestions={suggestions} products={products} />;
      case 'Beauty':
        return <Beauty suggestions={suggestions} products={products} />;
      default:
        return null;
    }
  };

  return (
    <View style={[styles.searchContainer, { backgroundColor: colors.surface }]}>
      <View style={styles.tabContainer}>
        {['Women', 'Men', 'Kids', 'Beauty'].map(tab => (
          <TouchableOpacity
            key={tab}
            style={[styles.tabButton, activeTab === tab && { borderBottomColor: colors.primary }]}
            onPress={() => setActiveTab(tab)}
          >
            <Text style={{ color: activeTab === tab ? colors.primary : colors.onSurface }}>
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      {renderContent()}
    </View>
  );
};

const styles = StyleSheet.create({
  searchContainer: {
    position: 'absolute',
    top: 35,
    left: 0,
    right: 0,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    elevation: 10, // Increase elevation for Android
    zIndex: 100, // Corrected zIndex
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  tabButton: {
    paddingVertical: 10,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
});

export default Search;
