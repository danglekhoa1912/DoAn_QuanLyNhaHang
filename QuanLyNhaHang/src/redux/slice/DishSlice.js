import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { goBack } from '../../naviagtion/service';
import { toast } from '../../utils/common';
import {
  addDishService,
  countDishService,
  deleteDishService,
  getListDishService,
  updateDishService,
} from '../../utils/service/dish';
import { getStorage } from '../../utils/storage';

const Dish = createSlice({
  name: 'Dish',
  initialState: {
    status: 'idle',
    listDish: [],
    count: 0,
  },
  reducers: {
    resetDishList: (state) => {
      state.listDish = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getListDish.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(getListDish.fulfilled, (state, { payload }) => {
      state.listDish = [...state.listDish, ...payload];
      state.status = 'idle';
    });
    builder.addCase(addDish.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(addDish.fulfilled, (state) => {
      state.status = 'idle';
      toast('Thêm món ăn thành công');
    });
    builder.addCase(updateDish.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(updateDish.fulfilled, (state) => {
      state.status = 'idle';
      toast('Cập nhật món ăn thành công');
    });
    builder.addCase(countDish.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(countDish.fulfilled, (state, { payload }) => {
      state.count = payload;
      state.status = 'idle';
    });
  },
});

export const getListDish = createAsyncThunk('dish/get', async (param) => {
  const { cateId, page } = param;
  try {
    const res = await getListDishService(cateId, page);
    return res.data;
  } catch (error) {
    console.log(error);
  }
});

export const addDish = createAsyncThunk('dish/add', async (dish, thunkAPI) => {
  try {
    const token = await getStorage('token');
    const res = await addDishService(token, dish);
    thunkAPI.dispatch(getListDish());
    goBack();
    return res.data;
  } catch (err) {
    console.log(err);
  }
});

export const updateDish = createAsyncThunk(
  'dish/update',
  async (dish, thunkAPI) => {
    try {
      const token = await getStorage('token');
      const res = await updateDishService(token, dish);
      thunkAPI.dispatch(getListDish());
      goBack();
      return res.data;
    } catch (err) {
      console.log(err);
    }
  }
);

export const deleteDish = createAsyncThunk(
  'dish/delete',
  async (id, thunkAPI) => {
    try {
      const token = await getStorage('token');
      const res = await deleteDishService(token, id);
      thunkAPI.dispatch(getListDish());
      goBack();
      return res.data;
    } catch (err) {
      console.log(err);
    }
  }
);

export const countDish = createAsyncThunk('dish/count', async (cateId) => {
  try {
    const res = await countDishService(cateId);
    return res.data;
  } catch (err) {
    console.log(err);
  }
});

const { reducer, actions } = Dish;
export const { resetDishList } = actions;
export default reducer;
