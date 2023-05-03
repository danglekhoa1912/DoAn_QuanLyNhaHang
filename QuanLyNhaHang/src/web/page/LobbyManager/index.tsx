import {StyleSheet, Text, TextInput, View} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {Button, TabelData} from '../../components';
import {IDish} from '../../../type/dish';
import {useDispatch} from 'react-redux';
import {AppDispatch} from '../../../store';
import {IService} from '../../../type/service';
import {getLobbyList} from '../../../store/lobby/thunkApi';
import {ILobby} from '../../../type/lobby';
import ModalEdit from './components/ModalEdit';

const LobbyManager = () => {
  const [lobbyList, setLobbyList] = useState<IService[]>([]);
  const [page, setPage] = useState(0);
  const [search, setSearch] = useState('');
  const totalItem = useRef<number>(0);
  const dispatch = useDispatch<AppDispatch>();
  const [open, setOpen] = React.useState(false);
  const lobby = useRef<ILobby>();

  const handleChangePage = (event: any, newPage: number) => {
    setPage(newPage);
  };

  const handleEdit = (data: any) => {
    setOpen(true);
    lobby.current = data;
  };

  const handleClose = () => setOpen(false);

  const handleLoadData = () => {
    dispatch(
      getLobbyList({
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
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <h1>Lobby Manager</h1>
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
        </View>
        <Button
          title="Add Lobby"
          onPress={() => {
            handleEdit(null);
          }}
        />
      </View>
      <TabelData
        currentPage={page}
        onChangePage={handleChangePage}
        totalItem={totalItem.current}
        data={lobbyList}
        menu={[
          {label: 'Edit', action: handleEdit},
          {label: 'Remove', action: () => {}},
        ]}
        rowTitle={[
          {label: '#', minWidth: 10},
          {label: 'Image', minWidth: 70},
          {label: 'Name', minWidth: 70},
          {label: 'Price', minWidth: 60},
          {label: 'Status', minWidth: 10},
          {label: 'Action', minWidth: 10},
        ]}
      />
      <ModalEdit
        onReLoadData={handleLoadData}
        data={lobby.current}
        open={open}
        handleClose={handleClose}
      />
    </View>
  );
};

export default LobbyManager;

const styles = StyleSheet.create({});
