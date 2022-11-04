import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { ToastAndroid } from 'react-native';
import { Intro1 } from '../../../assets/images';
import { mainNavigate, stackName } from '../../configs/NavigationContants';
import { replace } from '../../naviagtion/service';
import { toast } from '../../utils/common';
import {
  addStaffService,
  deleteStaffService,
  getOrderHistoryService,
  getUserService,
  loginService,
  registerService,
  updateUserService,
} from '../../utils/service/user';
import { getStorage, removeStorage, saveStorage } from '../../utils/storage';
import { getUserList } from './UserListSlice';

const User = createSlice({
  name: 'User',
  initialState: {
    status: 'idle',
    user: {},
    orderHistory: [],
  },
  reducers: {
    updateUser: (state, action) => {
      const newState = { ...state.user, ...action.payload };
      return { ...state, user: newState };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginUser.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(loginUser.fulfilled, (state, { payload }) => {
      if (payload) {
        state.status = payload.statuscode;
      }
    });
    builder.addCase(registerUser.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(registerUser.fulfilled, (state, { payload }) => {
      state.status = payload;
      //   state.status = payload.status;
    });
    builder.addCase(getUser.fulfilled, (state, { payload }) => {
      state.user = payload;
      state.status = 'idle';
    });
    builder.addCase(logOutUser.fulfilled, (state, { payload }) => {
      state.user = {};
    });
    builder.addCase(getOrderHistory.pending, (state, { payload }) => {
      state.status = 'loading';
    });
    builder.addCase(getOrderHistory.fulfilled, (state, { payload }) => {
      state.orderHistory = payload;
      state.status = 'idle';
    });
    builder.addCase(addStaff.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(addStaff.fulfilled, (state, { payload }) => {
      state.status = payload;
    });
    builder.addCase(updateUser.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(updateUser.fulfilled, (state, { payload }) => {
      state.user = payload;
      state.status = payload;
    });
  },
});

export const registerUser = createAsyncThunk('user/register', async (user) => {
  try {
    const res = await registerService(user);
    toast('Đăng ký thành công');
    return res.status;
  } catch (err) {
    toast(err.response.data);
    return err.response.status;
  }
});

export const loginUser = createAsyncThunk(
  'user/login',
  async (user, thunkApi) => {
    try {
      const { email, password } = user;
      const res = await loginService(email, password);
      if (res.data.accessToken) {
        saveStorage('token', res.data.accessToken);
        thunkApi.dispatch(getUser(res.data.accessToken));
      } else {
        return res.data;
      }
    } catch (err) {
      console.log(err);
    }
  }
);

export const updateUser = createAsyncThunk('user/update', async (user) => {
  try {
    const token = await getStorage('token');
    const res = await updateUserService(token, user);
    toast('Cập nhật thành công');
    return res.data;
  } catch (err) {
    console.log(err);
    toast(err.response.data);
  }
});

export const getUser = createAsyncThunk('user/get', async (token) => {
  try {
    const res = await getUserService(token);
    replace(mainNavigate.mainNavigate);
    return res.data;
  } catch (err) {
    console.log(err);
  }
});

export const logOutUser = createAsyncThunk('user/logout', async () => {
  try {
    const removeToken = await removeStorage('token');
    return removeToken;
  } catch (err) {
    return err;
  }
});

export const getOrderHistory = createAsyncThunk(
  'user/orderHistory',
  async (userId) => {
    try {
      const res = await getOrderHistoryService(userId);
      return res.data;
    } catch (err) {
      console.log(err);
    }
  }
);

export const addStaff = createAsyncThunk(
  'staff/add',
  async (staff, ThunkAPI) => {
    try {
      const token = await getStorage('token');
      const res = await addStaffService(token, staff);
      toast('Thêm nhân viên thành công');
      ThunkAPI.dispatch(getUserList());
      return res.status;
    } catch (err) {
      toast(err.response.data);
      return err.response.status;
    }
  }
);

export const deleteStaff = createAsyncThunk(
  'staff/add',
  async (id, ThunkAPI) => {
    try {
      const token = await getStorage('token');
      const res = await deleteStaffService(token, id);
      toast('Xóa nhân viên thành công');
      ThunkAPI.dispatch(getUserList());
      return res.data;
    } catch (err) {
      console.log(err);
      toast(err.response.data);
    }
  }
);

const { reducer, actions } = User;
export const {} = actions;
export default reducer;
