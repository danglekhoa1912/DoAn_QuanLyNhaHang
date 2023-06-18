import {IDish} from './dish';
import {ILobby, ITypeParty} from './lobby';
import {ISelectItem} from './common';
import {IService} from './service';
import {IUser} from './user';

export interface IFormBooking {
  date: Date;
  time: ISelectItem;
  type_party: ISelectItem;
  quantityTable: number;
  lobby?: ILobby;
}

export interface IFormBookingStaff {
  date: moment.Moment;
  time: ISelectItem;
  type_party: ISelectItem;
  quantityTable: number;
}

export interface IBookingReq {
  amount: number;
  idUser: number;
  whId: number;
  pwtId: number;
  orderDate: Date;
  typePay: string;
  quantity: number;
  note: string;
  menu: number[];
  service: number[];
  type_party: number;
  status: number;
  transId?: string;
}

export interface IUpdateBookingStatus {
  id: number;
  status: ORDER_STATUS;
  transId?: string;
}

export interface ISession {
  id: number;
  price: number;
  session: string;
}

export enum CASH_TYPE {
  CASH = 1,
  MOMO = 2,
  ZALO = 3,
}

export enum ORDER_STATUS {
  SUCCESS = 1,
  WAIT_CONFIRM = 2,
  DRAW = 3,
  WAIT_PAYMENT = 4,
  WAIT_CONFIRM_CANCEL = 5,
  CANCELED = 6,
}
export interface ITypePay {
  id: number;
  type: CASH_TYPE;
  name: string;
}

export interface IOrderHistory {
  id: number;
  username: string;
  hall: string;
  time: number;
  date: Date;
  price: number;
  typeParty: number;
  status: number;
  typePay: string;
  countTable: number;
  note?: string;
  dishList: {
    dishId: IDish;
  }[];
  serviceList: {
    serviceId: IService;
  }[];
  transId?: string;
}

export interface IOrderHistoryAdmin {
  id: number;
  amount: number;
  note?: string;
  orderDate: string;
  quantityTable: number;
  status: ORDER_STATUS;
  typePay: string;
  userId: IUser;
  whId: ILobby;
  menuId: {
    id: number;
    price: number;
    menuDishSet: {
      dishId: IDish;
    }[];
  };
  listServiceId: {
    id: number;
    price: number;
    servicesDetailSet: {
      serviceId: IService;
    }[];
  };
  typeParty: ITypeParty;
}
