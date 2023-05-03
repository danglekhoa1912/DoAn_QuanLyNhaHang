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
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/Ionicons';

import {MenuBg} from '../../assets/index';
import {navigate} from '../../utils/navigate';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, AppState} from '../../store';
import {logout} from '../../store/user';
import {IUser} from '../../type/user';
import {useTranslation} from 'react-i18next';

const CustomDrawer = (props: DrawerContentComponentProps) => {
  const {t} = useTranslation();
  const dispatch = useDispatch<AppDispatch>();
  const pProfile = useSelector<AppState, IUser>(state => state.user.user);
  const handleLogout = () => {
    dispatch(logout());
    props.navigation.closeDrawer();
    navigate('LoginScreen');
  };

  return (
    <View style={{flex: 1}}>
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={{backgroundColor: '#f15453'}}>
        <ImageBackground source={MenuBg} style={styles.background_image}>
          <Image
            style={styles.avatar}
            source={{
              uri: pProfile?.avatar,
            }}
          />
          <Text style={styles.text}>{pProfile?.name}</Text>
        </ImageBackground>
        <View style={styles.container_list}>
          <DrawerItemList {...props} />
        </View>
      </DrawerContentScrollView>
      <View style={styles.container_bottom}>
        <TouchableOpacity onPress={handleLogout} style={styles.button}>
          <View style={styles.content_button}>
            <Icon name="exit-outline" size={22} />
            <Text style={{fontSize: 15, marginLeft: 5}}>
              {t('form.logout')}
            </Text>
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
    backgroundColor: '#ffff',
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
    color: '#ffff',
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
