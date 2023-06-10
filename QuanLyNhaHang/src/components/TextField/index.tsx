import {StyleSheet, Text} from 'react-native';
import React, {useState} from 'react';
import {COLORS} from '../../utils/color';
import {
  Input,
  InputProps,
  StyleService,
  useStyleSheet,
} from '@ui-kitten/components';
import {Control, Controller, FieldValues, Path} from 'react-hook-form';
import {TouchableWithoutFeedback} from '@ui-kitten/components/devsupport';
import Icon from 'react-native-vector-icons/Entypo';
import {View} from 'react-native';
import {StyleProp} from 'react-native';
import {ViewStyle} from 'react-native';
interface ITextField<T extends FieldValues> {
  control: Control<T>;
  name: string;
  secureTextEntry?: boolean;
  styleContainer?: StyleProp<ViewStyle>;
  colorError?: string;
}

function TextField<T extends FieldValues>(props: ITextField<T> & InputProps) {
  const {
    control,
    secureTextEntry = false,
    name,
    textStyle,
    style,
    placeholderTextColor = 'white',
    styleContainer,
    colorError = 'red',
    ...otherProps
  } = props;
  const [isSecurity, setIsSecurity] = useState(secureTextEntry);
  const styles = useStyleSheet(themedStyles);
  const toggleSecureEntry = () => {
    setIsSecurity(!isSecurity);
  };

  const renderIcon = () =>
    secureTextEntry ? (
      <TouchableWithoutFeedback onPress={toggleSecureEntry}>
        <Icon size={24} name={isSecurity ? 'eye-with-line' : 'eye'} />
      </TouchableWithoutFeedback>
    ) : (
      <></>
    );
  return (
    <Controller
      control={control}
      name={name as Path<T>}
      render={({field: {value, onChange}, fieldState: {error}}) => {
        return (
          <View style={[styles.root, styleContainer]}>
            <Input
              placeholderTextColor={placeholderTextColor}
              textStyle={[styles.input, textStyle]}
              style={[styles.container, style]}
              value={value?.toString()}
              accessoryRight={renderIcon}
              secureTextEntry={isSecurity}
              onChangeText={onChange}
              {...otherProps}
            />
            {error && (
              <Text style={[styles.error, {color: colorError}]}>
                {error?.message}
              </Text>
            )}
          </View>
        );
      }}
    />
  );
}

export default TextField;

const themedStyles = StyleService.create({
  root: {
    width: '100%',
  },
  container: {
    borderRadius: 18,
    backgroundColor: 'color-primary-400',
  },
  input: {
    paddingVertical: 12,
    fontSize: 18,
  },
  error: {
    paddingTop: 8,
    paddingLeft: 12,
  },
});
