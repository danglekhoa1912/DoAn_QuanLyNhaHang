import {createSelector} from '@reduxjs/toolkit';
import {AppState} from '..';

const getToken = (state: AppState) => state.user.token;

export const sToken = createSelector(getToken, (token: string) => {
  return token;
});
