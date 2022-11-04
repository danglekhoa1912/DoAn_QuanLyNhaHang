import {
  Button,
  Keyboard,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import * as yup from 'yup';
import React from 'react';
import { ActivityIndicator, CusInput } from '../../components';
import { useForm } from 'react-hook-form';
import CusButton from '../../components/CusButton';
import { yupResolver } from '@hookform/resolvers/yup';
import Colors from '../../constants/Colors';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../../redux/slice/UserSlice';
import { userSelector } from '../../redux/selector';

const schema = yup
  .object({
    email: yup.string().required('Vui lòng nhập email'),
    password: yup.string().required('Làm ơn nhập mật khẩu'),
  })
  .required();

const LoginScreen = () => {
  const user = useSelector(userSelector);
  const statusRegister = useSelector(userSelector).status;
  const dispatch = useDispatch();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    dispatch(loginUser(data));
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView contentContainerStyle={styles.container}>
          <CusInput control={control} errors={errors.email} label='email' />
          <CusInput
            control={control}
            errors={errors.password}
            label='password'
            sercurity
          />
          <TouchableOpacity>
            <Text>Forgot password?</Text>
          </TouchableOpacity>
          {user.status == '200' && (
            <Text style={styles.error}>
              *Thông tin đăng nhập không chính xác
            </Text>
          )}
          <View style={styles.container_button}>
            <CusButton
              buttonColor={Colors.Primary}
              textColor={Colors.Background}
              onPress={handleSubmit(onSubmit)}
              styleButton={styles.button}
              styleText={styles.button_text}
            >
              {statusRegister === 'loading' ? (
                <ActivityIndicator color={Colors.White} />
              ) : (
                'Đằng nhập'
              )}
            </CusButton>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    backgroundColor: Colors.Background,
    paddingTop: 40,
  },
  error: {
    color: Colors.Primary,
  },
  container_button: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 40,
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
