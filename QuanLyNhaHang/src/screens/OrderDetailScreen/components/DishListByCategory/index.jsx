import { StyleSheet, View } from "react-native";
import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import { menuSelector } from "../../../../redux/selector";
import Text from "../Text";
import Colors from "../../../../constants/Colors";

const DishListByCategory = (props) => {
   const { category } = props;
   const menu = useSelector(menuSelector);
   const dishListByCate = menu.dishList.filter(
      (dish) => dish.categoryId == category.id
   );

   return (
      <Fragment>
         {dishListByCate.length > 0 && (
            <View style={styles.container}>
               <Text bold style={styles.title}>
                  {category.name}
               </Text>
               {dishListByCate.map((dish) => (
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

export default DishListByCategory;

const styles = StyleSheet.create({
   container: {
      padding: 10,
   },
   title: {
      color: Colors.Secondary,
   },
   container_dish: {
      flexDirection: "row",
      justifyContent: "space-between",
   },
   dish: {
      paddingLeft: 12,
   },
});
