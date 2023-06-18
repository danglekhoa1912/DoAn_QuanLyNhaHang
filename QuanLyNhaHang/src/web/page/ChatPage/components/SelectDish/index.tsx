import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, AppState} from '../../../../../store';
import {getCategories} from '../../../../../store/dish/thunkApi';
import {ICategory, IDish} from '../../../../../type/dish';
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from '@mui/material';
import {sCategoryOpts} from '../../../../../store/dish/selector';
import {ISelectItem} from '../../../../../type/common';
import {getDishList} from '../../../../../store/dish/thunkApi';
import {addDishToMenu, removeDishToMenu} from '../../../../../store/booking';
import {COLORS} from '../../../../../utils/color';
import CloseIcon from '@mui/icons-material/Close';
import {makeStyles} from '@mui/styles';

// import './selectDish.css';

const useStyles = makeStyles({
  wrapDish: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    '&:hover $iconRemove': {
      display: 'flex',
    },
  },
  iconRemove: {
    display: 'none',
    cursor: 'pointer',
  },
});

interface ICardDish {
  dish: IDish;
}

const CardDish = ({dish}: ICardDish) => {
  const pDishListInMenu = useSelector<AppState, IDish[]>(
    state => state.booking.order.menu.dishList,
  );
  const [isChoose, setChoose] = useState(
    pDishListInMenu.some(item => item.id == dish.id),
  );

  const dispatch = useDispatch<AppDispatch>();

  const handlePressDish = () => {
    if (isChoose) {
      dispatch(removeDishToMenu(dish));
    } else {
      dispatch(addDishToMenu(dish));
    }
    setChoose(!isChoose);
  };

  return (
    <TouchableOpacity
      onPress={handlePressDish}
      style={{
        padding: 8,
        borderRadius: 6,
        width: 180,
        height: 200,
        shadowOffset: {
          width: 0,
          height: 4,
        },
        shadowOpacity: 0.32,
        shadowRadius: 5.46,
        margin: 16,
        elevation: 9,
        borderColor: COLORS.primary,
        borderWidth: isChoose ? 2 : 0,
      }}>
      <img
        style={{
          height: 140,
        }}
        src={dish.image}
      />
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingTop: 4,
        }}>
        <Text>{dish.name}</Text>
        <Text>{dish.price}</Text>
      </View>
    </TouchableOpacity>
  );
};

const SelectDish = () => {
  const styles = useStyles();

  const dispatch = useDispatch<AppDispatch>();
  const [search, setSearch] = useState('');
  const totalPage = useRef<number>(0);
  const [page, setPage] = useState(0);
  const [category, setCategory] = useState(1);
  const [dishList, setDishList] = useState<IDish[]>([]);
  const pCategoryOpts = useSelector<AppState, ISelectItem[]>(state =>
    sCategoryOpts(state),
  );
  const pDishListInMenu = useSelector<AppState, IDish[]>(
    state => state.booking.order.menu.dishList,
  );

  const handleChange = (event: SelectChangeEvent) => {
    setCategory(+event.target.value);
    setPage(0);
  };

  const fetchMoreDish = () => {
    if (totalPage.current > page) {
      setPage(page + 1);
    }
  };

  useEffect(() => {
    dispatch(
      getDishList({
        categoryId: category,
        page: page + 1,
        searchByName: search,
      }),
    ).then(data => {
      setDishList(data.payload.record);
      totalPage.current = data.payload.totalPage;
    });
  }, [category, search]);

  useEffect(() => {
    dispatch(getCategories());
  }, []);

  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'row',
      }}>
      <View
        style={{
          flex: 1,
          overflow: 'auto',
          borderRightWidth: 1,
          borderRightColor: COLORS.secondary,
        }}>
        {pCategoryOpts?.map(category => (
          <View
            style={{
              marginBottom: 12,
            }}
            key={category.id}>
            <Text
              style={{
                fontWeight: 'bold',
                fontSize: 20,
                textAlign: 'center',
              }}>
              * {category.label}
            </Text>
            {pDishListInMenu
              ?.filter(dish => dish.categoryId.id === category.id)
              ?.map(dish => (
                <div className={styles.wrapDish}>
                  <Text
                    style={{
                      fontWeight: '300',
                      fontSize: 14,
                      paddingLeft: 8,
                      paddingVertical: 4,
                    }}>
                    - {dish.name}
                  </Text>
                  <CloseIcon
                    onClick={() => {
                      dispatch(removeDishToMenu(dish));
                    }}
                    className={styles.iconRemove}
                    color="error"
                  />
                </div>
              ))}
          </View>
        ))}
      </View>
      <View
        style={{
          flex: 3,
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <TextInput
            value={search}
            onChangeText={setSearch}
            style={{
              backgroundColor: '#f3f5f7',
              height: 40,
              width: 240,
              borderRadius: 12,
              marginLeft: 24,
              padding: 12,
            }}
            placeholder="Search"
            placeholderTextColor="gray"
          />
          <FormControl
            style={{
              width: 200,
            }}>
            <Select
              style={{
                height: 40,
              }}
              value={category}
              onChange={handleChange}>
              {pCategoryOpts.map(item => (
                <MenuItem key={item.id} value={item.id}>
                  {item.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </View>
        <View style={{flex: 1, marginTop: 12}}>
          <FlatList
            contentContainerStyle={{
              flexDirection: 'row',
              flexWrap: 'wrap',
              marginTop: 8,
            }}
            data={dishList}
            renderItem={({item}) => <CardDish dish={item} key={item.id} />}
            showsVerticalScrollIndicator={false}
            onEndReached={fetchMoreDish}
            onEndReachedThreshold={0}
          />
        </View>
      </View>
    </View>
  );
};

export default SelectDish;

const styles = StyleSheet.create({});
