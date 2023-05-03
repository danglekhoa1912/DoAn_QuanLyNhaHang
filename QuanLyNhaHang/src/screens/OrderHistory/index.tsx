import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {StyleService, useStyleSheet} from '@ui-kitten/components';
import {Item} from './components';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, AppState} from '../../store';
import {getOrderHistory} from '../../store/user/thunkApi';
import {IOrderHistory} from '../../type/booking';
import {Spinner} from '../../components';
import {navigate} from '../../utils/navigate';

const OrderHistoryPage = () => {
  const styles = useStyleSheet(themedStyles);
  const [orderList, setOrderList] = useState<IOrderHistory[]>();
  const dispatch = useDispatch<AppDispatch>();
  const pIsLoading = useSelector<AppState, number>(
    state => state.global.isLoading,
  );

  useEffect(() => {
    dispatch(
      getOrderHistory({
        page: 1,
      }),
    ).then((data: any) => {
      setOrderList(data.payload?.data?.record);
    });
  }, []);

  return (
    <>
      <ScrollView contentContainerStyle={styles.container}>
        {orderList?.map(order => (
          <Item
            handlePress={() => {
              navigate('OrderHistoryDetailScreen', {id: order.id});
            }}
            key={order.id}
            order={order}
          />
        ))}
      </ScrollView>
      <Spinner isLoading={!!pIsLoading} />
    </>
  );
};

export default OrderHistoryPage;

const themedStyles = StyleService.create({
  container: {
    backgroundColor: 'color-background',
    paddingHorizontal: 12,
  },
});
