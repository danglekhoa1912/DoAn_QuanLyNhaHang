import {ISelectItem} from './common';

export interface IFormLogin {
  userName: string;
  password: string;
}

export interface IFormRegister {
  email: string;
  password: string;
  name: string;
  birthday: Date | string;
  mobile: string;
  avatar: string;
  confirmPassword?: string;
}

export interface IFormUpdateUser {
  name: string;
  birthday: Date;
  mobile: string;
  avatar: string;
}
