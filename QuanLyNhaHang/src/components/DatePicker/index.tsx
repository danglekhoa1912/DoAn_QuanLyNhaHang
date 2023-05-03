import React from 'react';
import {Control, Controller, FieldValues, Path} from 'react-hook-form';
import {
  Datepicker,
  DatepickerProps,
  StyleService,
  useStyleSheet,
} from '@ui-kitten/components';
import Icon from 'react-native-vector-icons/Entypo';
import {StyleProp, Text} from 'react-native';
import {View} from 'react-native';
import {ViewStyle} from 'react-native';

interface IDatePicker<T extends FieldValues> {
  control: Control<T>;
  name: string;
  colorIcon?: string;
  styleContainer?: StyleProp<ViewStyle>;
}

function DatePicker<T extends FieldValues>(
  props: IDatePicker<T> & DatepickerProps,
) {
  const {
    control,
    colorIcon = 'white',
    name,
    style,
    controlStyle,
    styleContainer,
    ...otherProps
  } = props;
  const styles = useStyleSheet(themedStyles);
  return (
    <Controller
      control={control}
      name={name as Path<T>}
      render={({field: {value, onChange}, fieldState: {error}}) => (
        <View style={[styles.root, styleContainer]}>
          <Datepicker
            style={[{width: '100%'}, style]}
            controlStyle={[styles.field, controlStyle]}
            date={value}
            onSelect={onChange}
            status="primary"
            accessoryRight={
              <Icon color={colorIcon} size={24} name="calendar" />
            }
            {...otherProps}
          />
          {error && (
            <Text style={styles.error}>{error?.message as string}</Text>
          )}
        </View>
      )}
    />
  );
}

export default DatePicker;

const themedStyles = StyleService.create({
  root: {
    width: '100%',
  },
  field: {
    borderRadius: 18,
    backgroundColor: 'color-primary-400',
    paddingVertical: 20,
    fontSize: 18,
    borderColor: 'white',
  },
  error: {
    color: 'white',
    paddingTop: 8,
    paddingLeft: 12,
  },
});
