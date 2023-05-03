import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {OrderHistoryDetailScreenRouteProp} from '../../navigation/RootNavigate';
import {StyleService, useStyleSheet, useTheme} from '@ui-kitten/components';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, AppState} from '../../store';
import {IOrderHistory} from '../../type/booking';
import {getOrderHistoryById} from '../../store/user/thunkApi';
import {Card, Spinner} from '../../components';
import {DishListByCategory, ItemService, TitleAndText} from './components';
import moment from 'moment';
import {getCategories} from '../../store/dish/thunkApi';
import {ICategory} from '../../type/dish';
import {goBack} from '../../utils/navigate';
import Icon from 'react-native-vector-icons/MaterialIcons';

const OrderHistoryDetailPage = ({route}: OrderHistoryDetailScreenRouteProp) => {
  const {id} = route.params;
  const theme = useTheme();
  const dispatch = useDispatch<AppDispatch>();
  const [order, setOrder] = useState<IOrderHistory>();
  const styles = useStyleSheet(themedStyles);
  const pCategories = useSelector<AppState, ICategory[]>(
    state => state.dish.categories,
  );
  const pIsLoading = useSelector<AppState, number>(
    state => state.global.isLoading,
  );

  useEffect(() => {
    dispatch(getOrderHistoryById(id)).then(data => {
      setOrder(data.payload);
    });
    dispatch(getCategories());
  }, []);

  return (
    <>
      <ScrollView style={styles.container}>
        {order && (
          <>
            <View>
              <Text style={styles.title}>#{order.id}</Text>
              <View>
                <Card style={styles.container_order_infor}>
                  <TitleAndText title="Tên sảnh">{order.hall}</TitleAndText>
                  <TitleAndText title="Số lượng bàn">
                    {order.countTable} bàn
                  </TitleAndText>
                  <TitleAndText title="Thời gian">
                    {moment(new Date(order.date)).format('DD/MM/YYYY')}-
                    {order.time}
                  </TitleAndText>
                  <TitleAndText title="Phương thức thanh toán">
                    {order.typePay}
                  </TitleAndText>
                  <TitleAndText title="Tổng tiền">{order.price}</TitleAndText>
                  <TitleAndText title="Tình trạng thanh toán">
                    {order.paymentstt ? 'Đã thanh toán' : 'Chưa thanh toán'}
                  </TitleAndText>
                </Card>
                <View>
                  <Text style={styles.mainText}>Danh sách món ắn</Text>
                  {pCategories?.map(item => (
                    <DishListByCategory
                      menu={order.dishList}
                      key={item.id}
                      category={item}
                    />
                  ))}
                </View>
                <View>
                  <Text style={styles.mainText}>Danh sách dịch vụ</Text>
                  {order.serviceList.map(service => {
                    if (service.serviceId)
                      return (
                        <ItemService
                          service={service.serviceId}
                          key={service.serviceId.id}
                        />
                      );
                  })}
                </View>
              </View>
            </View>
            <TouchableOpacity
              onPress={() => {
                goBack();
              }}
              style={styles.button_back}>
              <Icon
                name="arrow-back-ios"
                color={theme['color-primary-default']}
                size={30}
              />
            </TouchableOpacity>
          </>
        )}
      </ScrollView>
      <Spinner isLoading={!!pIsLoading} />
    </>
  );
};

export default OrderHistoryDetailPage;

const themedStyles = StyleService.create({
  container: {
    backgroundColor: 'color-background',
    position: 'relative',
    paddingHorizontal: 12,
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
    color: 'color-primary-default',
  },
  mainText: {
    fontSize: 20,
  },
  container_order_infor: {
    width: '100%',
    marginVertical: 12,
  },
});
