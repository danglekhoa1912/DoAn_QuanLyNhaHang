import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {Text, useTheme} from '@ui-kitten/components';
import {UKFlag, VietNamFlag} from '../../assets';
import {useTranslation} from 'react-i18next';
import Icon from 'react-native-vector-icons/Entypo';
import {saveStorage} from '../../utils/storage';
import toast from '../../utils/toast';

const SettingLanguage = () => {
  const theme = useTheme();
  const {t, i18n} = useTranslation();

  const handleChangeLang = (lang: string) => {
    i18n.changeLanguage(lang);
    saveStorage('lang', lang);
    toast.success(t('toast.change_language'));
  };

  const LanguageList = [
    {
      id: 1,
      image: UKFlag,
      value: 'en',
    },
    {
      id: 2,
      image: VietNamFlag,
      value: 'vi',
    },
  ];

  return (
    <View style={{flex: 1}}>
      {LanguageList.map(language => (
        <TouchableOpacity
          onPress={() => {
            handleChangeLang(language.value);
          }}
          style={styles.root}
          key={language.id}>
          <View style={styles.container}>
            <Image source={language.image} style={styles.icon} />
            <Text style={styles.text}>{t(`lang.${language.value}`) || ''}</Text>
          </View>
          {i18n.language === language.value && (
            <Icon
              size={30}
              name="check"
              color={theme['color-primary-default']}
            />
          )}
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default SettingLanguage;

const styles = StyleSheet.create({
  root: {
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  icon: {
    width: 50,
    height: 50,
  },
  text: {
    fontSize: 18,
    paddingLeft: 12,
  },
});
