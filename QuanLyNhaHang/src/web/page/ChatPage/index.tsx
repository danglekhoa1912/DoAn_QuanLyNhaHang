import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {GiftedChat} from 'react-gifted-chat';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, AppState} from '../../../store';
import {IUser} from '../../../type/user';
import {
  collection,
  query,
  onSnapshot,
  orderBy,
  doc,
  addDoc,
  where,
  setDoc,
  deleteDoc,
  getDoc,
  getDocs,
} from 'firebase/firestore';
import {db} from '../../firebase';
import {Send as SendIcon} from '@mui/icons-material';
import {Chat, ModalCreateOrder, User} from './components';
import {useNavigate, useParams} from 'react-router-dom';
import {getUserById} from '../../../store/profile/thunkApi';
import _ from 'lodash';
import AddIcon from '@mui/icons-material/Add';
import {COLORS} from '../../../utils/color';

interface IMessage {
  _id: number;
  text: string;
  createAt: any;
  user: any;
}

const ChatPage = () => {
  const [userList, setUserList] = useState<
    {
      user: IUser;
      lastMessage: string;
    }[]
  >([]);
  const [open, setOpen] = React.useState(false);
  const [messages, setMessages] = useState<any[]>([]);
  const [message, setMessage] = useState('');

  const profile = useSelector<AppState, IUser>(state => state.user.user);
  const navigate = useNavigate();
  let {userId} = useParams();

  const dispatch = useDispatch<AppDispatch>();

  const currentCustomer = useMemo(() => {
    return userList.find(user => user.user?.id === +(userId || 0));
  }, [userId, userList]);

  const handleClose = () => setOpen(false);

  const onSend = async () => {
    const newMessage = {
      _id: new Date().getTime(),
      text: message,
      createdAt: new Date(),
      user: {
        avatar: profile?.avatar,
        name: profile?.name,
        _id: profile?.id,
      },
    };
    setMessage('');
    setMessages([...messages, newMessage]);
    const {_id, text, user, createdAt} = newMessage;

    try {
      const docRef = await addDoc(collection(db, 'chats'), {
        _id,
        user,
        createdAt: new Date(createdAt).getTime(),
        text,
      });
      const collectionRef = collection(db, 'usersChat');
      const q = query(
        collectionRef,
        where('__name__', '==', `${userId}-${profile?.id}`),
      );
      const collectionSnap = await getDocs(q);
      if (collectionSnap.empty) {
        setDoc(doc(db, 'usersChat', `${userId}-${profile?.id}`), {
          messages: [docRef?.id],
        });
        deleteDoc(doc(db, 'usersChat', `${userId}`));
      } else {
        setDoc(doc(db, 'usersChat', `${userId}-${profile?.id}`), {
          messages: [...collectionSnap.docs[0].get('messages'), docRef.id],
        });
      }
    } catch (e) {
      console.error('Error adding document: ', e);
    }
  };

  const onSelectUser = (userId: number) => {
    navigate(`/chat/${userId}`);
  };

  useEffect(() => {
    const collectionRef = collection(db, 'usersChat');
    const q = query(collectionRef);
    onSnapshot(q, snapshot => {
      snapshot.docs.map(data => {
        const docRef = doc(
          db,
          'chats',
          `${data.get('messages')[data.get('messages').length - 1]}`,
        );
        onSnapshot(docRef, (snapshot: any) => {
          if (+data.id.split('-')[0]) {
            dispatch(getUserById(+data.id.split('-')[0])).then(data => {
              setUserList([
                ...userList,
                {
                  user: data.payload,
                  lastMessage: snapshot.data()?.text,
                },
              ]);
            });
          }
        });
      });
    });
  }, []);

  useEffect(() => {
    const collectionRef = collection(db, `usersChat`);

    const q = query(collectionRef);
    onSnapshot(q, snapshot => {
      setMessages([]);
      snapshot.docs.map(data => {
        data.get('messages')?.map((message: string) => {
          const docRef = doc(db, 'chats', message);
          onSnapshot(docRef, (snapshot: any) => {
            setMessages(mess =>
              _.uniqBy(
                [
                  ...mess,
                  {
                    _id: message,
                    createdAt: snapshot.data()?.createdAt,
                    text: snapshot.data()?.text,
                    user: snapshot.data()?.user,
                  },
                ],
                '_id',
              ),
            );
          });
        });
      });
    });
  }, [userId]);

  return (
    <View
      style={{
        height: '100%',
        display: 'flex',
        flexDirection: 'row',
      }}>
      <View style={{flex: 1, borderRightColor: '#bfbfbf', borderRightWidth: 1}}>
        <FlatList
          data={userList}
          renderItem={({item}) => (
            <User
              isSelect={+(userId || 0) === item?.user?.id}
              onSelect={() => {
                onSelectUser(item.user?.id || 0);
              }}
              user={item.user}
              lastMessage={item.lastMessage}
              key={item.user?.id}
            />
          )}
        />
      </View>
      <View
        style={{
          flex: 3,
          backgroundColor: 'white',
          display: 'flex',
        }}>
        {!!userId && (
          <>
            <View
              style={{
                width: '100%',
                height: 74,
                alignItems: 'center',
                flexDirection: 'row',
                justifyContent: 'space-between',
                padding: 20,
                borderBottomColor: '#bfbfbf',
                borderBottomWidth: 1,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <Image
                  source={{
                    uri: currentCustomer?.user.avatar || '',
                  }}
                  style={{
                    width: 50,
                    height: 50,
                    borderRadius: 25,
                    marginRight: 20,
                  }}
                />
                <Text
                  style={{
                    fontWeight: 'bold',
                  }}>
                  {currentCustomer?.user.name}
                </Text>
              </View>
              <TouchableOpacity
                onPress={() => {
                  setOpen(true);
                }}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  backgroundColor: COLORS.primary,
                  padding: 12,
                  borderRadius: 8,
                }}>
                <AddIcon
                  style={{
                    color: 'white',
                  }}
                />
                <Text
                  style={{
                    color: 'white',
                    fontSize: 18,
                    marginLeft: 8,
                  }}>
                  Create Order
                </Text>
              </TouchableOpacity>
            </View>
            <FlatList
              style={{
                flex: 8,
              }}
              data={messages}
              renderItem={({item}) => {
                return (
                  <Chat
                    avatar={item.user.avatar}
                    message={item.text}
                    isSender={profile?.id === item?.user?._id}
                    key={item?._id}
                  />
                );
              }}
            />
            <View
              style={{
                width: '100%',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-evenly',
                flex: 1,
              }}>
              <TextInput
                value={message}
                onChangeText={setMessage}
                placeholder="Type here..."
                style={{
                  backgroundColor: '#f5f7fb',
                  height: 40,
                  width: '80%',
                  borderRadius: 18,
                  paddingLeft: 12,
                }}
              />
              <TouchableOpacity onPress={onSend}>
                <SendIcon
                  color="primary"
                  style={{
                    width: 30,
                    height: 30,
                  }}
                />
              </TouchableOpacity>
            </View>
          </>
        )}
      </View>
      <ModalCreateOrder open={open} handleClose={handleClose} />
    </View>
  );
};

export default ChatPage;

const styles = StyleSheet.create({});
