import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { goBack } from '../../naviagtion/service';
import { toast } from '../../utils/common';
import {
  addLoobyService,
  deleteLobbyService,
  getListLobbyService,
  getLobbyByIdService,
  updateLobbyService,
} from '../../utils/service/lobby';
import { getStorage } from '../../utils/storage';

const Looby = createSlice({
  name: 'Looby',
  initialState: {
    status: 'idle',
    listLobby: [],
    lobby: {},
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getListLobby.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(getListLobby.fulfilled, (state, { payload }) => {
      state.listLobby = payload;
      state.status = 'idle';
    });
    builder.addCase(getLobbyById.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(getLobbyById.fulfilled, (state, { payload }) => {
      state.lobby = payload;
      state.status = 'idle';
    });
    builder.addCase(addLobby.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(addLobby.fulfilled, (state) => {
      state.status = 'idle';
      toast('Thêm sảnh thành công');
    });
    builder.addCase(updateLobby.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(updateLobby.fulfilled, (state) => {
      state.status = 'idle';
      toast('Cập nhật sảnh thành công');
    });
    builder.addCase(deleteLobby.fulfilled, () => {
      toast('Xóa sảnh thành công');
    });
  },
});

export const getListLobby = createAsyncThunk('lobbyList/get', async () => {
  try {
    const res = await getListLobbyService();
    return res.data;
  } catch (error) {
    console.log(error);
  }
});

export const getLobbyById = createAsyncThunk('lobby/get', async (id) => {
  try {
    const res = await getLobbyByIdService(id);
    return res.data[0];
  } catch (error) {
    console.log(error);
  }
});

export const addLobby = createAsyncThunk(
  'lobby/add',
  async (lobby, thunkAPI) => {
    try {
      const token = await getStorage('token');
      const res = await addLoobyService(token, lobby);
      goBack();
      thunkAPI.dispatch(getListLobby());
      return res.data;
    } catch (err) {
      console.log(err);
    }
  }
);

export const updateLobby = createAsyncThunk(
  'lobby/update',
  async (lobby, thunkAPI) => {
    try {
      const token = await getStorage('token');
      const res = await updateLobbyService(token, lobby);
      goBack();
      thunkAPI.dispatch(getListLobby());
      return res.data;
    } catch (err) {
      console.log(err);
    }
  }
);

export const deleteLobby = createAsyncThunk(
  'lobby/delete',
  async (id, thunkAPI) => {
    try {
      const token = await getStorage('token');
      const res = await deleteLobbyService(token, id);
      thunkAPI.dispatch(getListLobby());
      return res.data;
    } catch (err) {
      console.log(err);
    }
  }
);

const { reducer, actions } = Looby;
export const {} = actions;
export default reducer;
