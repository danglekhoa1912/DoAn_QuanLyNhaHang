import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import Colors from '../../constants/Colors';
import { goBack } from '../../naviagtion/service';

const ButtonBack = () => {
  return (
    <TouchableOpacity style={styles.container} onPress={() => goBack()}>
      <MaterialIcons
        name='keyboard-arrow-left'
        size={40}
        color={Colors.Primary}
      />
    </TouchableOpacity>
  );
};

export default ButtonBack;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 10,
    left: 10,
  },
});
