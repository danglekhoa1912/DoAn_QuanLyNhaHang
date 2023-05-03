import {File} from 'buffer';

export interface IService {
  id: number;
  name: string;
  price: number;
  serviceDescribe: string;
  image: string;
}

export interface IServiceRes {
  id?: number;
  name: string;
  serviceDescribe: string;
  image: File;
  price: number;
}
