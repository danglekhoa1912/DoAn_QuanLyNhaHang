import {StyleSheet, Text, View, ViewProps} from 'react-native';
import React from 'react';

const Card = (props: ViewProps) => {
  const {children, style, ...otherProps} = props;
  return (
    <View {...otherProps} style={[styles.root, style]}>
      {children}
    </View>
  );
};

export default Card;

const styles = StyleSheet.create({
  root: {
    borderRadius: 6,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
    borderWidth: 1,
    borderColor: '#E5E5E5',
  },
});
