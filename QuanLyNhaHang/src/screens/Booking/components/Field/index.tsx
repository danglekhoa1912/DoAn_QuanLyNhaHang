import {StyleProp, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {ViewStyle} from 'react-native';

interface IField {
  label: string;
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}

const Field = ({children, label, style}: IField) => {
  return (
    <View style={[styles.root, style]}>
      <Text style={styles.label}>{label}</Text>
      {children}
    </View>
  );
};

export default Field;

const styles = StyleSheet.create({
  root: {
    marginVertical: 8,
  },
  label: {
    fontSize: 20,
    fontWeight: 'bold',
    paddingBottom: 10,
  },
});
