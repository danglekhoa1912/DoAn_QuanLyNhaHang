import {CASH_TYPE, ORDER_STATUS} from '../type/booking';

export const convertBookingStatus = (status: ORDER_STATUS) => {
  switch (status) {
    case ORDER_STATUS.WAIT_PAYMENT:
      return 'Unpaid';
    case ORDER_STATUS.WAIT_CONFIRM:
      return 'Waiting for Contact';
    case ORDER_STATUS.SUCCESS:
      return 'Book Success';
    case ORDER_STATUS.WAIT_CONFIRM_CANCEL:
      return 'Waiting for Cancellation Confirmation';
    case ORDER_STATUS.CANCELED:
      return 'Cancelled';
    default:
      return 'Book Success';
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
