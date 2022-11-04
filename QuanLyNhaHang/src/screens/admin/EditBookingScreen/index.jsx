import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import { goBack } from '../../../naviagtion/service';
import { AntDesign } from '@expo/vector-icons';
import Colors from '../../../constants/Colors';
import { ActivityIndicator, Card, CusButton } from '../../../components';
import {
  DishListByCategory,
  ItemService,
  TitleAndText,
} from '../../DetailBookingHistoryScreen/components';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { bookingListSelector, CategorySelector } from '../../../redux/selector';
import { confirmBooking } from '../../../redux/slice/BookingListSlice';

const EditBookingScreen = ({ route }) => {
  const { booking } = route.params;
  const category = useSelector(CategorySelector);
  const confirmStatus = useSelector(bookingListSelector);
  const dispatch = useDispatch();

  console.log(booking);

  const onCofirmBooking = (id) => {
    dispatch(confirmBooking(id));
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <View>
          <Text style={styles.title}>#{booking.id}</Text>
          <View>
            <Card style={styles.container_order_infor}>
              <TitleAndText title='Tên sảnh'>{booking.hall}</TitleAndText>
              <TitleAndText title='Số lượng bàn'>
                {booking.countTable} bàn
              </TitleAndText>
              <TitleAndText title='Thời gian'>
                {moment(new Date(booking.date)).format('DD/MM/YYYY')} -{' '}
                {booking.time}
              </TitleAndText>
              <TitleAndText title='Phương thức thanh toán'>
                {booking.typePay}
              </TitleAndText>
              <TitleAndText title='Tổng tiền'>{booking.price}</TitleAndText>
              <TitleAndText title='Tình trạng thanh toán'>
                {booking.paymentstt ? 'Đã thanh toán' : 'Chưa thanh toán'}
              </TitleAndText>
            </Card>
            <View>
              <Text style={styles.mainText}>Danh sách món ăn</Text>
              {category.listCategory.map((item) => (
                <DishListByCategory
                  menu={booking.dishList}
                  key={item.id}
                  category={item}
                />
              ))}
            </View>
            <View>
              <Text style={styles.mainText}>Danh sách dịch vụ</Text>
              {booking.serviceList.map((service) => {
                if (service.serviceId) {
                  return (
                    <ItemService
                      service={service.serviceId}
                      key={service.serviceId}
                    />
                  );
                }
              })}
            </View>
          </View>
        </View>
        {!booking.paymentstt && (
          <CusButton
            onPress={() => onCofirmBooking(booking.id)}
            buttonColor={Colors.Primary}
            textColor={Colors.Background}
            styleButton={styles.button}
            styleText={styles.button_text}
          >
            {confirmStatus === 'loading' ? (
              <ActivityIndicator color={Colors.White} />
            ) : (
              'Xác nhận đã thanh toán'
            )}
          </CusButton>
        )}
      </ScrollView>
      <TouchableOpacity
        onPress={() => {
          goBack();
        }}
        style={styles.button_back}
      >
        <AntDesign name='left' size={30} color={Colors.Primary} />
      </TouchableOpacity>
    </View>
  );
};

export default EditBookingScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.Background,
    position: 'relative',
    paddingHorizontal: 12,
    flex: 1,
  },
  button_back: {
    position: 'absolute',
    top: 20,
    left: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingTop: 20,
    color: Colors.Primary,
  },
  mainText: {
    fontSize: 20,
  },
  container_order_infor: {
    width: '100%',
    marginVertical: 12,
  },
  button: {
    borderRadius: 20,
    alignItems: 'center',
    paddingVertical: 20,
  },
  button_text: {
    fontSize: 18,
    fontWeight: '600',
  },
});
