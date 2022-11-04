import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useSelector } from 'react-redux';
import { userSelector } from '../../redux/selector';
import UserNavigation from '../UserNavigation';
import StaffNavigation from '../StaffNavigation';
import AdminNavigation from '../AdminNavigation';

const MainNavigation = () => {
  const user = useSelector(userSelector).user;
  switch (user.role) {
    case 'ROLE_USER':
      return <UserNavigation />;
    case 'ROLE_STAFF':
      return <StaffNavigation />;
    case 'ROLE_ADMIN':
      return <AdminNavigation />;
  }
};

export default MainNavigation;
