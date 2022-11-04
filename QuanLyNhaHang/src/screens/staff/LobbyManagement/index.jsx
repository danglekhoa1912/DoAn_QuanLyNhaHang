import {
  Keyboard,
  ScrollView,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  lobbySelector,
  searchLobbySelector,
  searchSelector,
} from '../../../redux/selector';
import { changeSearch } from '../../../redux/slice/SearchSlice';
import Header from '../../LobbyScreen/Header';
import { Searchbar } from 'react-native-paper';
import { ActivityIndicator } from '../../../components';
import Colors from '../../../constants/Colors';
import { getListLobby } from '../../../redux/slice/LobbySlice';
import LobbyItem from './LobbyItem';

const LobbyManagement = () => {
  const lobbyListStatus = useSelector(lobbySelector).status;
  const lobbyList = useSelector(searchLobbySelector);
  const search = useSelector(searchSelector);
  const dispatch = useDispatch();

  const onChangeSearch = (value) => {
    dispatch(changeSearch(value));
  };

  useEffect(() => {
    dispatch(getListLobby());
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
        <ScrollView showsVerticalScrollIndicator={false} style={styles.content}>
          {lobbyListStatus === 'loading' ? (
            <ActivityIndicator />
          ) : (
            lobbyList.map((lobby) => <LobbyItem key={lobby.id} lobby={lobby} />)
          )}
        </ScrollView>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default LobbyManagement;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: Colors.Background,
    flex: 1,
  },

  content: {
    flex: 1,
  },
});
