import {
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
} from 'react-native';
import React from 'react';
import {COLORS} from '../../../utils/color';

interface IButton extends TouchableOpacityProps {
  title: string;
  textStyle?: StyleProp<TextStyle>;
}

const Button = ({title, textStyle, style, ...otherProps}: IButton) => {
  return (
    <TouchableOpacity style={[styles.button, style]} {...otherProps}>
      <Text style={[styles.text, textStyle]}>{title}</Text>
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  button: {
    borderRadius: 6,
    padding: 12,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
