import {
   ImageBackground,
   StyleSheet,
   Text,
   TouchableOpacity,
   View,
} from "react-native";
import React, { Fragment, useEffect } from "react";
import { AntDesign } from "@expo/vector-icons";
import Colors from "../../constants/Colors";
import CusButton from "../../components/CusButton";
import { stackName } from "../../configs/NavigationContants";
import { goBack, navigate } from "../../naviagtion/service";
import { useDispatch, useSelector } from "react-redux";
import { getLobbyById } from "../../redux/slice/LobbySlice";
import { ActivityIndicator } from "../../components";

const DetailLobby = ({ route }) => {
   const lobbySelector = useSelector((state) => state.Lobby);
   const dispatch = useDispatch();

   useEffect(() => {
      dispatch(getLobbyById(route.params.lobbyId));
   }, []);
   return (
      <Fragment>
         {lobbySelector.status === "loading" ? (
            <ActivityIndicator />
         ) : (
            <View style={styles.container}>
               <ImageBackground
                  borderBottomLeftRadius={8}
                  borderBottomRightRadius={8}
                  source={{ uri: lobbySelector.lobby.image }}
                  style={styles.background_image}
               >
                  <TouchableOpacity
                     onPress={() => {
                        goBack();
                     }}
                     style={styles.button_back}
                  >
                     <AntDesign
                        name="left"
                        size={30}
                        color={Colors.Background}
                     />
                  </TouchableOpacity>
               </ImageBackground>
               <View style={styles.container_content}>
                  <Text style={styles.title}>{lobbySelector.lobby.name}</Text>
                  <Text style={styles.content}>
                     {lobbySelector.lobby.describe}
                  </Text>
                  <View style={styles.container_detail}>
                     <View>
                        <Text style={styles.content}>Price</Text>
                        <Text>{lobbySelector.lobby.price}VND</Text>
                     </View>
                     <View>
                        <Text style={styles.content}>Capacity</Text>
                        <Text>{lobbySelector.lobby.capacity} table</Text>
                     </View>
                  </View>
               </View>
               <View style={styles.container_button}>
                  <CusButton
                     buttonColor={Colors.Primary}
                     textColor={Colors.Background}
                     styleButton={styles.button}
                     styleText={styles.button_text}
                     onPress={() =>
                        navigate(stackName.bookingStack, {
                           lobbyId: lobbySelector.lobby.id,
                        })
                     }
                  >
                     Book Now
                  </CusButton>
               </View>
            </View>
         )}
      </Fragment>
   );
};

export default DetailLobby;

const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: Colors.Background,
   },
   background_image: {
      height: 300,
      borderRadius: 8,
   },
   button_back: {
      top: 20,
      left: 20,
   },
   container_content: {
      paddingHorizontal: 20,
   },
   title: {
      fontSize: 28,
      fontWeight: "700",
      marginVertical: 15,
   },
   content: {
      fontSize: 16,
      fontWeight: "400",
      lineHeight: 22,
      textAlign: "justify",
   },
   container_detail: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginVertical: 10,
   },
   button: {
      borderRadius: 4,
      alignItems: "center",
      paddingVertical: 20,
   },
   button_text: {
      fontSize: 18,
      fontWeight: "700",
   },
   container_button: {
      flex: 1,
      justifyContent: "flex-end",
      paddingBottom: 20,
      paddingHorizontal: 20,
   },
});
