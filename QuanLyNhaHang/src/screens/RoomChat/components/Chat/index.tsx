import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';

interface IChat {
  typeChat: string;
  message: string;
  avatar: string;
}

const Chat = ({avatar, message, typeChat}: IChat) => {
  return (
    <View
      style={[
        styles.root,
        {flexDirection: typeChat === 'Receiver' ? 'row' : 'row-reverse'},
      ]}>
      {typeChat === 'Receiver' && (
        <Image
          style={styles.avatar}
          source={{
            uri: 'https://scontent.fsgn2-6.fna.fbcdn.net/v/t39.30808-6/337559510_178645667863261_1735636028655289572_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=730e14&_nc_ohc=g32LiuXjy_EAX8D0_UY&_nc_ht=scontent.fsgn2-6.fna&oh=00_AfBz1q7_sTOMRuT63KDIw9IBEbBenOSSkvzfocAJbfvFMg&oe=643EE791',
          }}
        />
      )}
      <View
        style={[
          styles.bubble,
          typeChat === 'Receiver' ? styles.bubbleReceiver : styles.bubbleSender,
        ]}>
        <Text
          style={[
            styles.text,
            typeChat === 'Receiver'
              ? styles.bubbleReceiver
              : styles.bubbleSender,
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
