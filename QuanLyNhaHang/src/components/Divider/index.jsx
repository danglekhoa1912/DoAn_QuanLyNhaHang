import { StyleSheet, View } from "react-native";
import React from "react";
import Colors from "../../constants/Colors";

const index = () => {
   return <View style={styles.divider}></View>;
};

export default index;

const styles = StyleSheet.create({
   divider: {
      borderWidth: 0.5,
      borderColor: Colors.Gray,
   },
});
