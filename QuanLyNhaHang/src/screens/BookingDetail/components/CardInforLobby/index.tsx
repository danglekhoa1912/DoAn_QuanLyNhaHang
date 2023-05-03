import {StyleSheet, View} from 'react-native';
import React from 'react';
import ItemInforLooby from '../ItemInforLobby';
import {useSelector} from 'react-redux';
import moment from 'moment';
import {Text} from '@ui-kitten/components';
import {AppState} from '../../../../store';
import {IBookingStore} from '../../../../store/booking';
import {useTranslation} from 'react-i18next';

const CardInforLobby = () => {
  const pBooking = useSelector<AppState, IBookingStore>(
    state => state.booking,
  ).order;
  const {t} = useTranslation();

  return (
    <View style={styles.container_infor_lobby}>
      <Text category="h5">
        {t('screen.booking_detail.invoice.title') || ''}
      </Text>
      <ItemInforLooby
        iconName="hoop-house"
        title={t('screen.booking_detail.invoice.name') || ''}>
        {pBooking.lobby.name}
      </ItemInforLooby>
      <ItemInforLooby
        iconName="table-furniture"
        title={t('screen.booking_detail.invoice.capacity') || ''}>
        {pBooking.quantityTable}
        12
      </ItemInforLooby>
      <ItemInforLooby
        iconName="calendar"
        title={t('screen.booking_detail.invoice.date') || ''}>
        {`${moment(pBooking.date).format('DD/MM/YYYY')} - ${
          pBooking.time.label
        }`}
      </ItemInforLooby>
    </View>
  );
};

export default CardInforLobby;

const styles = StyleSheet.create({
  container_infor_lobby: {
    paddingVertical: 18,
  },
});
