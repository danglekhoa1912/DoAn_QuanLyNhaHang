import { StyleSheet, Text, View } from 'react-native';
import React, { Fragment } from 'react';
import Colors from '../../../../constants/Colors';

const DishListByCategory = (props) => {
  const { category, menu } = props;
  const dishListByCate = menu.filter(
    (dish) => dish.dishId.categoryId.id == category.id
  );
  return (
    <Fragment>
      {dishListByCate.length > 0 && (
        <View style={styles.container}>
          <Text style={styles.title}>{category.name}</Text>
          {dishListByCate.map((dish) => (
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

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  title: {
    color: Colors.Secondary,
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
