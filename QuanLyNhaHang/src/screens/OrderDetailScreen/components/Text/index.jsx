import { StyleSheet, Text as DefaultText, View } from "react-native";
import React from "react";

const Text = (props) => {
   const { children, style, bold, ...ortherProps } = props;
   return (
      <DefaultText
         style={[styles.text, style, bold && { fontWeight: "bold" }]}
         {...ortherProps}
      >
         {children}
      </DefaultText>
   );
};

export default Text;

const styles = StyleSheet.create({
   text: {
      fontSize: 18,
      paddingVertical: 2,
   },
});
