import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Control, Controller, FieldValues, Path} from 'react-hook-form';

interface IDatePicker<T extends FieldValues> {
  control: Control<T>;
  name: string;
}

function DatePicker<T extends FieldValues>({
  control,
  name,
  ...otherProps
}: IDatePicker<T>) {
  return (
    <Controller
      control={control}
      name={name as Path<T>}
      render={({field: {ref, ...rest}}) => {
        return (
          <input
            style={{
              padding: 14,
              border: 'none',
              outline: 'none',
              borderRadius: 6,
              backgroundColor: 'rgb(238, 238, 238)',
            }}
            type="date"
            {...rest}
          />
        );
      }}
    />
  );
}

export default DatePicker;

const styles = StyleSheet.create({});
