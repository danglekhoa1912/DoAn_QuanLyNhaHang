import {
  NativeEventEmitter,
  NativeModules,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import React, {useEffect, useMemo} from 'react';
import {
  StyleService,
  Text,
  useStyleSheet,
  useTheme,
} from '@ui-kitten/components';
import {
  CardInfor,
  CardInforLobby,
  DishListByCategory,
  Header,
  TotalPrice,
  TypePayment,
} from './components';
import {Button, Spinner} from '../../components';
import {AppDispatch, AppState} from '../../store';
import {connect} from 'react-redux';
import {ICategory} from '../../type/dish';
import {IBookingStore} from '../../store/booking';
import {CASH_TYPE, IBookingReq, ISession, ITypePay} from '../../type/booking';
import {ITypeParty} from '../../type/lobby';
import {addOrder} from '../../store/booking/thunkApi';
import {IUser} from '../../type/user';
import {useTranslation} from 'react-i18next';
import {paymentZalo} from '../../apis/booking';
const {PayZaloBridge} = NativeModules;
const payZaloBridgeEmitter = new NativeEventEmitter(PayZaloBridge);
interface IBookingDetailPage {
  pCategories: ICategory[];
  pBooking: IBookingStore;
  pTypeTime: ISession[];
  pTypeParty: ITypeParty[];
  pUser: IUser;
  pIsLoading: number;
  pAddOrder: (data: IBookingReq) => Promise<any>;
}

const TYPE_PAY: ITypePay[] = [
  {
    id: 1,
    name: 'Cash',
    type: CASH_TYPE.CASH,
  },
  {
    id: 2,
    name: 'Momo Pay',
    type: CASH_TYPE.MOMO,
  },
  {
    id: 3,
    name: 'Zalo pay',
    type: CASH_TYPE.ZALO,
  },
];

const BookingDetailPage = ({
  pCategories,
  pBooking,
  pTypeParty,
  pUser,
  pTypeTime,
  pAddOrder,
  pIsLoading,
}: IBookingDetailPage) => {
  const styles = useStyleSheet(themedStyles);
  const theme = useTheme();
  const {t} = useTranslation();

  const order = pBooking.order;
  const typeTime = useMemo(() => {
    return pTypeTime.find(type => type.id === order.time.id);
  }, [order]);
  const typeParty = useMemo(() => {
    return pTypeParty.find(type => type.id === order.type_party.id);
  }, [order]);

  const handlePayment = () => {
    paymentZalo(10000).then(data => {
      const payZP = NativeModules.PayZaloBridge;
      payZP.payOrder(data.data.zp_trans_token);
    });
    // pAddOrder({
    //   orderDate: order.date,
    //   amount: 0,
    //   idUser: pUser.id || 0,
    //   menu: order.menu.dishList.map(dish => dish.id),
    //   note: '',
    //   paymentStatus: false,
    //   pwtId: order.time.value,
    //   quantity: order.quantityTable,
    //   service: order.service.serviceList.map(service => service.id),
    //   type_party: order.type_party.value,
    //   whId: order.lobby.id,
    //   typePay: order.type_pay,
    // });
  };

  useEffect(() => {
    payZaloBridgeEmitter.addListener('EventPayZalo', data => {
      console.log(data);
      if (data.returnCode == 1) {
        console.log('Pay success!');
      } else {
        console.log('Pay errror! ' + data.returnCode);
      }
    });
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Header />
      <CardInfor />
      <CardInforLobby />
      <View style={styles.dish_list}>
        <Text category="h5">{t('screen.booking_detail.dishes') || ''}</Text>
        {pCategories.map(item => (
          <DishListByCategory key={item.id} category={item} />
        ))}
      </View>
      <View style={styles.service_list}>
        <Text category="h5">{t('screen.booking_detail.services') || ''}</Text>
        {order.service.serviceList.map((service, index) => (
          <Text
            key={service.id}
            style={{fontSize: 18, paddingLeft: 12}}
            category="p1">
            {index + 1} - {service.name}
          </Text>
        ))}
      </View>
      <TotalPrice
        dishPrice={order.menu.total}
        lobbyPrice={order.lobby.price * (typeTime?.price || 0)}
        servicePrice={order.service.total}
        tableQuantity={order.quantityTable}
      />
      <View>
        <Text category="h5">
          {t('screen.booking_detail.payment_method') || ''}
        </Text>
        {TYPE_PAY.map(type => (
          <TypePayment
            selected={order.type_pay === type.type}
            key={type.id}
            typePayment={type}
          />
        ))}
      </View>
      <Button
        title={t('screen.booking_detail.pay.title') || ''}
        backgroundColor={theme['color-primary-default']}
        style={styles.button}
        styleText={styles.button_text}
        onPress={handlePayment}
      />
      <Spinner isLoading={!!pIsLoading} />
    </ScrollView>
  );
};

const mapStateToProps = (state: AppState) => ({
  pCategories: state.dish.categories,
  pBooking: state.booking,
  pTypeTime: state.booking.typeTime,
  pTypeParty: state.booking.typeParty,
  pUser: state.user.user,
  pIsLoading: state.global.isLoading,
});

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  pAddOrder: (data: IBookingReq) => dispatch(addOrder(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(BookingDetailPage);

const themedStyles = StyleService.create({
  container: {
    backgroundColor: 'color-background',
    paddingHorizontal: 12,
    paddingBottom: 20,
    position: 'relative',
  },

  dish_list: {},
  service_list: {
    paddingVertical: 8,
  },
  button: {
    borderRadius: 20,
    alignItems: 'center',
    paddingVertical: 20,
    marginVertical: 20,
  },
  button_text: {
    fontSize: 18,
    fontWeight: '600',
  },
});
