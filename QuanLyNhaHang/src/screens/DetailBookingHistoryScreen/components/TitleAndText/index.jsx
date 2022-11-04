import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

const TitleAndText = (props) => {
  const { title, children } = props;
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}: </Text>
      <Text style={styles.content}>{children}</Text>
    </View>
  );
};

export default TitleAndText;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 8,
  },
  title: {
    fontSize: 18,
  },
  content: {
    fontSize: 18,
    paddingLeft: 12,
  },
});
