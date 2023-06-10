import {
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React, {useEffect, useMemo} from 'react';
import {Button, Header, Spinner, TextField} from '../../components';
import {StyleService, useStyleSheet, useTheme} from '@ui-kitten/components';
import * as yup from 'yup';
import {useForm} from 'react-hook-form';
import {IFormBooking, ISession} from '../../type/booking';
import {yupResolver} from '@hookform/resolvers/yup';
import DatePicker from '../../components/DatePicker';
import {Field} from './components';
import {StyleProp} from 'react-native';
import {ImageStyle} from 'react-native';
import Select from '../../components/Select';
import {ScrollView} from 'react-native';
import {useTranslation} from 'react-i18next';
import {navigate, replace} from '../../utils/navigate';
import {connect, useSelector} from 'react-redux';
import {AppDispatch, AppState} from '../../store';
import {resetBooking, updateInfoBooking} from '../../store/booking';
import {getTypeParty, getTypeTime} from '../../store/booking/thunkApi';
import {IILoobyBooked, ILobby, ITypeParty} from '../../type/lobby';
import {sTypePartyOpts, sTypeTimeOpts} from '../../store/booking/selector';
import {ISelectItem} from '../../type/common';
import * as _ from 'lodash';
import {setIsBooking} from '../../store/global';
import moment from 'moment';

interface IBookingPage {
  pTypePartyOpts: ISelectItem[];
  pTypeTimeOpts: ISelectItem[];
  pLobbyInOrder: ILobby;
  pTimeLobbyBooked: IILoobyBooked[];
  pIsLoading: number;
  pGetTypeParty: () => Promise<unknown>;
  pResetBooking: () => void;
  pGetTypeTime: () => Promise<unknown>;
  pUpdateInfoBooking: (data: any) => void;
  pSetIsBooking: (data: boolean) => void;
  pIsBooking: boolean;
}

const BookingPage = ({
  pGetTypeParty,
  pGetTypeTime,
  pTimeLobbyBooked,
  pLobbyInOrder,
  pTypePartyOpts,
  pTypeTimeOpts,
  pIsLoading,
  pUpdateInfoBooking,
  pSetIsBooking,
  pResetBooking,
  pIsBooking,
}: IBookingPage) => {
  const {t} = useTranslation();
  const schema = yup
    .object({
      time: yup
        .object()
        .test('checkEmpty', t('validate.session') || '', value => {
          return !_.isEmpty(value);
        }),
      type_party: yup
        .object()
        .test('checkEmpty', t('validate.type_party') || '', value => {
          return !_.isEmpty(value);
        }),
      quantityTable: yup
        .number()
        .required(t('validate.capacity.empty') || '')
        .min(1, t('validate.capacity.empty') || '')
        .max(
          pLobbyInOrder.capacity,
          `${t('validate.capacity.empty')} ${pLobbyInOrder.capacity}` || '',
        ),
    })
    .required();

  const theme = useTheme();
  const styles = useStyleSheet(themedStyles);
  const pBookingInfo = useSelector<AppState, any>(state => state.booking.order);
  const {
    control,
    handleSubmit,
    formState: {errors},
    watch,
    reset,
    getValues,
  } = useForm<IFormBooking>({
    defaultValues: {
      date: pBookingInfo?.date || moment(new Date()).add(1, 'd').toDate(),
      quantityTable: pBookingInfo?.quantityTable || 0,
      time: pBookingInfo?.time || {},
      type_party: pBookingInfo?.type_party || {},
    },
    resolver: yupResolver(schema),
  });

  const typeTimeOpts = useMemo(() => {
    const dateSelected = pTimeLobbyBooked.filter(
      item =>
        new Date(`${item.date}`).setHours(0, 0, 0, 0) ===
        watch('date')?.getTime(),
    );
    return pTypeTimeOpts.map(item => ({
      ...item,
      disabled: dateSelected.some(date => date.session === item.id),
    }));
  }, [pTypeTimeOpts, watch('date')]);

  const handleChangeLobby = () => {
    // pSetIsBooking(false);
    navigate('LobbyScreen');
  };

  const onSubmit = (data: IFormBooking) => {
    pUpdateInfoBooking(data);
    pSetIsBooking(true);
    navigate('DishScreen');
  };

  const filterDateBooked = (date: Date) => {
    const timeBooked = pTimeLobbyBooked
      .reduce((pre: any[], cur) => {
        const date = pre.find(item => item?.date === cur.date);
        if (date) {
          date['count']++;
          return pre;
        }
        return [
          ...pre,
          {
            date: cur.date,
            count: 1,
          },
        ];
      }, [])
      .filter(item => item.count === pTypeTimeOpts.length)
      .map(item => item.date);
    const time = date.getTime();
    return !timeBooked.find(
      item => new Date(`${item} 00:00:00`).getTime() === time,
    );
  };
  useEffect(() => {
    reset({
      date: pBookingInfo?.date || moment(new Date()).add(1, 'd').toDate(),
      quantityTable: pBookingInfo?.quantityTable || 0,
      time: pBookingInfo?.time || {},
      type_party: pBookingInfo?.type_party || {},
    });
  }, [pBookingInfo]);

  useEffect(() => {
    pGetTypeParty();
    pGetTypeTime();
  }, []);

  useEffect(() => {
    if (!pIsBooking) {
      reset();
    }
  }, [pIsBooking]);

  return (
    <>
      <ScrollView>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.root}>
            <Header
              onGoBack={() => {
                pSetIsBooking(false);
                pResetBooking();
              }}
              filter={false}
              title={t('screen.booking.title')}
            />
            <View style={styles.content}>
              <View style={styles.content_lobby}>
                <Image
                  source={{
                    uri: pLobbyInOrder?.image,
                  }}
                  style={styles.content_image as StyleProp<ImageStyle>}
                />
                <View style={styles.content_right}>
                  <View>
                    <Text style={styles.text}>
                      {t('screen.lobby.name')}: {pLobbyInOrder?.name}
                    </Text>
                    <Text style={styles.text}>
                      {t('common.capacity')}: {pLobbyInOrder?.capacity} bàn
                    </Text>
                    <Text style={styles.text}>
                      {t('common.price')}: {pLobbyInOrder?.price} VND
                    </Text>
                  </View>
                  <Button
                    backgroundColor={theme['color-primary-default']}
                    title={t('screen.booking.change_lobby')}
                    style={styles.button}
                    onPress={handleChangeLobby}
                  />
                </View>
              </View>
              <View style={styles.containerForm}>
                <Field label={t('screen.booking.booking_date')}>
                  <DatePicker
                    min={moment(new Date()).add(1, 'd').toDate()}
                    filter={filterDateBooked}
                    colorIcon="black"
                    controlStyle={styles.dataPicker}
                    control={control}
                    name="date"
                  />
                </Field>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    width: '100%',
                  }}>
                  <Field
                    style={styles.selectField}
                    label={t('screen.booking.session')}>
                    <Select
                      placeholder={
                        t('screen.booking.placeholder_session') || ''
                      }
                      options={typeTimeOpts}
                      control={control}
                      name="time"
                    />
                  </Field>
                  <Field
                    style={styles.selectField}
                    label={t('screen.booking.type_party')}>
                    <Select
                      placeholder={
                        t('screen.booking.placeholder_type_party') || ''
                      }
                      options={pTypePartyOpts}
                      control={control}
                      name="type_party"
                    />
                  </Field>
                </View>
                <Field label={t('common.capacity')}>
                  <TextField
                    placeholderTextColor={theme['color-gray']}
                    placeholder={t('screen.booking.placeholder_capacity') || ''}
                    style={styles.dataPicker}
                    control={control}
                    name="quantityTable"
                    keyboardType="numeric"
                  />
                </Field>
              </View>
              <Button
                backgroundColor={theme['color-primary-default']}
                title={t('common.next')}
                onPress={handleSubmit(onSubmit)}
              />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </ScrollView>
      <Spinner isLoading={!!pIsLoading} />
    </>
  );
};

