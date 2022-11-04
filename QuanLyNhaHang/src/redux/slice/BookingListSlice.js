import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { goBack } from '../../naviagtion/service';
import { toast } from '../../utils/common';
import {
  confirmBookingService,
  getAllBookingService,
} from '../../utils/service/user';
import { getStorage } from '../../utils/storage';

const BookingList = createSlice({
  name: 'BookingList',
  initialState: {
    status: 'idle',
    BookingList: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getBookingList.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(getBookingList.fulfilled, (state, { payload }) => {
      state.BookingList = payload;
      state.status = 'idle';
    });
    builder.addCase(confirmBooking.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(confirmBooking.fulfilled, (state, { payload }) => {
      state.status = 'idle';
      toast('Xác nhận thành công');
    });
  },
});

export const getBookingList = createAsyncThunk('boikingList/get', async () => {
  try {
    const token = await getStorage('token');
    const res = await getAllBookingService(token);
    return res.data;
  } catch (err) {
    console.log(err);
  }
});

export const confirmBooking = createAsyncThunk(
  'booking/confirm',
  async (id, ThunkAPI) => {
    try {
      const token = await getStorage('token');
      const res = await confirmBookingService(token, id);
      ThunkAPI.dispatch(getBookingList());
      goBack();
      return res.data;
    } catch (err) {
      console.log(err);
    }
  }
);

const { reducer, actions } = BookingList;
export const {} = actions;
export default reducer;
