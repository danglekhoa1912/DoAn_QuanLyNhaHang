import React, {useEffect, useMemo, useRef, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {DropDown, TextField} from '../../../../components';
import {Control, Controller, useForm} from 'react-hook-form';
import _ from 'lodash';
import {IFormBooking, IFormBookingStaff} from '../../../../../type/booking';
import moment, {Moment} from 'moment';
import {yupResolver} from '@hookform/resolvers/yup';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, AppState} from '../../../../../store';
import {getLobbyList} from '../../../../../store/lobby/thunkApi';
import Select from 'react-select';
import {IILoobyBooked, ILobby} from '../../../../../type/lobby';
import {getTypeParty, getTypeTime} from '../../../../../store/booking/thunkApi';
import {
  sTypePartyOpts,
  sTypeTimeOpts,
} from '../../../../../store/booking/selector';
import {ISelectItem} from '../../../../../type/common';
import DatePicker from '../../../../components/DatePicker';

interface ISelectLobby {
  control: Control<IFormBooking, any>;
}

function SelectLobby({control}: ISelectLobby) {
  const dispatch = useDispatch<AppDispatch>();
  const pTimeLobbyBooked = useSelector<AppState, IILoobyBooked[]>(
    state => state.lobby.weddingHallDetails,
  );
  const pTypeTimeOpts = useSelector<AppState, ISelectItem[]>(state =>
    sTypeTimeOpts(state),
  );
  const pTypePartyOpts = useSelector<AppState, ISelectItem[]>(state =>
    sTypePartyOpts(state),
  );
  const [lobbyList, setLobbyList] = useState<ILobby[]>([]);
  const [page, setPage] = useState(0);
  const [search, setSearch] = useState('');
  const totalItem = useRef<number>(0);

  const lobbyOpts = useMemo(() => {
    return lobbyList.map(lobby => ({
      label: lobby.name,
      value: lobby,
    }));
  }, [lobbyList]);

  const filterDateBooked = (date: moment.Moment) => {
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
    const time = date.valueOf();
    return timeBooked.find(
      item => new Date(`${item} 00:00:00`).getTime() === time,
    );
  };

  const typeTimeOpts = useMemo(() => {
    const dateSelected = pTimeLobbyBooked.filter(
      item =>
        new Date(`${item.date}`).setHours(0, 0, 0, 0) ===
        control._getWatch('date')?.getTime(),
    );
    return pTypeTimeOpts.map(item => ({
      ...item,
      disabled: dateSelected.some(date => date.session === item.id),
    }));
  }, [pTypeTimeOpts, control._getWatch('date')]);

  useEffect(() => {
    dispatch(
      getLobbyList({
        page: page + 1,
        searchByName: search,
      }),
    ).then(data => {
      setLobbyList(data.payload.record);
      totalItem.current = data.payload.totalRecord;
    });
    dispatch(getTypeParty());
    dispatch(getTypeTime());
  }, []);

  return (
    <View>
      <View style={styles.field}>
        <Text>Select Looby: </Text>
        <Controller
          control={control}
          name="lobby"
          render={({field: {onChange, value}, fieldState: {error}}) => (
            <View>
              <Select
                menuPortalTarget={document.body}
                menuPosition={'fixed'}
                styles={{menuPortal: base => ({...base, zIndex: 9999})}}
                options={lobbyOpts}
                // value={value}
                onChange={newValue => {
                  onChange(newValue?.value);
                }}
              />
              {error && <Text style={styles.error}>*{error.message}</Text>}
            </View>
          )}
        />
      </View>
      <View style={styles.wrapField}>
        <View style={styles.field}>
          <Text>Booking Date</Text>
          <DatePicker
            minDate={moment(new Date()).add(1, 'd')}
            shouldDisableDate={filterDateBooked}
            control={control}
            name="date"
          />
        </View>
        <View style={styles.field}>
          <Text>Time</Text>
          <Controller
            control={control}
            name="time"
            render={({field: {onChange, value}, fieldState: {error}}) => (
              <View>
                <Select
                  menuPortalTarget={document.body}
                  menuPosition={'fixed'}
                  styles={{menuPortal: base => ({...base, zIndex: 9999})}}
                  options={typeTimeOpts}
                  // value={value}
                  onChange={onChange}
                />
                {error && <Text style={styles.error}>*{error.message}</Text>}
              </View>
            )}
          />
        </View>
      </View>
      <View style={styles.wrapField}>
        <View style={styles.field}>
          <Text>Type Party</Text>
          <Controller
            control={control}
            name="type_party"
            render={({field: {onChange, value}, fieldState: {error}}) => (
              <View>
                <Select
                  menuPortalTarget={document.body}
                  menuPosition={'fixed'}
                  styles={{menuPortal: base => ({...base, zIndex: 9999})}}
                  options={pTypePartyOpts}
                  // value={value}
                  onChange={onChange}
                />
                {error && <Text style={styles.error}>*{error.message}</Text>}
              </View>
            )}
          />
        </View>
        <View style={styles.field}>
          <Text>Quantity</Text>
          <TextField
            keyboardType="number-pad"
            control={control}
            name="quantityTable"
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapField: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 12,
  },
  field: {
    width: '40%',
  },
  error: {
    fontSize: 12,
    color: 'red',
  },
});

export default SelectLobby;
