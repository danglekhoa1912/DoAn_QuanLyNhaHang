import {StyleSheet, Text, TextInput, View} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {Button, TabelData} from '../../components';
import {IDish} from '../../../type/dish';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, AppState} from '../../../store';
import {sTypeTimeOpts} from '../../../store/booking/selector';
import {IService} from '../../../type/service';
import {
  deleteLobby,
  getLobbyList,
  getLobbyListAdmin,
  getLobbyListReady,
} from '../../../store/lobby/thunkApi';
import {ILobby} from '../../../type/lobby';
import ModalEdit from './components/ModalEdit';
import {FormControl, InputLabel, MenuItem, Select} from '@mui/material';
import {ISelectItem} from '../../../type/common';
import {getTypeTime} from '../../../store/booking/thunkApi';
import {DatePicker} from '@mui/x-date-pickers';
import {isAdmin} from '../../../store/user/selector';

const LobbyManager = () => {
  const [lobbyList, setLobbyList] = useState<ILobby[]>([]);
  const [page, setPage] = useState(0);
  const [search, setSearch] = useState('');
  const totalItem = useRef<number>(0);
  const dispatch = useDispatch<AppDispatch>();
  const [open, setOpen] = React.useState(false);
  const [lobby, setLobby] = useState<ILobby | undefined>();
  const [time, setTime] = useState();
  const [date, setDate] = useState<moment.Moment>();

  const handleChangePage = (event: any, newPage: number) => {
    setPage(newPage);
  };

  const handleSelectItem = (data: any) => {
    setLobby(data);
  };

  const handleEdit = (data: any) => {
    setOpen(true);
  };

  const handleChangeDate = (e: any) => {
    setDate(e);
  };

  const handleRemove = (data: any) => {
    dispatch(deleteLobby(data.id)).then(() => {
      handleLoadData();
    });
  };

  const handleClose = () => {
    setLobby(undefined);
    setOpen(false);
  };

  const pTypeTimeOpts = useSelector<AppState, ISelectItem[]>(state =>
    sTypeTimeOpts(state),
  );

  const pIsAdmin = useSelector<AppState, boolean>(state => isAdmin(state));

  const handleLoadData = () => {
    dispatch(
      getLobbyListAdmin({
        page: page + 1,
        searchByName: search,
      }),
    ).then(data => {
      setLobbyList(data.payload.record);
      totalItem.current = data.payload.totalRecord;
    });
  };

  useEffect(() => {
    handleLoadData();
  }, [page, search]);

  useEffect(() => {
    dispatch(
      getLobbyListReady({
        date: date?.local()?.toDate(),
        time: time,
      }),
    ).then(data => {
      setLobbyList(data.payload);
    });
  }, [date, time]);

  useEffect(() => {
    dispatch(getTypeTime());
  }, []);

  return (
    <View
      style={{
        flex: 1,
        paddingHorizontal: 30,
      }}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <h1>Lobby Manager</h1>
        {pIsAdmin ? (
          <TextInput
            value={search}
            onChangeText={setSearch}
            style={{
              backgroundColor: '#f3f5f7',
              height: 40,
              width: 240,
              borderRadius: 12,
              marginLeft: 24,
              padding: 12,
            }}
            placeholder="Search"
            placeholderTextColor="gray"
          />
        ) : (
          <View
            style={{
              flexDirection: 'row',
              gap: 12,
            }}>
            <DatePicker
              label="Date"
              value={date}
              onChange={handleChangeDate}
              format="DD/MM/YYYY"
            />
            <FormControl
              style={{
                width: 200,
              }}>
              <InputLabel>Time</InputLabel>
              <Select
                defaultValue=""
                style={{
                  height: 40,
                }}
                value={time}
                label="Time"
                onChange={e => {
                  setTime(+e.target.value);
                }}>
                {pTypeTimeOpts.map(item => (
                  <MenuItem key={item.id} value={item.id}>
                    {item.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </View>
        )}
        {pIsAdmin && (
          <Button
            title="Add Lobby"
            onPress={() => {
              handleEdit(null);
            }}
          />
        )}
      </View>
      <TabelData
        showAction={pIsAdmin}
        handleSelectItem={handleSelectItem}
        currentPage={page}
        onChangePage={handleChangePage}
        totalItem={totalItem.current}
        data={lobbyList}
        menu={[
          {label: 'Edit', action: handleEdit},
          {
            label: `${lobby?.status ? 'Inactive' : 'Active'}`,
            action: handleRemove,
          },
        ]}
        rowTitle={[
          {label: '#', minWidth: 10},
          {label: 'Image', minWidth: 70},
          {label: 'Name', minWidth: 70},
          {label: 'Price', minWidth: 60},
          {label: 'Status', minWidth: 10},
          {label: 'Action', minWidth: 10, hidden: !pIsAdmin},
        ]}
      />
      <ModalEdit
        onReLoadData={handleLoadData}
        data={lobby}
        open={open}
        handleClose={handleClose}
      />
    </View>
  );
};

export default LobbyManager;

const styles = StyleSheet.create({});
