import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useMemo, useState} from 'react';
import {OrderHistoryDetailScreenRouteProp} from '../../navigation/RootNavigate';
import {StyleService, useStyleSheet, useTheme} from '@ui-kitten/components';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, AppState} from '../../store';
import {IOrderHistory, ISession, ORDER_STATUS} from '../../type/booking';
import {getOrderHistoryById} from '../../store/user/thunkApi';
import {Button, Card, Spinner} from '../../components';
import {DishListByCategory, ItemService, TitleAndText} from './components';
import moment from 'moment';
import {getCategories} from '../../store/dish/thunkApi';
import {ICategory} from '../../type/dish';
import {goBack, navigate} from '../../utils/navigate';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {convertBookingStatus} from '../../utils/convertEnum';
import {getTypeParty, getTypeTime} from '../../store/booking/thunkApi';
import {updateInfoBooking} from '../../store/booking';
import {ILobby, ITypeParty} from '../../type/lobby';
import {getLobbyList} from '../../store/lobby/thunkApi';
import {sTypePartyOpts, sTypeTimeOpts} from '../../store/booking/selector';
import {ISelectItem} from '../../type/common';

const OrderHistoryDetailPage = ({route}: OrderHistoryDetailScreenRouteProp) => {
  const {id} = route.params;
  const theme = useTheme();
  const dispatch = useDispatch<AppDispatch>();
  const [order, setOrder] = useState<IOrderHistory>();
  const styles = useStyleSheet(themedStyles);
  const [lobbyList, setLobbyList] = useState<ILobby[]>([]);
  const pCategories = useSelector<AppState, ICategory[]>(
    state => state.dish.categories,
  );
  const pTypeTime = useSelector<AppState, ISelectItem[]>(state =>
    sTypeTimeOpts(state),
  );
  const pTypeParty = useSelector<AppState, ISelectItem[]>(state =>
    sTypePartyOpts(state),
  );
  const pIsLoading = useSelector<AppState, number>(
    state => state.global.isLoading,
  );
  const typeTime = useMemo(() => {
    return pTypeTime.find(type => type.id === order?.time);
  }, [order, pTypeTime]);

  const typeParty = useMemo(() => {
    return pTypeParty.find(type => type.id === order?.typeParty);
  }, [order, pTypeParty]);

  const handleEdit = () => {
    dispatch(
      updateInfoBooking({
        id: order?.id,
        menu: {
          dishList: order?.dishList.map(dish => dish?.dishId),
          total: order?.dishList.reduce((pre, cur) => {
            return pre + cur.dishId.price;
          }, 0),
        },
        service: {
          serviceList: order?.serviceList.map(service => service?.serviceId),
          total: order?.serviceList.reduce((pre, cur) => {
            return pre + cur.serviceId.price;
          }, 0),
        },
        date: new Date(order?.date || 0),
        time: typeTime,
        quantityTable: order?.countTable,
        lobby: lobbyList.find(lobby => lobby.name === order?.hall),
        type_party: typeParty,
      }),
    );
    navigate('BookingScreen');
  };

  useEffect(() => {
    dispatch(getOrderHistoryById(id)).then(data => {
      setOrder(data.payload);
    });
    dispatch(getCategories());
    dispatch(getTypeTime());
    dispatch(getTypeParty());
  }, []);

  useEffect(() => {
    dispatch(
      getLobbyList({
        page: 1,
        searchByName: order?.hall,
      }),
    ).then(data => {
      setLobbyList(data?.payload?.record);
    });
  }, [order]);

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
                    {moment(new Date(order.date)).format('DD/MM/YYYY')} -{' '}
                    {typeTime?.label}
                  </TitleAndText>

                  <TitleAndText title="Tổng tiền">{order.price}</TitleAndText>
                  {order.status !== ORDER_STATUS.DRAW && (
                    <>
                      <TitleAndText title="Thanh toán">
                        {order.typePay}
                      </TitleAndText>
                      <TitleAndText title="Tình trạng đơn">
                        {convertBookingStatus(order.status)}
                      </TitleAndText>
                    </>
                  )}
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
              {order.status === ORDER_STATUS.DRAW && (
                <View>
                  <Button onPress={handleEdit} title="Chinh sua" />
                </View>
              )}
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
