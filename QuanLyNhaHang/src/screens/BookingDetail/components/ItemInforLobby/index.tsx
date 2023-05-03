import {StyleSheet, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import React from 'react';
import {useTheme} from '@ui-kitten/components';

interface IItemInforLooby {
  iconName: string;
  title: string;
  children: React.ReactNode;
}

const ItemInforLooby = ({children, iconName, title}: IItemInforLooby) => {
  const theme = useTheme();
  return (
    <View style={styles.infor_lobby}>
      <Icon
        name={iconName}
        size={24}
        color={theme['color-secondary']}
        style={styles.icon}
      />
      <View>
        <Text style={[styles.text, {color: theme['color-secondary']}]}>
          {title}
        </Text>
        <Text style={styles.text}>{children}</Text>
      </View>
    </View>
  );
};

export default ItemInforLooby;

const styles = StyleSheet.create({
  infor_lobby: {
    flexDirection: 'row',
    paddingVertical: 8,
  },
  icon: {
    marginRight: 12,
  },
  text: {
    fontSize: 18,
  },
});
