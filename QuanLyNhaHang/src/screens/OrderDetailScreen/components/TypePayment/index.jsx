import { StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { Card } from "../../../../components";
import Text from "../Text";
import Colors from "../../../../constants/Colors";
import { useDispatch } from "react-redux";
import { updateTypePay } from "../../../../redux/slice/BookingSlice";

const TypePayment = (props) => {
   const { typePayment, isChoose } = props;
   const dispatch = useDispatch();

   const onPress = () => {
      dispatch(updateTypePay(typePayment.type));
   };

   return (
      <Card style={[styles.container, isChoose && styles.choose]}>
         <TouchableOpacity onPress={onPress} style={styles.type_payment}>
            {typePayment.icon}
            <Text bold style={styles.text}>
               {typePayment.name}
            </Text>
         </TouchableOpacity>
      </Card>
   );
};

export default TypePayment;

const styles = StyleSheet.create({
   container: { width: "100%", marginVertical: 5 },
   choose: {
      borderWidth: 2,
      borderColor: Colors.Primary,
   },
   type_payment: {
      flexDirection: "row",
      alignItems: "center",
      paddingHorizontal: 12,
      paddingVertical: 5,
   },
   text: {
      marginLeft: 18,
   },
});
