import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Control, Controller, FieldValues, Path} from 'react-hook-form';
import {MenuItem, Select, SelectProps} from '@mui/material';
import {ISelectItem} from '../../../type/common';

interface IDropDown<T extends FieldValues> extends SelectProps {
  control: Control<T>;
  name: string;
  options: ISelectItem[];
}

function DropDown<T extends FieldValues>({
  control,
  name,
  options,
  ...otherProps
}: IDropDown<T>) {
  return (
    <Controller
      control={control}
      name={name as Path<T>}
      render={({field: {onChange, value}}) => (
        <Select
          {...otherProps}
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={value}
          label="Category"
          onChange={e => {
            onChange(+e.target.value);
          }}>
          {options.map(item => (
            <MenuItem key={item.id} value={item.id}>
              {item.label}
            </MenuItem>
          ))}
        </Select>
      )}
    />
  );
}

export default DropDown;

const styles = StyleSheet.create({});
