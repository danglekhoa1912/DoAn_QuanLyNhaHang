import {StyleSheet, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {
  Button,
  Card,
  Layout,
  Modal as ModalDefault,
  ModalProps,
  Text,
} from '@ui-kitten/components';
import Icon from 'react-native-vector-icons/AntDesign';

interface IModal extends ModalProps {
  children: React.ReactNode;
  title: string;
  onClose: () => void;
}

const Modal = (props: IModal) => {
  const {children, title, onClose, ...otherProps} = props;
  return (
    <ModalDefault
      onBackdropPress={onClose}
      backdropStyle={styles.backdrop}
      {...otherProps}>
      <Card style={styles.modal} disabled={true}>
        <View style={styles.header}>
          <Text style={styles.title}>{title}</Text>
          <TouchableOpacity onPress={onClose} style={styles.iconClose}>
            <Icon size={30} name="close" />
          </TouchableOpacity>
        </View>
        {children}
      </Card>
    </ModalDefault>
  );
};

export default Modal;

const styles = StyleSheet.create({
  modal: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    paddingBottom: 8,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 30,
  },
  iconClose: {
    backgroundColor: '#f4f5f6',
    borderRadius: 25,
    padding: 6,
  },
  backdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
});
