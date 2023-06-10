import {Image, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import moment from 'moment';
import {
  IOrderHistory,
  IOrderHistoryAdmin,
  ISession,
} from '../../../../../type/booking';
import {AppDispatch, AppState} from '../../../../../store';
import {getOrderHistoryById} from '../../../../../store/user/thunkApi';
import Modal from '../../../../components/Modal';
import {Divider} from '@mui/material';
import {ITypeParty} from '../../../../../type/lobby';
import {Button} from '../../../../components';
import {updateOrderStatus} from '../../../../../store/booking/thunkApi';

interface IItem {
  name: string;
  image: string;
  price: number;
  id: number;
}

const renderItem = ({image, name, price, id}: IItem) => {
  return (
    <View style={styles.containerItem} key={id}>
      <View style={styles.containerLeft}>
        <Image style={styles.imageItem} source={{uri: image}} />
        <Text>{name}</Text>
      </View>
      <Text>{price} VND</Text>
    </View>
  );
};

interface IModalEdit {
  handleClose: () => void;
  open: boolean;
  data?: IOrderHistoryAdmin;
  onReLoadData: () => void;
}

const ModalEdit = ({handleClose, open, data, onReLoadData}: IModalEdit) => {
  const pTypeParty = useSelector<AppState, ITypeParty[]>(
    state => state.booking.typeParty,
  );
  const pTypeSession = useSelector<AppState, ISession[]>(
    state => state.booking.typeTime,
  );
  const dispatch = useDispatch<AppDispatch>();

  const renderStatusPay = (isPay: boolean) => {
    if (isPay) {
      return <Text style={{color: '#6BA80C'}}>Paid</Text>;
    }
    return (
      <Text
        style={{
          color: '#F74340',
        }}>
        Unpaid
      </Text>
    );
  };

  const handleUpdateStatus = () => {
    // if (data) {
    //   dispatch(
    //     updateOrderStatus({
    //       id: data?.id,
    //       status: !data?.paymentstt,
    //     }),
    //   ).then(() => {
    //     handleClose();
    //     onReLoadData();
    //   });
    // }
  };

  return (
    <Modal
      minWidth={'60%'}
      isShowFooter={false}
      cancelButton={{
        onClick: handleClose,
      }}
      open={open}
      header={{title: `Order Id: ${data?.id}`}}>
      <View style={styles.content}>
        <View>
          <Text>Customer: {data?.userId?.name}</Text>
          <Text>
            Order date: {moment(data?.orderDate).format('DD/MM/YYYY')} -{' '}
            {/* {pTypeSession.find(session => session.id === data?.time)?.session} */}
          </Text>
          <Text>Type Party: {data?.typeParty.nameParty}</Text>
          {/* <Text>Status Payment: {renderStatusPay(!!data?.paymentstt)}</Text> */}
        </View>
        {/* <View>
        <Text>Lobby information</Text>
        <View>
          <Text>Name: {bookingDetail?.hall}</Text>
          <Text>Quantity: {bookingDetail?.countTable}</Text>
        </View>
      </View> */}
        <Divider />

        <View>
          <Text style={styles.title}>List of dishes</Text>
          <View style={styles.containerList}>
            {data?.menuId.menuDishSet.map(dish =>
              renderItem({
                image: dish.dishId.image,
                name: dish.dishId.name,
                price: dish.dishId.price,
                id: dish.dishId.id,
              }),
            )}
          </View>
        </View>
        <Divider />
        <View>
          <Text style={styles.title}>List of service</Text>
          <View style={styles.containerList}>
            {data?.listServiceId.servicesDetailSet.map(
              service =>
                service.serviceId &&
                renderItem({
                  image: service.serviceId?.image,
                  name: service.serviceId?.name,
                  price: service.serviceId?.price,
                  id: service.serviceId?.id,
                }),
            )}
          </View>
        </View>
        <Divider />
        <View style={styles.containerItem}>
          <View>
            <Text style={styles.title}>Payment</Text>
            <Text>{data?.typePay}</Text>
          </View>
          <View>
            <Text style={styles.title}>Total</Text>
            <Text>{data?.amount} VND</Text>
          </View>
        </View>
        <Divider />
        <Button
          style={{
            width: '100%',
          }}
          title="Update status payment"
          onPress={handleUpdateStatus}
        />
      </View>
    </Modal>
  );
};

export default ModalEdit;

const styles = StyleSheet.create({
  content: {
    paddingVertical: 12,
  },
  title: {
    fontWeight: '500',
    fontSize: 18,
    marginVertical: 4,
  },
  containerList: {
    gap: 12,
  },
  containerItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  containerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  imageItem: {
    width: 50,
    height: 50,
    borderRadius: 8,
  },
});
