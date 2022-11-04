import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { Card } from '../../../../../components';
import moment from 'moment';

const BookingItem = (props) => {
  const { order, onPress } = props;
  return (
    <Card style={styles.container}>
      <TouchableOpacity onPress={onPress} style={styles.container_content}>
        <View style={styles.content}>
          <Text style={styles.title}>{order.hall}</Text>
          <View style={styles.wrap_content}>
            <Text style={styles.text}>
              Ngày đặt: {moment(order.date).format('DD-MM-YYYY')}
            </Text>
            <Text style={styles.text}>Thời gian: {order.time}</Text>
          </View>

          <View style={styles.wrap_content}>
            <Text style={styles.text}>Loại tiệc: {order.typeParty}</Text>
            <Text style={styles.text}>Tổng tiền: {order.price} VND</Text>
          </View>
        </View>
      </TouchableOpacity>
    </Card>
  );
};

export default BookingItem;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginVertical: 12,
  },
  container_content: {
    flexDirection: 'row',
    width: '100%',
    paddingVertical: 12,
  },
  content: {
    paddingLeft: 12,
    width: '100%',
  },
  image: {
    width: 120,
    height: 120,
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
  },
  wrap_content: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  text: {
    paddingVertical: 2,
    fontSize: 16,
  },
});
