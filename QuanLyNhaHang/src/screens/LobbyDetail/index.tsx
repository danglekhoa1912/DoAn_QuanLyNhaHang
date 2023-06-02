import {Image, ImageBackground, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {TouchableOpacity} from 'react-native';
import {Button, Spinner} from '../../components';
import Icon from 'react-native-vector-icons/AntDesign';
import {StyleService, useStyleSheet, useTheme} from '@ui-kitten/components';
import {LobbyDetailScreenRouteProp} from '../../navigation/RootNavigate';
import {goBack, navigate} from '../../utils/navigate';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, AppState} from '../../store';
import {getLobbyById} from '../../store/lobby/thunkApi';
import {ILobby} from '../../type/lobby';
import {updateInfoBooking} from '../../store/booking';
import {setIsBooking} from '../../store/global';
import {useTranslation} from 'react-i18next';
import analytics from '@react-native-firebase/analytics';
import {View360} from '../../assets';

const LobbyDetailPage = ({route}: LobbyDetailScreenRouteProp) => {
  const {t} = useTranslation();
  const styles = useStyleSheet(themedStyles);
  const theme = useTheme();
  const pLobbyDetail = useSelector<AppState, ILobby>(
    state => state.lobby.weddingHall,
  );
  const pIsLoading = useSelector<AppState, number>(
    state => state.global.isLoading,
  );
  const dispatch = useDispatch<AppDispatch>();

  const handleBooking = () => {
    dispatch(
      updateInfoBooking({
        lobby: pLobbyDetail,
      }),
    );
    dispatch(setIsBooking(true));
    navigate('BookingScreen');
  };

  const handlePanoramaView = () => {
    navigate('PanoramaScreen', {
      url: pLobbyDetail.image360,
    });
  };

  useEffect(() => {
    dispatch(getLobbyById(route.params.id)).then(data => {
      const lobby = data.payload?.weddingHall;
      console.log(lobby);
      if (lobby) {
        analytics().logEvent('lobby_view', {
          id: lobby.id,
          item: lobby.name,
        });
      }
    });
  }, [route.params.id]);

  return (
    <View style={styles.container}>
      {pLobbyDetail && (
        <>
          <ImageBackground
            borderBottomLeftRadius={8}
            borderBottomRightRadius={8}
            source={{
              uri: pLobbyDetail.image,
            }}
            style={styles.background_image}>
            <TouchableOpacity onPress={() => {}} style={styles.button_back}>
              <Icon
                onPress={() => {
                  goBack();
                }}
                color={theme['color-primary-default']}
                name="left"
                size={30}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handlePanoramaView}
              style={styles.button_panorama}>
              <Image
                source={View360}
                style={{
                  width: 40,
                  height: 40,
                }}
              />
            </TouchableOpacity>
          </ImageBackground>
          <View style={styles.container_content}>
            <Text style={styles.title}>{pLobbyDetail.name}</Text>
            <Text style={styles.content}>{pLobbyDetail.describe}</Text>
            <View style={styles.container_detail}>
              <View>
                <Text style={styles.content}>{t('common.price')}</Text>
                <Text>{pLobbyDetail.price}VND</Text>
              </View>
              <View>
                <Text style={styles.content}>{t('common.capacity')}</Text>
                <Text>
                  {pLobbyDetail.capacity} {t('common.tables')}
                </Text>
              </View>
            </View>
          </View>
          <View style={styles.container_button}>
            <Button
              backgroundColor={theme['color-primary-default']}
              title={t('screen.booking.book_now')}
              onPress={handleBooking}
            />
          </View>
        </>
      )}
      <Spinner isLoading={!!pIsLoading} />
    </View>
  );
};

export default LobbyDetailPage;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
    backgroundColor: 'color-background',
  },
  background_image: {
    height: 300,
    borderRadius: 8,
  },
  button_back: {
    top: 20,
    left: 20,
  },
  button_panorama: {
    position: 'absolute',
    bottom: 10,
    right: 10,
  },
  container_content: {
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    marginVertical: 15,
  },
  content: {
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 22,
    textAlign: 'justify',
  },
  container_detail: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  button: {
    borderRadius: 4,
    alignItems: 'center',
    paddingVertical: 20,
  },
  button_text: {
    fontSize: 18,
    fontWeight: '700',
  },
  container_button: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingBottom: 20,
    paddingHorizontal: 20,
  },
});
