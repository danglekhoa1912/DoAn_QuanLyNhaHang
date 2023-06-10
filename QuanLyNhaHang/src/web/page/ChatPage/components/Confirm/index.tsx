import {Image, StyleSheet, Text, View} from 'react-native';
import React, {useMemo} from 'react';
import {Card} from '../../../../components';
import {COLORS} from '../../../../../utils/color';
import {Divider} from '@mui/material';
import {useSelector} from 'react-redux';
import {AppState} from '../../../../../store';
import {IDish} from '../../../../../type/dish';
import {IService} from '../../../../../type/service';
import {ISession} from '../../../../../type/booking';
import moment from 'moment';
import {ITypeParty} from '../../../../../type/lobby';

interface IWrapInfoAmount {
  title: string;
  price: string | number;
}

interface IItem {
  name: string;
  image: string;
  price: number;
  id: number;
}

const WrapInfoAmount = ({price, title}: IWrapInfoAmount) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 8,
      }}>
      <Text style={{color: 'gray'}}>{title}</Text>
      <Text style={{color: '#636e72'}}>{price} VND</Text>
    </View>
  );
};

const Item = ({image, name, price, id}: IItem) => {
  return (
    <View style={styles.containerItem} key={id}>
      <View style={styles.containerLeft}>
        <Image style={styles.imageItem} source={{uri: image}} />
        <Text>{name}</Text>
      </View>
      <Text>{price} VND</Text>
    </View>
  );
};

const Confirm = () => {
  const pDetailBooking = useSelector<AppState, any>(
    state => state.booking.order,
  );

  const pTypeTime = useSelector<AppState, ISession[]>(
    state => state.booking.typeTime,
  );

  const pTypeParty = useSelector<AppState, ITypeParty[]>(
    state => state.booking.typeParty,
  );

  const typeTime = useMemo(() => {
    return pTypeTime.find(type => type.id === pDetailBooking.time.id);
  }, [pDetailBooking]);

  const total = useMemo(() => {
    const lobby = pDetailBooking.lobby.price * (typeTime?.price || 0);
    const dish = pDetailBooking.menu.total;
    const service = pDetailBooking.service.total;

    return (lobby + dish) * pDetailBooking.quantityTable + service;
  }, [pDetailBooking, typeTime]);

  return (
    <View style={styles.root}>
      <View style={styles.wrap_amount}>
        <Card style={styles.amount_detail}>
          <View style={styles.amount_total}>
            <Text
              style={[styles.amount_text, {fontWeight: 'bold', fontSize: 24}]}>
              {total} VND
            </Text>
            <Text style={styles.amount_text}>Booking amount</Text>
          </View>
          <View style={styles.amount}>
            <WrapInfoAmount
              title="Looby Fee"
              price={pDetailBooking.lobby.price * (typeTime?.price || 0)}
            />
            <WrapInfoAmount
              title="Dish Fee"
              price={pDetailBooking.menu.total}
            />
            <WrapInfoAmount
              title="Service Fee"
              price={pDetailBooking.service.total}
            />
          </View>
        </Card>
      </View>
      <View style={styles.wrap_info}>
        <Card
          style={{
            backgroundColor: '#FDECED',
            borderColor: COLORS.primary,
            borderWidth: 1,
            padding: 12,
            width: 'fit-content',
          }}>
          <Text style={styles.amount_text}>
            Lobby: {pDetailBooking?.lobby?.name}
          </Text>
          <Text style={styles.amount_text}>
            Quantity: {pDetailBooking?.quantityTable}{' '}
          </Text>
          <Text style={styles.amount_text}>
            Order date: {moment(pDetailBooking?.date).format('DD/MM/YYYY')} -{' '}
            {
              pTypeTime.find(session => session.id === pDetailBooking?.time?.id)
                ?.session
            }
          </Text>
          <Text style={styles.amount_text}>
            Type Party:{' '}
            {
              pTypeParty.find(
                party => party.id === pDetailBooking?.type_party?.id,
              )?.nameParty
            }
          </Text>
        </Card>
        <Divider />

        <View>
          <Text style={styles.title}>List of dishes</Text>
          <View style={styles.containerList}>
            {pDetailBooking.menu.dishList.map((dish: IDish) => (
              <Item
                id={dish.id}
                image={dish.image}
                name={dish.name}
                price={dish.price}
                key={dish.id}
              />
            ))}
          </View>
        </View>
        <Divider />
        <View>
          <Text style={styles.title}>List of service</Text>
          <View style={styles.containerList}>
            {pDetailBooking.service.serviceList.map((dish: IService) => (
              <Item
                id={dish.id}
                image={dish.image}
                name={dish.name}
                price={dish.price}
                key={dish.id}
              />
            ))}
          </View>
        </View>
      </View>
    </View>
  );
};

export default Confirm;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    flexDirection: 'row',
  },
  wrap_amount: {
    flex: 1,
  },
  amount_detail: {
    width: '80%',
  },
  amount_total: {
    backgroundColor: '#FDECED',
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
    alignItems: 'center',
    paddingVertical: 30,
  },
  amount: {
    paddingHorizontal: 12,
  },
  amount_text: {
    color: COLORS.primary,
  },

  wrap_info: {
    flex: 3,
    overflow: 'auto',
  },
  title: {
    fontWeight: '500',
    fontSize: 18,
    marginVertical: 8,
  },
  containerList: {
    gap: 12,
  },
  containerItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  containerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  imageItem: {
    width: 50,
    height: 50,
    borderRadius: 8,
  },
});
