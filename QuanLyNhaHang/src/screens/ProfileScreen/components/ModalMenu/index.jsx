import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Card, Divider } from '../../../../components';
import { Modal } from 'react-native-paper';
import { MaterialIcons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { useDispatch, useSelector } from 'react-redux';
import { updateUser } from '../../../../redux/slice/UserSlice';
import { userSelector } from '../../../../redux/selector';

const ModalMenu = (props) => {
  const { modalVisible, onHideModal } = props;
  const user = useSelector(userSelector).user;

  const [hasGalleryPermission, setHasGalleryPermission] = useState(null);

  const dispatch = useDispatch();

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
      dispatch(updateUser({ ...user, avatar: result.uri }));
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
      dispatch(updateUser({ ...user, avatar: result.uri }));
    }
    onHideModal();
  };

  return (
    <Modal onDismiss={onHideModal} visible={modalVisible}>
      <View style={styles.container_modal}>
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

export default ModalMenu;

const styles = StyleSheet.create({
  container_modal: {
    alignSelf: 'center',
    marginBottom: 200,
  },
  menu: {
    flexDirection: 'row',
    alignItems: 'center',

    padding: 20,
  },
  title: { paddingLeft: 10, fontSize: 18 },
});
