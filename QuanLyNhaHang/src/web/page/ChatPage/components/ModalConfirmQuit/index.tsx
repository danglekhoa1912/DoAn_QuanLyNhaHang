import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Modal from '../../../../components/Modal';

interface IModalConfirmQuit {
  handleClose: () => void;
  open: boolean;
  handleCancel: () => void;
}

const ModalConfirmQuit = ({
  handleCancel,
  handleClose,
  open,
}: IModalConfirmQuit) => {
  return (
    <Modal
      minWidth={'60%'}
      open={open}
      saveButton={{
        onClick: handleClose,
        title: 'Yes, cancel',
        style: {
          backgroundColor: '#e1024f',
          fontSize: 14,
          fontWeight: '600',
        },
      }}
      cancelButton={{
        onClick: handleCancel,
        title: 'Go Back',
        style: {
          backgroundColor: '#F2F5F7',
          fontSize: 14,
          fontWeight: '600',
          color: 'black',
        },
      }}>
      <View
        style={{
          padding: 20,
        }}>
        <Text style={styles.title}>Are you sure you want to cancel?</Text>
        <Text style={styles.content}>
          All progress will be lost on this action.
        </Text>
      </View>
    </Modal>
  );
};

export default ModalConfirmQuit;

const styles = StyleSheet.create({
  title: {
    fontSize: 26,
    fontWeight: '600',
    lineHeight: 28,
  },
  content: {
    fontSize: 16,
    fontWeight: '500',
    lineHeight: 24,
    color: '#646464',
  },
});
