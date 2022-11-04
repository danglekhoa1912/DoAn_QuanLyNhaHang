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
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { ActivityIndicator, CusButton, CusInput } from '../../components';
import Colors from '../../constants/Colors';
import { useDispatch, useSelector } from 'react-redux';
import { postComment } from '../../redux/slice/CommenrSlice';
import { commentSelector, userSelector } from '../../redux/selector';
import { yupResolver } from '@hookform/resolvers/yup';

const schema = yup
  .object({
    feedback: yup.string().required('Không được bỏ trống'),
  })
  .required();

const CommentScreen = () => {
  const user = useSelector(userSelector);
  const status = useSelector(commentSelector).status;
  const dispatch = useDispatch();
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      feedback: '',
    },
    resolver: yupResolver(schema),
  });
  const onSubmit = (data) => {
    dispatch(
      postComment({
        id: user.user.id,
        content: data.feedback,
      })
    );
    reset({
      feedback: '',
    });
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <CusInput
            multiline
            control={control}
            errors={errors.feedback}
            label='feedback'
          />
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
              'Gửi'
            )}
          </CusButton>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default CommentScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: Colors.Background,
    paddingTop: 40,
  },
  button: {
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    height: 70,
    marginTop: 20,
  },
  button_text: {
    fontSize: 18,
    fontWeight: '600',
  },
});
