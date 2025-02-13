import Beauty from "@/components/search/tabs/beauty";
import Kids from "@/components/search/tabs/kids";
import Men from "@/components/search/tabs/men";
import Women from "@/components/search/tabs/women";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import React from "react";
import { StyleSheet, View } from "react-native";
import { useTheme } from 'react-native-paper';

const Tab = createMaterialTopTabNavigator();

const Search: React.FC = () => {
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
    top: 50,
    left: 0,
    right: 0,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    elevation: 5,
    zIndex: 2, // Added zIndex
  },
});

export default Search;
