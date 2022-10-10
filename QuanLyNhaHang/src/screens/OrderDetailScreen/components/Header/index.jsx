import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { MaterialIcons } from "@expo/vector-icons";
import Colors from "../../../../constants/Colors";
import { goBack } from "../../../../naviagtion/service";

const Header = () => {
   return (
      <View style={styles.container}>
         <TouchableOpacity onPress={() => goBack()}>
            <MaterialIcons
               name="keyboard-arrow-left"
               size={40}
               color={Colors.Primary}
            />
         </TouchableOpacity>
         <Text style={styles.title}>Thông tin hóa đơn</Text>
      </View>
   );
};

export default Header;

const styles = StyleSheet.create({
   container: {
      alignItems: "center",
      paddingVertical: 12,
      flexDirection: "row",
   },
   title: {
      fontSize: 24,
      fontWeight: "bold",
   },
});
