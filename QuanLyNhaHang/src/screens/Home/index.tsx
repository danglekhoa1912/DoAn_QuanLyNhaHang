import {ScrollView, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  StyleService,
  Text,
  useStyleSheet,
  useTheme,
} from '@ui-kitten/components';
import Carousel from 'react-native-snap-carousel';
import {CarouselCardItem, ItemList} from './components';
import {ITEM_WIDTH, SLIDER_WIDTH} from './components/CarouselCardItem';
import {
  Intro1,
  Intro10,
  Intro2,
  Intro3,
  Intro4,
  Intro5,
  Intro6,
  Intro7,
  Intro8,
  Intro9,
} from '../../assets';
import {useTranslation} from 'react-i18next';
import {connect, useSelector} from 'react-redux';
import {AppDispatch, AppState} from '../../store';
import {getLobbyList} from '../../store/lobby/thunkApi';
import {getListService} from '../../store/service/thunkApi';
import {getDishList} from '../../store/dish/thunkApi';
import {IService} from '../../type/service';
import {IDish, IRequestParams} from '../../type/dish';
import {ILobby} from '../../type/lobby';
import {Spinner} from '../../components';
import Layout from '../../constants/Layout';
import {ISearchParam} from '../../type/common';
import Icon from 'react-native-vector-icons/Entypo';
import {navigate} from '../../utils/navigate';

interface IHomePage {
  pGetLobbyList: (params: ISearchParam) => Promise<any>;
  pGetDishList: (params: IRequestParams) => Promise<any>;
  pGetServiceList: (params: ISearchParam) => Promise<any>;
}

const HomePage = ({
  pGetDishList,
  pGetLobbyList,
  pGetServiceList,
}: IHomePage) => {
  const styles = useStyleSheet(themedStyles);
  const theme = useTheme();
  const {t} = useTranslation();
  const [lobbyList, setLobbyList] = useState<ILobby[]>([]);
  const [dishList, setDishList] = useState<IDish[]>([]);
  const [serviceList, setServiceList] = useState<IService[]>([]);
  const pIsLoading = useSelector<AppState, number>(
    state => state.global.isLoading,
  );

  const carouselItems = [
    Intro1,
    Intro2,
    Intro3,
    Intro4,
    Intro5,
    Intro6,
    Intro7,
    Intro8,
    Intro9,
    Intro10,
  ];

  useEffect(() => {
    pGetLobbyList({page: 1}).then(data => {
      setLobbyList(data?.payload?.record);
    });
    pGetDishList({page: 1}).then(data => {
      setDishList(data?.payload?.record);
    });
    pGetServiceList({page: 1}).then(data => {
      setServiceList(data?.payload?.record);
    });
  }, []);

  return (
    <>
      <ScrollView
        contentContainerStyle={[
          styles.main,
          {minHeight: Layout.window.height},
        ]}>
        <View>
          <Carousel
            layout="default"
            layoutCardOffset={9}
            data={carouselItems}
            renderItem={CarouselCardItem}
            sliderWidth={SLIDER_WIDTH}
            itemWidth={ITEM_WIDTH}
            inactiveSlideShift={1}
            useScrollView={true}
            loop
            contentContainerCustomStyle={{
              alignItems: 'center',
              padding: 18,
            }}
          />
        </View>
        {!!lobbyList?.length && (
          <ItemList
            navigateToDetail="LobbyDetailScreen"
            navigateTo="LobbyScreen"
            label={t('screen.lobby.title')}
            list={lobbyList}
          />
        )}
        {!!dishList?.length && (
          <ItemList
            navigateTo="DishScreen"
            label={t('screen.dish.title')}
            list={dishList}
          />
        )}
        {!!serviceList?.length && (
          <ItemList
            navigateTo="ServiceScreen"
            label={t('screen.service.title')}
            list={serviceList}
          />
        )}
      </ScrollView>
      <Spinner isLoading={!!pIsLoading} />
      <TouchableOpacity
        onPress={() => {
          navigate('ChatScreen');
        }}
        style={styles.bubble}>
        <Icon name="chat" color={theme['color-primary-500']} size={30} />
      </TouchableOpacity>
    </>
  );
};

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  pGetLobbyList: (params: ISearchParam) => dispatch(getLobbyList(params)),
  pGetDishList: (params: IRequestParams) => dispatch(getDishList(params)),
  pGetServiceList: (params: ISearchParam) => dispatch(getListService(params)),
});

export default connect(null, mapDispatchToProps)(HomePage);

const themedStyles = StyleService.create({
  main: {
    backgroundColor: 'color-background',
  },
  bubble: {
    borderRadius: 50,
    position: 'absolute',
    bottom: 10,
    right: 10,
    width: 70,
    height: 70,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
});
