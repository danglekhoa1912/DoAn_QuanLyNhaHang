import {
  Image,
  ImageStyle,
  Keyboard,
  ScrollView,
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React, {useEffect} from 'react';
import Layout from '../../constants/Layout';
import {
  StyleService,
  Text,
  useStyleSheet,
  useTheme,
} from '@ui-kitten/components';
import Icon from 'react-native-vector-icons/Entypo';
import {Button, TextField} from '../../components';
import {useForm} from 'react-hook-form';
import {IFormUpdateUser} from '../../type/form';
import {Label} from './components';
import {connect, useSelector} from 'react-redux';
import {AppDispatch, AppState} from '../../store';
import {IUser} from '../../type/user';
import DatePicker from '../../components/DatePicker';
import {updateUser} from '../../store/user/thunkApi';

interface IProfilePage {
  pUpdateUser: (user: IUser) => Promise<any>;
}

const ProfilePage = ({pUpdateUser}: IProfilePage) => {
  const theme = useTheme();
  const styles = useStyleSheet(themedStyles);
  const pUser = useSelector<AppState, IUser>(state => state.user.user);

  const {control, reset, handleSubmit} = useForm<IFormUpdateUser>({
    defaultValues: {
      avatar: '',
      birthday: new Date(),
      mobile: '',
      name: '',
    },
  });

  useEffect(() => {
    reset({
      avatar: pUser?.avatar,
      birthday: new Date(pUser?.birthday),
      mobile: pUser?.mobile,
      name: pUser?.name,
    });
  }, [pUser]);

  const onSubmit = (data: IFormUpdateUser) => {
    pUpdateUser({
      avatar:
        'https://scontent.fsgn2-9.fna.fbcdn.net/v/t39.30808-6/338354346_599809451782056_6663372141932536421_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=5cd70e&_nc_ohc=A-AZIdNhF5oAX9BN2jb&_nc_ht=scontent.fsgn2-9.fna&oh=00_AfC-l-gEI4_UbN5HnxOLybIktYyQPGXGPqASxuPENhhXKw&oe=642D24FE',
      id: pUser.id,
      birthday: data.birthday,
      email: pUser.email,
      mobile: data.mobile,
      name: data.name,
      password: pUser.password,
    });
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ScrollView style={{flex: 1}}>
        <View style={styles.container_background_avt}>
          <TouchableOpacity style={styles.icon_camera}>
            <Icon size={30} name="camera" color={'white'} />
          </TouchableOpacity>
          <View style={styles.container_avt}>
            <Image
              style={styles.avatar as StyleProp<ImageStyle>}
              source={{
                uri: pUser.avatar,
              }}
            />
          </View>
        </View>
        <View style={styles.container_field}>
          <Label title="Name">
            <TextField
              style={styles.field}
              textStyle={styles.text_field}
              placeholderTextColor="gray"
              control={control}
              name="name"
              placeholder="Name"
            />
          </Label>
          <Label title="Mobile">
            <TextField
              style={styles.field}
              textStyle={styles.text_field}
              placeholderTextColor="gray"
              control={control}
              name="mobile"
              placeholder="Mobile"
              keyboardType="number-pad"
            />
          </Label>
          <Label title="Birthday">
            <DatePicker
              controlStyle={styles.field}
              max={new Date()}
              min={new Date(0)}
              control={control}
              name="birthday"
              colorIcon="black"
            />
          </Label>
        </View>
        <View
          style={{
            alignItems: 'center',
            marginVertical: 20,
            marginBottom: 200,
          }}>
          <Button
            style={{
              width: 200,
            }}
            backgroundColor={theme['color-primary-default']}
            title="Save"
            onPress={handleSubmit(onSubmit)}
          />
        </View>
      </ScrollView>
    </TouchableWithoutFeedback>
  );
};

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  pUpdateUser: (user: IUser) => dispatch(updateUser(user)),
});

export default connect(null, mapDispatchToProps)(ProfilePage);

const themedStyles = StyleService.create({
  container_background_avt: {
    width: '100%',
    height: 200,
    backgroundColor: 'color-primary-400',
  },
  icon_camera: {
    position: 'absolute',
    bottom: 16,
    right: 16,
  },
  container_avt: {
    position: 'absolute',
    top: '55%',
    left: '50%',
    transform: [{translateX: -75}],
    alignItems: 'center',
  },
  avatar: {
    width: 160,
    height: 160,
    borderRadius: 100,
    borderWidth: 3,
    borderColor: 'white',
  },
  container_field: {
    marginTop: 120,
  },
  field: {
    backgroundColor: 'transparent',
    borderColor: 'gray',
    borderWidth: 0,
    borderBottomWidth: 1,
    borderRadius: 0,
  },
  text_field: {
    marginHorizontal: 0,
  },
});
