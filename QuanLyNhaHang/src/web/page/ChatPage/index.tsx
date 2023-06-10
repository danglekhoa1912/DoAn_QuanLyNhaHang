import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
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
import ModalConfirmQuit from './components/ModalConfirmQuit';
import {resetBooking} from '../../../store/booking';
import {send} from 'process';
import {updateOrderStatus} from '../../../store/booking/thunkApi';
import {ORDER_STATUS} from '../../../type/booking';
import {clearResolveBookingId} from '../../../store/global';

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
  const [openQuit, setOpenQuit] = React.useState(false);
  const [messages, setMessages] = useState<any[]>([]);
  const [message, setMessage] = useState('');
  const currentMsg = useRef(0);

  const profile = useSelector<AppState, IUser>(state => state.user.user);
  const bookingId = useSelector<AppState, number | undefined>(
    state => state.global.resolveBookingId,
  );
  const navigate = useNavigate();
  let {userId} = useParams();

  const dispatch = useDispatch<AppDispatch>();

  const currentCustomer = useMemo(() => {
    return userList.find(user => user.user?.id === +(userId || 0));
  }, [userId, userList]);

  const handleClose = () => {
    setOpenQuit(true);
  };

  const handleCloseQuitPopup = () => {
    setOpenQuit(false);
  };

  const handleQuitAction = () => {
    dispatch(resetBooking());
    setOpen(false);
    setOpenQuit(false);
  };

  const renderMsgResolve = (isBookingResolved: boolean) => {
    if (isBookingResolved) return 'Your booking has been resolved';
    else return 'Finished the conversation';
  };

  const onSend = async (id?: number, resolve?: boolean) => {
    const newMessage = {
      _id: new Date().getTime(),
      text: !resolve
        ? id?.toString() || message
        : renderMsgResolve(!!bookingId),
      createdAt: new Date(),
      type: !resolve ? (id ? 'order' : 'text') : 'resolved',
      user: {
        avatar: profile?.avatar,
        name: profile?.name,
        _id: profile?.id,
      },
    };
    setMessage('');
    setMessages([...messages, newMessage]);
    const {_id, text, user, createdAt, type} = newMessage;

    try {
      const docRef = await addDoc(collection(db, 'chats'), {
        _id,
        user,
        createdAt: new Date(createdAt).getTime(),
        text,
        type,
      });
      const collectionRef = collection(db, 'usersChat');
      const q = query(
        collectionRef,
        where('__name__', '==', `${userId}-${profile?.id}`),
      );
      const collectionSnap = await getDocs(q);
      if (collectionSnap.empty) {
        const query1 = query(
          collectionRef,
          where('__name__', '==', `${userId}`),
        );
        setDoc(doc(db, 'usersChat', `${userId}-${profile?.id}`), {
          messages: [
            ...(await getDocs(query1)).docs[0].get('messages'),
            docRef?.id,
          ],
        });
        deleteDoc(doc(db, 'usersChat', `${userId}`));
      } else if (resolve) {
        setDoc(doc(db, 'usersChat', `${userId}`), {
          messages: [...collectionSnap.docs[0].get('messages'), docRef.id],
        });
        deleteDoc(doc(db, 'usersChat', `${userId}-${profile?.id}`));
        if (bookingId) {
          dispatch(
            updateOrderStatus({
              id: bookingId,
              status: ORDER_STATUS.SUCCESS,
            }),
          ).then(() => {
            dispatch(clearResolveBookingId());
            navigate('/chat');
          });
        }
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
    getDocs(q).then(snapshot => {
      snapshot.docs.map(data => {
        const docRef = doc(
          db,
          'chats',
          `${data.get('messages')[data.get('messages').length - 1]}`,
        );
        getDoc(docRef).then(snapshot1 => {
          if (
            (data.id.split('-').length === 2 &&
              +data.id.split('-')[1] == profile?.id) ||
            data.id.split('-').length === 1
          ) {
            if (
              +data.id.split('-')[0] &&
              snapshot1.data()?.type !== 'resolved'
            ) {
              dispatch(getUserById(+data.id.split('-')[0])).then(snap => {
                setUserList(curData =>
                  _.unionBy(
                    [
                      ...curData,
                      {
                        user: snap.payload,
                        lastMessage: snapshot1.data()?.text,
                      },
                    ].reverse(),
                    'user.id',
                  ),
                );
              });
            }
          }
        });
      });
    });
    // onSnapshot(q, snapshot => {
    //   snapshot.docs.map(data => {
    //     const docRef = doc(
    //       db,
    //       'chats',
    //       `${data.get('messages')[data.get('messages').length - 1]}`,
    //     );
    //     onSnapshot(docRef, (snapshot: any) => {
    //       if (+data.id.split('-')[0]) {
    //         dispatch(getUserById(+data.id.split('-')[0])).then(data => {
    //           setUserList(curData => [
    //             ...curData,
    //             {
    //               user: data.payload,
    //               lastMessage: snapshot.data()?.text,
    //             },
    //           ]);
    //         });
    //       }
    //     });
    //   });
    // });
  }, []);

  useEffect(() => {
    if (userId && !userList.find(data => data.user.id == userId)) {
      dispatch(getUserById(+userId)).then(data => {
        setUserList([
          ...userList,
          {
            user: data.payload,
            lastMessage: '',
          },
        ]);
      });
    }

    const collectionRef = collection(db, `usersChat`);
    let result: any[] = [];

    const q = query(collectionRef, where('__name__', '>=', userId || '0'));
    onSnapshot(q, snapshot => {
      let messDelete = 0;
      snapshot.docs.map(data => {
        data.get('messages')?.map((message: string) => {
          const docRef = doc(db, 'chats', message);
          onSnapshot(docRef, (snapshot: any) => {
            if (result.findIndex(item => item?._id === snapshot.id) === -1) {
              result = [
                ...result,
                {
                  _id: snapshot.id,
                  createdAt: snapshot.data()?.createdAt,
                  text: snapshot.data()?.text,
                  user: snapshot.data()?.user,
                  type: snapshot.data()?.type,
                },
              ];
            }
            if (
              result.length ===
              (data.get('messages') as Array<string>).length -
                messDelete +
                currentMsg.current
            ) {
              setMessages([...result]);
              currentMsg.current = result.length;
            }
            if (snapshot.data()?.type === 'resolved') {
              messDelete += result.length;
              result = [];
              setMessages([...result]);
              currentMsg.current = result.length;
            }
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
                style={{
                  borderColor: COLORS.primary,
                  borderWidth: 1,
                  backgroundColor: '#FCE4E5',
                  padding: 8,
                  borderRadius: 8,
                }}
                onPress={() => {
                  onSend(undefined, true);
                }}>
                <Text
                  style={{
                    color: COLORS.primary,
                    fontWeight: 600,
                  }}>
                  {bookingId ? 'Resolve' : 'Finished the conversation'}
                </Text>
              </TouchableOpacity>
              {!bookingId && (
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
              )}
            </View>
            <FlatList
              style={{
                flex: 8,
              }}
              data={messages}
              renderItem={({item}) => {
                return (
                  <Chat
                    type={item?.type || 'text'}
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
                  backgroundColor: 'rgb(235,235,235)',
                  height: 40,
                  width: '80%',
                  borderRadius: 18,
                  paddingLeft: 12,
                }}
              />
              <TouchableOpacity
                onPress={() => {
                  onSend();
                }}>
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
      <ModalCreateOrder onSend={onSend} open={open} handleClose={handleClose} />
      <ModalConfirmQuit
        open={openQuit}
        handleClose={handleQuitAction}
        handleCancel={handleCloseQuitPopup}
      />
    </View>
  );
};

export default ChatPage;

const styles = StyleSheet.create({});
