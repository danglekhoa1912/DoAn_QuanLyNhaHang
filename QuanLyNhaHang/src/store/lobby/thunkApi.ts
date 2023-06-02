import {ILobbyStore} from './index';
import {
  ActionReducerMapBuilder,
  createAsyncThunk,
  PayloadAction,
} from '@reduxjs/toolkit';
import {LobbyApi} from '../../apis';
import {ILobbyRes} from '../../type/lobby';
import {ISearchParam} from '../../type/common';
import {withParamsToastCatcher} from '../ToastCatcherWeb';

export const getLobbyById = createAsyncThunk(
  'lobby/getLobbyById',
  async (id: number) => {
    const result = await LobbyApi.getLobbyById(id);
    return result.data;
  },
);

export const addLooby = createAsyncThunk(
  'lobby/addLooby',
  withParamsToastCatcher(async (lobby: ILobbyRes) => {
    const result = await LobbyApi.addLooby(lobby);
    return result;
  }, 'Create lobby successfully'),
);

export const getLobbyList = createAsyncThunk(
  'lobby/getLobbyList',
  async (params: ISearchParam) => {
    const result = await LobbyApi.getLobbyList(params);
    return result.data;
  },
);

export const getLobbyListAdmin = createAsyncThunk(
  'lobby/getLobbyListAdmin',
  async (params: ISearchParam) => {
    const result = await LobbyApi.getLobbyListAdmin(params);
    return result.data;
  },
);

export const updateLobby = createAsyncThunk(
  'lobby/updateLobby',
  withParamsToastCatcher(async (lobby: ILobbyRes) => {
    const result = await LobbyApi.updateLobby(lobby);
    return result;
  }, 'Update lobby successfully'),
);

export const deleteLobby = createAsyncThunk(
  'lobby/deleteLobby',
  async (id: number) => {
    const result = await LobbyApi.deleteLobby(id);
    return result;
  },
);
export const extraReducers = (
  builders: ActionReducerMapBuilder<ILobbyStore>,
) => {
  builders.addCase(
    getLobbyById.fulfilled,
    (state: ILobbyStore, action: PayloadAction<any>) => {
      return action.payload;
    },
  );
};
