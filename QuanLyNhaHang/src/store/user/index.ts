import {extraReducers} from './thunkApi';
import {createSlice} from '@reduxjs/toolkit';
import {IUser} from '../../type/user';
import {reducer} from './reducer';

export interface IUserStore {
  token: string;
  user: IUser;
}

const initialState = {
  token: '',
  user: {
    birthday: new Date(),
    email: '',
    id: 0,
    mobile: '',
    name: '',
    password: '',
    role: '',
    avatar: '',
  },
} as IUserStore;

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: reducer,
  extraReducers: extraReducers,
});

export const {logout} = userSlice.actions;

export default userSlice.reducer;
