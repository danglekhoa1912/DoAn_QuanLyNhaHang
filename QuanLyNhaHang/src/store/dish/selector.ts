import {createSelector} from '@reduxjs/toolkit';
import {AppState} from '..';
import {ISelectItem} from '../../type/common';

const sCategories = (state: AppState) => state.dish.categories;

export const sCategoryOpts = createSelector(
  sCategories,
  (categories): ISelectItem[] =>
    categories.map(category => ({
      id: category.id,
      value: category.id,
      label: category.name,
    })),
);
