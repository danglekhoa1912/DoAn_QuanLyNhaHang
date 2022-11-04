import { ImageBackground, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Card, CusButton } from '../../../../../components';
import Colors from '../../../../../constants/Colors';

const Item = (props) => {
  const { service, onEditService } = props;

  return (
    <Card style={styles.container}>
      <View>
        <ImageBackground
          borderTopLeftRadius={8}
          borderTopRightRadius={8}
          style={styles.image}
          source={{ uri: service.image }}
        >
          <View style={styles.container_infor}>
            <Text style={styles.text_content}>{service.name}</Text>
            <Text style={styles.text_content}>{service.price}VND</Text>
          </View>
        </ImageBackground>
        <View style={styles.container_content}>
          <Text style={styles.text}>{service.serviceDescribe}</Text>
        </View>
      </View>
    </Card>
  );
};

export default Item;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 300,
  },
  image: {
    height: 150,
  },
  container_infor: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'absolute',
    bottom: 12,
    left: 12,
    right: 12,
  },
  text_content: {
    fontSize: 20,
    color: Colors.Background,
    fontWeight: 'bold',
  },
  container_button: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 12,
  },
  container_content: {
    paddingVertical: 20,
    paddingHorizontal: 12,
  },
  text: {
    fontSize: 20,
  },
  button: {
    paddingHorizontal: 12,
    paddingVertical: 5,
  },
});
