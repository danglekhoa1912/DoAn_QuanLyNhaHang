import {
  Image,
  ImageStyle,
  StyleProp,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';

import {Card} from '../../../../components';
import {StyleService, useStyleSheet} from '@ui-kitten/components';
import {connect, useSelector} from 'react-redux';
import {AppDispatch, AppState} from '../../../../store';
import {IDish} from '../../../../type/dish';
import {addDishToMenu, removeDishToMenu} from '../../../../store/booking';

interface IDishItem {
  dish: IDish;
  pDishListInMenu: IDish[];
  pRemoveDishToMenu: (dish: IDish) => void;
  pAddDishToMenu: (dish: IDish) => void;
  disable?: boolean;
}

const DishItem = ({
  dish,
  pAddDishToMenu,
  pDishListInMenu,
  pRemoveDishToMenu,
  disable = false,
}: IDishItem) => {
  const styles = useStyleSheet(themedStyles);

  const [isChoose, setChoose] = useState(
    pDishListInMenu.some(item => item.id == dish.id),
  );

  const handlePress = () => {
    if (isChoose) {
      pRemoveDishToMenu(dish);
    } else {
      pAddDishToMenu(dish);
    }
    setChoose(!isChoose);
  };

  return (
    <Card style={[styles.container, isChoose && styles.choose]}>
      <TouchableOpacity disabled={disable} onPress={handlePress}>
        <Image
          style={styles.image as StyleProp<ImageStyle>}
          source={{
            uri: dish.image,
          }}
        />
        <View style={styles.container_title}>
          <Text style={styles.title_text}>{dish.name}</Text>
          <Text>{dish.price}.000VND</Text>
        </View>
      </TouchableOpacity>
    </Card>
  );
};

const mapStateToProps = (state: AppState) => ({
  pDishListInMenu: state.booking.order.menu.dishList,
});

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  pRemoveDishToMenu: (dish: IDish) => dispatch(removeDishToMenu(dish)),
  pAddDishToMenu: (dish: IDish) => dispatch(addDishToMenu(dish)),
});

export default connect(mapStateToProps, mapDispatchToProps)(DishItem);

const themedStyles = StyleService.create({
  container: {
    width: 160,
    backgroundColor: 'color-background',
    marginVertical: 12,
    justifyContent: 'center',
  },
  choose: {
    borderColor: 'color-primary-default',
    borderWidth: 2,
  },
  image: {
    width: '100%',
    height: 120,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  container_title: {
    padding: 20,
  },
  title_text: {
    fontSize: 18,
    paddingVertical: 10,
  },
});
