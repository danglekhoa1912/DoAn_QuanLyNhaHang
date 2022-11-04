import {
  Keyboard,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { Searchbar } from 'react-native-paper';
import { changeSearch } from '../../../redux/slice/SearchSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Feather } from '@expo/vector-icons';
import { searchSelector, userListSelector } from '../../../redux/selector';
import Colors from '../../../constants/Colors';
import UserItem from './components/UserItem';
import { getUserList } from '../../../redux/slice/UserListSlice';
import { ActivityIndicator } from '../../../components';
import { adminName } from '../../../configs/NavigationContants';
import { navigate } from '../../../naviagtion/service';

const UserManagement = () => {
  //   const search = useSelector(searchSelector);
  const [search, setSearch] = useState('');
  const [typeUser, setTypeUser] = useState('ROLE_STAFF');
  const userList = useSelector(userListSelector);
  const list = userList.userList.filter(
    (user) =>
      user.role === typeUser &&
      user.name.toLowerCase().includes(search.toLowerCase())
  );
  const dispatch = useDispatch();
  const onChangeSearch = (value) => {
    setSearch(value);
  };

  const onAddUser = () => {
    navigate(adminName.editUserStack);
  };

  useEffect(() => {
    dispatch(getUserList());
  }, []);
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <Searchbar
          placeholder='Tìm kiếm'
          onChangeText={(text) => {
            onChangeSearch(text);
          }}
          value={search}
        />
        <View style={styles.container_type_user}>
          <TouchableOpacity onPress={() => setTypeUser('ROLE_STAFF')}>
            <Text
              style={
                typeUser === 'ROLE_STAFF'
                  ? styles.type_user
                  : styles.type_user_dis
              }
            >
              Staff
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setTypeUser('ROLE_USER')}>
            <Text
              style={
                typeUser === 'ROLE_USER'
                  ? styles.type_user
                  : styles.type_user_dis
              }
            >
              User
            </Text>
          </TouchableOpacity>
        </View>
        <ScrollView>
          {userList.status === 'loading' ? (
            <ActivityIndicator />
          ) : (
            list.map((user) => <UserItem user={user} key={user.id} />)
          )}
        </ScrollView>
        <TouchableOpacity onPress={onAddUser} style={styles.container_btnAdd}>
          <Feather name='plus' size={24} color='white' />
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default UserManagement;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  container_type_user: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  type_user: {
    fontSize: 25,
    color: Colors.Primary,
    fontWeight: 'bold',
  },
  type_user_dis: {
    fontSize: 25,
    color: Colors.Gray,
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
