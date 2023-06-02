import {createSlice} from '@reduxjs/toolkit';
import {IILoobyBooked, ILobby} from '../../type/lobby';
import {reducer} from './reducer';
import {extraReducers} from './thunkApi';

export interface ILobbyStore {
  weddingHall: ILobby;
  weddingHallDetails: IILoobyBooked[];
}

const initialState = {
  weddingHall: {
    capacity: 0,
    describe: '',
    id: 0,
    image: '',
    name: '',
    price: 0,
    status: '',
    image360: '',
  },
  weddingHallDetails: [],
} as ILobbyStore;

const lobbySlice = createSlice({
  name: 'lobby',
  initialState,
  reducers: reducer,
  extraReducers: extraReducers,
});

export const {} = lobbySlice.actions;

export default lobbySlice.reducer;
