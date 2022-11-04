import {
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import {
  ActivityIndicator,
  ButtonBack,
  CusButton,
  CusInput,
  CusInputImage,
} from '../../../components';
import Colors from '../../../constants/Colors';
import CusPickDate from '../../../components/CusPickDate';
import { useDispatch, useSelector } from 'react-redux';
import { addStaff } from '../../../redux/slice/UserSlice';
import { userSelector } from '../../../redux/selector';
import { goBack } from '../../../naviagtion/service';

const EditUserScreen = ({ route }) => {
  const param = route.params;
  const status = useSelector(userSelector).status;
  const dispatch = useDispatch();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: param ? param.user.name : '',
      birthday: param ? new Date(param.user.birthday) : new Date(),
      email: param ? param.user.email : '',
      mobile: param ? param.user.mobile : '',
      avatar: param ? param.user.avatar : '',
    },
  });

  const onSubmit = (data) => {
    if (param) {
    } else {
      dispatch(addStaff(data));
    }
  };

  useEffect(() => {
    if (status === 200) goBack();
  }, [status]);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={{ flex: 1 }}>
          <Text style={styles.title}>
            {param ? 'Chỉnh sửa thông tin' : 'Thêm nhân viên'}
          </Text>
          <View style={{ flex: 1 }}>
            <CusInputImage
              control={control}
              errors={errors.avatar}
              label='avatar'
            />
            <CusInput control={control} errors={errors.name} label='name' />
            <CusInput control={control} errors={errors.email} label='email' />
            <CusInput control={control} errors={errors.mobile} label='mobile' />
            <CusPickDate
              maxDate={new Date()}
              placeholder='Birthday'
              control={control}
              errors={errors.birthday}
              label='birthday'
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
            ) : param ? (
              'Lưu'
            ) : (
              'Thêm nhân viên'
            )}
          </CusButton>
          <ButtonBack />
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default EditUserScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.Background,
    paddingHorizontal: 12,
    paddingBottom: 20,
  },
  title: {
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.Primary,
    paddingTop: 12,
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
  avatar: {
    width: 50,
    height: 50,
  },
});
