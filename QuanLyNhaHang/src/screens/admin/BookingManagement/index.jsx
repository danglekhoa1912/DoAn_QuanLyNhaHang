import { ScrollView, StyleSheet, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import Colors from '../../../constants/Colors';
import { useDispatch, useSelector } from 'react-redux';
import { bookingListSelector, searchSelector } from '../../../redux/selector';
import { getBookingList } from '../../../redux/slice/BookingListSlice';
import { BookingItem } from './components';
import { ActivityIndicator, CusButton, CusInput } from '../../../components';
import { navigate } from '../../../naviagtion/service';
import { adminName } from '../../../configs/NavigationContants';
import { useForm } from 'react-hook-form';
import CusPickDate from '../../../components/CusPickDate';
import { changeSearch } from '../../../redux/slice/SearchSlice';
import { Searchbar } from 'react-native-paper';

const BookingManagement = () => {
  const [search, setSearch] = useState('');
  const bookingList = useSelector(bookingListSelector);

  const bookingListSearch = bookingList.BookingList.filter((booking) =>
    booking.id.toString().includes(search)
  );

  const dispatch = useDispatch();

  //   const {
  //     control,
  //     handleSubmit,
  //     reset,
  //     formState: { errors },
  //   } = useForm({
  //     defaultValues: {
  //       search: '',
  //     },
  //   });

  const onPress = (booking) => {
    navigate(adminName.editBookingStack, { booking });
  };

  //   const onSubmit = (data) => {
  //     dispatch(changeSearch(data));
  //   };

  const onChangeSearch = (value) => {
    setSearch(value);
  };

  useEffect(() => {
    dispatch(getBookingList());
  }, []);

  return (
    <ScrollView style={styles.container}>
      <View>
        {/* <CusInput control={control} errors={errors.search} label='search' />
        <CusPickDate control={control} errors={errors.date} label='date' />
        <CusButton
          buttonColor={Colors.Primary}
          textColor={Colors.Background}
          onPress={handleSubmit(onSubmit)}
          styleButton={styles.button}
          styleText={styles.button_text}
        >
          Tìm kiếm
        </CusButton> */}
        <Searchbar
          placeholder='Tìm kiếm'
          onChangeText={(text) => {
            onChangeSearch(text);
          }}
          value={search}
        />
      </View>
      <View>
        {bookingList.status == 'loading' ? (
          <ActivityIndicator />
        ) : (
          bookingListSearch.map((booking) => (
            <BookingItem
              onPress={() => onPress(booking)}
              key={booking.id}
              order={booking}
            />
          ))
        )}
      </View>
    </ScrollView>
  );
};

export default BookingManagement;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.Background,
    paddingHorizontal: 12,
  },
  button: {
    borderRadius: 5,
    alignItems: 'center',
    paddingVertical: 12,
  },
  button_text: {
    fontSize: 18,
    fontWeight: '600',
  },
});
