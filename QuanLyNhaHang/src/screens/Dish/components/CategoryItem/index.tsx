import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {useTheme} from '@ui-kitten/components';

interface ICategoryItem {
  onPress: () => void;
  title: string;
  selected: boolean;
}

const CategoryItem = ({onPress, title, selected}: ICategoryItem) => {
  const theme = useTheme();

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.category,
        {
          backgroundColor: selected
            ? theme['color-primary-default']
            : theme['color-gray'],
        },
      ]}>
      <Text style={styles.category_text}>{title}</Text>
    </TouchableOpacity>
  );
};

export default CategoryItem;

const styles = StyleSheet.create({
  category: {
    padding: 12,
    borderRadius: 12,
    marginHorizontal: 8,
  },
  category_text: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
