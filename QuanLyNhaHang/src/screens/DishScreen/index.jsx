import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useEffect, useMemo, useState } from 'react';
import Header from './Header';
import { Searchbar } from 'react-native-paper';
import Colors from '../../constants/Colors';
import { FontAwesome } from '@expo/vector-icons';
import DishItem from './DishItem';
import { useDispatch, useSelector } from 'react-redux';
import {
  countDish,
  getListDish,
  resetDishList,
} from '../../redux/slice/DishSlice';
import { getListCategory } from '../../redux/slice/CategorySlice';
import {
  dishSelector,
  menuSelector,
  searchSelector,
} from '../../redux/selector';
import CusButton from '../../components/CusButton';
import { changeSearch } from '../../redux/slice/SearchSlice';
import { navigate } from '../../naviagtion/service';
import { stackName } from '../../configs/NavigationContants';
import { ActivityIndicator } from '../../components';

const RenderFooterListDish = ({ isLoading }) => (
  <View>{isLoading && <ActivityIndicator />}</View>
);

const RenderCategory = (props) => {
  const { title, onPress, isSelected } = props;
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.category,
        { backgroundColor: isSelected ? Colors.Primary : Colors.Gray },
      ]}
    >
      <Text style={styles.category_text}>{title}</Text>
    </TouchableOpacity>
  );
};

const DishScreen = () => {
  const [selectedCategory, setCategory] = useState(1);
  const listCategory = useSelector((state) => state.Category);
  const dishListInMenu = useSelector(menuSelector).dishList;
  const search = useSelector(searchSelector);
  const statusLoadDish = useSelector(dishSelector).status;
  const countDishCate = useSelector(dishSelector).count;
  const listDish = useSelector(dishSelector).listDish;
  const [page, setPage] = useState(0);
  const dispatch = useDispatch();

  //    const currenDishList = useMemo(() => listDish, [listDish]);

  useEffect(() => {
    dispatch(
      getListDish({
        cateId: selectedCategory,
        page: page,
      })
    );
  }, [selectedCategory, page]);

  useEffect(() => {
    dispatch(countDish(selectedCategory));
  }, [selectedCategory]);

  const onChangeSearch = (value) => {
    dispatch(changeSearch(value));
  };

  const onChangeCate = (id) => {
    setCategory(id);
    setPage(0);
    dispatch(resetDishList());
  };

  const fetchMoreDish = () => {
    if (listDish.length < countDishCate) {
      setPage(page + 1);
    }
  };
  return (
    <View style={styles.container}>
      <Header title='Món Ăn' />
      <Searchbar
        placeholder='Tìm kiếm'
        onChangeText={(text) => {
          onChangeSearch(text);
        }}
        value={search}
      />
      <View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.container_category}
        >
          {listCategory.listCategory.map((category) => (
            <RenderCategory
              isSelected={selectedCategory == category.id}
              key={category.id}
              title={category.name}
              onPress={() => onChangeCate(category.id)}
            />
          ))}
        </ScrollView>
      </View>
      <View style={{ paddingBottom: 200 }}>
        {statusLoadDish == 'loading' && !listDish ? (
          <ActivityIndicator />
        ) : (
          <FlatList
            columnWrapperStyle={{
              flex: 1,
              justifyContent: 'space-between',
              height: 230,
            }}
            data={listDish}
            numColumns={2}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item) =>
              '_' + Math.random().toString(36).substr(2, 9)
            }
            renderItem={({ item }) => <DishItem dish={item} />}
            ListFooterComponent={() => (
              <RenderFooterListDish isLoading={statusLoadDish == 'loading'} />
            )}
            onEndReached={fetchMoreDish}
            onEndReachedThreshold={0.1}
          />
        )}
      </View>
      <TouchableOpacity style={styles.icon_menu}>
        <Text style={styles.count}>{dishListInMenu.length}</Text>
        <FontAwesome name='list-alt' size={24} color={Colors.Primary} />
      </TouchableOpacity>
      <CusButton
        buttonColor={Colors.Primary}
        textColor={Colors.Background}
        styleButton={styles.button_next}
        styleText={styles.button_text}
        onPress={() => navigate(stackName.serviceScreenStack)}
      >
        Tiếp theo
      </CusButton>
    </View>
  );
};

export default DishScreen;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
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
    color: Colors.White,
    fontWeight: 'bold',
  },
  container_listdish: {
    paddingBottom: 50,
    justifyContent: 'space-between',
  },
  icon_menu: {
    position: 'absolute',
    bottom: 12,
    left: 12,
    backgroundColor: Colors.White,
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
    backgroundColor: Colors.Primary,
    color: Colors.White,
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
