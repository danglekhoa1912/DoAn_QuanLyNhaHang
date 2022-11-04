import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { adminName, staffName } from '../../configs/NavigationContants';
import AdminScreens from '../../screens/admin';
import StaffScreens from '../../screens/staff';
import DrawerNavigation from './DrawerNavigation';

const Stack = createNativeStackNavigator();

const StaffNavigation = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={staffName.drawerStaff} component={DrawerNavigation} />
      <Stack.Screen
        name={staffName.homeStaffStack}
        component={StaffScreens.HomeScreen}
      />
      <Stack.Screen
        name={adminName.editBookingStack}
        component={AdminScreens.EditBookingScreen}
      />
    </Stack.Navigator>
  );
};

export default StaffNavigation;
