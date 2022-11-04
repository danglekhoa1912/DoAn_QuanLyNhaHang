import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import Colors from '../../constants/Colors';

const CusButton = (props) => {
  const {
    children,
    onPress,
    buttonColor,
    textColor,
    styleButton,
    styleText,
    ...ortherProps
  } = props;
  return (
    <TouchableOpacity
      {...ortherProps}
      style={[
        styles.button,
        { backgroundColor: buttonColor, borderColor: textColor },
        styleButton,
      ]}
      onPress={onPress}
    >
      <Text style={[styleText, { color: textColor }]}>{children}</Text>
    </TouchableOpacity>
  );
};

export default CusButton;

const styles = StyleSheet.create({
  button: {
    borderRadius: 8,
    borderWidth: 1,
    backgroundColor: Colors.Background,
  },
});
