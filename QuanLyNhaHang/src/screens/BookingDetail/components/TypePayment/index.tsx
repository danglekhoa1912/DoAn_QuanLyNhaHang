import {Image, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import {Card} from '../../../../components';
import {useDispatch} from 'react-redux';
import {StyleService, Text, useStyleSheet} from '@ui-kitten/components';
import {CASH_TYPE, ITypePay} from '../../../../type/booking';
import {Cash, MomoPay, ZaloPay} from '../../../../assets';
import {updateTypePay} from '../../../../store/booking';

interface ITypePayment {
  typePayment: ITypePay;
  selected: boolean;
}

const RenderIcon = (type: CASH_TYPE) => {
  switch (type) {
    case CASH_TYPE.CASH:
      return Cash;
    case CASH_TYPE.MOMO:
      return MomoPay;
    case CASH_TYPE.ZALO:
      return ZaloPay;
    default:
      return Cash;
  }
};

const TypePayment = ({selected, typePayment}: ITypePayment) => {
  const dispatch = useDispatch();
  const styles = useStyleSheet(themedStyles);

  const onPress = () => {
    dispatch(updateTypePay(typePayment.type));
  };

  return (
    <Card style={[styles.container, selected && styles.choose]}>
      <TouchableOpacity onPress={onPress} style={styles.type_payment}>
        {/* {renderIcon(typePayment.type)} */}
        <Image
          style={{width: 50, height: 50}}
          source={RenderIcon(typePayment.type)}
        />
        <Text style={styles.text}>{typePayment.name}</Text>
      </TouchableOpacity>
    </Card>
  );
};

export default TypePayment;

const themedStyles = StyleService.create({
  container: {width: '100%', marginVertical: 5},
  choose: {
    borderWidth: 2,
    borderColor: 'color-primary-default',
  },
  type_payment: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 5,
  },
  text: {
    marginLeft: 18,
  },
});
