import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';

import { Card } from '../../../../../components';
import Colors from '../../../../../constants/Colors';
import {
  GestureHandlerRootView,
  Swipeable,
} from 'react-native-gesture-handler';
import { navigate } from '../../../../../naviagtion/service';
import { adminName } from '../../../../../configs/NavigationContants';
import { useDispatch } from 'react-redux';
import { deleteStaff } from '../../../../../redux/slice/UserSlice';

const Option = (props) => {
  const { title, color, onPress, ...ortherProps } = props;
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.option, { backgroundColor: color, ...ortherProps.style }]}
    >
      <Text style={{ color: '#ffff' }}>{title}</Text>
    </TouchableOpacity>
  );
};

const RenderRightAction = (props) => {
  const { onPressEdit, onPressDelete } = props;

  return (
    <View style={styles.container_option}>
      <Option onPress={onPressEdit} title='Chỉnh sửa' color={Colors.Cyan} />
      <Option
        onPress={onPressDelete}
        style={{ borderTopRightRadius: 8, borderBottomRightRadius: 8 }}
        title='Xóa'
        color={Colors.Primary}
      />
    </View>
  );
};

const UserItem = (props) => {
  const { user } = props;
  const dispatch = useDispatch();
  const onPressEdit = () => {
    navigate(adminName.editUserStack, { user });
  };

  const onPressDelete = () => {
    dispatch(deleteStaff(user.id));
  };

  return (
    <GestureHandlerRootView style={{ marginVertical: 10 }}>
      <Swipeable
        renderRightActions={() => (
          <RenderRightAction
            onPressEdit={onPressEdit}
            onPressDelete={onPressDelete}
          />
        )}
      >
        <Card style={{ width: '100%' }}>
          <TouchableOpacity onPress={onPressEdit} style={styles.container}>
            <View style={styles.container_infor}>
              <Image style={styles.avatar} source={{ uri: user.avatar }} />
              <Text style={styles.text}>{user.name}</Text>
            </View>
            <Text style={styles.text}>{user.role}</Text>
          </TouchableOpacity>
        </Card>
      </Swipeable>
    </GestureHandlerRootView>
  );
};

export default UserItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 12,
  },
  container_infor: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 50,
    marginRight: 10,
  },
  text: {
    fontSize: 16,
  },
  option: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 80,
  },
  container_option: {
    flexDirection: 'row',
  },
});
