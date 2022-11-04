import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getTypePartyService } from "../../utils/service/typeParty";

const TypeParty = createSlice({
   name: "TypeParty",
   initialState: {
      status: "idle",
      TypePartyList: [],
   },
   reducers: {},
   extraReducers: (builder) => {
      builder.addCase(getTypeParty.pending, (state) => {
         state.status = "loading";
      });
      builder.addCase(getTypeParty.fulfilled, (state, { payload }) => {
         state.TypePartyList = payload;
         state.status = "idle";
      });
   },
});

export const getTypeParty = createAsyncThunk("typeParty/get", async () => {
   try {
      const res = await getTypePartyService();
      return res.data;
   } catch (err) {
      console.log(err);
   }
});

const { reducer, actions } = TypeParty;
export const {} = actions;
export default reducer;
