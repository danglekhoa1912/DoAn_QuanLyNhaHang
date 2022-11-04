import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import DropDownPicker from 'react-native-dropdown-picker';
import { Controller } from 'react-hook-form';

const CusDropDown = (props) => {
  const { control, errors, label, placeholder, itemList } = props;
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  return (
    <View>
      <Controller
        control={control}
        render={({
          field: { onBlur, onChange, value = control._defaultValues[label] },
        }) => {
          return (
            <DropDownPicker
              open={open}
              value={value}
              items={itemList}
              setOpen={setOpen}
              setValue={setValue}
              onSelectItem={(item) => onChange(item.value)}
              placeholder={placeholder}
              containerStyle={styles.dropdown}
            />
          );
        }}
        name={label}
      />
      {errors && <Text style={styles.error}>*{errors.message}</Text>}
    </View>
  );
};

export default CusDropDown;

const styles = StyleSheet.create({
  dropdown: {
    width: 150,
  },
  error: {
    color: 'red',
    paddingLeft: 20,
  },
});
