import { MaterialIcons } from '@expo/vector-icons';
import { useTheme } from '@react-navigation/native';
import React, { useState } from 'react';
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
    _id: string; // Add _id property
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

const ProductCard = React.memo(({ product, onPress }: { product: ProductType, onPress: () => void }) => {
    const { colors } = useTheme();
    const { width } = useWindowDimensions();
    const isSmallScreen = width < 768;
    const cardWidth = isSmallScreen ? width / 2 - 20 : width / 4 - 20;
    const cardHeight = isSmallScreen ? width / 2 : width / 3.5;
    const [selectedColor, setSelectedColor] = useState<string>(product.color[0]);
    const [selectedImage, setSelectedImage] = useState<string>(product.images[0]);

    const handleColorSelect = (color: string) => {
        setSelectedColor(color);
        const colorIndex = product.color.indexOf(color);
        setSelectedImage(product.images[colorIndex]);
    };

    const renderColorOptions = () => {
        return (
            <View style={styles.colorOptionsContainer}>
                {product.color?.map((color, index) => (
                    <TouchableOpacity
                        key={index}
                        style={[styles.colorOption, { backgroundColor: color.toLowerCase() }]} // Ensure color is in lowercase
                        onPress={() => handleColorSelect(color)}
                    >
                        {selectedColor === color ? (
                            <View style={styles.selectedColor}></View>
                        ) : null}
                    </TouchableOpacity>
                ))}
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
                <View style={styles.row}>
                    <Text style={[styles.price, { color: colors.text }]}>
                        {product.discount ? (product.price * (1 - product.discount / 100)).toFixed(2) : product.price.toFixed(2)}
                    </Text>
                    {product.discount ? (
                        <Text style={[styles.discountText, { color: colors.text }]}>
                            {`${product.discount}% off`}
                        </Text>
                    ) : null}
                    <Text style={[styles.materialText, { color: colors.text }]}>
                        {product.material}
                    </Text>
                </View>
                {renderColorOptions()}
                <View style={styles.row}>
                    <Text style={[styles.categoryText, { color: colors.text }]}>
                        Category: {product.category}
                    </Text>
                    <Text style={[styles.brandText, { color: colors.text }]}>
                        Brand: {product.brand}
                    </Text>
                </View>
                <View style={styles.row}>
                    <Text style={[styles.stockText, { color: colors.text }]}>
                        In Stock: {product.countInStock}
                    </Text>
                    <Text style={[styles.ratingText, { color: colors.text }]}>
                        Rating: {product.rating} ({product.numReviews} reviews)
                    </Text>
                </View>
            </View>
        );
    };

    const renderCard = () => {
        return (
            <View style={[styles.card, { width: cardWidth, height: cardHeight, backgroundColor: colors.card, marginBottom: isSmallScreen ? 10 : 20 }]}>
                {product.discount ? (
                    <View style={styles.badgeContainer}>
                        <Text style={styles.badge}>{`${product.discount}% off`}</Text>
                    </View>
                ) : null}
                <Image
                    source={{ uri: selectedImage }}
                    style={[styles.productImage, { height: cardHeight / 2 }]}
                />
                {renderMainContent()}
            </View>
        );
    };

    return (
        <TouchableOpacity onPress={onPress}>
            <ScrollView contentContainerStyle={styles.container}>
                {renderCard()}
            </ScrollView>
        </TouchableOpacity>
    );
});

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 0,
    },
    card: {
        borderRadius: 10,
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 15,
        position: 'relative',
        backgroundColor: '#fff',
        marginHorizontal: 2,
    },
    badgeContainer: {
        position: 'absolute',
        top: 10,
        left: 10,
        zIndex: 1,
    },
    badge: {
        backgroundColor: '#ff6347',
        color: 'white',
        paddingVertical: 4,
        paddingHorizontal: 8,
        borderRadius: 4,
        fontSize: 12,
    },
    productImage: {
        width: '100%',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
    },
    contentContainer: {
        flexGrow: 1,
        borderTopWidth: 1,
        borderTopColor: '#eee',
        padding: 5,
    },
    titleContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    productTitle: {
        fontSize: 14,
        fontWeight: '600',
        marginBottom: 5,
        flex: 1,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 5,
    },
    price: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    discountText: {
        fontSize: 12,
        color: '#ff6347',
        marginBottom: 5,
    },
    materialText: {
        fontSize: 12,
        marginBottom: 5,
    },
    colorOptionsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
    },
    colorOption: {
        width: 15,
        height: 15,
        borderRadius: 7.5,
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
    heartIconContainer: {
        padding: 5,
    },
    categoryText: {
        fontSize: 12,
    },
    brandText: {
        fontSize: 12,
    },
    stockText: {
        fontSize: 12,
    },
    ratingText: {
        fontSize: 12,
    },
});

export default ProductCard;
