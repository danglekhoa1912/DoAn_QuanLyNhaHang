import {createSlice} from '@reduxjs/toolkit';
import {IService} from '../../type/service';
import {reducer} from './reducer';

export interface IServiceStore {
  service: IService;
}

const initialState = {
  service: {
    id: 0,
    image: '',
    name: '',
    price: 0,
    serviceDescribe: '',
  },
} as IServiceStore;

const serviceSlice = createSlice({
  name: 'service',
  initialState,
  reducers: reducer,
  // extraReducers:''
});

export const {} = serviceSlice.actions;

export default serviceSlice.reducer;