const mapStateToProps = (state: AppState) => ({
  pLobbyInOrder: state.booking.order.lobby,
  pTypeTimeOpts: sTypeTimeOpts(state),
  pTypePartyOpts: sTypePartyOpts(state),
  pTimeLobbyBooked: state.lobby.weddingHallDetails,
  pIsLoading: state.global.isLoading,
  pIsBooking: state.global.isBooking,
});

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  pUpdateInfoBooking: (data: any) => dispatch(updateInfoBooking(data)),
  pGetTypeTime: () => dispatch(getTypeTime()),
  pGetTypeParty: () => dispatch(getTypeParty()),
  pSetIsBooking: (data: boolean) => dispatch(setIsBooking(data)),
  pResetBooking: () => dispatch(resetBooking()),
});

export default connect(mapStateToProps, mapDispatchToProps)(BookingPage);

const themedStyles = StyleService.create({
  root: {
    padding: 20,
  },
  content: {
    marginTop: 20,
    paddingBottom: 50,
  },
  content_lobby: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  content_image: {
    width: 160,
    height: 160,
    borderRadius: 8,
  },
  content_right: {
    justifyContent: 'space-between',
  },
  text: {
    fontSize: 18,
    paddingVertical: 6,
  },
  container_button: {
    //   backgroundColor: "red",
    //   flex: 1,
  },
  button: {
    paddingVertical: 12,
    alignItems: 'center',
    width: 160,
  },
  containerForm: {
    marginVertical: 20,
  },
  dataPicker: {
    backgroundColor: 'white',
    borderColor: 'black',
    borderRadius: 6,
    // paddingVertical: 16,
  },
  selectField: {
    width: '40%',
  },
});
