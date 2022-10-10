import { StyleSheet, Text, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import Colors from "../../../../constants/Colors";

const ItemInforLooby = (props) => {
   const { nameIcon, title, children } = props;
   return (
      <View style={styles.infor_lobby}>
         <MaterialCommunityIcons
            name={nameIcon}
            size={24}
            color={Colors.Secondary}
            style={styles.icon}
         />
         <View>
            <Text style={[styles.text, { color: Colors.Secondary }]}>
               {title}
            </Text>
            <Text style={styles.text}>{children}</Text>
         </View>
      </View>
   );
};

export default ItemInforLooby;

const styles = StyleSheet.create({
   infor_lobby: {
      flexDirection: "row",
      paddingVertical: 8,
   },
   icon: {
      marginRight: 12,
   },
   text: {
      fontSize: 18,
   },
});
