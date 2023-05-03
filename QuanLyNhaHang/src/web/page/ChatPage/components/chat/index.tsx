import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';

interface IChat {
  isSender: boolean;
  message: string;
  avatar: string;
}

const Chat = ({avatar, message, isSender}: IChat) => {
  return (
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
    </View>
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
