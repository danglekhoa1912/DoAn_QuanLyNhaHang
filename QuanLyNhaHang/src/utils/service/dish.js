import { instance } from './instance';

export const getListDishService = (cateId, page) => {
  return instance.get(`order/dish/categoryId=${cateId}`, {
    params: {
      page: page,
    },
  });
};

export const addDishService = (token, dish) => {
  let filename = dish.image.split('/').pop();
  let match = /\.(\w+)$/.exec(filename);
  let type = match ? `image/${match[1]}` : `image`;
  let formdata = new FormData();
  formdata.append('name', dish.name);
  formdata.append('categoryId', dish.category);
  formdata.append('price', dish.price);
  formdata.append('image', {
    uri: dish.image,
    name: filename,
    type,
  });
  return instance.post('admin/dish/add', formdata, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data',
    },
  });
};

export const updateDishService = (token, dish) => {
  let filename = dish.image.split('/').pop();
  let match = /\.(\w+)$/.exec(filename);
  let type = match ? `image/${match[1]}` : `image`;
  let formdata = new FormData();
  formdata.append('name', dish.name);
  formdata.append('categoryId', dish.category);
  formdata.append('price', dish.price);
  formdata.append('image', {
    uri: dish.image,
    name: filename,
    type,
  });
  return instance.put(`admin/dish/change/id=${dish.id}`, formdata, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data',
    },
  });
};

export const deleteDishService = (token, id) => {
  return instance.post(
    `admin/dish/delete`,
    { id },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const countDishService = (cateId) => {
  return instance.get(`order/dish/count?categoryId=${cateId}`);
};
