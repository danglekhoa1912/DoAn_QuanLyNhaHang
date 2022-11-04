import { createSelector } from '@reduxjs/toolkit';

export const menuSelector = (state) => state.Booking.booking.menu;
export const CategorySelector = (state) => state.Category;
export const bookingSelector = (state) => state.Booking.booking;
export const bookingStatusSelector = (state) => state.Booking.status;
export const lobbySelector = (state) => state.Lobby;
export const dishSelector = (state) => state.Dish;
export const searchSelector = (state) => state.Search;
export const userSelector = (state) => state.User;
export const serviceSelector = (state) => state.Service;
export const typeTimeSelector = (state) => state.TypeTime;
export const typePartySelector = (state) => state.TypeParty;
export const userListSelector = (state) => state.UserList;
export const bookingListSelector = (state) => state.BookingList;
export const revenueSelector = (state) => state.Revenue;
export const commentSelector = (state) => state.Comment;

export const searchDishSelector = createSelector(
  dishSelector,
  searchSelector,
  (dish, search) => {
    return dish.listDish.filter((dish) => {
      const lowerCaseDish = dish.name.toLowerCase();
      const lowerCaseSearch = search.toLowerCase();
      return lowerCaseDish.includes(lowerCaseSearch);
    });
  }
);

export const searchLobbySelector = createSelector(
  lobbySelector,
  searchSelector,
  (lobby, search) => {
    console.log(search);
    return lobby.listLobby.filter((lobby) => {
      const lowerCaseLobby = lobby.name.toLowerCase();
      const lowerCaseSearch = search.search.toLowerCase();
      return lowerCaseLobby.includes(lowerCaseSearch);
    });
  }
);
