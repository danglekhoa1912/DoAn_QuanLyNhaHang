import {createSlice} from '@reduxjs/toolkit';
import {IUser} from '../../type/user';
import {reducer} from './reducer';
import {extraReducers} from './thunkApi';

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

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: reducer,
  extraReducers: extraReducers,
});

export const {} = profileSlice.actions;

export default profileSlice.reducer;
