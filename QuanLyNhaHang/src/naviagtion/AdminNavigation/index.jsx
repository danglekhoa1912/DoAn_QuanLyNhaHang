import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { adminName, staffName } from '../../configs/NavigationContants';
import AdminScreens from '../../screens/admin';
import DrawerNavigation from './DrawerNavigation';

const Stack = createNativeStackNavigator();

const AdminNavigation = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={adminName.drawerAdmin} component={DrawerNavigation} />
      <Stack.Screen
        name={adminName.homeAdminStack}
        component={AdminScreens.HomeScreen}
      />
      <Stack.Screen
        name={adminName.editLobbyStack}
        component={AdminScreens.EditLobbyScrenn}
      />
      <Stack.Screen
        name={adminName.editServiceStack}
        component={AdminScreens.EditServiceScreen}
      />
      <Stack.Screen
        name={adminName.editUserStack}
        component={AdminScreens.EditUserScreen}
      />
      <Stack.Screen
        name={adminName.editDishStack}
        component={AdminScreens.EditDishScreen}
      />
      <Stack.Screen
        name={adminName.editBookingStack}
        component={AdminScreens.EditBookingScreen}
      />
    </Stack.Navigator>
  );
};

export default AdminNavigation;
