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

const product: Product = {
  discount: '40% OFF',
  image: '',
  title: 'Brianna Jogger Pant Set - Heather Grey',
  price: '€47.95',
  codePromo: '40% OFF EVERYTHING! Use Code: LOVE40',
  colors: ['black', '#439ECF', '#F9F2E7', '#C6C6C6'],
};

const ProductCard = ({ product }: { product: Product }) => {
    const { width } = useWindowDimensions();
    const isSmallScreen = width < 768; // You can adjust the breakpoint as needed

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
                <Text style={styles.productTitle}>
                    {product.title}
                </Text>
                <Text style={styles.price}>{product.price}</Text>
                <Text style={styles.discountText}>
                    {product.codePromo}
                </Text>
                 {renderColorOptions()}
            </View>
          );
    }

    const renderLargeScreenCard = () => {
        return (
            <View style={[styles.card, styles.cardLarge]}>
                 <View style={styles.badgeContainer}>
                   <Text style={styles.badge}>{product.discount}</Text>
                 </View>
                <Image
                    source={{uri: product.image}}
                    style={styles.productImageLarge}
                />
               {renderMainContent()}
               <TouchableOpacity style={styles.heartIconContainer}>
                <MaterialIcons name="favorite-border" size={24} color="black" />
              </TouchableOpacity>
            </View>
        )
    }

    const renderSmallScreenCard = () => {
        return (
            <View style={[styles.card, styles.cardSmall]}>
            <View style={styles.badgeContainer}>
              <Text style={styles.badge}>{product.discount}</Text>
            </View>
            <Image
                source={{uri: product.image}}
                style={styles.productImageSmall}
            />
             <TouchableOpacity style={styles.bagIconContainer}>
                <MaterialIcons name="shopping-bag" size={24} color="black" />
            </TouchableOpacity>
             {renderMainContent()}
              <View style={styles.iconContainer}>
                <TouchableOpacity style={styles.heartIconContainer}>
                    <MaterialIcons name="favorite-border" size={24} color="black" />
                </TouchableOpacity>
              <TouchableOpacity>
                    <MaterialIcons name="expand-less" size={24} color="black" />
               </TouchableOpacity>
            </View>

          </View>
        )
    }



  return (
    <ScrollView contentContainerStyle={styles.container}>
         {isSmallScreen ? renderSmallScreenCard() : renderLargeScreenCard()}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    card: {
        backgroundColor: 'white',
        borderRadius: 8,
        overflow: 'hidden', // to make sure image corners are clipped by the card corners
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3, // for android shadows
        position: 'relative',
        marginBottom: 20,
    },
    cardLarge: {
        width: 400,
    },
    cardSmall: {
        width: '100%',
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
    productImageLarge: {
      width: '100%',
      height: 400,
    },
    productImageSmall: {
        width: '100%',
        height: 300,
    },
    contentContainer: {
        padding: 15,
        borderTopWidth: 1,
        borderTopColor: '#eee',
    },
    productTitle: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 5,
        color: '#333',
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
        alignItems: 'center'
      },
      selectedColor: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: '#000', // You can use a different color to indicate selection
      },
    moreColors: {
        fontSize: 14,
        color: '#555',
    },
    heartIconContainer: {
      position: 'absolute',
      top: 15,
      right: 15,
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