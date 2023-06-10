import {PayloadAction} from '@reduxjs/toolkit';
import {IGlobalStore} from '.';

export const globalReducer = {
  showSpinner: (state: IGlobalStore) => {
    state.isLoading++;
  },
  hideSpinner: (state: IGlobalStore) => {
    state.isLoading--;
  },
  clearSpinner: (state: IGlobalStore) => {
    state.isLoading = 0;
  },
  setIsBooking: (state: IGlobalStore, action: PayloadAction<boolean>) => {
    state.isBooking = action.payload;
  },
  setResolveBookingId: (state: IGlobalStore, action: PayloadAction<number>) => {
    state.resolveBookingId = action.payload;
  },
  clearResolveBookingId: (state: IGlobalStore) => {
    state.resolveBookingId = undefined;
  },
};
