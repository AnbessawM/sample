import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  useWindowDimensions,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

interface Product {
  discount?: string;
  novaDeals?: string;
  image: any;
  title: string;
  subtitle: string;
  price: string;
  salePrice?: string;
  codePromo?: string;
  colors?: string[];
}

const ProductCard = ({ product }: { product: Product }) => {
    const { width } = useWindowDimensions();
    const isSmallScreen = width < 768;
    const cardWidth = isSmallScreen ? width / 2 - 20 : width / 4 - 20;

    const renderColorOptions = () => {
        return (
            <View style={styles.colorOptionsContainer}>
                {product.colors?.map((color, index) => (
                    <View
                        key={index}
                        style={[styles.colorOption, { backgroundColor: color }]}
                    >
                        {color === '#C6C6C6' ? (
                            <View style={styles.selectedColor}></View>
                        ) : null}
                    </View>
                ))}
                <Text style={styles.moreColors}>+ 2</Text>
            </View>
        );
    };

    const renderMainContent = () => {
        return (
            <View style={styles.contentContainer}>
                <View style={styles.titleContainer}>
                    <Text numberOfLines={1} style={styles.productTitle}>
                        {product.title}
                    </Text>
                    <TouchableOpacity style={styles.heartIconContainer}>
                        <MaterialIcons name="favorite-border" size={24} color="black" />
                    </TouchableOpacity>
                </View>
                <Text style={styles.price}>{product.price}</Text>
                <Text style={styles.discountText}>
                    {product.codePromo}
                </Text>
                {renderColorOptions()}
            </View>
        );
    };

    const renderCard = () => {
        return (
            <View style={[styles.card, { width: cardWidth }]}>
                <View style={styles.badgeContainer}>
                    <Text style={styles.badge}>{product.discount}</Text>
                </View>
                <Image
                    source={{ uri: product.image }}
                    style={[styles.productImage, { height: cardWidth }]}
                />
                {renderMainContent()}
            </View>
        );
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            {renderCard()}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    card: {
        backgroundColor: 'white',
        borderRadius: 8,
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
        position: 'relative',
        marginBottom: 10,
    },
    badgeContainer: {
        position: 'absolute',
        top: 10,
        left: 10,
        zIndex: 1,
    },
    badge: {
        backgroundColor: '#990000',
        color: 'white',
        paddingVertical: 4,
        paddingHorizontal: 8,
        borderRadius: 4,
        fontSize: 12,
    },
    productImage: {
        width: '100%',
    },
    contentContainer: {
        padding: 15,
        borderTopWidth: 1,
        borderTopColor: '#eee',
    },
    titleContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    productTitle: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 5,
        color: '#333',
        flex: 1,
    },
    price: {
        fontSize: 20,
        color: '#333',
        fontWeight: 'bold',
        marginBottom: 5,
    },
    discountText: {
        fontSize: 14,
        color: '#555',
    },
    colorOptionsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
    },
    colorOption: {
        width: 20,
        height: 20,
        borderRadius: 10,
        marginRight: 5,
        borderWidth: 1,
        borderColor: '#ccc',
        justifyContent: 'center',
        alignItems: 'center',
    },
    selectedColor: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: '#000',
    },
    moreColors: {
        fontSize: 14,
        color: '#555',
    },
    heartIconContainer: {
        backgroundColor: 'white',
        padding: 5,
    },
    bagIconContainer: {
        position: 'absolute',
        top: 10,
        right: 10,
        backgroundColor: 'white',
        padding: 5,
    },
    iconContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 10,
    },
});

export default ProductCard;