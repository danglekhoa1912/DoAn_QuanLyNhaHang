import {Platform} from 'react-native';
import AxiosClient from '.';
import {IDishRes, IRequestParams} from '../type/dish';

const isAdmin =
  Platform.OS === 'web' && localStorage.getItem('role') === 'ROLE_ADMIN';

export const getDishList = (params: IRequestParams) => {
  const {categoryId = 2, page = 1, searchByName = ''} = params;
  return AxiosClient.get(`order/dish/categoryId`, {
    params: {
      page,
      searchByName,
      i: categoryId,
    },
  });
};

export const getDishListAdmin = (params: IRequestParams) => {
  const {categoryId = 2, page = 1, searchByName = ''} = params;
  return AxiosClient.get(`${isAdmin ? 'admin' : 'staff'}/dish/categoryId`, {
    params: {
      page,
      searchByName,
      i: categoryId,
    },
  });
};

export const getCategories = () => {
  return AxiosClient.get('order/dish/get-category');
};

export const addDish = (dish: IDishRes) => {
  let formData = new FormData();
  formData.append('name', dish.name);
  formData.append('categoryId', dish.category.toString());
  formData.append('price', dish.price.toString());
  formData.append('image', dish.image);
  formData.append('status', dish.status || true);
  return AxiosClient.post('admin/dish/add', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

export const updateDish = (dish: IDishRes) => {
  let formData = new FormData();
  formData.append('id', dish.id);
  formData.append('name', dish.name);
  formData.append('categoryId', dish.category.toString());
  formData.append('price', dish.price.toString());
  formData.append('image', dish.image);
  formData.append('status', dish.status || true);
  return AxiosClient.post(`admin/dish/edit`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

export const deleteDish = (id: number) => {
  return AxiosClient.post(`admin/dish/delete`, id);
};

export const countDish = (cateId: number) => {
  return AxiosClient.get(`order/dish/count?categoryId=${cateId}`);
};
