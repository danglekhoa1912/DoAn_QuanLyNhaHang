import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Menu } from 'react-native-paper';
import { goBack } from '../../../../../naviagtion/service';
import Colors from '../../../../../constants/Colors';

const Header = (props) => {
  const { title } = props;

  const [visible, setVisible] = useState(false);

  const openMenu = () => setVisible(true);

  const closeMenu = () => setVisible(false);

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => goBack()}>
        <MaterialIcons
          name='keyboard-arrow-left'
          size={40}
          color={Colors.Primary}
        />
      </TouchableOpacity>
      <Text style={styles.title}>{title}</Text>
      <Menu
        visible={visible}
        onDismiss={closeMenu}
        anchor={
          <TouchableOpacity onPress={openMenu}>
            <MaterialIcons
              name='filter-list-alt'
              size={24}
              color={Colors.Primary}
            />
          </TouchableOpacity>
        }
      >
        <Menu.Item onPress={() => {}} title='Mặc định' />
        <Menu.Item onPress={() => {}} title='Giá cao tới thấp' />
        <Menu.Item onPress={() => {}} title='Giá thấp tới cao' />
        <Menu.Item onPress={() => {}} title='Sức chứa cao tới thấp' />
        <Menu.Item onPress={() => {}} title='Sức chứa thấp tới cao' />
      </Menu>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 'bold',
    paddingVertical: 20,
  },
});
