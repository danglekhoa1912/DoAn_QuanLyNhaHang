import { ScrollView, StyleSheet } from "react-native";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userSelector } from "../../redux/selector";
import { getOrderHistory } from "../../redux/slice/UserSlice";
import Colors from "../../constants/Colors";
import { Item } from "./components";
import { ActivityIndicator } from "../../components";
import { navigate } from "../../naviagtion/service";
import { stackName } from "../../configs/NavigationContants";

const BookingHistoryScreen = () => {
   const orderHistory = useSelector(userSelector).orderHistory;
   const user = useSelector(userSelector).user;
   const dispatch = useDispatch();

   useEffect(() => {
      dispatch(getOrderHistory(user.id));
   }, []);

   const onPress = (order) => {
      navigate(stackName.detailBookingHistoryStack, {
         order,
      });
   };

   return (
      <ScrollView contentContainerStyle={styles.container}>
         {user.status == "loading" ? (
            <ActivityIndicator />
         ) : (
            orderHistory.map((order) => (
               <Item
                  onPress={() => onPress(order)}
                  key={order.id}
                  order={order}
               />
            ))
         )}
      </ScrollView>
   );
};

export default BookingHistoryScreen;

const styles = StyleSheet.create({
   container: {
      backgroundColor: Colors.Background,
      paddingHorizontal: 12,
   },
});
