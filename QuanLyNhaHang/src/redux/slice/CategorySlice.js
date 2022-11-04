import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getListCategoryService } from "../../utils/service/category";

const Category = createSlice({
   name: "Category",
   initialState: {
      status: "idle",
      listCategory: [],
   },
   reducers: {},
   extraReducers: (builder) => {
      builder.addCase(getListCategory.pending, (state) => {
         state.status == "loading";
      });
      builder.addCase(getListCategory.fulfilled, (state, { payload }) => {
         state.listCategory = payload;
         state.status = "idle";
      });
   },
});

export const getListCategory = createAsyncThunk("category/get", async () => {
   try {
      const res = await getListCategoryService();
      return res.data;
   } catch (error) {
      console.log(error);
   }
});

const { reducer, actions } = Category;
export const {} = actions;
export default reducer;
