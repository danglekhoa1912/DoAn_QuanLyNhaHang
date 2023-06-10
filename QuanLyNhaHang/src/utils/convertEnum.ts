import {CASH_TYPE, ORDER_STATUS} from '../type/booking';

export const convertBookingStatus = (status: ORDER_STATUS) => {
  switch (status) {
    case ORDER_STATUS.WAIT_PAYMENT:
      return 'Chưa Thanh Toán';
    case ORDER_STATUS.WAIT_CONFIRM:
      return 'Chờ Liên Hệ';
    case ORDER_STATUS.SUCCESS:
      return 'Đặt Thành Công';
    default:
      return 'Đặt Thành Công';
  }
};

export const convertPaymentType = (status: CASH_TYPE) => {
  switch (status) {
    case CASH_TYPE.ZALO:
      return 'Zalo Pay';
    case CASH_TYPE.MOMO:
      return 'Momo';
    case CASH_TYPE.CASH:
      return 'Cash';
    default:
      return 'Cash';
  }
};
