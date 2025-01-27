import React, { useEffect, useState } from 'react';
import { View, ScrollView, Image, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');
const isSmallDevice = width < 375;

const BannerSection = () => {
  const isSmallDevice = width < 375;
  
  interface Banner {
    image: string;
    text1: string;
    text2: string;
    bigText: string;
    smallText1: string;
    smallText2: string;
  }

  const [banners, setBanners] = useState<Banner[]>([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetchBanners(page);
  }, [page]);

  const fetchBanners = (page: number) => {
    fetch(`https://fakestoreapi.com/products?limit=5&page=${page}`)
      .then(res => res.json())
      .then(data => setBanners(prevBanners => [...prevBanners, ...data]));
  };

  const handleScroll = (event: { nativeEvent: { contentOffset: any; layoutMeasurement: any; contentSize: any; }; }) => {
    const { contentOffset, layoutMeasurement, contentSize } = event.nativeEvent;
    if (contentOffset.x + layoutMeasurement.width >= contentSize.width - 20) {
      setPage(prevPage => prevPage + 1);
    }
  };

  return (
    <View>
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={true}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      >
        {banners.map((banner, index) => (
          <View key={index} style={styles.banner}>
            <Image style={styles.bannerImage} source={{ uri: banner.image }} />
            <View style={styles.bannerContent}>
              <Text style={styles.bannerText}>{banner.text1}</Text>
              <Text style={styles.bannerText}>{banner.text2}</Text>
              <Text style={styles.bannerBigText}>{banner.bigText}</Text>
              <Text style={styles.bannerTextSmall}>{banner.smallText1}</Text>
              <Text style={styles.bannerTextSmall}>{banner.smallText2}</Text>
              <TouchableOpacity style={styles.bannerButton}>
                <Text>SHOP NOW</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  banner: {
    width: isSmallDevice ? width : width / 2,
    height: isSmallDevice ? 300 : 500,
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center'
  },
  bannerImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    position: 'absolute'
  },
  bannerContent: {
    position: 'relative',
    zIndex: 1,
    padding: 10,
    alignItems: 'center',
  },
  bannerText: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
  },
  bannerTextSmall: {
    fontSize: 12,
    color: '#fff',
    textAlign: 'center',
  },
  bannerBigText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
  bannerButton: {
    marginTop: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#000',
    borderRadius: 5,
  },
});

export default BannerSection;
