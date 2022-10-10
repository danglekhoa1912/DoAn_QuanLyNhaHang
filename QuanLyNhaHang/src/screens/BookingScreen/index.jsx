import {
   Image,
   Keyboard,
   KeyboardAvoidingView,
   Platform,
   ScrollView,
   StyleSheet,
   Text,
   TouchableWithoutFeedback,
   View,
} from "react-native";
import React, { useEffect, useState } from "react";
import Header from "./Header";
import { Intro3 } from "../../../assets/images";
import Colors from "../../constants/Colors";
import CusButton from "../../components/CusButton";
import { navigate, replace } from "../../naviagtion/service";
import { stackName } from "../../configs/NavigationContants";
import { useForm } from "react-hook-form";
import CusPickDate from "../../components/CusPickDate";
import CusDropDown from "../../components/CusDropDown";
import { CusInput } from "../../components";
import { useDispatch, useSelector } from "react-redux";
import { getLobbyById } from "../../redux/slice/LobbySlice";
import { updateBooking } from "../../redux/slice/BookingSlice";
import { bookingSelector, lobbySelector } from "../../redux/selector";

const BookingScreen = ({ route }) => {
   const { lobbyId } = route.params;

   const lobby = useSelector(lobbySelector).lobby;
   const booking = useSelector(bookingSelector);
   const dispatch = useDispatch();

   const [items, setItems] = useState([
      { label: "Sáng", value: "1", disabled: true },
      { label: "Trưa", value: "2" },
      { label: "Tối", value: "3" },
   ]);

   useEffect(() => {
      dispatch(getLobbyById(lobbyId));
   }, []);

   const {
      control,
      handleSubmit,
      reset,
      formState: { errors },
   } = useForm({
      defaultValues: {
         date: new Date(),
         time: "",
         quantity: 0,
      },
   });

   const onChangeLobby = () => {
      replace(stackName.lobbyScreenStack);
   };
   const onSubmit = (data) => {
      dispatch(
         updateBooking({
            ...booking,
            lobby: lobby,
            date: data.date.getTime(),
            quantityTable: data.quantity,
            time: data.time,
         })
      );
      navigate(stackName.dishScreenStack);
   };

   return (
      <KeyboardAvoidingView
         behavior={Platform.OS == "ios" ? "padding" : "height"}
         style={{ flex: 1 }}
      >
         <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.container}>
               <Header />
               <View style={styles.content}>
                  <View style={styles.content_lobby}>
                     <Image
                        source={{ uri: lobby.image }}
                        style={styles.content_image}
                     />
                     <View style={styles.content_right}>
                        <View style={styles.content_info}>
                           <Text style={styles.text}>
                              Tên sảnh: {lobby.name}
                           </Text>
                           <Text style={styles.text}>
                              Sức chứa: {lobby.capacity} bàn
                           </Text>
                           <Text style={styles.text}>
                              Giá: {lobby.price}VND
                           </Text>
                        </View>
                        <CusButton
                           buttonColor={Colors.Background}
                           textColor={Colors.Primary}
                           styleButton={styles.button}
                           onPress={onChangeLobby}
                        >
                           Đổi sảnh
                        </CusButton>
                     </View>
                  </View>
                  <View>
                     <View>
                        <Text style={styles.text}>Ngày đặt</Text>
                        <CusPickDate
                           minDate={new Date()}
                           placeholder="Ngày đặt"
                           control={control}
                           errors="lỗi"
                           label="date"
                        />
                     </View>

                     <View>
                        <Text style={styles.text}>Thời gian</Text>
                        <CusDropDown
                           placeholder="Thời gian"
                           control={control}
                           errors="lỗi"
                           label="time"
                           itemList={items}
                        />
                     </View>
                     <View>
                        <Text style={styles.text}>Số lượng bàn</Text>
                        <CusInput
                           keyboardType="number-pad"
                           control={control}
                           label="quantity"
                        />
                     </View>
                  </View>
                  <CusButton
                     buttonColor={Colors.Background}
                     textColor={Colors.Primary}
                     styleButton={styles.button}
                     onPress={handleSubmit(onSubmit)}
                  >
                     Tiếp tục
                  </CusButton>
               </View>
            </View>
         </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
   );
};

export default BookingScreen;

const styles = StyleSheet.create({
   container: {
      backgroundColor: Colors.Background,
      paddingHorizontal: 12,
      flex: 1,
   },
   content: {
      flex: 1,
   },
   content_lobby: {
      flexDirection: "row",
      justifyContent: "space-evenly",
   },
   content_image: {
      width: 180,
      height: 180,
      borderRadius: 8,
   },
   content_right: {
      justifyContent: "space-between",
   },
   text: {
      fontSize: 18,
      paddingVertical: 6,
   },
   container_button: {
      //   backgroundColor: "red",
      //   flex: 1,
   },
   button: {
      paddingVertical: 12,
      alignItems: "center",
   },
});
