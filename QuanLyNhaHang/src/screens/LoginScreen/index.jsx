import {
   Button,
   Keyboard,
   KeyboardAvoidingView,
   ScrollView,
   StyleSheet,
   Text,
   TouchableOpacity,
   TouchableWithoutFeedback,
   View,
} from "react-native";
import * as yup from "yup";
import React from "react";
import { CusInput } from "../../components";
import { useForm } from "react-hook-form";
import CusButton from "../../components/CusButton";
import { yupResolver } from "@hookform/resolvers/yup";
import { stackName } from "../../configs/NavigationContants";
import Colors from "../../constants/Colors";

const schema = yup
   .object({
      email: yup
         .string()
         .required("Please enter your email")
         .email("Email invalidate"),
      password: yup.string().required("Please enter your password"),
   })
   .required();

const LoginScreen = ({ navigation }) => {
   const {
      control,
      handleSubmit,
      formState: { errors },
   } = useForm({
      defaultValues: {
         email: "",
         password: "",
      },
      resolver: yupResolver(schema),
   });

   const onSubmit = (data) => {
      console.log(data);
      navigation.replace(stackName.drawerScreenStack);
   };

   return (
      <KeyboardAvoidingView
         behavior={Platform.OS == "ios" ? "padding" : "height"}
         style={{ flex: 1 }}
      >
         <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <ScrollView contentContainerStyle={styles.container}>
               <CusInput
                  control={control}
                  errors={errors.email}
                  label="email"
               />
               <CusInput
                  control={control}
                  errors={errors.password}
                  label="password"
                  sercurity
               />
               <TouchableOpacity>
                  <Text>Forgot password?</Text>
               </TouchableOpacity>
               <View style={styles.container_button}>
                  <CusButton
                     buttonColor={Colors.Primary}
                     textColor={Colors.Background}
                     onPress={handleSubmit(onSubmit)}
                     styleButton={styles.button}
                     styleText={styles.button_text}
                  >
                     Login
                  </CusButton>
               </View>
            </ScrollView>
         </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
   );
};

export default LoginScreen;

const styles = StyleSheet.create({
   container: {
      flex: 1,
      paddingHorizontal: 20,
      backgroundColor: Colors.Background,
      paddingTop: 40,
   },
   container_button: {
      flex: 1,
      justifyContent: "flex-end",
      marginBottom: 40,
   },
   button: {
      borderRadius: 20,
      alignItems: "center",
      paddingVertical: 20,
   },
   button_text: {
      fontSize: 18,
      fontWeight: "600",
   },
});
