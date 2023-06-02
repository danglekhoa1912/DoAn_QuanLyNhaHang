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
import {useTranslation} from 'react-i18next';

const OrderHistoryPage = () => {
  const styles = useStyleSheet(themedStyles);
  const [orderList, setOrderList] = useState<IOrderHistory[]>();
  const dispatch = useDispatch<AppDispatch>();
  const pIsLoading = useSelector<AppState, number>(
    state => state.global.isLoading,
  );

  const {t} = useTranslation();

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
      {orderList?.length ? (
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
      ) : (
        <View style={styles.container_text}>
          <Text style={styles.text}>{t('dont_have_order_history')}</Text>
        </View>
      )}
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
  container_text: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  text: {
    fontSize: 26,
    textAlign: 'center',
    fontWeight: 'bold',
    color: 'color-primary-default',
  },
});
