import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {
  IndexPath,
  Input,
  MenuItem,
  OverflowMenu,
  StyleService,
  useStyleSheet,
  useTheme,
} from '@ui-kitten/components';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useTranslation} from 'react-i18next';
import {goBack} from '../../utils/navigate';

interface IHeader {
  title: string;
  search?: string;
  placeholderSearch?: string;
  setSearch?: React.Dispatch<React.SetStateAction<string>>;
  filter?: boolean;
  onGoBack?: () => void;
}

const Header = ({
  title,
  search,
  placeholderSearch,
  filter = true,
  setSearch,
  onGoBack,
}: IHeader) => {
  const styles = useStyleSheet(themedStyles);
  const theme = useTheme();

  const [selectedIndex, setSelectedIndex] = useState<IndexPath>();
  const [visible, setVisible] = useState(false);

  const onItemSelect = (index: IndexPath) => {
    setSelectedIndex(index);
    setVisible(false);
  };

  const renderToggleButton = () => (
    <TouchableOpacity onPress={() => setVisible(true)}>
      <Icon
        name="filter-list-alt"
        color={theme['color-primary-default']}
        size={30}
      />
    </TouchableOpacity>
  );

  return (
    <>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => {
            goBack();
            onGoBack?.();
          }}>
          <Icon
            name="arrow-back-ios"
            color={theme['color-primary-default']}
            size={30}
          />
        </TouchableOpacity>
        <Text
          style={[
            styles.headerTitle,
            !filter && {flex: 1, textAlign: 'center'},
          ]}>
          {title}
        </Text>
        {filter && (
          <OverflowMenu
            anchor={renderToggleButton}
            visible={visible}
            selectedIndex={selectedIndex}
            onSelect={onItemSelect}
            onBackdropPress={() => setVisible(false)}>
            <MenuItem title="Users" />
            <MenuItem title="Orders" />
            <MenuItem title="Transactions" />
          </OverflowMenu>
        )}
      </View>
      {filter && (
        <Input
          style={styles.inputSearch}
          textStyle={{
            paddingVertical: 6,
            fontSize: 16,
          }}
          accessoryLeft={() => (
            <Icon
              color={theme['color-primary-default']}
              size={28}
              name="search"
            />
          )}
          placeholder={placeholderSearch}
          value={search}
          onChangeText={nextValue => setSearch?.(nextValue)}
        />
      )}
    </>
  );
};

export default Header;

const themedStyles = StyleService.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {
    fontWeight: 'bold',
    fontSize: 30,
  },
  inputSearch: {
    borderRadius: 16,
    backgroundColor: 'white',
    borderColor: 'black',
    marginVertical: 12,
  },
});
