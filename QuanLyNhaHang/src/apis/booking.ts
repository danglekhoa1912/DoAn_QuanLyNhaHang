import axios from 'axios';
import AxiosClient from '.';
import {IBookingReq, IUpdateBookingStatus} from '../type/booking';
import CryptoJS from 'crypto-js';
import moment from 'moment';
import {Platform} from 'react-native';
import {APP_ID_ZALO} from '../utils/constant';

const isAdmin =
  Platform.OS === 'web' && localStorage.getItem('role') === 'ROLE_ADMIN';

export const addOrderService = (order: IBookingReq) => {
  return AxiosClient.post('order/add', order);
};

export const requestCancelBooking = (id: number) => {
  return AxiosClient.post('order/order/request-cancel', id);
};

export const updateOrder = ({id, order}: {id: number; order: IBookingReq}) => {
  return AxiosClient.post(`order/edit/?id=${id}`, order);
};

export const updateOrderStatus = (data: IUpdateBookingStatus) => {
  return AxiosClient.post(
    `${isAdmin ? 'admin' : 'staff'}/order/updatestt`,
    data,
  );
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

  let appuser = 'ZaloPayDemo';
  let apptime = new Date().getTime();
  let embeddata = '{}';
  let item = '[]';
  let description = 'Merchant description for order #' + apptransid;
  let hmacInput =
    APP_ID_ZALO +
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
    app_id: APP_ID_ZALO,
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

export const checkRefundStatus = (mrefundid: string) => {
  let timestamp = new Date().getTime();
  const mac = CryptoJS.HmacSHA256(
    APP_ID_ZALO + '|' + mrefundid + '|' + timestamp,
    'PcY4iZIKFCIdgZvA6ueMcMHHUbRLYjPL',
  ).toString();
  var data = {
    appid: APP_ID_ZALO,
    mrefundid: mrefundid,
    timestamp: timestamp,
    mac: mac,
  };

  let formBody = [];
  let key: keyof typeof data;
  for (key in data) {
    var encodedKey = encodeURIComponent(key);
    var encodedValue = encodeURIComponent(data[key]);
    formBody.push(encodedKey + '=' + encodedValue);
  }
  const request = formBody.join('&');

  return axios.post(
    'https://sandbox.zalopay.com.vn/v001/tpe/getpartialrefundstatus',
    request,
    {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
      },
    },
  );
};

export const refundZalo = (
  amount: number,
  apptransid: string,
  mrefundid: string,
  timestamp: number,
) => {
  let description = 'Cancel order #' + apptransid;
  let hmacInput =
    APP_ID_ZALO +
    '|' +
    apptransid +
    '|' +
    amount +
    '|' +
    description +
    '|' +
    timestamp;
  let mac = CryptoJS.HmacSHA256(hmacInput, 'PcY4iZIKFCIdgZvA6ueMcMHHUbRLYjPL');
  var data = {
    appid: APP_ID_ZALO,
    mrefundid: mrefundid,
    timestamp: timestamp,
    amount: amount,
    zptransid: apptransid,
    description: description,
    mac: mac,
  };

  let formBody = [];
  let key: keyof typeof data;
  for (key in data) {
    var encodedKey = encodeURIComponent(key);
    var encodedValue = encodeURIComponent(data[key]);
    formBody.push(encodedKey + '=' + encodedValue);
  }
  const request = formBody.join('&');

  return axios.post(
    'https://sandbox.zalopay.com.vn/v001/tpe/partialrefund',
    request,
    {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
      },
    },
  );
};

// export const checkTimeBookingService = (timeBooking) => {
//   const { date, time, lobbyId } = timeBooking;
//   return AxiosClient.put('order/checktime', {
//     hall: lobbyId,
//     date: new Date(date),
//     time,
//   });
// };
