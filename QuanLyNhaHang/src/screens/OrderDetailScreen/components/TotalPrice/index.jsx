import { StyleSheet, View } from "react-native";
import React from "react";
import Text from "../Text";
import { Divider } from "../../../../components";
import { useSelector } from "react-redux";
import { bookingSelector } from "../../../../redux/selector";

const TotalPrice = () => {
   const booking = useSelector(bookingSelector);
   const totalLobby =
      (booking.lobbyPriceByTime + booking.menu.total) * booking.quantityTable;
   return (
      <View>
         <Text bold>Thanh toán</Text>
         <View style={styles.total}>
            <View style={styles.price}>
               <Text>Tiền sảnh</Text>
               <Text>{booking.lobbyPriceByTime} VND</Text>
            </View>
            <View style={styles.price}>
               <Text></Text>
               <Text>+</Text>
            </View>
            <View style={styles.price}>
               <Text>Tiền món ăn</Text>
               <Text>{booking.menu.total} VND</Text>
            </View>
            <View style={styles.price}>
               <Text></Text>
               <Text>x</Text>
            </View>
            <View style={styles.price}>
               <Text>Số bàn</Text>
               <Text>{booking.quantityTable} bàn</Text>
            </View>
            <View style={styles.price}>
               <Text>Số bàn</Text>
               <Text>{booking.quantityTable} bàn</Text>
            </View>
            <Divider />
            <View style={styles.price}>
               <Text></Text>
               <Text>{totalLobby} VND</Text>
            </View>
            <View style={styles.price}>
               <Text>Tiền dịch vụ</Text>
               <Text>{booking.service.total} VND</Text>
            </View>
            <Divider />
            <View style={styles.price}>
               <Text>Tổng tiền</Text>
               <Text>{totalLobby + booking.service.total} VND</Text>
            </View>
         </View>
      </View>
   );
};

export default TotalPrice;

const styles = StyleSheet.create({
   total: {
      paddingHorizontal: 10,
   },
   price: {
      flexDirection: "row",
      justifyContent: "space-between",
      paddingVertical: 5,
   },
});
