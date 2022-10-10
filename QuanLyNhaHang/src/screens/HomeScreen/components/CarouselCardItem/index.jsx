import { Dimensions, Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import Colors from "../../../../constants/Colors";

export const SLIDER_WIDTH = Dimensions.get("window").width;
export const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.7);

const CarouselCardItem = ({ item, index }) => {
   return (
      <View style={styles.container} key={index}>
         <Image source={item} style={styles.image} />
      </View>
   );
};

export default CarouselCardItem;

const styles = StyleSheet.create({
   container: {
      backgroundColor: Colors.Background,
   },
   image: {
      width: ITEM_WIDTH,
      height: 200,
      borderRadius: 8,
   },
});
