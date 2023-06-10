import {
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useCallback, useEffect, useLayoutEffect, useState} from 'react';
import {Chat} from './components';
import {Input, Text, useTheme} from '@ui-kitten/components';
import Icon from 'react-native-vector-icons/Ionicons';
import database from '@react-native-firebase/database';
import firestore from '@react-native-firebase/firestore';
import {
  Bubble,
  GiftedChat,
  InputToolbar,
  Message,
  Send,
  SystemMessage,
} from 'react-native-gifted-chat';
import {useSelector} from 'react-redux';
import {AppState} from '../../store';
import {IUser} from '../../type/user';
import _ from 'lodash';
import {COLORS} from '../../utils/color';
import {Logo} from '../../assets';
import {goBack, navigate} from '../../utils/navigate';

interface IMessage {
  _id: number;
  text: string;
  createAt: any;
  user: any;
  type: string;
}

const customtInputToolbar = (props: any) => {
  return (
    <InputToolbar
      {...props}
      containerStyle={{
        backgroundColor: 'white',
        borderTopColor: '#E8E8E8',
        borderRadius: 20,
        marginHorizontal: 20,
        marginBottom: 12,
        padding: 4,
      }}
    />
  );
};

const renderBubble = (props: any) => {
  return props.currentMessage.type === 'order' ? (
    <TouchableOpacity
      onPress={() => {
        navigate('OrderHistoryDetailScreen', {id: props.currentMessage.text});
      }}
      style={{
        backgroundColor: COLORS.secondary,
        padding: 12,
        borderRadius: 8,
        flexDirection: 'row',
        alignContent: 'center',
        gap: 8,
        marginTop: 8,
      }}>
      <View
        style={{
          padding: 4,
          borderRadius: 25,
          backgroundColor: 'white',
          alignItems: 'center',
        }}>
        <Icon name="document-text-outline" size={30} />
      </View>
      <Text
        style={{
          fontWeight: 'bold',
          color: 'white',
          alignSelf: 'center',
        }}>
        Booking Id: #{props.currentMessage.text}
      </Text>
    </TouchableOpacity>
  ) : props.currentMessage.type === 'resolved' ? (
    <View
      style={{
        borderColor: COLORS.primary,
        borderWidth: 1,
        backgroundColor: '#FCE4E5',
        padding: 8,
        borderRadius: 8,
      }}>
      <Text
        style={{
          color: COLORS.primary,
          fontWeight: 800,
        }}>
        {props.currentMessage.text}
      </Text>
    </View>
  ) : (
    <Bubble
      {...props}
      wrapperStyle={{
        left: {
          backgroundColor: 'white',
        },
        right: {
          borderTopRightRadius: 0,
        },
      }}
    />
  );
};

const renderSend = (props: any) => {
  return (
    <Send
      {...props}
      containerStyle={{
        justifyContent: 'center',
        alignItems: 'center',
        paddingRight: 12,
      }}>
      <Icon name="send" size={30} color={COLORS.primary} />
    </Send>
  );
};

const RoomChat = () => {
  const profile = useSelector<AppState, IUser>(state => state.user.user);

  const theme = useTheme();

  const [messages, setMessages] = useState<any[]>([]);

  const onSend = useCallback((messages: any[] = []) => {
    setMessages(previousMessage =>
      GiftedChat.append(previousMessage, messages),
    );

    const {_id, text, user, createdAt} = messages[0];

    firestore()
      .collection('chats')
      .add({
        _id,
        text,
        user,
        createdAt: new Date(createdAt).getTime(),
        type: 'text',
      })
      .then(data => {
        firestore()
          .collection('usersChat')
          .where('__name__', '>=', profile?.id?.toString())
          .get()
          .then(snapShoot => {
            if (snapShoot.empty) {
              firestore()
                .collection('usersChat')
                .doc(profile?.id?.toString())
                .set({
                  messages: [data.id],
                });
            } else {
              firestore()
                .collection('usersChat')
                .doc(snapShoot.docs[0].id)
                .update({
                  messages: [
                    ...(snapShoot.docs[0].get('messages') as Array<string>),
                    data.id,
                  ],
                });
            }
          });
      });
  }, []);

  useLayoutEffect(() => {
    let result: any[] = [];
    firestore()
      .collection('usersChat')
      .where('__name__', '>=', profile?.id?.toString())
      .onSnapshot(snap => {
        (snap.docs[0]?.get('messages') as Array<string>)?.map(mess => {
          firestore()
            .collection('chats')
            .doc(mess)
            .onSnapshot(data => {
              if (result.findIndex(item => item?._id === data.id) === -1) {
                result.unshift({
                  _id: data.id,
                  createdAt: data.data()?.createdAt,
                  text: data.data()?.text,
                  user: data.data()?.user,
                  type: data.data()?.type,
                });
              }
              if (
                result.length ===
                (snap.docs[0]?.get('messages') as Array<string>).length
              ) {
                setMessages([...result]);
              }
            });
        });
      });
  }, []);

  return (
    <>
      <GiftedChat
        messagesContainerStyle={{
          paddingBottom: 20,
        }}
        alwaysShowSend
        renderBubble={props => renderBubble(props)}
        renderSend={props => renderSend(props)}
        renderInputToolbar={props => customtInputToolbar(props)}
        messages={messages}
        onSend={message => onSend(message)}
        user={{
          _id: profile?.id || 0,
          avatar: profile.avatar,
          name: profile.name,
        }}
      />
      <View
        style={{
          position: 'absolute',
          backgroundColor: 'white',
          left: 0,
          right: 0,
          top: 0,
          height: 80,
          alignItems: 'center',
          flexDirection: 'row',
          paddingHorizontal: 20,
          gap: 12,
        }}>
        <TouchableOpacity
          onPress={() => {
            goBack();
          }}>
          <Icon size={30} name="chevron-back" color={COLORS.primary} />
        </TouchableOpacity>
        <Image
          style={{
            width: 50,
            height: 50,
            backgroundColor: COLORS.primary,
            borderRadius: 50,
          }}
          source={Logo}
        />
        <Text category="h6">Wedding Res</Text>
      </View>
    </>
  );
};

export default RoomChat;

const styles = StyleSheet.create({
  containerInput: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: '#f4f4f4',
    paddingVertical: 12,
  },
  input: {
    width: '80%',
    borderRadius: 16,
  },
});
