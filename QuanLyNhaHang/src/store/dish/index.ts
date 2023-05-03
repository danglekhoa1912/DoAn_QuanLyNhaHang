import {createSlice} from '@reduxjs/toolkit';
import {ICategory, IDish} from '../../type/dish';
import {reducer} from './reducer';
import {extraReducers} from './thunkApi';

export interface IDishStore {
  dish: IDish;
  categories: ICategory[];
}

const initialState = {
  dish: {
    categoryId: {
      id: 0,
      name: '',
    },
    id: 0,
    image: '',
    name: '',
    price: 0,
  },
  categories: [],
} as IDishStore;

const dishSlice = createSlice({
  name: 'dish',
  initialState,
  reducers: reducer,
  extraReducers: extraReducers,
});

export const {} = dishSlice.actions;

export default dishSlice.reducer;
