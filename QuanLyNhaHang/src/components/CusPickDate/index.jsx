import {
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useState } from 'react';
import { AntDesign } from '@expo/vector-icons';
import moment from 'moment';

import RNDateTimePicker from '@react-native-community/datetimepicker';
import { Controller } from 'react-hook-form';

const CusPickDate = (props) => {
  const { control, errors, label, placeholder, minDate, maxDate } = props;
  const [showPickerDate, setShowPickerDate] = useState(false);

  //    const onChange = (event, selectedDate) => {
  //       const currentDate = selectedDate;
  //       setShow(Platform.OS === "ios");
  //    };
  return (
    <View>
      <Controller
        control={control}
        render={({
          field: { onBlur, onChange, value = control._defaultValues[label] },
        }) => {
          return (
            <>
              <View>
                <TouchableOpacity
                  onPress={() => {
                    setShowPickerDate(!showPickerDate);
                  }}
                  style={styles.containerPickerDate}
                >
                  <Text>
                    {value ? moment(value).format('DD/MM/YYYY') : placeholder}
                  </Text>
                  <AntDesign name='calendar' size={24} color='black' />
                </TouchableOpacity>
              </View>
              {showPickerDate && (
                <RNDateTimePicker
                  maximumDate={maxDate}
                  minimumDate={minDate}
                  value={value || new Date()}
                  onChange={(event, selectedDate) => {
                    if (Platform.OS === 'android') {
                      setShowPickerDate(false);
                    }

                    if (event.type === 'neutralButtonPressed') {
                      onChange(new Date(0));
                    } else {
                      // setValuePicker(currentDate);
                      onChange(selectedDate);
                    }
                  }}
                  display={Platform.OS === 'ios' ? 'inline' : 'default'}
                  mode={'date'}
                />
              )}
            </>
          );
        }}
        name={label}
      />
      {errors && <Text style={styles.error}>*{errors.message}</Text>}
    </View>
  );
};

export default CusPickDate;

const styles = StyleSheet.create({
  containerPickerDate: {
    flexDirection: 'row',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 16,
    padding: 12,
    justifyContent: 'space-between',
  },
  error: {
    color: 'red',
    paddingLeft: 20,
    marginTop: -10,
  },
});
