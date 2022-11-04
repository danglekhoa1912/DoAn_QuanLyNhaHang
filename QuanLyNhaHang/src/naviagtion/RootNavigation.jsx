import React, { useEffect, useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useDispatch, useSelector } from 'react-redux';
import { userSelector } from '../redux/selector';
import { getStorage, removeStorage } from '../utils/storage';
import { getUser } from '../redux/slice/UserSlice';
import { mainNavigate, stackName } from '../configs/NavigationContants';
import TopTabNavigation from './TopTabNavigation';
import MainNavigation from './MainNavigation';

const Stack = createNativeStackNavigator();

const RoorNavigation = () => {
  const [isReady, setReady] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    getStorage('token')
      .then((token) => {
        if (token) {
          dispatch(getUser(token));
        }
      })
      .finally(() => {});
  }, []);
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name={stackName.tabScreenStack}
        component={TopTabNavigation}
      />
      <Stack.Screen
        name={mainNavigate.mainNavigate}
        component={MainNavigation}
      />
    </Stack.Navigator>
  );
};

export default RoorNavigation;
