import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {IUser} from '../../../../../type/user';
import {AppState} from '../../../../../store';
import {useSelector} from 'react-redux';

interface IUserList {
  user: IUser;
  lastMessage: string;
  isSelect: boolean;
  onSelect: () => void;
}

const User = ({user, lastMessage, isSelect, onSelect}: IUserList) => {
  const profile = useSelector<AppState, IUser>(state => state.user.user);
  return (
    <TouchableOpacity
      onPress={onSelect}
      style={[
        {
          flexDirection: 'row',
          padding: 12,
        },
        isSelect && {backgroundColor: '#FDC5B5'},
      ]}>
      <Image
        style={{
          width: 50,
          height: 50,
          borderRadius: 50,
          marginRight: 12,
        }}
        source={{uri: user?.avatar}}
      />
      <View>
        <Text
          style={{
            fontWeight: 'bold',
            fontSize: 18,
          }}>
          {user?.name}
        </Text>
        <Text>{(user?.id === profile?.id ? 'me: ' : '') + lastMessage}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default User;

const styles = StyleSheet.create({});
