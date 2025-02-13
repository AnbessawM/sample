import { MaterialIcons } from '@expo/vector-icons';
import { useTheme } from '@react-navigation/native';
import React from 'react';
import {
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    useWindowDimensions,
    View,
} from 'react-native';

type ProductType = {
    name: string;
    description: string;
    price: number;
    category: string;
    color: string[];
    size: string[];
    brand: string;
    images: string[];
    countInStock: number;
    rating: number;
    numReviews: number;
    material: string;
    discount: number;
    featured: boolean;
};

const ProductCard = React.memo(({ product }: { product: ProductType }) => {
    const { colors } = useTheme();
    const { width } = useWindowDimensions();
    const isSmallScreen = width < 768;
    const cardWidth = isSmallScreen ? width / 2 - 20 : width / 4 - 20;

    const renderColorOptions = () => {
        return (
            <View style={styles.colorOptionsContainer}>
                {product.color?.map((color, index) => (
                    <View
                        key={index}
                        style={[styles.colorOption, { backgroundColor: color }]}
                    >
                        {color === '#C6C6C6' ? (
                            <View style={styles.selectedColor}></View>
                        ) : null}
                    </View>
                ))}
                <Text style={[styles.moreColors, { color: colors.text }]}>+ 2</Text>
            </View>
        );
    };

    const renderMainContent = () => {
        return (
            <View style={styles.contentContainer}>
                <View style={styles.titleContainer}>
                    <Text numberOfLines={1} style={[styles.productTitle, { color: colors.text }]}>
                        {product.name}
                    </Text>
                    <TouchableOpacity style={[styles.heartIconContainer, { backgroundColor: colors.card }]}>
                        <MaterialIcons name="favorite-border" size={24} color={colors.text} />
                    </TouchableOpacity>
                </View>
                <Text style={[styles.price, { color: colors.text }]}>
                    {product.discount ? product.price * (1 - product.discount / 100) : product.price}
                </Text>
                <Text style={[styles.discountText, { color: colors.text }]}>
                    {product.discount ? `${product.discount}% off` : ''}
                </Text>
                <Text style={[styles.materialText, { color: colors.text }]}>
                    {product.material}
                </Text>
                {renderColorOptions()}
            </View>
        );
    };

    const renderCard = () => {
        return (
            <View style={[styles.card, { width: cardWidth, backgroundColor: colors.card }]}>
                {product.discount ? (
                    <View style={styles.badgeContainer}>
                        <Text style={styles.badge}>{`${product.discount}% off`}</Text>
                    </View>
                ) : null}
                <Image
                    source={{ uri: product.images[0] }}
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
});

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    card: {
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
        flex: 1,
    },
    price: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    discountText: {
        fontSize: 14,
    },
    materialText: {
        fontSize: 14,
        marginTop: 5,
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
    },
    heartIconContainer: {
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
