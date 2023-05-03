import {ILobby, ITypeParty} from './../../type/lobby';
import {createSlice} from '@reduxjs/toolkit';
import {CASH_TYPE, ISession} from '../../type/booking';
import {IDish} from '../../type/dish';
import {IService} from '../../type/service';
import {reducer} from './reducer';
import {ISelectItem} from '../../type/common';
import {extraReducers} from './thunkApi';

export interface IBookingStore {
  order: {
    menu: {
      dishList: IDish[];
      total: number;
    };
    service: {
      serviceList: IService[];
      total: number;
    };
    date: Date;
    lobby: ILobby;
    time: ISelectItem;
    type_party: ISelectItem;
    quantityTable: number;
    type_pay: CASH_TYPE;
    lobbyPriceByTime: number;
    note: string;
  };
  typeTime: ISession[];
  typeParty: ITypeParty[];
}

const initialState = {
  order: {
    menu: {
      dishList: [],
      total: 0,
    },
    service: {
      serviceList: [],
      total: 0,
    },
    date: new Date(),
    time: {
      id: 0,
      label: '',
      value: 0,
    },
    quantityTable: 0,
    type_pay: CASH_TYPE.CASH,
    lobbyPriceByTime: 0,
    note: '',
    lobby: {
      capacity: 0,
      describe: '',
      id: 0,
      image: '',
      name: '',
      price: 0,
      status: '',
    },
    type_party: {
      id: 0,
      label: '',
      value: 0,
    },
  },
  typeParty: [],
  typeTime: [],
} as IBookingStore;

const bookingSlice = createSlice({
  name: 'booking',
  initialState,
  reducers: reducer,
  extraReducers: extraReducers,
});

export const {
  addDishToMenu,
  addServiceToBooking,
  removeDishToMenu,
  removeServiceToBooking,
  updateInfoBooking,
  updateTypePay,
} = bookingSlice.actions;

export default bookingSlice.reducer;
