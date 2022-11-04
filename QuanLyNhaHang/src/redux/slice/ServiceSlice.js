import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { goBack } from '../../naviagtion/service';
import { toast } from '../../utils/common';
import {
  addServiceResService,
  deleteServiceResService,
  getListSerService,
  updateServiceResService,
} from '../../utils/service/service';
import { getStorage } from '../../utils/storage';

const Service = createSlice({
  name: 'Service',
  initialState: {
    status: 'idle',
    listService: [],
  },
  reducers: {
    resetDishList: (state) => {
      state.listService = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getListService.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(getListService.fulfilled, (state, { payload }) => {
      state.listService = payload;
      state.status = 'idle';
    });
    builder.addCase(addService.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(addService.fulfilled, (state) => {
      state.status = 'idle';
      toast('Thêm dịch vụ thành công');
    });
    builder.addCase(updateService.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(updateService.fulfilled, (state) => {
      state.status = 'idle';
      toast('Cập nhật dịch vụ thành công');
    });
    builder.addCase(deleteService.fulfilled, () => {
      toast('Xóa dịch vụ thành công');
    });
  },
});

export const getListService = createAsyncThunk('service/get', async (page) => {
  try {
    const res = await getListSerService(page);
    return res.data;
  } catch (err) {
    console.log(err);
  }
});

export const addService = createAsyncThunk(
  'service/add',
  async (service, thunkAPI) => {
    try {
      const token = await getStorage('token');
      const res = await addServiceResService(token, service);
      thunkAPI.dispatch(getListService());
      goBack();
      return res.data;
    } catch (err) {
      console.log(err);
    }
  }
);

export const updateService = createAsyncThunk(
  'service/update',
  async (service, thunkAPI) => {
    try {
      const token = await getStorage('token');
      const res = await updateServiceResService(token, service);
      thunkAPI.dispatch(getListService());
      goBack();
      return res.data;
    } catch (err) {
      console.log(err);
    }
  }
);

export const deleteService = createAsyncThunk(
  'service/delete',
  async (id, thunkAPI) => {
    try {
      const token = await getStorage('token');
      const res = await deleteServiceResService(token, id);
      thunkAPI.dispatch(getListService());
      return res.data;
    } catch (err) {
      console.log(err);
    }
  }
);

const { reducer, actions } = Service;
export const {} = actions;
export default reducer;
