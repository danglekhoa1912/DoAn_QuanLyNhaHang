import { instance } from './instance';

export const getCommentService = (page, token) => {
  return instance.get('staff/feedback/getall', {
    params: {
      page,
    },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const postCommentService = (data, token) => {
  return instance.post('order/feedback/add', data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
