import {
  Keyboard,
  ScrollView,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React from 'react';
import {StyleService, useStyleSheet, useTheme} from '@ui-kitten/components';
import Icon from 'react-native-vector-icons/AntDesign';
import {Button, Spinner, Text, TextField} from '../../components';
import {useForm} from 'react-hook-form';
import {IFormRegister} from '../../type/form';
import DatePicker from '../../components/DatePicker';
import ImgPicker from '../../components/ImgPicker';
import * as yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';
import moment from 'moment';
import {goBack, navigate} from '../../utils/navigate';
import {COLORS} from '../../utils/color';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, AppState} from '../../store';
import {registerUser} from '../../store/user/thunkApi';

const schema = yup
  .object({
    email: yup
      .string()
      .required('Please enter your email')
      .email('Email invalidate'),
    password: yup
      .string()
      .required('Please enter your password')
      .min(8, 'Password must be at least 8 characters')
      .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
      .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
      .matches(/\d/, 'Password must contain at least one number')
      .matches(
        /[@#$%^&+=!]/,
        'Password must contain at least one special character',
      ),
    name: yup.string().required('Please enter your name'),
    birthday: yup
      .date()
      .test('birthday', 'Please choose a valid date of birth', value => {
        return moment(new Date()).diff(moment(value), 'years') >= 18;
      }),
    mobile: yup.string().required('Please enter your mobile').min(10).max(12),
    avatar: yup.string().required('Please choise your avatar'),
  })
  .required();

const RegisterPage = () => {
  const theme = useTheme();
  const styles = useStyleSheet(themedStyles);
  const dispatch = useDispatch<AppDispatch>();
  const pIsLoading = useSelector<AppState, number>(
    state => state.global.isLoading,
  );

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<IFormRegister>({
    defaultValues: {
      email: '',
      name: '',
      mobile: '',
      birthday: new Date(),
      avatar: '',
      password: '',
    },
    resolver: yupResolver(schema),
  });
  const onSubmit = (data: IFormRegister) => {
    dispatch(registerUser(data)).then((data: any) => {
      if (!data?.error) navigate('LoginScreen');
    });
  };

  return (
    <>
      <ScrollView style={styles.root}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.container}>
            <View>
              <TouchableOpacity
                onPress={() => {
                  goBack();
                }}>
                <Icon size={30} name="back" color={COLORS.tertiary} />
              </TouchableOpacity>
              <Text style={styles.title} category="h1">
                Create Account.
              </Text>
            </View>
            <View style={styles.container_input}>
              <View>
                <ImgPicker control={control} name="avatar" />
                {errors?.avatar?.message && (
                  <Text>{errors.avatar.message}</Text>
                )}
              </View>
              <TextField
                colorError="white"
                styleContainer={styles.text_field}
                keyboardType="email-address"
                control={control}
                name="email"
                placeholder="Email"
              />
              <TextField
                colorError="white"
                styleContainer={styles.text_field}
                control={control}
                name="name"
                placeholder="Name"
              />
              <TextField
                colorError="white"
                styleContainer={styles.text_field}
                keyboardType="numeric"
                control={control}
                name="mobile"
                placeholder="Mobile"
              />
              <DatePicker
                styleContainer={styles.text_field}
                max={new Date()}
                min={new Date(0)}
                control={control}
                name="birthday"
              />
              <TextField
                colorError="white"
                styleContainer={styles.text_field}
                secureTextEntry
                control={control}
                name="password"
                placeholder="Password"
              />
            </View>
            <View>
              <Button onPress={handleSubmit(onSubmit)} title="Register" />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </ScrollView>
      <Spinner isLoading={!!pIsLoading} />
    </>
  );
};

export default RegisterPage;

const themedStyles = StyleService.create({
  root: {
    backgroundColor: 'color-primary-default',
  },
  container: {
    paddingHorizontal: 20,
    marginBottom: 30,
    marginTop: 20,
  },
  title: {
    marginVertical: 12,
  },
  container_input: {
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 12,
  },
  text_field: {
    marginBottom: 18,
  },
});
