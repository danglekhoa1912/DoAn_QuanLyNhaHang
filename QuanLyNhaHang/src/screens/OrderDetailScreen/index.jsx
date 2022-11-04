import { ScrollView, StyleSheet, View } from "react-native";
import React from "react";
import {
   CardInfor,
   CardInforLobby,
   DishListByCategory,
   Header,
   Text,
   TotalPrice,
   TypePayment,
} from "./components";
import Colors from "../../constants/Colors";
import { useDispatch, useSelector } from "react-redux";
import {
   bookingSelector,
   bookingStatusSelector,
   CategorySelector,
   userSelector,
} from "../../redux/selector";
import { type_pay } from "../../utils/constants";
import CusButton from "../../components/CusButton";
import { addBooking } from "../../redux/slice/BookingSlice";

const OrderDetailScreen = () => {
   const category = useSelector(CategorySelector);
   const booking = useSelector(bookingSelector);
   const user = useSelector(userSelector).user;
   const dispatch = useDispatch();

   const onBooking = () => {
      const dishList = booking.menu.dishList.map((item) => item.id);
      const serviceList = booking.service.serviceList.map((item) => item.id);
      dispatch(
         addBooking({
            idUser: user.id,
            whId: booking.lobby.id,
            pwtId: 1,
            orderDate: new Date(booking.date),
            typePay: booking.type_pay,
            quantity: booking.quantityTable,
            note: "asa",
            menu: dishList,
            service: serviceList,
            type_party: 1,
            paymentStatus: false,
         })
      );
   };

   return (
      <ScrollView contentContainerStyle={styles.container}>
         <Header />
         <CardInfor />
         <CardInforLobby />
         <View style={styles.dish_list}>
            <Text bold>Danh sách món ăn</Text>
            {category.listCategory.map((item) => (
               <DishListByCategory key={item.id} category={item} />
            ))}
         </View>
         <View style={styles.service_list}>
            <Text bold>Danh sách dịch vụ</Text>
         </View>
         <TotalPrice />
         <View>
            <Text bold>Phương thức thanh toán</Text>
            {Object.keys(type_pay).map((type) => (
               <TypePayment
                  isChoose={booking.type_pay == type_pay[type].type}
                  key={type_pay[type].id}
                  typePayment={type_pay[type]}
               />
            ))}
         </View>
         <CusButton
            buttonColor={Colors.Primary}
            textColor={Colors.Background}
            styleButton={styles.button}
            styleText={styles.button_text}
            onPress={onBooking}
         >
            Thanh toán
         </CusButton>
      </ScrollView>
   );
};

export default OrderDetailScreen;

const styles = StyleSheet.create({
   container: {
      backgroundColor: Colors.Background,
      paddingHorizontal: 12,
      paddingBottom: 20,
   },

   dish_list: {},
   service_list: {},
   button: {
      borderRadius: 20,
      alignItems: "center",
      paddingVertical: 20,
      marginVertical: 20,
   },
   button_text: {
      fontSize: 18,
      fontWeight: "600",
   },
});
