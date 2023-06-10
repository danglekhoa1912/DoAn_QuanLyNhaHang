import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import ReceiptIcon from '@mui/icons-material/Receipt';
import {COLORS} from '../../../../../utils/color';
import {Button} from '../../../../components';

interface IChat {
  isSender: boolean;
  message: string;
  avatar: string;
  type: 'order' | 'text' | 'resolved';
}

const Chat = ({avatar, message, isSender, type}: IChat) => {
  return type !== 'resolved' ? (
    <View
      style={[styles.root, {flexDirection: !isSender ? 'row' : 'row-reverse'}]}>
      {!isSender && (
        <Image
          style={styles.avatar}
          source={{
            uri: avatar,
          }}
        />
      )}
      {type === 'order' ? (
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: 20,
            paddingVertical: 10,
            borderRadius: 12,
            gap: 12,
            backgroundColor: COLORS.primary,
          }}>
          <View
            style={{
              padding: 8,
              borderRadius: 25,
              backgroundColor: 'white',
            }}>
            <ReceiptIcon />
          </View>
          <View
            style={{
              gap: 8,
            }}>
            <Text
              style={{
                color: 'white',
                fontWeight: '600',
              }}>
              Booking Id: #{message}
            </Text>
            <TouchableOpacity
              style={{
                backgroundColor: COLORS.secondary,
                padding: 4,
                alignItems: 'center',
                borderRadius: 8,
              }}>
              <Text
                style={{
                  color: 'white',
                }}>
                View Detail
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <View
          style={[
            styles.bubble,
            !isSender ? styles.bubbleReceiver : styles.bubbleSender,
          ]}>
          <Text
            style={[
              styles.text,
              !isSender ? styles.bubbleReceiver : styles.bubbleSender,
            ]}>
            {message}
          </Text>
        </View>
      )}
    </View>
  ) : (
    <></>
  );
};

export default Chat;

const styles = StyleSheet.create({
  root: {
    paddingVertical: 6,
    backgroundColor: 'white',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 50,
    margin: 10,
  },
  bubble: {
    borderRadius: 18,
    padding: 12,
    maxWidth: '70%',
    alignSelf: 'center',
  },
  bubbleReceiver: {
    backgroundColor: '#f4f4f4',
  },
  bubbleSender: {
    backgroundColor: '#2177fb',
    color: 'white',
  },
  text: {
    fontSize: 16,
  },
  textReceiver: {
    // backgroundColor: '#f4f4f4',
  },
  textSender: {
    color: 'white',
  },
});
