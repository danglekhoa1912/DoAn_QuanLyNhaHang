import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React, { useState } from 'react';
import * as yup from 'yup';
import Colors from '../../constants/Colors';
import { Avatar, Input, ModalMenu } from './components';
import { useForm } from 'react-hook-form';
import CusButton from '../../components/CusButton';
import { useDispatch, useSelector } from 'react-redux';
import { userSelector } from '../../redux/selector';
import { updateUser } from '../../redux/slice/UserSlice';
import { ActivityIndicator } from '../../components';
import { yupResolver } from '@hookform/resolvers/yup';

const schema = yup
  .object({
    name: yup.string().required('Vui lòng nhập tên'),
    birthday: yup
      .date()
      .nullable('Vui lòng nhập ngày sinh')
      .test('birthday', 'Ngày sinh không hợp lệ', (value) => {
        return moment(new Date()).diff(moment(value), 'years') >= 18;
      }),
    mobile: yup
      .string()
      .required('Vui lòng nhập số điện thoại')
      .min(10)
      .max(12),
  })
  .required();

const ProfileScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);

  const user = useSelector(userSelector).user;
  const status = useSelector(userSelector).status;
  const dispatch = useDispatch();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: user.email,
      mobile: user.mobile,
      name: user.name,
      birthday: new Date(user.birthday),
    },
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    dispatch(
      updateUser({
        id: user.id,
        avatar: user.avatar,
        mobile: data.mobile,
        name: data.name,
        birthday: data.birthday,
      })
    );
  };

  const onChangeAvatar = () => {
    setModalVisible(!modalVisible);
  };

  const onHideModal = () => {
    setModalVisible(false);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView contentContainerStyle={styles.container}>
          <Avatar onChangeAvatar={onChangeAvatar} avatar={user.avatar} />
          <View>
            <Input
              editable={false}
              control={control}
              errors={errors.email}
              label='email'
              title='Email'
            />
            <Input
              control={control}
              errors={errors.name}
              label='name'
              title='Tên'
            />
            <Input
              control={control}
              errors={errors.mobile}
              label='mobile'
              title='Số điện thoại'
            />
            <Input
              control={control}
              errors={errors.birthday}
              label='birthday'
              type='date'
              title='Ngày sinh'
            />
          </View>
          <CusButton
            buttonColor={Colors.Primary}
            textColor={Colors.Background}
            onPress={handleSubmit(onSubmit)}
            styleButton={styles.button}
            styleText={styles.button_text}
          >
            {status === 'loading' ? (
              <ActivityIndicator color={Colors.White} />
            ) : (
              'Lưu'
            )}
          </CusButton>
          <ModalMenu modalVisible={modalVisible} onHideModal={onHideModal} />
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.Background,
    paddingHorizontal: 18,
    paddingBottom: 12,
  },
  button: {
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    height: 70,
  },
  button_text: {
    fontSize: 18,
    fontWeight: '600',
  },
});
