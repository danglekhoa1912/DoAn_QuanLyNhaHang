import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import React, {useEffect} from 'react';
import {StyleService, useStyleSheet} from '@ui-kitten/components';
import {Intro10, Logo, Wedding} from '../../../assets';
import * as yup from 'yup';
import {useTranslation} from 'react-i18next';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {IFormLogin} from '../../../type/form';
import {Button} from '../../components';
import TextField from '../../components/TextField';
import {useDispatch} from 'react-redux';
import {AppDispatch} from '../../../store';
import {Navigate, useNavigate} from 'react-router-dom';
import {loginUserWeb} from '../../../store/profile/thunkApi';

const LoginPage = () => {
  const styles = useStyleSheet(themedStyles);
  const {t} = useTranslation();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const token = localStorage.getItem('accessToken');

  if (token) return <Navigate to={'/admin'} />;

  const schema = yup
    .object({
      userName: yup.string().required(t('validate.user_name.empty') || ''),
      password: yup.string().required(t('validate.password.empty') || ''),
    })
    .required();

  const {control, reset, handleSubmit} = useForm<IFormLogin>({
    defaultValues: {
      userName: '',
      password: '',
    },
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: IFormLogin) => {
    dispatch(
      loginUserWeb({
        password: data.password,
        username: data.userName,
        tokenDevice: '',
      }),
    ).then((data: any) => {
      if (!data?.error) {
        reset();
        localStorage.setItem('accessToken', data.payload?.accessToken);
        navigate('admin');
      }
    });
  };

  return (
    <View style={styles.root}>
      <View style={styles.card}>
        <View style={styles.containerImage}>
          <Wedding viewBox="0 0 700 300	" width={'100%'} height={'100%'} />
        </View>
        <View style={styles.containerForm}>
          <View>
            <Image
              source={Logo}
              style={{
                width: 100,
                height: 100,
              }}
            />
            <Text
              style={{
                fontFamily: 'Darker Grotesque',
                fontWeight: '800',
                fontSize: 32,
                textAlign: 'center',
              }}>
              Sign In
            </Text>
          </View>
          <View style={styles.containerField}>
            <TextField
              placeholder="User Name"
              control={control}
              name="userName"
            />
            <TextField
              placeholder="Password"
              control={control}
              name="password"
              secureTextEntry
            />
          </View>
          <View
            style={{
              paddingHorizontal: 18,
              width: '100%',
            }}>
            <Button
              style={{
                width: '100%',
              }}
              title="Login"
              onPress={handleSubmit(onSubmit)}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

export default LoginPage;

const themedStyles = StyleService.create({
  root: {
    background:
      'linear-gradient(90deg, rgba(255,67,67,1) 0%, rgba(255,128,128,1) 100%)',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    width: '60%',
    height: '80%',
    backgroundColor: 'white',
    borderRadius: 8,
    flexDirection: 'row',
  },
  containerImage: {
    flex: 3,
  },
  containerForm: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerField: {
    width: '100%',
    padding: 18,
    gap: 18,
  },
});
