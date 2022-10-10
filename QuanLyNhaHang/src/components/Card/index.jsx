import { StyleSheet, Text, View } from "react-native";
import React from "react";

const Card = (props) => {
   const { children, ...ortherProps } = props;
   return (
      <View {...ortherProps} style={[styles.container_card, ortherProps.style]}>
         {children}
      </View>
   );
};

export default Card;

const styles = StyleSheet.create({
   container_card: {
      shadowColor: "#000", // IOS
      shadowOffset: {
         width: 0,
         height: 2,
      }, // IOS
      shadowOpacity: 0.23,
      shadowRadius: 2.62, //IOS
      backgroundColor: "#fff",
      elevation: 4, // Android
      alignSelf: "baseline",
      borderRadius: 8,
   },
});
