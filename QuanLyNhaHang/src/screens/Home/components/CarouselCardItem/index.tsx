import {Dimensions, Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';

export const SLIDER_WIDTH = Dimensions.get('window').width;
export const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.7);

interface ICarouselCardItem {
  item: any;
  index: any;
}

const CarouselCardItem = ({item, index}: ICarouselCardItem) => {
  return (
    <View style={styles.container} key={index}>
      <Image source={item} style={styles.image} />
    </View>
  );
};

export default CarouselCardItem;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
  },
  image: {
    width: ITEM_WIDTH,
    height: 200,
    borderRadius: 8,
  },
});
