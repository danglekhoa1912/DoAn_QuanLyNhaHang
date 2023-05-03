import {StyleSheet, TextInput, View} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {Button, TabelData} from '../../components';
import {IDish} from '../../../type/dish';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, AppState} from '../../../store';
import {IService} from '../../../type/service';
import {getListService} from '../../../store/service/thunkApi';
import ModalEdit from './components/ModalEdit';
import {Loading} from '../../components/Loading';

const ServiceManager = () => {
  const [serviceList, setServiceList] = useState<IService[]>([]);
  const [page, setPage] = useState(0);
  const [search, setSearch] = useState('');
  const totalItem = useRef<number>(0);
  const dispatch = useDispatch<AppDispatch>();
  const [open, setOpen] = React.useState(false);
  const service = useRef<IService>();

  const pIsLoading = useSelector<AppState, number>(
    state => state.global.isLoading,
  );

  const handleChangePage = (event: any, newPage: number) => {
    setPage(newPage);
  };

  const handleEdit = (data: any) => {
    setOpen(true);
    service.current = data;
  };

  const handleClose = () => setOpen(false);

  const handleLoadData = () => {
    dispatch(
      getListService({
        page: page + 1,
        searchByName: search,
      }),
    ).then(data => {
      setServiceList(data.payload.record);
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
          <h1>Service Manager</h1>
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
          onPress={() => {
            handleEdit(null);
          }}
          title="Add Service"
        />
      </View>
      <TabelData
        currentPage={page}
        onChangePage={handleChangePage}
        totalItem={totalItem.current}
        data={serviceList}
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
        onReloadData={handleLoadData}
        data={service.current}
        open={open}
        handleClose={handleClose}
      />
    </View>
  );
};

export default ServiceManager;

const styles = StyleSheet.create({});
