import React from "react";
import { useTheme } from 'react-native-paper';
import { View, StyleSheet, Modal } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import Women from "@/components/search/tabs/women";
import Men from "@/components/search/tabs/men";
import Kids from "@/components/search/tabs/kids";
import Beauty from "@/components/search/tabs/beauty";

const Tab = createMaterialTopTabNavigator();

const Search: React.FC<{ isModal: boolean }> = ({ isModal }) => {
  const { colors } = useTheme();
  return (
    <Modal
      visible={isModal}
      animationType="slide"
      transparent={true}
    >
      <View style={[styles.container, { backgroundColor: 'red', height: '80%', width: '60%' }]}>
        <View style={[styles.modalContent, { backgroundColor: colors.surface, width: '100%' }]}>
          {/* Tab Navigator for Categories */}
          <Tab.Navigator
            screenOptions={{
              tabBarActiveTintColor: colors.onSurface, // Active tab color
              tabBarLabelStyle: {backgroundColor: colors.surface}, // Label styling
              tabBarStyle: { backgroundColor: colors.surface, borderRadius: 20 }, // Tab bar styling
            }}
          >
            <Tab.Screen name="Women" component={Women} />
            <Tab.Screen name="Men" component={Men} />
            <Tab.Screen name="Kids" component={Kids} />
            <Tab.Screen name="Beauty" component={Beauty} />
          </Tab.Navigator>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 60,
  },
  modalContent: {
    flex: 1,
    borderRadius: 20,
    marginHorizontal: 10,
  },
  tabBar: {
  },
  tabLabel: {
    fontSize: 12,
  },
});

export default Search;
