import {
  FlatList,
  ImageBackground,
  Keyboard,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {StyleService, useStyleSheet, useTheme} from '@ui-kitten/components';
import {Button, Card, Header, Spinner, TextField} from '../../components';
import {useForm} from 'react-hook-form';
import {useTranslation} from 'react-i18next';
import {navigate} from '../../utils/navigate';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, AppState} from '../../store';
import {getLobbyList} from '../../store/lobby/thunkApi';
import {ILobby} from '../../type/lobby';
import {updateInfoBooking} from '../../store/booking';
import {setIsBooking} from '../../store/global';

const LobbyPage = () => {
  const theme = useTheme();
  const [search, setSearch] = useState('');
  const {t} = useTranslation();
  const [lobbyList, setLoobyList] = useState<ILobby[]>([]);
  const dispatch = useDispatch<AppDispatch>();
  const pIsLoading = useSelector<AppState, number>(
    state => state.global.isLoading,
  );
  const styles = useStyleSheet(themedStyles);

  const handleViewDetail = async (id: number) => {
    navigate('LobbyDetailScreen', {
      id,
    });
  };

  const handleChooseLobby = (item: ILobby) => {
    dispatch(
      updateInfoBooking({
        lobby: item,
      }),
    );
    dispatch(setIsBooking(true));
    navigate('BookingScreen');
  };

  useEffect(() => {
    dispatch(getLobbyList({page: 1, searchByName: search})).then(data => {
      setLoobyList(data?.payload?.record);
    });
  }, [search]);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.root}>
        <Header
          placeholderSearch={t('screen.lobby.placeholder_search') || ''}
          search={search}
          setSearch={setSearch}
          title={t('screen.lobby.title')}
        />
        {!!lobbyList.length && (
          <View style={styles.containerCard}>
            <FlatList
              contentContainerStyle={{
                paddingBottom: 240,
              }}
              showsVerticalScrollIndicator={false}
              ItemSeparatorComponent={() => <View style={{height: 30}} />}
              data={lobbyList}
              renderItem={({item}) => (
                <Card style={styles.card}>
                  <TouchableOpacity
                    onPress={() => {
                      handleViewDetail(item.id);
                    }}
                    style={{flex: 1}}>
                    <ImageBackground
                      borderTopLeftRadius={8}
                      borderTopRightRadius={8}
                      style={styles.background_image}
                      source={{
                        uri: item.image,
                      }}>
                      <View style={styles.container_content}>
                        <Text style={styles.text_content}>{item.name}</Text>
                        <Text style={styles.text_content}>
                          {item.price} VND
                        </Text>
                      </View>
                    </ImageBackground>
                    <View style={styles.container_button}>
                      <Button
                        style={styles.button}
                        backgroundColor={theme['color-primary-default']}
                        variant="outlined"
                        title={t('screen.lobby.view_detail')}
                        onPress={() => {
                          handleViewDetail(item.id);
                        }}
                      />
                      <Button
                        style={styles.button}
                        variant="outlined"
                        title={t('screen.lobby.choose_lobby')}
                        onPress={() => {
                          handleChooseLobby(item);
                        }}
                      />
                    </View>
                  </TouchableOpacity>
                </Card>
              )}
            />
          </View>
        )}
        <Spinner isLoading={!!pIsLoading} />
      </View>
    </TouchableWithoutFeedback>
  );
};

export default LobbyPage;

const themedStyles = StyleService.create({
  root: {
    padding: 24,
  },
  containerCard: {
    // marginTop: 12,
  },
  card: {
    height: 280,
  },
  background_image: {
    height: 200,
    borderRadius: 8,
  },
  container_content: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'absolute',
    bottom: 12,
    left: 12,
    right: 12,
  },
  container_button: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flex: 1,
    paddingHorizontal: 16,
  },
  button: {
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  text_content: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'color-background',
  },
});
