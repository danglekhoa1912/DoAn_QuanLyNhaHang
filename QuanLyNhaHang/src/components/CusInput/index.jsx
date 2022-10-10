import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { TextInput } from "react-native-paper";
import { Controller } from "react-hook-form";

const CusInput = (props) => {
   const { control, errors, sercurity, label, ...ortherProps } = props;
   const [isSecurity, setIsSecurity] = useState(sercurity);
   return (
      <View>
         <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
               <TextInput
                  {...ortherProps}
                  mode="outlined"
                  label={label}
                  style={styles.input}
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  secureTextEntry={isSecurity}
                  right={
                     sercurity && (
                        <TextInput.Icon
                           onPress={() => setIsSecurity(!isSecurity)}
                           icon={isSecurity ? "eye" : "eye-off"}
                        />
                     )
                  }
               />
            )}
            name={label}
         />
         {errors && <Text style={styles.error}>*{errors.message}</Text>}
      </View>
   );
};

export default CusInput;

const styles = StyleSheet.create({
   input: {
      marginBottom: 16,
   },
   error: {
      color: "red",
      paddingLeft: 20,
      marginTop: -10,
   },
});
