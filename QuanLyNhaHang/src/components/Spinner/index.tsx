import {View, Text} from 'react-native';
import React from 'react';
import Lottie from 'lottie-react-native';
import Layout from '../../constants/Layout';

interface ISpinner {
  isLoading: boolean;
}

const Spinner = ({isLoading}: ISpinner) => {
  return isLoading ? (
    <View
      style={{
        position: 'absolute',
        right: 0,
        left: 0,
        top: 0,
        height: Layout.window.height,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0,0,0,0.3)',
        zIndex: 99999,
      }}>
      <Lottie autoPlay loop source={require('./loading.json')} />
    </View>
  ) : (
    <></>
  );
};

export default Spinner;
