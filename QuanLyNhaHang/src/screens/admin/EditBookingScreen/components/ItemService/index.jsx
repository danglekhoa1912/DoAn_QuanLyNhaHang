import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

const ItemService = (props) => {
  const { service } = props;
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{service.name}</Text>
      <Text style={styles.text}>{service.price} VND</Text>
    </View>
  );
};

export default ItemService;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 12,
  },
  text: {
    fontSize: 18,
  },
});
