import { StyleSheet, Text, TextInput, View } from 'react-native';
import React, { Fragment } from 'react';
import Colors from '../../../../constants/Colors';
import { Controller } from 'react-hook-form';
import CusPickDate from '../../../../components/CusPickDate';

const Input = (props) => {
  const { control, errors, label, title, type, ...ortherProps } = props;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      {type == 'date' ? (
        <CusPickDate
          maxDate={new Date()}
          placeholder='Birthday'
          control={control}
          errors={errors}
          label='birthday'
        />
      ) : (
        <Fragment>
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                {...ortherProps}
                onChangeText={onChange}
                value={value}
                style={styles.input}
              />
            )}
            name={label}
          />
          {errors && <Text style={styles.error}>*{errors.message}</Text>}
        </Fragment>
      )}
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  container: {
    marginVertical: 12,
  },
  title: {
    fontSize: 18,
    paddingBottom: 8,
  },
  input: {
    backgroundColor: Colors.White,
    paddingVertical: 16,
    borderRadius: 8,
    fontSize: 18,
    paddingLeft: 12,
    fontWeight: 'bold',
  },
  error: {
    color: 'red',
    paddingLeft: 20,
    marginTop: -10,
  },
});
