import {IDishStore} from './index';
import {
  ActionReducerMapBuilder,
  createAsyncThunk,
  PayloadAction,
} from '@reduxjs/toolkit';
import {DishApi} from '../../apis';
import {ICategory, IDishRes, IRequestParams} from '../../type/dish';

export const getDishList = createAsyncThunk(
  'dish/getDishList',
  async (params: IRequestParams) => {
    const result = await DishApi.getDishList(params);
    return result.data;
  },
);

export const getCategories = createAsyncThunk(
  'dish/getCategories',
  async () => {
    const result = await DishApi.getCategories();
    return result.data;
  },
);

export const addDish = createAsyncThunk(
  'dish/addDish',
  async (dish: IDishRes) => {
    const result = await DishApi.addDish(dish);
    return result;
  },
);

export const deleteDish = createAsyncThunk(
  'dish/deleteDish',
  async (id: number) => {
    const result = await DishApi.deleteDish(id);
    return result;
  },
);

export const updateDish = createAsyncThunk(
  'dish/updateDish',
  async (dish: IDishRes) => {
    const result = await DishApi.updateDish(dish);
    return result;
  },
);

export const countDish = createAsyncThunk(
  'dish/countDish',
  async (cateId: number) => {
    const result = await DishApi.countDish(cateId);
    return result;
  },
);

export const extraReducers = (
  builders: ActionReducerMapBuilder<IDishStore>,
) => {
  builders.addCase(
    getCategories.fulfilled,
    (state: IDishStore, action: PayloadAction<ICategory[]>) => {
      state.categories = action.payload;
    },
  );
};
