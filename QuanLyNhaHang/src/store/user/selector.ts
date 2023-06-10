import {createSelector} from '@reduxjs/toolkit';
import {AppState} from '..';

const getToken = (state: AppState) => state.user.token;

export const sToken = createSelector(getToken, (token: string) => {
  return token;
});

export const isAdmin = createSelector(
  (state: AppState) => state,
  state => {
    return state.user.user.role === 'ROLE_ADMIN';
  },
);
