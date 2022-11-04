import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { Fragment, useState } from 'react';
import { Entypo } from '@expo/vector-icons';
import { Controller } from 'react-hook-form';
import ModalMenuImage from '../ModalMenuImage';

const CusInputImage = (props) => {
  const { control, errors, label, ...ortherProps } = props;
  const [modalVisible, setModalVisible] = useState(false);

  const onChangeImage = () => {
    setModalVisible(!modalVisible);
  };

  const onHideModal = () => {
    setModalVisible(false);
  };

  return (
    <View>
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => {
          return (
            <Fragment>
              <TouchableOpacity
                onPress={onChangeImage}
                style={styles.container_avatar}
              >
                <Image style={styles.avatar} source={value && { uri: value }} />
                <View style={styles.container_text_change}>
                  <Entypo name='camera' size={30} color='black' />
                </View>
              </TouchableOpacity>
              <ModalMenuImage
                modalVisible={modalVisible}
                onHideModal={onHideModal}
                onChangeImage={onChange}
              />
            </Fragment>
          );
        }}
        name={label}
      />
      {errors && <Text style={styles.error}>*{errors.message}</Text>}
    </View>
  );
};

export default CusInputImage;

const styles = StyleSheet.create({
  container_avatar: {
    alignSelf: 'center',
    position: 'relative',
    borderRadius: 80,
    marginVertical: 12,
  },
  avatar: {
    width: 150,
    height: 150,
    borderRadius: 80,
  },
  container_text_change: {
    position: 'absolute',
    bottom: 15,
    right: 10,
  },
});
