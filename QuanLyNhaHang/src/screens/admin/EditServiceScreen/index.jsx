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
import { useForm } from 'react-hook-form';
import {
  ActivityIndicator,
  ButtonBack,
  CusButton,
  CusInput,
  CusInputImage,
} from '../../../components';
import Colors from '../../../constants/Colors';
import { useDispatch, useSelector } from 'react-redux';
import { addService, updateService } from '../../../redux/slice/ServiceSlice';
import { serviceSelector } from '../../../redux/selector';

const EditServiceScreen = ({ route }) => {
  const param = route.params;
  const serviceStatus = useSelector(serviceSelector).status;
  const dispatch = useDispatch();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: param ? param.service.name : '',
      serviceDescribe: param ? param.service.serviceDescribe : '',
      image: param ? param.service.image : '',
      price: param ? param.service.price.toString() : 0,
    },
  });

  const onAddService = (service) => {
    dispatch(addService(service));
  };

  const onUpdateService = (service) => {
    dispatch(updateService({ ...service, id: param.service.id }));
  };

  const onSubmit = (data) => {
    if (param) {
      onUpdateService(data);
    } else {
      onAddService(data);
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
            {param ? 'Chỉnh sửa dịch vụ' : 'Thêm dịch vụ'}
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
              multiline
              control={control}
              errors={errors.serviceDescribe}
              label='serviceDescribe'
            />
          </View>
          <CusButton
            buttonColor={Colors.Primary}
            textColor={Colors.Background}
            onPress={handleSubmit(onSubmit)}
            styleButton={styles.button}
            styleText={styles.button_text}
          >
            {serviceStatus === 'loading' ? (
              <ActivityIndicator color={Colors.White} />
            ) : param ? (
              'Lưu'
            ) : (
              'Thêm dịch vụ'
            )}
          </CusButton>
          <ButtonBack />
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default EditServiceScreen;

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
    height: 70,
    justifyContent: 'center',
  },
  button_text: {
    fontSize: 18,
    fontWeight: '600',
  },
});
