import {createSelector} from '@reduxjs/toolkit';
import {AppState} from '..';
import {ISelectItem} from '../../type/common';

const sBooking = (state: AppState) => state.booking;

export const sCountDishInMenu = createSelector(sBooking, booking => {
  return booking.order.menu.dishList.length;
});

const sTypeTime = (state: AppState) => state.booking.typeTime;

export const sTypeTimeOpts = createSelector(sTypeTime, (type): ISelectItem[] =>
  type.map(item => ({
    id: item.id,
    value: item.id,
    label: item.session,
  })),
);

const sTypeParty = (state: AppState) => state.booking.typeParty;

export const sTypePartyOpts = createSelector(
  sTypeParty,
  (type): ISelectItem[] =>
    type.map(item => ({
      id: item.id,
      value: item.id,
      label: item.nameParty,
    })),
);
