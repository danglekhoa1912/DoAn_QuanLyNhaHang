import {
  Keyboard,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React from 'react';
import {COLORS} from '../../utils/color';
import Icon from 'react-native-vector-icons/AntDesign';
import {Button, Spinner, Text, TextField} from '../../components';
import {useForm} from 'react-hook-form';
import {IFormLogin} from '../../type/form';
import {goBack, navigate} from '../../utils/navigate';
import {AppDispatch, AppState} from '../../store';
import {ILoginRes} from '../../type/user';
import {connect, useSelector} from 'react-redux';
import messaging from '@react-native-firebase/messaging';
import * as yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';
import {useTranslation} from 'react-i18next';
import {getUser, loginUser} from '../../store/user/thunkApi';

interface ILoginPage {
  pLoginUser: (data: ILoginRes) => Promise<any>;
  pGetUser: () => Promise<any>;
}

const LoginPage = ({pLoginUser, pGetUser}: ILoginPage) => {
  const {t} = useTranslation();

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
  const pIsLoading = useSelector<AppState, number>(
    state => state.global.isLoading,
  );

  const handleNavigateRegister = () => {
    navigate('RegisterScreen');
  };

  const onSubmit = (data: IFormLogin) => {
    messaging()
      .getToken()
      .then(token => {
        pLoginUser({
          password: data.password,
          username: data.userName,
          tokenDevice: token,
        }).then(data => {
          if (!data?.error) {
            reset();
            pGetUser();
            navigate('DrawerScreen');
          }
        });
      });
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.root}>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => {
              goBack();
            }}>
            <Icon size={30} name="back" color={COLORS.tertiary} />
          </TouchableOpacity>
          <Text style={styles.title} category="h1">
            Let's sign in you in.
          </Text>
          <Text>Welcome back.</Text>
          <Text>You have been missed.</Text>
        </View>
        <View style={styles.input}>
          <TextField
            colorError="white"
            control={control}
            name="userName"
            placeholder={t('form.user_name') || ''}
          />
          <TextField
            colorError="white"
            secureTextEntry
            control={control}
            name="password"
            placeholder={t('form.password') || ''}
          />
        </View>
        <View>
          <View style={styles.textFooter}>
            <Text>{t(`form.don't_have_account`) || ''}</Text>
            <TouchableOpacity onPress={handleNavigateRegister}>
              <Text category="h6">{t('form.register') || ''}</Text>
            </TouchableOpacity>
          </View>
          <Button
            onPress={handleSubmit(onSubmit)}
            title={t('form.logIn') || ''}
          />
        </View>
        <Spinner isLoading={!!pIsLoading} />
      </View>
    </TouchableWithoutFeedback>
  );
};

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  pLoginUser: (data: ILoginRes) => dispatch(loginUser(data)),
  pGetUser: () => dispatch(getUser()),
});

export default connect(null, mapDispatchToProps)(LoginPage);

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: COLORS.primary,
    paddingHorizontal: 20,
    justifyContent: 'space-between',
    paddingTop: 80,
    paddingBottom: 40,
  },
  header: {
    // marginVertical: 80,
  },
  title: {
    marginVertical: 12,
  },
  input: {
    height: 180,
    justifyContent: 'space-around',
  },
  textFooter: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    paddingBottom: 20,
  },
  text: {
    color: 'white',
  },
});
