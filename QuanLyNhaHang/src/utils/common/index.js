import { ToastAndroid } from 'react-native';

export const toast = (message) => {
  ToastAndroid.show(message, ToastAndroid.SHORT);
};
