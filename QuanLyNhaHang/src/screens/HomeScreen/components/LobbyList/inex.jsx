import {
   Image,
   ScrollView,
   StyleSheet,
   Text,
   TouchableOpacity,
   View,
} from "react-native";
import React from "react";
import { AntDesign } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import { lobbySelector } from "../../../../redux/selector";
import { Card } from "../../../../components";
import { navigate } from "../../../../naviagtion/service";
import { stackName } from "../../../../configs/NavigationContants";
import Colors from "../../../../constants/Colors";

const LobbyList = () => {
   const lobbyList = useSelector(lobbySelector).listLobby;

   return (
      <ScrollView
         contentContainerStyle={styles.container_lobby}
         horizontal
         showsHorizontalScrollIndicator={false}
      >
         {lobbyList.map((lobby, index) => {
            if (index < 4) {
               return (
                  <Card key={lobby.id} style={styles.container_card}>
                     <TouchableOpacity
                        onPress={() => {
                           navigate(stackName.detailLobbyStack, {
                              lobbyId: lobby.id,
                           });
                        }}
                     >
                        <Image
                           style={styles.img}
                           source={{ uri: lobby.image }}
                        />
                        <View style={styles.container_content}>
                           <Text style={styles.name}>{lobby.name}</Text>
                           <Text style={styles.price}>{lobby.price} VND</Text>
                        </View>
                     </TouchableOpacity>
                  </Card>
               );
            }
         })}
         <TouchableOpacity
            onPress={() => navigate(stackName.lobbyScreenStack)}
            style={styles.container_icon}
         >
            <AntDesign name="arrowright" size={24} color="white" />
         </TouchableOpacity>
      </ScrollView>
   );
};

export default LobbyList;

const styles = StyleSheet.create({
   container_lobby: {
      paddingBottom: 12,
      paddingRight: 12,
   },
   container_card: {
      marginHorizontal: 20,
   },
   img: {
      width: 160,
      height: 120,
      borderTopLeftRadius: 8,
      borderTopRightRadius: 8,
   },
   container_content: {
      paddingVertical: 15,
      paddingHorizontal: 20,
   },
   container_icon: {
      backgroundColor: Colors.Primary,
      alignSelf: "center",
      padding: 20,
      borderRadius: 50,
   },
   name: {
      fontSize: 16,
   },
   price: {
      fontSize: 12,
   },
});
