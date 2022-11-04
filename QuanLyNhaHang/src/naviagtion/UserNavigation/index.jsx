import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { useDispatch } from 'react-redux';
import { stackName } from '../../configs/NavigationContants';
import { changeSearch } from '../../redux/slice/SearchSlice';
import DrawerScreenStack from '../DrawerNavigation';
import Screens from '../../screens';

const Stack = createNativeStackNavigator();

const UserNavigation = () => {
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
            dispatch(changeSearch(''));
          },
          beforeRemove: (e) => {
            dispatch(changeSearch(''));
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
            dispatch(changeSearch(''));
          },
          beforeRemove: (e) => {
            dispatch(changeSearch(''));
          },
        }}
        name={stackName.dishScreenStack}
        component={Screens.DishScreen}
      />
      <Stack.Screen
        name={stackName.serviceScreenStack}
        component={Screens.ServiceScreen}
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
      <Stack.Screen
        name={stackName.detailBookingHistoryStack}
        component={Screens.DetailBookingHistoryScreen}
      />
    </Stack.Navigator>
  );
};

export default UserNavigation;
