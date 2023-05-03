import axios from 'axios';
import AxiosClient from '.';
import {IBookingReq, IUpdateBookingStatus} from '../type/booking';
import CryptoJS from 'crypto-js';
import moment from 'moment';

export const addOrderService = (order: IBookingReq) => {
  return AxiosClient.post('order/add', order);
};

export const updateOrderStatus = (data: IUpdateBookingStatus) => {
  return AxiosClient.post('admin/order/updatestt', data);
};

export const getOrderById = (id: number) => {
  return AxiosClient.get('order', {
    params: {
      id,
    },
  });
};

export const getTypeTime = () => {
  return AxiosClient.get('order/typetime');
};

export const getTypeParty = () => {
  return AxiosClient.get('order/type-party');
};

export const paymentZalo = (total: number) => {
  let apptransid =
    new Date().toISOString().slice(2, 10).split('-').join('') +
    '_' +
    new Date().getTime();

  let appid = 2553;
  let appuser = 'ZaloPayDemo';
  let apptime = new Date().getTime();
  let embeddata = '{}';
  let item = '[]';
  let description = 'Merchant description for order #' + apptransid;
  let hmacInput =
    appid +
    '|' +
    apptransid +
    '|' +
    appuser +
    '|' +
    total +
    '|' +
    apptime +
    '|' +
    embeddata +
    '|' +
    item;
  let mac = CryptoJS.HmacSHA256(hmacInput, 'PcY4iZIKFCIdgZvA6ueMcMHHUbRLYjPL');
  var order = {
    app_id: appid,
    app_user: appuser,
    app_time: apptime,
    amount: total,
    app_trans_id: apptransid,
    embed_data: embeddata,
    item: item,
    description: description,
    mac: mac,
    bank_code: 'zalopayapp',
  };

  let formBody = [];
  let key: keyof typeof order;
  for (key in order) {
    var encodedKey = encodeURIComponent(key);
    var encodedValue = encodeURIComponent(order[key]);
    formBody.push(encodedKey + '=' + encodedValue);
  }
  const data = formBody.join('&');

  return axios.post('https://sb-openapi.zalopay.vn/v2/create', order, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
    },
  });
};

// export const checkTimeBookingService = (timeBooking) => {
//   const { date, time, lobbyId } = timeBooking;
//   return AxiosClient.put('order/checktime', {
//     hall: lobbyId,
//     date: new Date(date),
//     time,
//   });
// };
