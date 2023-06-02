import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Control, Controller, FieldValues, Path} from 'react-hook-form';
import {
  DatePicker as DatePickerDefault,
  DatePickerProps,
} from '@mui/x-date-pickers/DatePicker';
import moment from 'moment';

interface IDatePicker<T extends FieldValues> extends DatePickerProps<any> {
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
      render={({field: {onChange, value}}) => {
        return (
          <DatePickerDefault
            format="DD/MM/YYYY"
            {...otherProps}
            onChange={onChange}
            value={moment(value)}
          />
          //   <input
          //     style={{
          //       padding: 14,
          //       border: 'none',
          //       outline: 'none',
          //       borderRadius: 6,
          //       backgroundColor: 'rgb(238, 238, 238)',
          //     }}
          //     type="date"
          //     {...rest}
          //   />
        );
      }}
    />
  );
}

export default DatePicker;

const styles = StyleSheet.create({});
