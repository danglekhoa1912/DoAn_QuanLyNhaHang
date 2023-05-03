import React from 'react';
import Toast, {ToastShowParams} from 'react-native-toast-message';

export default {
  success(msg: string, params?: ToastShowParams): void {
    Toast.show({
      type: 'success',
      text1: msg,
      ...params,
    });
  },
  error(msg: string, params?: ToastShowParams): void {
    Toast.show({
      type: 'error',
      text1: msg,
      ...params,
    });
  },
  info(msg: string, params?: ToastShowParams): void {
    Toast.show({
      type: 'info',
      text1: msg,
      ...params,
    });
  },
};
