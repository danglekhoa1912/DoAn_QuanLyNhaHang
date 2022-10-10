import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
   getListLobbyService,
   getLobbyByIdService,
} from "../../utils/service/lobby";

const Looby = createSlice({
   name: "Looby",
   initialState: {
      status: "idle",
      listLobby: [],
      lobby: {},
   },
   reducers: {},
   extraReducers: (builder) => {
      builder.addCase(getListLobby.pending, (state) => {
         state.status = "loading";
      });
      builder.addCase(getListLobby.fulfilled, (state, { payload }) => {
         state.listLobby = payload;
         state.status = "idle";
      });
      builder.addCase(getLobbyById.pending, (state) => {
         state.status = "loading";
      });
      builder.addCase(getLobbyById.fulfilled, (state, { payload }) => {
         state.lobby = payload;
         state.status = "idle";
      });
   },
});

export const getListLobby = createAsyncThunk("lobbyList/get", async () => {
   try {
      const res = await getListLobbyService();
      return res.data;
   } catch (error) {
      console.log(error);
   }
});

export const getLobbyById = createAsyncThunk("lobby/get", async (id) => {
   try {
      const res = await getLobbyByIdService(id);
      return res.data;
   } catch (error) {
      console.log(error);
   }
});

const { reducer, actions } = Looby;
export const {} = actions;
export default reducer;
