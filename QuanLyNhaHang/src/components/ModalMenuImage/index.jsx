import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Modal } from 'react-native-paper';
import { MaterialIcons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import Card from '../Card';
import Divider from '../Divider';

const ModalMenuImage = (props) => {
  const { modalVisible, onHideModal, onChangeImage } = props;

  const [hasGalleryPermission, setHasGalleryPermission] = useState(null);

  useEffect(() => {
    (async () => {
      const galleryStatusLibrary =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      const galleryStatusCamera =
        await ImagePicker.requestCameraPermissionsAsync();
      setHasGalleryPermission(
        galleryStatusLibrary.status === 'granted' &&
          galleryStatusCamera.status === 'granted'
      );
    })();
  }, []);

  const pickImageCamera = async () => {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      onChangeImage(result.uri);
    }
    onHideModal();
  };

  const pickImageLib = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      onChangeImage(result.uri);
    }
    onHideModal();
  };

  return (
    <Modal
      contentContainerStyle={styles.container_modal}
      onDismiss={onHideModal}
      visible={modalVisible}
    >
      <View>
        <Card style={{ width: 250 }}>
          <TouchableOpacity onPress={pickImageCamera} style={styles.menu}>
            <MaterialIcons name='photo-camera' size={24} color='black' />
            <Text style={styles.title}>Máy ảnh</Text>
          </TouchableOpacity>
          <Divider />
          <TouchableOpacity onPress={pickImageLib} style={styles.menu}>
            <MaterialIcons name='photo-library' size={24} color='black' />
            <Text style={styles.title}>Thư viện</Text>
          </TouchableOpacity>
        </Card>
      </View>
    </Modal>
  );
};

export default ModalMenuImage;

const styles = StyleSheet.create({
  container_modal: {
    alignSelf: 'center',
  },
  menu: {
    flexDirection: 'row',
    alignItems: 'center',

    padding: 20,
  },
  title: { paddingLeft: 10, fontSize: 18 },
});
