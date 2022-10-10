import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getListDishService } from "../../utils/service/dish";

const Dish = createSlice({
   name: "Dish",
   initialState: {
      status: "idle",
      listDish: [],
   },
   reducers: {},
   extraReducers: (builder) => {
      builder.addCase(getListDish.pending, (state) => {
         state.status == "loading";
      });
      builder.addCase(getListDish.fulfilled, (state, { payload }) => {
         state.listDish = payload;
         state.status == "idle";
      });
   },
});

export const getListDish = createAsyncThunk("dish/get", async () => {
   try {
      const res = await getListDishService();
      return res.data;
   } catch (error) {
      console.log(error);
   }
});

const { reducer, actions } = Dish;
export const {} = actions;
export default reducer;
