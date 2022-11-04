import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import Colors from '../../../constants/Colors';
import { useDispatch, useSelector } from 'react-redux';
import {
  CategorySelector,
  dishSelector,
  menuSelector,
  searchSelector,
} from '../../../redux/selector';
import { Feather } from '@expo/vector-icons';
import { getListCategory } from '../../../redux/slice/CategorySlice';
import DishItem from './components/DishItem';
import { ActivityIndicator } from '../../../components';
import {
  countDish,
  getListDish,
  resetDishList,
} from '../../../redux/slice/DishSlice';
import { changeSearch } from '../../../redux/slice/SearchSlice';
import { navigate } from '../../../naviagtion/service';
import { adminName } from '../../../configs/NavigationContants';
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

const RenderFooterListDish = ({ isLoading }) => (
  <View>{isLoading && <ActivityIndicator />}</View>
);

const DishManagement = () => {
  const [selectedCategory, setCategory] = useState(1);
  const listCategory = useSelector(CategorySelector);
  const search = useSelector(searchSelector);
  const statusLoadDish = useSelector(dishSelector).status;
  const countDishCate = useSelector(dishSelector).count;
  const listDish = useSelector(dishSelector).listDish;
  const [page, setPage] = useState(0);
  const dispatch = useDispatch();
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

  const onPressDish = (dish) => {
    navigate(adminName.editDishStack, { dish });
  };

  const onAddDish = () => {
    navigate(adminName.editDishStack);
  };

  console.log(listDish);

  return (
    <View style={styles.container}>
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
      <View style={{ paddingBottom: 50 }}>
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
            renderItem={({ item }) => (
              <DishItem onPress={() => onPressDish(item)} dish={item} />
            )}
            ListFooterComponent={() => (
              <RenderFooterListDish isLoading={statusLoadDish == 'loading'} />
            )}
            onMomentumScrollEnd={fetchMoreDish}
          />
        )}
      </View>
      <TouchableOpacity onPress={onAddDish} style={styles.container_btnAdd}>
        <Feather name='plus' size={24} color='white' />
      </TouchableOpacity>
    </View>
  );
};

export default DishManagement;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    position: 'relative',
    flex: 1,
    backgroundColor: Colors.Background,
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
