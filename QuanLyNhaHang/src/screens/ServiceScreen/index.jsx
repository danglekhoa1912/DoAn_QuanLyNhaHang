import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, { useEffect } from 'react';
import Header from './Header';
import { useDispatch, useSelector } from 'react-redux';
import { searchSelector, serviceSelector } from '../../redux/selector';
import { Searchbar } from 'react-native-paper';
import { changeSearch } from '../../redux/slice/SearchSlice';
import Colors from '../../constants/Colors';
import { getListService } from '../../redux/slice/ServiceSlice';
import Item from './Item';
import CusButton from '../../components/CusButton';
import { stackName } from '../../configs/NavigationContants';
import { navigate } from '../../naviagtion/service';

const ServiceScreen = () => {
  const search = useSelector(searchSelector);
  const service = useSelector(serviceSelector);

  const list = service.listService.filter((service) => {
    const lowerCaseService = service.name.toLowerCase();
    const lowerCaseSearch = search.toLowerCase();
    return lowerCaseService.includes(lowerCaseSearch);
  });

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getListService(0));
  }, []);

  const onChangeSearch = (value) => {
    dispatch(changeSearch(value));
  };

  return (
    <View style={styles.container}>
      <Header title='Dịch vụ' />
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
          contentContainerStyle={{ paddingVertical: 20 }}
          showsVerticalScrollIndicator={false}
          data={list}
          renderItem={({ item }) => <Item service={item} />}
          ItemSeparatorComponent={() => <View style={{ height: 30 }} />}
        />
      )}
      <CusButton
        buttonColor={Colors.Primary}
        textColor={Colors.Background}
        styleButton={styles.button_next}
        styleText={styles.button_text}
        onPress={() => navigate(stackName.orderDetailStack)}
      >
        Tiếp theo
      </CusButton>
    </View>
  );
};

export default ServiceScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.Background,
    paddingHorizontal: 20,
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
});
