import {createSlice} from '@reduxjs/toolkit';
import {globalReducer} from './reducer';

export interface IGlobalStore {
  isLoading: number;
  isBooking: boolean;
  resolveBookingId?: number;
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

export const {
  showSpinner,
  hideSpinner,
  clearSpinner,
  setIsBooking,
  clearResolveBookingId,
  setResolveBookingId,
} = globalSlice.actions;

export default globalSlice.reducer;
