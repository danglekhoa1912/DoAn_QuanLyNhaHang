import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Card } from '../../../components';
import React, { useState } from 'react';
import CusButton from '../../../components/CusButton';
import Colors from '../../../constants/Colors';
import { useDispatch, useSelector } from 'react-redux';
import { bookingSelector, menuSelector } from '../../../redux/selector';
import {
  addServiceToBooking,
  removeServiceToBooking,
} from '../../../redux/slice/BookingSlice';

const Item = (props) => {
  const { service } = props;
  const serviceListInMenu = useSelector(bookingSelector).service.serviceList;
  const [isChoose, setChoose] = useState(
    serviceListInMenu.some((item) => item.id == service.id)
  );

  const dispatch = useDispatch();

  const onPressService = () => {
    if (isChoose) {
      dispatch(removeServiceToBooking(service));
    } else {
      dispatch(addServiceToBooking(service));
    }
    setChoose(!isChoose);
  };

  return (
    <Card
      style={[
        styles.container,
        isChoose && { borderWidth: 3, borderColor: Colors.Primary },
      ]}
    >
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
          <Text numberOfLines={2} style={styles.text}>
            {service.serviceDescribe}
          </Text>
        </View>
        <CusButton
          buttonColor={Colors.Background}
          textColor={Colors.Primary}
          styleButton={styles.button}
          onPress={onPressService}
        >
          {isChoose ? 'Bỏ chọn' : 'Chọn'}
        </CusButton>
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
  container_content: {
    paddingVertical: 20,
    paddingHorizontal: 12,
  },
  text: {
    fontSize: 20,
  },
  button: { marginHorizontal: 20, padding: 12, alignItems: 'center' },
});
