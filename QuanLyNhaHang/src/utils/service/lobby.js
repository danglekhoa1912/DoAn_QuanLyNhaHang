import { instance } from './instance';

export const getListLobbyService = () => {
  return instance.get('order/weddinghall/getall');
};

export const getLobbyByIdService = (id) => {
  return instance.get(`order/weddinghall/getall?id=${id}`);
};

export const addLoobyService = (token, lobby) => {
  let filename = lobby.image.split('/').pop();
  let match = /\.(\w+)$/.exec(filename);
  let type = match ? `image/${match[1]}` : `image`;
  let formdata = new FormData();
  formdata.append('name', lobby.name);
  formdata.append('capacity', lobby.capacity);
  formdata.append('describe', lobby.describe);
  formdata.append('price', lobby.price);
  formdata.append('image', {
    uri: lobby.image,
    name: filename,
    type,
  });
  return instance.post('admin/weddinghall/add', formdata, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data',
    },
  });
};

export const updateLobbyService = (token, lobby) => {
  let filename = lobby.image.split('/').pop();
  let match = /\.(\w+)$/.exec(filename);
  let type = match ? `image/${match[1]}` : `image`;
  let formdata = new FormData();
  formdata.append('name', lobby.name);
  formdata.append('capacity', lobby.capacity);
  formdata.append('id', lobby.id);
  formdata.append('describe', lobby.describe);
  formdata.append('price', lobby.price);
  formdata.append('image', {
    uri: lobby.image,
    name: filename,
    type,
  });
  return instance.post('admin/weddinghall/edit', formdata, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data',
    },
  });
};

export const deleteLobbyService = (token, id) => {
  return instance.post(`admin/weddinghall/delete?id=${id}`, undefined, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
