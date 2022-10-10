import {
   Image,
   ScrollView,
   StyleSheet,
   Text,
   TouchableOpacity,
   View,
} from "react-native";
import React, { useEffect } from "react";
import Colors from "../../constants/Colors";
import Carousel from "react-native-snap-carousel";

import {
   Intro1,
   Intro10,
   Intro2,
   Intro3,
   Intro4,
   Intro5,
   Intro6,
   Intro7,
   Intro8,
   Intro9,
} from "../../../assets/images";
import { stackName } from "../../configs/NavigationContants";
import { navigate } from "../../naviagtion/service";
import { useDispatch, useSelector } from "react-redux";
import { lobbySelector } from "../../redux/selector";
import { AntDesign } from "@expo/vector-icons";
import { getListLobby } from "../../redux/slice/LobbySlice";
import {
   CarouselCardItem,
   ITEM_WIDTH,
   LobbyList,
   SLIDER_WIDTH,
} from "./components";
import { ActivityIndicator, Card } from "../../components";

const HomeScreen = () => {
   const carouselItems = [
      Intro1,
      Intro2,
      Intro3,
      Intro4,
      Intro5,
      Intro6,
      Intro7,
      Intro8,
      Intro9,
      Intro10,
   ];

   const statusLoading = useSelector(lobbySelector).status;
   const dispatch = useDispatch();

   useEffect(() => {
      dispatch(getListLobby());
   }, []);

   return (
      <ScrollView contentContainerStyle={styles.main}>
         <View>
            <Carousel
               layout="default"
               layoutCardOffset={9}
               data={carouselItems}
               renderItem={CarouselCardItem}
               sliderWidth={SLIDER_WIDTH}
               itemWidth={ITEM_WIDTH}
               inactiveSlideShift={1}
               useScrollView={true}
               loop
               contentContainerCustomStyle={{
                  alignItems: "center",
                  padding: 18,
               }}
            />
         </View>
         <View>
            <View style={styles.container_title}>
               <Text style={styles.title}>Sảnh</Text>
               <TouchableOpacity
                  onPress={() => navigate(stackName.lobbyScreenStack)}
               >
                  <Text style={{ color: Colors.Primary }}>Xem tất cả</Text>
               </TouchableOpacity>
            </View>
            {statusLoading == "loading" ? <ActivityIndicator /> : <LobbyList />}
         </View>
      </ScrollView>
   );
};

export default HomeScreen;

const styles = StyleSheet.create({
   main: {
      flex: 1,
      backgroundColor: Colors.Background,
   },
   container_title: {
      flexDirection: "row",
      justifyContent: "space-between",
      paddingHorizontal: 20,
      paddingVertical: 15,
   },
   title: {
      fontSize: 16,
      fontWeight: "700",
   },
});
