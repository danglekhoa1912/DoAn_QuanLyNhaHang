import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {
  Input,
  StyleService,
  useStyleSheet,
  useTheme,
} from '@ui-kitten/components';
import {ScrollView} from 'react-native';
import {Button, Header, Spinner} from '../../components';
import Icon from 'react-native-vector-icons/FontAwesome';
import {DishItem, CategoryItem} from './components';
import {useTranslation} from 'react-i18next';
import {ICategory, IDish, IRequestParams} from '../../type/dish';
import {AppDispatch, AppState} from '../../store';
import {connect} from 'react-redux';
import {sCountDishInMenu} from '../../store/booking/selector';
import {navigate} from '../../utils/navigate';
import {getCategories, getDishList} from '../../store/dish/thunkApi';

interface IDishPage {
  pCountDishInMenu: number;
  pGetDishList: (params: IRequestParams) => Promise<any>;
  pGetCategories: () => Promise<any>;
  pCategories: ICategory[];
  pIsBooking: boolean;
  pIsLoading: number;
}

const DishPage = ({
  pCountDishInMenu,
  pGetDishList,
  pGetCategories,
  pCategories,
  pIsBooking,
  pIsLoading,
}: IDishPage) => {
  const {t} = useTranslation();
  const styles = useStyleSheet(themedStyles);
  const [search, setSearch] = useState('');
  const theme = useTheme();
  const [categorySelected, setCategorySelected] = useState(1);
  const [dishList, setDishList] = useState<IDish[]>([]);
  const [page, setPage] = useState(0);
  const isLatestsPage = useRef(false);

  const fetchMoreDish = () => {
    if (!isLatestsPage.current) {
      setPage(page + 1);
    }
  };

  useEffect(() => {
    pGetDishList({
      categoryId: categorySelected,
      page: page + 1,
      searchByName: search,
    }).then(data => {
      if (!page) {
        setDishList(data?.payload?.record);
      } else setDishList([...dishList, ...data?.payload?.record]);
      isLatestsPage.current = page + 1 >= data?.payload?.totalPage;
    });
  }, [page, search, categorySelected]);

  useEffect(() => {
    pGetCategories();
  }, []);
  return (
    <View style={styles.container}>
      <Header
        placeholderSearch={t('screen.dish.placeholder_search') || ''}
        search={search}
        setSearch={setSearch}
        title={t('screen.dish.title')}
      />
      <View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.container_category}>
          {pCategories.map(category => (
            <CategoryItem
              selected={categorySelected === category.id}
              key={category.id}
              title={category.name}
              onPress={() => {
                setCategorySelected(category.id);
                setPage(0);
              }}
            />
          ))}
        </ScrollView>
      </View>
      <View>
        <FlatList
          contentContainerStyle={{
            paddingBottom: 160,
          }}
          columnWrapperStyle={{
            flex: 1,
            justifyContent: 'space-between',
          }}
          onEndReached={fetchMoreDish}
          onEndReachedThreshold={0.2}
          data={dishList}
          numColumns={2}
          renderItem={({item}) => (
            <DishItem disable={!pIsBooking} dish={item} key={item.id} />
          )}
          showsVerticalScrollIndicator={false}
        />
      </View>
      {pIsBooking && (
        <>
          <TouchableOpacity style={styles.icon_menu}>
            <Text style={styles.count}>{pCountDishInMenu}</Text>
            <Icon
              name="list-alt"
              size={24}
              color={theme['color-primary-default']}
            />
          </TouchableOpacity>
          <Button
            backgroundColor={theme['color-primary-default']}
            style={styles.button_next}
            title={t('common.next')}
            onPress={() => {
              navigate('ServiceScreen');
            }}
          />
        </>
      )}
      <Spinner isLoading={!!pIsLoading} />
    </View>
  );
};

const mapStateToProps = (state: AppState) => ({
  pCountDishInMenu: sCountDishInMenu(state),
  pCategories: state.dish.categories,
  pIsBooking: state.global.isBooking,
  pIsLoading: state.global.isLoading,
});

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  pGetDishList: (params: IRequestParams) => dispatch(getDishList(params)),
  pGetCategories: () => dispatch(getCategories()),
});

export default connect(mapStateToProps, mapDispatchToProps)(DishPage);

const themedStyles = StyleService.create({
  container: {
    padding: 20,
    flex: 1,
    position: 'relative',
  },

  container_category: {
    paddingVertical: 12,
  },
  category: {
    padding: 12,
    borderRadius: 12,
    marginHorizontal: 8,
  },
  category_text: {
    color: '#ffff',
    fontWeight: 'bold',
  },
  icon_menu: {
    position: 'absolute',
    bottom: 12,
    left: 12,
    backgroundColor: '#ffff',
    padding: 18,
    borderRadius: 50,
  },
  count: {
    position: 'absolute',
    right: 0,
    top: -5,
    borderRadius: 50,
    paddingVertical: 2,
    paddingHorizontal: 8,
    backgroundColor: 'color-primary-default',
    color: '#ffff',
  },
  button_next: {
    position: 'absolute',
    bottom: 12,
    right: 12,
    padding: 12,
    minWidth: 100,
  },
  button_text: {
    fontSize: 18,
  },
});
