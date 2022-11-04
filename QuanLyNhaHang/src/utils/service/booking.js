import { instance } from './instance';

export const addOrderService = (order) => {
  return instance.post('order/add', order);
};

export const checkTimeBookingService = (timeBooking) => {
  const { date, time, lobbyId } = timeBooking;
  return instance.put('order/checktime', {
    hall: lobbyId,
    date: new Date(date),
    time,
  });
};
