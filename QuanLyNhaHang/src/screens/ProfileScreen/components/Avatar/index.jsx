import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { Entypo } from "@expo/vector-icons";

const Avatar = (props) => {
   const { onChangeAvatar, avatar } = props;
   return (
      <TouchableOpacity
         onPress={onChangeAvatar}
         style={styles.container_avatar}
      >
         <Image style={styles.avatar} source={{ uri: avatar }} />
         <View style={styles.container_text_change}>
            <Entypo name="camera" size={30} color="black" />
         </View>
      </TouchableOpacity>
   );
};

export default Avatar;

const styles = StyleSheet.create({
   container_avatar: {
      alignSelf: "center",
      position: "relative",
      borderRadius: 80,
      marginVertical: 12,
   },
   avatar: {
      width: 150,
      height: 150,
      borderRadius: 80,
   },
   container_text_change: {
      position: "absolute",
      bottom: 15,
      right: 10,
   },
});
