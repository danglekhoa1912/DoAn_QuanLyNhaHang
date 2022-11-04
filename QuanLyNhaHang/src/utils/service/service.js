import { instance } from './instance';

export const getListSerService = (page) => {
  return instance.get(`order/service/getall`, {
    params: {
      page: page,
    },
  });
};

export const addServiceResService = (token, service) => {
  let filename = service.image.split('/').pop();
  let match = /\.(\w+)$/.exec(filename);
  let type = match ? `image/${match[1]}` : `image`;
  let formdata = new FormData();
  formdata.append('name', service.name);
  formdata.append('describe', service.serviceDescribe);
  formdata.append('price', service.price);
  formdata.append('img', {
    uri: service.image,
    name: filename,
    type,
  });
  return instance.post('admin/service/add', formdata, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data',
    },
  });
};

export const updateServiceResService = (token, service) => {
  let filename = service.image.split('/').pop();
  let match = /\.(\w+)$/.exec(filename);
  let type = match ? `image/${match[1]}` : `image`;
  let formdata = new FormData();
  formdata.append('id', service.id);
  formdata.append('name', service.name);
  formdata.append('describe', service.serviceDescribe);
  formdata.append('price', service.price);
  formdata.append('img', {
    uri: service.image,
    name: filename,
    type,
  });
  return instance.post('admin/service/edit', formdata, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data',
    },
  });
};

export const deleteServiceResService = (token, id) => {
  return instance.post(
    `admin/service/delete`,
    { id },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};
