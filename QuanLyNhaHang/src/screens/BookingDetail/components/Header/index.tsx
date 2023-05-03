import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {MaterialIcons} from '@expo/vector-icons';
import {goBack} from '../../../../utils/navigate';
import {useTheme} from '@ui-kitten/components';
import {useTranslation} from 'react-i18next';

const Header = () => {
  const {t} = useTranslation();
  const theme = useTheme();
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => goBack()}>
        <MaterialIcons
          name="keyboard-arrow-left"
          size={40}
          color={theme['color-primary-default']}
        />
      </TouchableOpacity>
      <Text style={styles.title}>{t('screen.booking_detail.title')}</Text>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingVertical: 12,
    flexDirection: 'row',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});
