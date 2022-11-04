import { ScrollView, StyleSheet, Text, View } from 'react-native';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getListCategory } from '../../../redux/slice/CategorySlice';
import Colors from '../../../constants/Colors';
import { bookingListSelector, searchSelector } from '../../../redux/selector';
import { getBookingList } from '../../../redux/slice/BookingListSlice';
import { navigate } from '../../../naviagtion/service';
import { adminName } from '../../../configs/NavigationContants';
import { BookingItem } from '../BookingManagement/components';
import { ActivityIndicator } from '../../../components';
import { Searchbar } from 'react-native-paper';
import { changeSearch } from '../../../redux/slice/SearchSlice';

const HomeScreen = () => {
  const bookingList = useSelector(bookingListSelector);
  const search = useSelector(searchSelector);
  const dispatch = useDispatch();

  const bookingListToBePaid = bookingList.BookingList.filter(
    (booking) => !booking.paymentstt && booking.id.toString().includes(search)
  );

  const onPress = (booking) => {
    navigate(adminName.editBookingStack, { booking });
  };

  const onChangeSearch = (value) => {
    dispatch(changeSearch(value));
  };

  useEffect(() => {
    dispatch(getListCategory());
    dispatch(getBookingList());
  }, []);
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Các hóa đơn chưa thanh toán</Text>
      <Searchbar
        placeholder='Tìm kiếm'
        onChangeText={(text) => {
          onChangeSearch(text);
        }}
        value={search}
      />
      {bookingList.status == 'loading' ? (
        <ActivityIndicator />
      ) : (
        bookingListToBePaid.map((booking) => (
          <BookingItem
            onPress={() => onPress(booking)}
            key={booking.id}
            order={booking}
          />
        ))
      )}
    </ScrollView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.Background,
    padding: 12,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.Primary,
    textAlign: 'center',
    paddingVertical: 10,
  },
});
