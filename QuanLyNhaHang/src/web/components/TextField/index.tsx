import {StyleSheet, Text, TextInput, TextInputProps, View} from 'react-native';
import React from 'react';
import {Control, Controller, FieldValues, Path} from 'react-hook-form';

interface ITextField<T extends FieldValues> extends TextInputProps {
  control: Control<T>;
  name: string;
}

function TextField<T extends FieldValues>({
  control,
  name,
  ...otherProps
}: ITextField<T>) {
  return (
    <Controller
      control={control}
      name={name as Path<T>}
      render={({field: {onChange, value}}) => (
        <TextInput
          value={value}
          onChange={onChange}
          style={{
            borderRadius: 6,
            backgroundColor: '#ffffff',
            padding: 14,
            borderColor: '#e7e7e7',
            borderWidth: 1,
            // outline: 'none',
          }}
          placeholderTextColor="#cbc"
          {...otherProps}
        />
      )}
    />
  );
}

export default TextField;

const styles = StyleSheet.create({});
