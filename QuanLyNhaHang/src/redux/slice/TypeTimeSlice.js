import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
   getTypeTimeByIdService,
   getTypeTimeService,
} from "../../utils/service/typeTime";

const TypeTime = createSlice({
   name: "TypeTime",
   initialState: {
      status: "idle",
      TypeTimeList: [],
   },
   reducers: {},
   extraReducers: (builder) => {
      builder.addCase(getTypeTime.pending, (state) => {
         state = "loading";
      });
      builder.addCase(getTypeTime.fulfilled, (state, { payload }) => {
         state.TypeTimeList = payload;
         state = "idle";
      });
   },
});

export const getTypeTime = createAsyncThunk("typeTime/get", async () => {
   try {
      const res = await getTypeTimeService();
      return res.data;
   } catch (err) {
      console.log(err);
   }
});

export const getTypeTimebyId = async (id) => {
   try {
      const res = await getTypeTimeByIdService(id);
      return res.data;
   } catch (err) {
      console.log(err);
   }
};

const { reducer, actions } = TypeTime;
export const {} = actions;
export default reducer;
