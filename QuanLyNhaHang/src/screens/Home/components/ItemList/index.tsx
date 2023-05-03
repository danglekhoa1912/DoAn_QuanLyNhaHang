import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {StyleService, useStyleSheet, useTheme} from '@ui-kitten/components';
import Icon from 'react-native-vector-icons/AntDesign';

import {Card} from '../../../../components';
import {StyleProp} from 'react-native';
import {ImageStyle} from 'react-native';
import {useTranslation} from 'react-i18next';
import {navigate} from '../../../../utils/navigate';

interface IItemList {
  list: {
    id: number;
    name: string;
    price: number;
    image: string;
  }[];
  label: string;
  navigateTo: string;
  navigateToDetail?: string;
}

const ItemList = ({list, label, navigateTo, navigateToDetail}: IItemList) => {
  const styles = useStyleSheet(themedStyles);
  const theme = useTheme();
  const {t} = useTranslation();

  return (
    <View>
      <View style={styles.container_title}>
        <Text style={styles.title}>{label}</Text>
        <TouchableOpacity onPress={() => navigate(navigateTo)}>
          <Text style={{color: theme['color-primary-default']}}>
            {t('common.see_all')}
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        contentContainerStyle={styles.container_lobby}
        horizontal
        showsHorizontalScrollIndicator={false}>
        {list.map((data, index) => {
          if (index < 4) {
            return (
              <Card key={data.id} style={styles.container_card}>
                <TouchableOpacity
                  onPress={() => {
                    navigate(navigateToDetail, {
                      id: data.id,
                    });
                  }}>
                  <Image
                    style={styles.img as StyleProp<ImageStyle>}
                    source={{uri: data.image}}
                  />
                  <View style={styles.container_content}>
                    <Text style={styles.name}>{data.name}</Text>
                    <Text style={styles.price}>{data.price} VND</Text>
                  </View>
                </TouchableOpacity>
              </Card>
            );
          }
        })}
        {!!list.length && (
          <TouchableOpacity
            onPress={() => navigate(navigateTo)}
            style={styles.container_icon}>
            <Icon name="arrowright" size={24} color="white" />
          </TouchableOpacity>
        )}
      </ScrollView>
    </View>
  );
};

export default ItemList;

const themedStyles = StyleService.create({
  container_title: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
  },
  container_lobby: {
    paddingBottom: 12,
    paddingRight: 12,
  },
  container_card: {
    marginHorizontal: 20,
  },
  img: {
    width: 160,
    height: 120,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  container_content: {
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  container_icon: {
    backgroundColor: 'color-primary-default',
    alignSelf: 'center',
    padding: 20,
    borderRadius: 50,
  },
  name: {
    fontSize: 16,
  },
  price: {
    fontSize: 12,
  },
});
