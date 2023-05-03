import React, {useState, useEffect} from 'react';
import {
  Button,
  Image,
  View,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Modal from '../Modal';
import Icon from 'react-native-vector-icons/Entypo';
import {StyleService, useStyleSheet, useTheme} from '@ui-kitten/components';
import {DefaultAvatar} from '../../assets';
import {Control, Controller, FieldValues, Path} from 'react-hook-form';

interface IImgPicker<T extends FieldValues> {
  control: Control<T>;
  name: string;
  children?: React.ReactNode;
}
export default function ImgPicker<T extends FieldValues>(props: IImgPicker<T>) {
  const {control, name, children} = props;
  const [isSelectImg, setSelectImg] = useState(false);
  const styles = useStyleSheet(themedStyles);

  const theme = useTheme();

  const pickImageLibrary = async (onChange: (...event: any[]) => void) => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      //   aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      onChange(result.assets[0].uri);
      handleCloseModal();
    }
  };

  const pickImageCamera = async (onChange: (...event: any[]) => void) => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      //   aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      onChange(result.assets[0].uri);
      handleCloseModal();
    }
  };

  const handleCloseModal = () => {
    setSelectImg(false);
  };

  return (
    <Controller
      control={control}
      name={name as Path<T>}
      render={({field: {value, onChange}}) => (
        <>
          <TouchableOpacity
            onPress={() => {
              setSelectImg(true);
            }}
            style={styles.avatar}>
            <Image
              style={{width: '100%', height: '100%', borderRadius: 100}}
              source={value ? {uri: value} : DefaultAvatar}
            />
          </TouchableOpacity>
          {children}
          <Modal
            onClose={handleCloseModal}
            title="Select Image"
            visible={isSelectImg}>
            <View style={styles.modal}>
              <TouchableOpacity
                onPress={() => {
                  pickImageCamera(onChange);
                }}
                style={styles.card}>
                <View style={styles.content}>
                  <Icon
                    size={30}
                    name="camera"
                    color={theme['color-primary-default']}
                  />
                  <Text style={styles.text}>Take Photo</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  pickImageLibrary(onChange);
                }}
                style={styles.card}>
                <View style={styles.content}>
                  <Icon
                    size={30}
                    name="images"
                    color={theme['color-primary-default']}
                  />
                  <Text style={styles.text}>Photo Library</Text>
                </View>
              </TouchableOpacity>
            </View>
          </Modal>
        </>
      )}
    />
  );
}

const themedStyles = StyleService.create({
  avatar: {
    borderRadius: 100,
    width: 180,
    height: 180,
    marginVertical: 12,
  },
  modal: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 300,
  },
  card: {
    backgroundColor: '#f7f8fa',
    padding: 20,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
  },
  content: {
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 80,
    width: 100,
  },
  text: {
    fontWeight: 'bold',
    fontSize: 18,
    color: 'black',
  },
});
