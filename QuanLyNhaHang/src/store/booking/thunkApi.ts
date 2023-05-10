import {IBookingStore} from './index';
import {
  ActionReducerMapBuilder,
  createAsyncThunk,
  PayloadAction,
} from '@reduxjs/toolkit';
import {BookingApi} from '../../apis';
import {IBookingReq, IUpdateBookingStatus} from '../../type/booking';

export const addOrder = createAsyncThunk(
  'booking/addOrderService',
  async (order: IBookingReq) => {
    const result = await BookingApi.addOrderService(order);
    return result;
  },
);

export const updateOrderStatus = createAsyncThunk(
  'booking/updateStatus',
  async (data: IUpdateBookingStatus) => {
    const result = await BookingApi.updateOrderStatus(data);
    return result;
  },
);

export const getOrderById = createAsyncThunk(
  'booking/getOrderById',
  async (id: number) => {
    const result = await BookingApi.getOrderById(id);
    return result;
  },
);

export const getTypeTime = createAsyncThunk('booking/getTypeTime', async () => {
  const result = await BookingApi.getTypeTime();
  return result.data;
});

export const getTypeParty = createAsyncThunk(
  'booking/getTypeParty',
  async () => {
    const result = await BookingApi.getTypeParty();
    return result.data;
  },
);

export const extraReducers = (
  builders: ActionReducerMapBuilder<IBookingStore>,
) => {
  builders.addCase(
    getTypeTime.fulfilled,
    (state: IBookingStore, action: PayloadAction<any>) => {
      state.typeTime = action.payload;
    },
  ),
    builders.addCase(
      getTypeParty.fulfilled,
      (state: IBookingStore, action: PayloadAction<any>) => {
        state.typeParty = action.payload;
      },
    );
};