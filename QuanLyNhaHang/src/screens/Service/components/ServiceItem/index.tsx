import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {Button, Card} from '../../../../components';
import {StyleService, useStyleSheet, useTheme} from '@ui-kitten/components';
import {ImageBackground} from 'react-native';
import {useTranslation} from 'react-i18next';
import {IService} from '../../../../type/service';
import {AppDispatch, AppState} from '../../../../store';
import {
  addServiceToBooking,
  removeServiceToBooking,
} from '../../../../store/booking';
import {connect} from 'react-redux';

interface IServiceItem {
  service: IService;
  pServiceListInMenu: IService[];
  pRemoveServiceToBooking: (service: IService) => void;
  pAddServiceToBooking: (service: IService) => void;
  disable?: boolean;
}

const ServiceItem = ({
  pAddServiceToBooking,
  pRemoveServiceToBooking,
  pServiceListInMenu,
  service,
  disable = false,
}: IServiceItem) => {
  const styles = useStyleSheet(themedStyles);
  const theme = useTheme();
  const {t} = useTranslation();
  const [selected, setSelected] = useState(
    pServiceListInMenu.some(item => item.id == service.id),
  );

  const onPressService = () => {
    if (selected) {
      pRemoveServiceToBooking(service);
    } else {
      pAddServiceToBooking(service);
    }
    setSelected(!selected);
  };

  return (
    <Card
      style={[
        styles.container,
        selected && {
          borderWidth: 3,
          borderColor: theme['color-primary-default'],
        },
      ]}>
      <View>
        <ImageBackground
          borderTopLeftRadius={6}
          borderTopRightRadius={6}
          style={styles.image}
          source={{uri: service.image}}>
          <View style={styles.container_infor}>
            <Text style={styles.text_content}>{service.name}</Text>
            <Text style={styles.text_content}>{service.price}VND</Text>
          </View>
        </ImageBackground>
        <View style={styles.container_content}>
          <Text numberOfLines={2} style={styles.text}>
            {service.serviceDescribe}
          </Text>
        </View>
        {!disable && (
          <Button
            backgroundColor={theme['color-primary-default']}
            variant="outlined"
            style={styles.button}
            onPress={onPressService}
            title={selected ? t('common.unselect') : t('common.select')}
          />
        )}
      </View>
    </Card>
  );
};

const mapStateToProps = (state: AppState) => ({
  pServiceListInMenu: state.booking.order.service.serviceList,
});

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  pRemoveServiceToBooking: (service: IService) =>
    dispatch(removeServiceToBooking(service)),
  pAddServiceToBooking: (service: IService) =>
    dispatch(addServiceToBooking(service)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ServiceItem);

const themedStyles = StyleService.create({
  container: {
    width: '100%',
    height: 320,
  },
  image: {
    height: 150,
  },
  container_infor: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'absolute',
    bottom: 12,
    left: 12,
    right: 12,
  },
  text_content: {
    fontSize: 20,
    color: 'color-background',
    fontWeight: 'bold',
  },
  container_content: {
    paddingVertical: 20,
    paddingHorizontal: 12,
  },
  text: {
    fontSize: 20,
  },
  button: {marginHorizontal: 20, padding: 12, alignItems: 'center'},
});
