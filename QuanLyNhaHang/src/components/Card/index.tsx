import {View, Text, StyleSheet, ViewProps} from 'react-native';
import React from 'react';

const Card = (props: ViewProps) => {
  const {children, style} = props;
  return <View style={[styles.card, style]}>{children}</View>;
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 8,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 8,

    elevation: 6,
  },
});

export default Card;
