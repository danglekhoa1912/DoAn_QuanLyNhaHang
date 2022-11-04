import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { Card } from "../../../components";
import Colors from "../../../constants/Colors";
import { useDispatch, useSelector } from "react-redux";
import { menuSelector } from "../../../redux/selector";
import {
   addDishToMenu,
   removeDishToMenu,
} from "../../../redux/slice/BookingSlice";

const DishItem = (props) => {
   const { dish } = props;
   const dishListInMenu = useSelector(menuSelector).dishList;

   const [isChoose, setChoose] = useState(
      dishListInMenu.some((item) => item.id == dish.id)
   );

   const dispatch = useDispatch();

   const onPressDish = () => {
      if (isChoose) {
         dispatch(removeDishToMenu(dish));
      } else {
         dispatch(addDishToMenu(dish));
      }
      setChoose(!isChoose);
   };

   return (
      <Card style={[styles.conatiner, isChoose && styles.choose]}>
         <TouchableOpacity onPress={onPressDish}>
            <Image style={styles.image} source={{ uri: dish.imgae }} />
            <View style={styles.conatiner_title}>
               <Text style={styles.title_text}>{dish.name}</Text>
               <Text>{dish.price}.000VND</Text>
            </View>
         </TouchableOpacity>
      </Card>
   );
};

export default DishItem;

const styles = StyleSheet.create({
   conatiner: {
      width: 160,
      //   flex: 1,
      height: 200,
      backgroundColor: Colors.Background,
      marginVertical: 12,
   },
   choose: {
      borderColor: Colors.Primary,
      borderWidth: 2,
   },
   image: {
      width: "100%",
      height: 120,
      borderTopLeftRadius: 8,
      borderTopRightRadius: 8,
   },
   conatiner_title: {
      paddingHorizontal: 20,
   },
   title_text: {
      fontSize: 16,
      paddingVertical: 10,
   },
   price_text: {},
});
