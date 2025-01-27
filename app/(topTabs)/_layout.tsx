import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import WomenTab from './women';
import MenTab from './men';
import KidsTab from './kids';
import BeautyTab from './beauty';

const Tab = createMaterialTopTabNavigator();

const TopTabNavigator = () => {
    return (
        <Tab.Navigator>
            <Tab.Screen name="Women" component={WomenTab} />
            <Tab.Screen name="Men" component={MenTab} />
            <Tab.Screen name="Kids" component={KidsTab} />
            <Tab.Screen name="Beauty" component={BeautyTab} />
        </Tab.Navigator>
    );
};

export default TopTabNavigator;
