import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import { Ionicons } from '@expo/vector-icons';

import Colors from '../../constants/Colors';
import { MenuBg } from '../../../assets/images';
import { useDispatch, useSelector } from 'react-redux';
import { logOutUser } from '../../redux/slice/UserSlice';
import { replace } from '../../naviagtion/service';
import { stackName } from '../../configs/NavigationContants';
import { userSelector } from '../../redux/selector';

const CustomDrawer = (props) => {
  const user = useSelector(userSelector).user;
  const dispatch = useDispatch();

  const logOut = () => {
    dispatch(logOutUser());
    replace(stackName.tabScreenStack);
  };

  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={{ backgroundColor: '#f15453' }}
      >
        <ImageBackground source={MenuBg} style={styles.background_image}>
          <Image style={styles.avatar} source={{ uri: user.avatar }} />
          <Text style={styles.text}>
            {user.name}
            {user.role !== 'ROLE_USER' ? ` - ${user.role}` : ''}
          </Text>
        </ImageBackground>
        <View style={styles.container_list}>
          <DrawerItemList {...props} />
        </View>
      </DrawerContentScrollView>
      <View style={styles.container_bottom}>
        <TouchableOpacity onPress={logOut} style={styles.button}>
          <View style={styles.content_button}>
            <Ionicons name='exit-outline' size={22} />
            <Text style={{ fontSize: 15, marginLeft: 5 }}>Đăng xuất</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CustomDrawer;

const styles = StyleSheet.create({
  container_list: {
    flex: 1,
    backgroundColor: Colors.Background,
  },
  background_image: {
    padding: 20,
  },
  avatar: {
    height: 80,
    width: 80,
    borderRadius: 40,
    marginBottom: 10,
  },
  text: {
    fontSize: 18,
    color: Colors.Background,
    fontWeight: 'bold',
  },
  container_bottom: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
  },
  button: {
    paddingVertical: 10,
  },
  content_button: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
