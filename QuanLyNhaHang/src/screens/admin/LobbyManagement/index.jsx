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
import { useDispatch, useSelector } from 'react-redux';
import { Feather } from '@expo/vector-icons';
import {
  lobbySelector,
  searchLobbySelector,
  searchSelector,
} from '../../../redux/selector';
import { changeSearch } from '../../../redux/slice/SearchSlice';
import { deleteLobby, getListLobby } from '../../../redux/slice/LobbySlice';
import { Searchbar } from 'react-native-paper';
import Colors from '../../../constants/Colors';
import { LobbyItem } from './components';
import { ActivityIndicator } from '../../../components';
import { navigate } from '../../../naviagtion/service';
import { adminName } from '../../../configs/NavigationContants';

const LobbyManagement = () => {
  const [search, setSearch] = useState('');
  const lobbyListStatus = useSelector(lobbySelector).status;
  const lobbyList = useSelector(lobbySelector).listLobby.filter((lobby) => {
    const lowerCaseBooking = lobby.name.toLowerCase();
    const lowerCaseSearch = search.toLowerCase();
    return lowerCaseBooking.includes(lowerCaseSearch);
  });
  const dispatch = useDispatch();

  const onChangeSearch = (value) => {
    setSearch(value);
  };
  useEffect(() => {
    dispatch(getListLobby());
  }, []);

  const onEditLobby = (lobby) => {
    navigate(adminName.editLobbyStack, {
      lobby,
    });
  };

  const onDeleteLobby = (id) => {
    dispatch(deleteLobby(id));
  };

  const onAddLobby = () => {
    navigate(adminName.editLobbyStack);
  };

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
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.content}
        >
          {lobbyListStatus === 'loading' ? (
            <ActivityIndicator />
          ) : (
            lobbyList.map((lobby) => (
              <LobbyItem
                onDeleteLobby={onDeleteLobby}
                onEditLobby={onEditLobby}
                key={lobby.id}
                lobby={lobby}
              />
            ))
          )}
        </ScrollView>
        <TouchableOpacity onPress={onAddLobby} style={styles.container_btnAdd}>
          <Feather name='plus' size={24} color='white' />
        </TouchableOpacity>
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
    position: 'relative',
  },

  content: {
    paddingBottom: 30,
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
