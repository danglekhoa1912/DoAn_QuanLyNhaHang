import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Control, Controller, FieldValues, Path} from 'react-hook-form';
import {
  SelectItem,
  Select as SelectDefault,
  SelectProps,
  IndexPath,
} from '@ui-kitten/components';
import {ISelectItem} from '../../type/common';

interface ISelect<T extends FieldValues> {
  control: Control<T>;
  name: string;
  options: ISelectItem[];
}

function Select<T extends FieldValues>({
  control,
  name,
  options,
  style,
  ...otherProps
}: ISelect<T> & SelectProps) {
  const [selectedIndex, setSelectedIndex] = React.useState<IndexPath>();

  return (
    <Controller
      control={control}
      name={name as Path<T>}
      render={({field: {value, onChange}, fieldState: {error}}) => {
        return (
          <View style={styles.root}>
            <SelectDefault
              selectedIndex={selectedIndex}
              value={value?.label}
              onSelect={index => {
                if (!Array.isArray(index)) {
                  onChange(options[index.row]);
                  setSelectedIndex(index);
                }
              }}
              style={[styles.field, style]}
              size="large"
              {...otherProps}>
              {options.map(item => (
                <SelectItem
                  disabled={item?.disabled || false}
                  key={item.id}
                  title={item.label}
                />
              ))}
            </SelectDefault>
            {error && (
              <Text style={styles.error}>{error?.message as string}</Text>
            )}
          </View>
        );
      }}
    />
  );
}

export default Select;

const styles = StyleSheet.create({
  root: {
    width: '100%',
  },
  field: {},
  error: {
    color: 'red',
    paddingTop: 8,
    paddingLeft: 12,
  },
});
