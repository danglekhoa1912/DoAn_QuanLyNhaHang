import {ILobbyRes} from './../type/lobby';
import AxiosClient from '.';
import {ISearchParam} from '../type/common';

export const getLobbyList = (params: ISearchParam) => {
  return AxiosClient.get('order/weddinghall/get-all-wedding-hall', {
    params: params,
  });
};

export const getLobbyListAdmin = (params: ISearchParam) => {
  return AxiosClient.get('admin/weddinghall/get-all-wedding-hall', {
    params: params,
  });
};

export const getLobbyById = (id: number) => {
  return AxiosClient.get(`order/weddinghall/get-detail-wdh?idHall=${id}`);
};

export const addLooby = (lobby: ILobbyRes) => {
  let formdata = new FormData();
  formdata.append('name', lobby.name);
  formdata.append('capacity', lobby.capacity.toString());
  formdata.append('describe', lobby.describe);
  formdata.append('price', lobby.price.toString());
  formdata.append('image', lobby.image);
  formdata.append('image360', lobby.image360);
  return AxiosClient.post('admin/weddinghall/add', formdata, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

export const updateLobby = (lobby: ILobbyRes) => {
  let formdata = new FormData();
  formdata.append('name', lobby.name);
  formdata.append('capacity', lobby.capacity.toString());
  formdata.append('id', lobby.id?.toString());
  formdata.append('describe', lobby.describe);
  formdata.append('price', lobby.price.toString());
  formdata.append('image', lobby.image);
  formdata.append('image360', lobby.image360);
  return AxiosClient.post('admin/weddinghall/edit', formdata, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

export const deleteLobby = (id: number) => {
  return AxiosClient.post(`admin/weddinghall/delete`, id);
};
