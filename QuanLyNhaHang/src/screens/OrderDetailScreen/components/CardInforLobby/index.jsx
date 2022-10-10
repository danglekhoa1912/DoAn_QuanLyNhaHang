import { StyleSheet, View } from "react-native";
import React from "react";
import Text from "../Text";
import ItemInforLooby from "../ItemInforLobby";
import { bookingSelector } from "../../../../redux/selector";
import { useSelector } from "react-redux";
import moment from "moment";

const CardInforLobby = () => {
   const booking = useSelector(bookingSelector);

   return (
      <View style={styles.container_infor_lobby}>
         <Text bold>Chi tiết hóa đơn</Text>
         <ItemInforLooby nameIcon="hoop-house" title="Tên sảnh">
            {booking.lobby.name}
         </ItemInforLooby>
         <ItemInforLooby nameIcon="table-furniture" title="Số Lượng bàn">
            {booking.quantityTable}
         </ItemInforLooby>
         <ItemInforLooby nameIcon="calendar" title="Ngày đặt">
            {moment(booking.date).format("DD/MM/YYYY")} - Sáng
         </ItemInforLooby>
      </View>
   );
};

export default CardInforLobby;

const styles = StyleSheet.create({
   container_infor_lobby: {
      paddingVertical: 18,
   },
});
