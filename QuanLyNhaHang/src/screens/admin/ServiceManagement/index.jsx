import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useEffect } from 'react';
import { Searchbar } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { searchSelector, serviceSelector } from '../../../redux/selector';
import {
  deleteService,
  getListService,
} from '../../../redux/slice/ServiceSlice.js';
import { ActivityIndicator, CusButton } from '../../../components';
import { Feather } from '@expo/vector-icons';

import Colors from '../../../constants/Colors';
import { Item } from './components';
import { navigate } from '../../../naviagtion/service';
import { adminName } from '../../../configs/NavigationContants';

const ServiceManagement = () => {
  const search = useSelector(searchSelector);
  const service = useSelector(serviceSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getListService(0));
  }, []);

  const onChangeSearch = (value) => {
    //   dispatch(changeSearch(value));
  };

  const onEditService = (service) => {
    navigate(adminName.editServiceStack, {
      service,
    });
  };

  const onDeleteService = (id) => {
    dispatch(deleteService(id));
  };

  const onAddService = () => {
    navigate(adminName.editServiceStack);
  };

  return (
    <View style={styles.container}>
      <Searchbar
        placeholder='Tìm kiếm'
        onChangeText={(text) => {
          onChangeSearch(text);
        }}
        value={search}
      />
      {service.status == 'loading' ? (
        <ActivityIndicator />
      ) : (
        <FlatList
          contentContainerStyle={{ paddingTop: 20 }}
          showsVerticalScrollIndicator={false}
          data={service.listService}
          renderItem={({ item }) => (
            <Item
              onDeleteService={onDeleteService}
              onEditService={onEditService}
              service={item}
            />
          )}
          ItemSeparatorComponent={() => <View style={{ height: 30 }} />}
        />
      )}
      <TouchableOpacity onPress={onAddService} style={styles.container_btnAdd}>
        <Feather name='plus' size={24} color='white' />
      </TouchableOpacity>
    </View>
  );
};

export default ServiceManagement;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.Background,
    padding: 20,
    position: 'relative',
    flex: 1,
  },
  button_next: {
    position: 'absolute',
    bottom: 12,
    right: 12,
    padding: 12,
  },
  button_text: {
    fontSize: 18,
  },
  container_btnAdd: {
    backgroundColor: Colors.Primary,
    alignSelf: 'baseline',
    padding: 18,
    borderRadius: 50,
    position: 'absolute',
    bottom: 12,
    right: 12,
  },
});
