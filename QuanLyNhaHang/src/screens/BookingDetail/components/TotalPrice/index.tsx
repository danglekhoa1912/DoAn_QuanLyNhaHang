import {StyleSheet, View} from 'react-native';
import React from 'react';
import {useSelector} from 'react-redux';
import {Divider, Text} from '@ui-kitten/components';
import {useTranslation} from 'react-i18next';

interface ITotalPrice {
  lobbyPrice: number;
  dishPrice: number;
  tableQuantity: number;
  servicePrice: number;
}

const TotalPrice = ({
  dishPrice,
  lobbyPrice,
  servicePrice,
  tableQuantity,
}: ITotalPrice) => {
  //    const booking = useSelector(bookingSelector);
  const {t} = useTranslation();
  const totalLobby = (lobbyPrice + dishPrice) * tableQuantity;
  return (
    <View>
      <Text category="h5">{t('screen.booking_detail.pay.title') || ''}</Text>
      <View style={styles.total}>
        <View style={styles.price}>
          <Text category="h6">
            {t('screen.booking_detail.pay.lobby') || ''}
          </Text>
          <Text>{lobbyPrice} VND</Text>
        </View>
        <View style={styles.price}>
          <Text></Text>
          <Text>+</Text>
        </View>
        <View style={styles.price}>
          <Text category="h6">{t('screen.booking_detail.pay.dish') || ''}</Text>
          <Text>{dishPrice} VND</Text>
        </View>
        <View style={styles.price}>
          <Text></Text>
          <Text>x</Text>
        </View>
        <View style={styles.price}>
          <Text category="h6">
            {t('screen.booking_detail.pay.capacity') || ''}
          </Text>
          <Text>
            {tableQuantity} {t('screen.booking_detail.pay.table') || ''}
          </Text>
        </View>
        <Divider />
        <View style={styles.price}>
          <Text></Text>
          <Text>{totalLobby} VND</Text>
        </View>
        <View style={styles.price}>
          <Text category="h6">
            {t('screen.booking_detail.pay.service') || ''}
          </Text>
          <Text>{servicePrice} VND</Text>
        </View>
        <Divider />
        <View style={styles.price}>
          <Text category="h6">
            {t('screen.booking_detail.pay.total') || ''}
          </Text>
          <Text>{totalLobby + servicePrice} VND</Text>
        </View>
      </View>
    </View>
  );
};

export default TotalPrice;

const styles = StyleSheet.create({
  total: {
    paddingHorizontal: 10,
  },
  price: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 5,
  },
});
