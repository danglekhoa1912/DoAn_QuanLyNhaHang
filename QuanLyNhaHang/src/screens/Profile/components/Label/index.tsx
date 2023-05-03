import {StyleSheet, View} from 'react-native';
import React from 'react';
import {Text, useTheme} from '@ui-kitten/components';

interface ILabel {
  children: React.ReactNode;
  title: string;
}

const Label = ({children, title}: ILabel) => {
  const theme = useTheme();
  return (
    <View
      style={{
        paddingHorizontal: 12,
        marginBottom: 30,
      }}>
      <Text category="s1" style={{color: theme['color-primary-default']}}>
        {title}
      </Text>
      {children}
    </View>
  );
};

export default Label;

const styles = StyleSheet.create({});
