import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const Search = createSlice({
  name: 'Search',
  initialState: '',
  reducers: {
    changeSearch: (state, action) => {
      return action.payload;
    },
  },
  extraReducers: (builder) => {},
});

const { reducer, actions } = Search;
export const { changeSearch } = actions;
export default reducer;
