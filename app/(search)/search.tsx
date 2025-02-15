import Beauty from "@/app/(search)/beauty";
import Kids from "@/app/(search)/kids";
import Men from "@/app/(search)/men";
import Women from "@/app/(search)/women";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import React from "react";
import { StyleSheet, View } from "react-native";
import { useTheme } from 'react-native-paper';

const Tab = createMaterialTopTabNavigator();

const Search: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const { colors } = useTheme();

  return (
    <View style={[styles.searchContainer, { backgroundColor: colors.surface }]}>
      <Tab.Navigator
        screenOptions={{
          tabBarActiveTintColor: colors.onSurface,
          tabBarLabelStyle: { backgroundColor: colors.surface },
          tabBarStyle: { backgroundColor: colors.surface },
        }}
      >
        <Tab.Screen name="Women" component={Women} />
        <Tab.Screen name="Men" component={Men} />
        <Tab.Screen name="Kids" component={Kids} />
        <Tab.Screen name="Beauty" component={Beauty} />
      </Tab.Navigator>
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
});

export default Search;
