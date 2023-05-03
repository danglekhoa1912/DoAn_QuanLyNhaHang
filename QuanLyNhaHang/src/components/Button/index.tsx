import {
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {COLORS} from '../../utils/color';
import {TouchableOpacityProps} from 'react-native';
import {StyleProp} from 'react-native';
import {useTheme} from '@ui-kitten/components';

interface IButton {
  title: string;
  backgroundColor?: string;
  variant?: 'contained' | 'outlined';
  styleText?: StyleProp<TextStyle>;
}

const Button = ({
  title,
  backgroundColor,
  styleText,
  variant = 'contained',
  ...otherProps
}: IButton & TouchableOpacityProps) => {
  const theme = useTheme();

  const styleContainer =
    variant === 'contained'
      ? {
          backgroundColor: backgroundColor || theme['color-secondary'],
        }
      : {
          borderColor: backgroundColor || theme['color-secondary'],
          borderWidth: 1,
        };

  const styleTitle =
    variant === 'contained'
      ? {
          color: 'white',
        }
      : {
          color: backgroundColor || theme['color-secondary'],
        };

  return (
    <TouchableOpacity
      {...otherProps}
      style={[styles.root, styleContainer, otherProps.style]}>
      <Text style={[styleText, styles.title, styleTitle]}>{title}</Text>
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  root: {
    alignItems: 'center',
    paddingVertical: 18,
    borderRadius: 8,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 18,
  },
});
