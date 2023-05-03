import {createSlice} from '@reduxjs/toolkit';
import {globalReducer} from './reducer';

export interface IGlobalStore {
  isLoading: number;
  isBooking: boolean;
}

const initialState: IGlobalStore = {
  isLoading: 0,
  isBooking: false,
};

const globalSlice = createSlice({
  name: 'global',
  initialState,
  reducers: globalReducer,
});

export const {showSpinner, hideSpinner, clearSpinner, setIsBooking} =
  globalSlice.actions;

export default globalSlice.reducer;
