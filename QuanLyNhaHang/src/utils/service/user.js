import { instance } from './instance';

export const registerService = (user) => {
  let filename = user.avatar.split('/').pop();
  let match = /\.(\w+)$/.exec(filename);
  let type = match ? `image/${match[1]}` : `image`;
  let formdata = new FormData();
  formdata.append('email', user.email);
  formdata.append('name', user.name);
  formdata.append('birthday', new Date(user.birthday).toString());
  formdata.append('password', user.password);
  formdata.append('mobile', user.mobile);
  formdata.append('avt', {
    uri: user.avatar,
    name: filename,
    type,
  });
  return instance.post('auth/signup', formdata, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

export const loginService = (email, password) => {
  return instance.post('auth/login', {
    username: email,
    password,
  });
};

export const getUserService = (token) => {
  return instance.get('auth/user/profile', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getOrderHistoryService = (userId) => {
  return instance.get(`order/allorder?id=${userId}`);
};

export const updateUserService = (token, user) => {
  let filename = user.avatar.split('/').pop();
  let match = /\.(\w+)$/.exec(filename);
  let type = match ? `image/${match[1]}` : `image`;
  let formdata = new FormData();
  formdata.append('id', user.id);
  formdata.append('name', user.name);
  formdata.append('birthday', new Date(user.birthday).toString());
  formdata.append('mobile', user.mobile);
  formdata.append('avt', {
    uri: user.avatar,
    name: filename,
    type,
  });
  return instance.post(`auth/user/profile`, formdata, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data',
    },
  });
};

export const getAllUserService = (token) => {
  return instance.get('admin/user/getall', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getAllBookingService = (token) => {
  return instance.get('staff/order/all', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const confirmBookingService = (token, id) => {
  return instance.post(
    'staff/order/updatestt',
    { id },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const addStaffService = (token, staff) => {
  let filename = staff.avatar.split('/').pop();
  let match = /\.(\w+)$/.exec(filename);
  let type = match ? `image/${match[1]}` : `image`;
  let formdata = new FormData();
  formdata.append('name', staff.name);
  formdata.append('email', staff.email);
  formdata.append('birthday', staff.birthday.toString());
  formdata.append('mobile', staff.mobile);
  formdata.append('password', '1');
  formdata.append('avt', {
    uri: staff.avatar,
    name: filename,
    type,
  });
  return instance.post('admin/addStaff', formdata, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data',
    },
  });
};

export const updateStaffService = (token, staff) => {
  let filename = staff.avatar.split('/').pop();
  let match = /\.(\w+)$/.exec(filename);
  let type = match ? `image/${match[1]}` : `image`;
  let formdata = new FormData();
  formdata.append('id', staff.id);
  formdata.append('name', staff.name);
  formdata.append('birthday', staff.birthday);
  formdata.append('mobile', staff.mobile);
  formdata.append('avt', {
    uri: staff.avatar,
    name: filename,
    type,
  });
  return instance.post('auth/staff/editprofile', formdata, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data',
    },
  });
};

export const deleteStaffService = (token, id) => {
  return instance.post(
    'admin/user/delete',
    { id },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};
