import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const OnboardingScreen = () => {
    const navigation = useNavigation();

    const navigateToPage = (pageNumber) => {
        console.log('Navigating to page', pageNumber);
        navigation.navigate(`Page${pageNumber}`);
    };

    return (
        <View>
            {/* ...existing code... */}
            <View style={styles.indicators}>
                <TouchableOpacity onPress={() => navigateToPage(1)}>
                    <Text style={styles.indicator}>1</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigateToPage(2)}>
                    <Text style={styles.indicator}>2</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigateToPage(3)}>
                    <Text style={styles.indicator}>3</Text>
                </TouchableOpacity>
            </View>
            {/* ...existing code... */}
        </View>
    );
};

const styles = {
    indicators: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 20,
    },
    indicator: {
        margin: 10,
        fontSize: 18,
    },
};

export default OnboardingScreen;
