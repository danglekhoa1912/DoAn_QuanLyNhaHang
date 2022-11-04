import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React from 'react';
import Colors from '../../../constants/Colors';
import {
  ActivityIndicator,
  ButtonBack,
  CusButton,
  CusInput,
  CusInputImage,
} from '../../../components';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { addLobby, updateLobby } from '../../../redux/slice/LobbySlice';
import { lobbySelector } from '../../../redux/selector';

const EditLobbyScrenn = ({ route }) => {
  // const { lobby } = route.params;
  const param = route.params;
  const status = useSelector(lobbySelector).status;
  const dispatch = useDispatch();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: param ? param.lobby.name : '',
      describe: param ? param.lobby.describe : '',
      capacity: param ? param.lobby.capacity.toString() : 0,
      image: param ? param.lobby.image : '',
      price: param ? param.lobby.price.toString() : 0,
    },
  });

  const onAddLobby = (data) => {
    dispatch(addLobby(data));
  };

  const onUpdateLobby = (data) => {
    dispatch(updateLobby(data));
  };

  const onSubmit = (data) => {
    if (param) {
      onUpdateLobby({ ...data, id: param.lobby.id });
    } else {
      onAddLobby(data);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={{ flex: 1 }}>
          <Text style={styles.title}>
            {param ? 'Chỉnh sửa sảnh' : 'Thêm sảnh'}
          </Text>
          <View style={{ flex: 1 }}>
            <CusInputImage
              control={control}
              errors={errors.image}
              label='image'
            />
            <CusInput control={control} errors={errors.name} label='name' />
            <CusInput
              keyboardType='number-pad'
              control={control}
              errors={errors.price}
              label='price'
            />
            <CusInput
              keyboardType='number-pad'
              control={control}
              errors={errors.capacity}
              label='capacity'
            />
            <CusInput
              multiline
              control={control}
              errors={errors.describe}
              label='describe'
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
              'Thêm sảnh'
            )}
          </CusButton>
          <ButtonBack />
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default EditLobbyScrenn;

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
});
