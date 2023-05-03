import {StyleSheet} from 'react-native';
import React from 'react';
import {Card} from '../../../../components';
import {Text} from '@ui-kitten/components';
import {useSelector} from 'react-redux';
import {AppState} from '../../../../store';
import {IUser} from '../../../../type/user';
import {useTranslation} from 'react-i18next';

const CardInfor = () => {
  const user = useSelector<AppState, IUser>(state => state.user.user);
  const {t} = useTranslation();
  return (
    <Card style={styles.container_infor_user}>
      <Text category="h5">{t('screen.booking_detail.info.title') || ''}</Text>
      <Text>
        {t('screen.booking_detail.info.name') || ''}: {user.name}
      </Text>
      <Text>
        {t('screen.booking_detail.info.email') || ''}: {user.email}
      </Text>
      <Text>
        {t('screen.booking_detail.info.mobile') || ''}: {user.mobile}
      </Text>
    </Card>
  );
};

export default CardInfor;

const styles = StyleSheet.create({
  container_infor_user: {
    width: '100%',
    padding: 12,
  },
});
