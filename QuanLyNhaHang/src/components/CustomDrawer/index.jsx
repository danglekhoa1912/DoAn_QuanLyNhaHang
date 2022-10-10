import {
   Image,
   ImageBackground,
   StyleSheet,
   Text,
   TouchableOpacity,
   View,
} from "react-native";
import React from "react";
import {
   DrawerContentScrollView,
   DrawerItemList,
} from "@react-navigation/drawer";
import { Ionicons } from "@expo/vector-icons";

import Colors from "../../constants/Colors";
import { Logo, MenuBg } from "../../../assets/images";

const CustomDrawer = (props) => {
   return (
      <View style={{ flex: 1 }}>
         <DrawerContentScrollView
            {...props}
            contentContainerStyle={{ backgroundColor: "#f15453" }}
         >
            <ImageBackground source={MenuBg} style={styles.background_image}>
               <Image style={styles.avatar} source={Logo} />
               <Text style={styles.text}>Dang Khoa</Text>
            </ImageBackground>
            <View style={styles.container_list}>
               <DrawerItemList {...props} />
            </View>
         </DrawerContentScrollView>
         <View style={styles.container_bottom}>
            <TouchableOpacity style={styles.button}>
               <View style={styles.content_button}>
                  <Ionicons name="exit-outline" size={22} />
                  <Text style={{ fontSize: 15, marginLeft: 5 }}>Sign Out</Text>
               </View>
            </TouchableOpacity>
         </View>
      </View>
   );
};

export default CustomDrawer;

const styles = StyleSheet.create({
   container_list: {
      flex: 1,
      backgroundColor: Colors.Background,
   },
   background_image: {
      padding: 20,
   },
   avatar: {
      height: 80,
      width: 80,
      borderRadius: 40,
      marginBottom: 10,
   },
   text: {
      fontSize: 18,
      color: Colors.Background,
      fontWeight: "bold",
   },
   container_bottom: {
      padding: 20,
      borderTopWidth: 1,
      borderTopColor: "#ccc",
   },
   button: {
      paddingVertical: 10,
   },
   content_button: {
      flexDirection: "row",
      alignItems: "center",
   },
});
