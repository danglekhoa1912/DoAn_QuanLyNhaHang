import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { stackName } from "../configs/NavigationContants";
import TopTabNavigation from "./TopTabNavigation";
import Screens from "../screens";
import DrawerScreenStack from "./DrawerNavigation";
import { useDispatch } from "react-redux";
import { changeSearch } from "../redux/slice/SearchSlice";

const Stack = createNativeStackNavigator();

const RoorNavigation = () => {
   const dispatch = useDispatch();

   return (
      <Stack.Navigator screenOptions={{ headerShown: false }}>
         <Stack.Screen
            name={stackName.drawerScreenStack}
            component={DrawerScreenStack}
         />
         <Stack.Screen
            listeners={{
               blur: (e) => {
                  dispatch(changeSearch(""));
               },
               beforeRemove: (e) => {
                  dispatch(changeSearch(""));
               },
            }}
            name={stackName.lobbyScreenStack}
            component={Screens.LobbyScreen}
         />
         <Stack.Screen
            name={stackName.bookingStack}
            component={Screens.BookingScreen}
         />
         <Stack.Screen
            listeners={{
               blur: (e) => {
                  dispatch(changeSearch(""));
               },
               beforeRemove: (e) => {
                  dispatch(changeSearch(""));
               },
            }}
            name={stackName.dishScreenStack}
            component={Screens.DishScreen}
         />
         <Stack.Screen
            name={stackName.tabScreenStack}
            component={TopTabNavigation}
         />
         <Stack.Screen
            name={stackName.detailLobbyStack}
            component={Screens.DetailLobby}
         />
         <Stack.Screen
            name={stackName.chooseDishStack}
            component={Screens.ChooseDishScreen}
         />
         <Stack.Screen
            name={stackName.orderDetailStack}
            component={Screens.OrderDetailScreen}
         />
      </Stack.Navigator>
   );
};

export default RoorNavigation;
