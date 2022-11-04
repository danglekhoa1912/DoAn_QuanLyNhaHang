import {
  Keyboard,
  ScrollView,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React, { useState } from 'react';
import Colors from '../../constants/Colors';
import { Searchbar } from 'react-native-paper';
import Header from './Header';
import LobbyItem from './LobbyItem';
import { useDispatch, useSelector } from 'react-redux';
import { ActivityIndicator } from '../../components';
import { changeSearch } from '../../redux/slice/SearchSlice';
import {
  lobbySelector,
  searchLobbySelector,
  searchSelector,
} from '../../redux/selector';

const LobbyScreen = () => {
  const lobbyListStatus = useSelector(lobbySelector).status;
  const lobbyList = useSelector(lobbySelector).listLobby;
  const search = useSelector(searchSelector);
  const dispatch = useDispatch();

  const onChangeSearch = (value) => {
    dispatch(changeSearch(value));
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <Header title='Sảnh' />
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

export default LobbyScreen;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    backgroundColor: Colors.Background,
    flex: 1,
  },

  content: {
    flex: 1,
  },
});
