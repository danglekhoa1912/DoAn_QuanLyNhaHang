import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  getRevenueByLobbyCurrentMonthService,
  getRevenueCurrentMontService,
  getRevenueLastMontService,
  getRevenueRangeMontService,
} from '../../utils/service/revenue';
import { getStorage } from '../../utils/storage';

const Revenue = createSlice({
  name: 'Revenue',
  initialState: {
    status: '',
    revenue: [],
    count: 0,
    total: 0,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getRevenueMonth.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(getRevenueMonth.fulfilled, (state, { payload }) => {
      state.revenue = payload.revenue;
      state.status = 'idle';
      state.count = payload.count;
      state.total = payload.total;
    });
    builder.addCase(getRevenueLastMonth.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(getRevenueLastMonth.fulfilled, (state, { payload }) => {
      let count = 0;
      let total = 0;
      payload.forEach((revenue) => {
        count += revenue.count;
        total += revenue.total;
      });
      state.revenue = payload;
      state.status = 'idle';
      state.count = count;
      state.total = total;
    });
    builder.addCase(getRevenueRangeMonth.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(getRevenueRangeMonth.fulfilled, (state, { payload }) => {
      let count = 0;
      let total = 0;
      payload.forEach((revenue) => {
        count += revenue.count;
        total += revenue.total;
      });
      state.revenue = payload;
      state.status = 'idle';
      state.count = count;
      state.total = total;
    });
  },
});

export const getRevenueMonth = createAsyncThunk(
  'revenue/getmonth',
  async () => {
    try {
      const token = await getStorage('token');
      const resLobby = await getRevenueByLobbyCurrentMonthService(token);
      const resTotal = await getRevenueCurrentMontService(token);
      return { revenue: [...resLobby.data], ...resTotal.data };
    } catch (err) {
      console.log(err);
    }
  }
);

export const getRevenueLastMonth = createAsyncThunk(
  'revenue/getLastMonth',
  async () => {
    try {
      const token = await getStorage('token');
      const res = await getRevenueLastMontService(token);
      return res.data;
    } catch (err) {
      console.log(err);
    }
  }
);

export const getRevenueRangeMonth = createAsyncThunk(
  'revenue/getRange	Month',
  async (date) => {
    try {
      const token = await getStorage('token');
      const res = await getRevenueRangeMontService(token, date);
      return res.data;
    } catch (err) {
      console.log(err);
    }
  }
);

const { reducer, actions } = Revenue;
export const {} = actions;
export default reducer;
