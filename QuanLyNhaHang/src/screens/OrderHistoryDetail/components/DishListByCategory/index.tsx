import {StyleSheet, Text, View} from 'react-native';
import React, {Fragment} from 'react';
import {StyleService, useStyleSheet} from '@ui-kitten/components';
import {ICategory, IDish} from '../../../../type/dish';

interface IDishListByCategory {
  menu: {
    dishId: IDish;
  }[];
  category: ICategory;
}

const DishListByCategory = ({category, menu}: IDishListByCategory) => {
  const styles = useStyleSheet(themedStyles);

  const dishListByCate = menu.filter(
    dish => dish.dishId.categoryId.id == category.id,
  );
  return (
    <Fragment>
      {dishListByCate.length > 0 && (
        <View style={styles.container}>
          <Text style={styles.title}>{category.name}</Text>
          {dishListByCate.map(dish => (
            <View key={dish.dishId.id} style={styles.container_dish}>
              <Text style={[styles.dish, styles.text]}>
                *{dish.dishId.name}
              </Text>
              <Text style={styles.text}>{dish.dishId.price} VND</Text>
            </View>
          ))}
        </View>
      )}
    </Fragment>
  );
};

export default DishListByCategory;

const themedStyles = StyleService.create({
  container: {
    padding: 10,
  },
  title: {
    color: 'color-secondary',
    fontSize: 18,
    fontWeight: 'bold',
  },
  container_dish: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dish: {
    paddingLeft: 12,
  },
  text: {
    fontSize: 18,
  },
});
