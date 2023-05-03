import {StyleSheet, View} from 'react-native';
import React, {Fragment} from 'react';
import {connect, useSelector} from 'react-redux';
import {ICategory, IDish} from '../../../../type/dish';
import {StyleService, Text, useStyleSheet} from '@ui-kitten/components';
import {AppState} from '../../../../store';

interface IDishListByCategory {
  category: ICategory;
  pMenuInBooking: {
    dishList: IDish[];
    total: number;
  };
}

const DishListByCategory = ({
  category,
  pMenuInBooking,
}: IDishListByCategory) => {
  const styles = useStyleSheet(themedStyles);
  const dishListByCate = pMenuInBooking.dishList.filter(
    dish => dish.categoryId.id == category.id,
  );

  return (
    <Fragment>
      {dishListByCate.length > 0 && (
        <View style={styles.container}>
          <Text category="h6" style={styles.title}>
            {category.name}
          </Text>
          {dishListByCate.map(dish => (
            <View key={dish.id} style={styles.container_dish}>
              <Text style={styles.dish}>*{dish.name}</Text>
              <Text>{dish.price} VND</Text>
            </View>
          ))}
        </View>
      )}
    </Fragment>
  );
};

const mapStateToProps = (state: AppState) => ({
  pMenuInBooking: state.booking.order.menu,
});

export default connect(mapStateToProps, null)(DishListByCategory);

const themedStyles = StyleService.create({
  container: {
    padding: 10,
  },
  title: {
    color: 'color-secondary',
  },
  container_dish: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dish: {
    paddingLeft: 12,
  },
});
