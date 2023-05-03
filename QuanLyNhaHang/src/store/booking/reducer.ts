import {IDish} from './../../type/dish';
import {PayloadAction} from '@reduxjs/toolkit';
import {IBookingStore} from '.';
import {IFormBooking} from '../../type/booking';
import {IService} from '../../type/service';

export const reducer = {
  updateInfoBooking: (state: IBookingStore, action: PayloadAction<any>) => {
    state.order = {
      ...state.order,
      ...action.payload,
    };
  },
  addDishToMenu: (state: IBookingStore, action: PayloadAction<IDish>) => {
    state.order.menu.dishList.push(action.payload);
    state.order.menu.total += action.payload.price;
  },
  removeDishToMenu: (state: IBookingStore, action: PayloadAction<IDish>) => {
    state.order.menu.dishList = state.order.menu.dishList.filter(
      item => item.id != action.payload.id,
    );
    state.order.menu.total -= action.payload.price;
  },
  addServiceToBooking: (state: IBookingStore, action: PayloadAction<any>) => {
    state.order.service.serviceList.push(action.payload);
    state.order.service.total += action.payload.price;
  },
  removeServiceToBooking: (
    state: IBookingStore,
    action: PayloadAction<IService>,
  ) => {
    state.order.service.serviceList = state.order.service.serviceList.filter(
      item => item.id != action.payload.id,
    );
    state.order.service.total -= action.payload.price;
  },
  updateTypePay: (state: IBookingStore, action: PayloadAction<any>) => {
    state.order.type_pay = action.payload;
  },
};
