import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  getCommentService,
  postCommentService,
} from '../../utils/service/comment';
import { getStorage } from '../../utils/storage';

const Comment = createSlice({
  name: 'Comment',
  initialState: {
    status: 'idle',
    commentList: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getComment.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(getComment.fulfilled, (state, { payload }) => {
      state.commentList = payload;
      state.status = 'idle';
    });
    builder.addCase(postComment.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(postComment.fulfilled, (state, { payload }) => {
      state.status = 'idle';
    });
  },
});

export const getComment = createAsyncThunk('comment/get', async (page) => {
  try {
    const token = await getStorage('token');
    const res = await getCommentService(page, token);
    return res.data;
  } catch (err) {
    console.log(err);
  }
});

export const postComment = createAsyncThunk('comment/post', async (data) => {
  try {
    const token = await getStorage('token');
    const res = await postCommentService(data, token);
    return res.data;
  } catch (err) {
    console.log(err);
  }
});

const { reducer, actions } = Comment;
export const {} = actions;
export default reducer;
