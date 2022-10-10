import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

import React from "react";

import Colors from "../../../constants/Colors";
import { goBack } from "../../../naviagtion/service";

const Header = () => {
   return (
      <View style={styles.container}>
         <Text style={styles.title}>Đặt bàn</Text>
         <TouchableOpacity style={styles.button_back} onPress={() => goBack()}>
            <MaterialIcons
               name="keyboard-arrow-left"
               size={40}
               color={Colors.Primary}
            />
         </TouchableOpacity>
      </View>
   );
};

export default Header;

const styles = StyleSheet.create({
   container: {
      position: "relative",
   },
   button_back: {
      position: "absolute",
      top: 12,
      left: 8,
   },
   title: {
      fontSize: 24,
      textAlign: "center",
      paddingVertical: 18,
   },
});
