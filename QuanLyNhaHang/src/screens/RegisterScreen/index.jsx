import {
  Image,
  Keyboard,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import React, { useEffect, useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { ActivityIndicator, CusInput } from '../../components';
import { Controller, useForm } from 'react-hook-form';
import CusButton from '../../components/CusButton';
import CusPickDate from '../../components/CusPickDate';
import moment from 'moment';
import Colors from '../../constants/Colors';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../../redux/slice/UserSlice';
import { userSelector } from '../../redux/selector';
import { navigate } from '../../naviagtion/service';
import { tabName } from '../../configs/NavigationContants';

const schema = yup
  .object({
    email: yup
      .string()
      .required('Please enter your email')
      .email('Email invalidate'),
    password: yup.string().required('Please enter your password'),
    //   .matches(
    //     '^(?=.*[A-Za-z])(?=.*d)(?=.*[@$!%*#?&])[A-Za-zd@$!%*#?&]{8,}$',
    //     'Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character'
    //   ),
    name: yup.string().required('Please enter your name'),
    birthday: yup
      .date()
      .nullable('Please enter your birthday')
      .test('birthday', 'Please choose a valid date of birth', (value) => {
        return moment(new Date()).diff(moment(value), 'years') >= 18;
      }),
    mobile: yup.string().required('Please enter your mobile').min(10).max(12),
    avatar: yup
      .string()
      .required('Please choise your avatar')
      .nullable('Please choise your avatar'),
  })
  .required();

const RegisterScreen = () => {
  const [hasGalleryPermission, setHasGalleryPermission] = useState(null);
  const statusRegister = useSelector(userSelector).status;
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      const galleryStatusLibrary =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      const galleryStatusCamera =
        await ImagePicker.requestCameraPermissionsAsync();
      setHasGalleryPermission(
        galleryStatusLibrary.status === 'granted' &&
          galleryStatusCamera.status === 'granted'
      );
    })();
  }, []);

  const pickImage = async (onChange) => {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      base64: true,
    });

    if (!result.cancelled) {
      onChange(result.uri);
    }
  };

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
      name: '',
      birthday: null,
      mobile: '',
      avatar: '',
    },
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    //   console.log(data);
    Promise.resolve(dispatch(registerUser(data))).then(() => {
      reset;
    });
    //   navigation.navigate(tabName.loginTab);
  };

  useEffect(() => {
    if (statusRegister === 200) {
      reset({
        email: '',
        password: '',
        name: '',
        birthday: null,
        mobile: '',
        avatar: '',
      });
      navigate(tabName.loginTab);
    }
  }, [statusRegister]);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.container}
        >
          <CusInput control={control} errors={errors.email} label='email' />
          <CusInput control={control} errors={errors.name} label='name' />
          <CusInput
            control={control}
            errors={errors.password}
            label='password'
            sercurity
          />
          <CusInput
            keyboardType='numeric'
            control={control}
            errors={errors.mobile}
            label='mobile'
          />

          <CusPickDate
            maxDate={new Date()}
            placeholder='Birthday'
            control={control}
            errors={errors.birthday}
            label='birthday'
          />
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <View style={styles.container_avatar}>
                <View style={styles.container_buttonImg}>
                  {value && (
                    <Image style={styles.avatar} source={{ uri: value }} />
                  )}
                  <TouchableOpacity
                    style={styles.button_img}
                    onPress={() => {
                      pickImage(onChange);
                    }}
                  >
                    <Text style={styles.text}>Choise avatar</Text>
                  </TouchableOpacity>
                </View>
                {errors.avatar && (
                  <Text style={styles.error}>*{errors.avatar.message}</Text>
                )}
              </View>
            )}
            name='avatar'
          />

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
              'Sign Up'
            )}
          </CusButton>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: Colors.Background,
  },
  container_buttonImg: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    marginBottom: 10,
  },
  button_img: {
    backgroundColor: Colors.Secondary,
    padding: 12,
    borderRadius: 8,
  },
  text: {
    fontWeight: 'bold',
    color: Colors.Background,
  },
  error: {
    color: 'red',
    paddingLeft: 20,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 18,
  },
  container_avatar: {
    marginTop: 12,
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
