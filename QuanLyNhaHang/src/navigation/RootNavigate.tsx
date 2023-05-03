import {View, Text} from 'react-native';
import React from 'react';
import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import {privateScreen, publicScreen} from './NavigationContants';
import {RouteProp} from '@react-navigation/native';
import DrawerScreen from './DrawerNavigation';
import HomePage from '../screens/Home';
import BookingPage from '../screens/Booking';
import DishPage from '../screens/Dish';
import LobbyPage from '../screens/Lobby';
import LobbyDetailPage from '../screens/LobbyDetail';
import ServicePage from '../screens/Service';
import BookingDetailPage from '../screens/BookingDetail';
import OrderHistoryDetailPage from '../screens/OrderHistoryDetail';
import RoomChat from '../screens/RoomChat';

type RootStackParamList = {
  LobbyDetailScreen: {
    id: number;
  };
  OrderHistoryDetailScreen: {
    id: number;
  };
};

export type LobbyDetailScreenRouteProp = NativeStackScreenProps<
  RootStackParamList,
  'LobbyDetailScreen'
>;

export type OrderHistoryDetailScreenRouteProp = NativeStackScreenProps<
  RootStackParamList,
  'OrderHistoryDetailScreen'
>;

const Stack = createNativeStackNavigator();

const RootNavigate = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      {publicScreen?.map((screen, index) => (
        <Stack.Screen
          key={index}
          name={screen.name}
          component={screen.component}
        />
      ))}
      <Stack.Screen name="DrawerScreen" component={DrawerScreen} />
      <Stack.Screen name="HomeScreen" component={HomePage} />
      <Stack.Screen name="ChatScreen" component={RoomChat} />
      <Stack.Screen name="BookingScreen" component={BookingPage} />
      <Stack.Screen name="DishScreen" component={DishPage} />
      <Stack.Screen name="LobbyScreen" component={LobbyPage} />
      <Stack.Screen name="LobbyDetailScreen" component={LobbyDetailPage} />
      <Stack.Screen name="ServiceScreen" component={ServicePage} />
      <Stack.Screen name="BookingDetailScreen" component={BookingDetailPage} />
      <Stack.Screen
        name="OrderHistoryDetailScreen"
        component={OrderHistoryDetailPage}
      />
      {/* {privateScreen?.map((screen, index) => (
        <Stack.Screen
          key={index}
          name={screen.name}
          component={screen.component}
        />
      ))} */}
    </Stack.Navigator>
  );
};

export default RootNavigate;
