import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getAllUserService } from '../../utils/service/user';
import { getStorage } from '../../utils/storage';

const UserList = createSlice({
  name: 'UserList',
  initialState: {
    status: 'idle',
    userList: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getUserList.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(getUserList.fulfilled, (state, { payload }) => {
      state.userList = payload;
      state.status = 'idle';
    });
  },
});

export const getUserList = createAsyncThunk('userList/get', async () => {
  try {
    const token = await getStorage('token');
    const res = await getAllUserService(token);
    return res.data;
  } catch (err) {
    console.log(err);
  }
});

const { reducer, actions } = UserList;
export const {} = actions;
export default reducer;
