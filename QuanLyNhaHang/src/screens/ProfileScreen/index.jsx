import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import Colors from "../../constants/Colors";
import { Intro1 } from "../../../assets/images";

const ProfileScreen = () => {
   return (
      <View style={styles.container}>
         <TouchableOpacity style={styles.container_avatar}>
            <Image style={styles.avatar} source={Intro1} />
            <View style={styles.container_text_change}>
               <Text>Đổi ảnh</Text>
            </View>
         </TouchableOpacity>
      </View>
   );
};

export default ProfileScreen;

const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: Colors.Background,
   },
   container_avatar: {
      alignSelf: "center",
      position: "relative",
      backgroundColor: "red",
   },
   avatar: {
      width: 150,
      height: 150,
      borderRadius: 80,
      backgroundColor: "red",
   },
   container_text_change: {
      position: "absolute",
      bottom: 5,
   },
});
