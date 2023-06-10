import {ISearchParam} from './../type/common';
import AxiosClient from '.';
import {IServiceRes} from '../type/service';
import {Platform} from 'react-native';

const isAdmin =
  Platform.OS === 'web' && localStorage.getItem('role') === 'ROLE_ADMIN';

export const getListService = (params: ISearchParam) => {
  const {page = 1, searchByName = ''} = params;
  return AxiosClient.get(`order/service/get-all`, {
    params: {
      page,
      searchByName,
    },
  });
};

export const getListServiceAdmin = (params: ISearchParam) => {
  const {page = 1, searchByName = ''} = params;
  return AxiosClient.get(`${isAdmin ? 'admin' : 'staff'}/service/get-all`, {
    params: {
      page,
      searchByName,
    },
  });
};

export const addService = (service: IServiceRes) => {
  let formdata = new FormData();
  formdata.append('name', service.name);
  formdata.append('describe', service.serviceDescribe);
  formdata.append('price', service.price);
  formdata.append('img', service.image);
  formdata.append('status', service.status);
  return AxiosClient.post('admin/service/add', formdata, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

export const updateService = (service: IServiceRes) => {
  let formdata = new FormData();
  formdata.append('id', service.id);
  formdata.append('name', service.name);
  formdata.append('describe', service.serviceDescribe);
  formdata.append('price', service.price);
  formdata.append('img', service.image);
  formdata.append('status', service.status);

  return AxiosClient.post('admin/service/edit', formdata, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

export const deleteService = (id: number) => {
  return AxiosClient.post(`admin/service/delete`, id);
};
