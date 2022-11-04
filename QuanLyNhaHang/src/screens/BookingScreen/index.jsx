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
import Colors from "../../constants/Colors";
import CusButton from "../../components/CusButton";
import { navigate, replace } from "../../naviagtion/service";
import { stackName } from "../../configs/NavigationContants";
import { useForm } from "react-hook-form";
import CusPickDate from "../../components/CusPickDate";
import CusDropDown from "../../components/CusDropDown";
import { CusInput } from "../../components";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { getLobbyById } from "../../redux/slice/LobbySlice";
import { updateBooking } from "../../redux/slice/BookingSlice";
import {
   bookingSelector,
   bookingStatusSelector,
   lobbySelector,
   typePartySelector,
   typeTimeSelector,
} from "../../redux/selector";
import { getTypeTime } from "../../redux/slice/TypeTimeSlice";
import { yupResolver } from "@hookform/resolvers/yup";
import { getTypeParty } from "../../redux/slice/TypePartySlice";

const BookingScreen = ({ route }) => {
   const { lobbyId } = route.params;

   const lobby = useSelector(lobbySelector).lobby;
   const status = useSelector(bookingStatusSelector);
   const typeTime = useSelector(typeTimeSelector);
   const typeParty = useSelector(typePartySelector);
   const dispatch = useDispatch();

   const typeTimeList = typeTime.TypeTimeList.map((item) => ({
      label: item.session,
      value: item.id,
   }));

   const typePartyList = typeParty.TypePartyList.map((item) => ({
      label: item.nameParty,
      value: item.id,
   }));

   const schema = yup
      .object({
         time: yup.string().required("Vui lòng chọn thời gian"),
         type_party: yup.string().required("Vui lòng chọn loại tiệc"),
         quantity: yup
            .number()
            .min(1, "Vui lòng nhập số lượng bàn")
            .max(lobby.capacity, "Số lượng bàn vượt quá số lượng của sảnh"),
      })
      .required();

   useEffect(() => {
      Promise.all([
         dispatch(getLobbyById(lobbyId)),
         dispatch(getTypeTime()),
         dispatch(getTypeParty()),
      ]);
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
         type_party: "",
      },
      resolver: yupResolver(schema),
   });

   const onChangeLobby = () => {
      replace(stackName.lobbyScreenStack);
   };
   const onSubmit = (data) => {
      dispatch(
         updateBooking({
            lobby: lobby,
            date: data.date.getTime(),
            quantityTable: data.quantity,
            time: data.time,
            total: lobby.price * data.quantity,
         })
      );
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
                           label="date"
                        />
                     </View>

                     <View
                        style={{
                           flexDirection: "row",
                           justifyContent: "space-around",
                        }}
                     >
                        <View>
                           <Text style={styles.text}>Thời gian</Text>
                           <CusDropDown
                              placeholder="Thời gian"
                              control={control}
                              errors={errors.time}
                              label="time"
                              itemList={typeTimeList}
                           />
                        </View>
                        <View>
                           <Text style={styles.text}>Loại tiệc</Text>
                           <CusDropDown
                              placeholder="Loại tiệc"
                              control={control}
                              errors={errors.type_party}
                              label="type_party"
                              itemList={typePartyList}
                           />
                        </View>
                     </View>
                     <View>
                        <Text style={styles.text}>Số lượng bàn</Text>
                        <CusInput
                           keyboardType="number-pad"
                           control={control}
                           label="quantity"
                           errors={errors.quantity}
                        />
                     </View>
                  </View>
                  <View style={styles.container_err}>
                     {status == "invalidTime" && (
                        <Text style={styles.text_error}>
                           Khung giờ đó đã có người đặt
                        </Text>
                     )}
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
      marginBottom: 50,
   },
   container_err: {
      alignItems: "center",
      padding: 12,
   },
   text_error: {
      color: Colors.Primary,
   },
});
