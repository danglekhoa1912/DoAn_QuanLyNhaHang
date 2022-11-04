import { configureStore } from '@reduxjs/toolkit';
import DishReducer from './slice/DishSlice';
import CategoryReducer from './slice/CategorySlice';
import LoobyReducer from './slice/LobbySlice';
import SearchReducer from './slice/SearchSlice';
import BookingReducer from './slice/BookingSlice';
import UserReducer from './slice/UserSlice';
import ServiceReducer from './slice/ServiceSlice';
import TypePartyReducer from './slice/TypePartySlice';
import TypeTimeReducer from './slice/TypeTimeSlice';
import UserListReducer from './slice/UserListSlice';
import BookingListReducer from './slice/BookingListSlice';
import RevenueReducer from './slice/RevenueSlice';
import CommentReducer from './slice/CommenrSlice';

const rootReducer = {
  Dish: DishReducer,
  Category: CategoryReducer,
  Lobby: LoobyReducer,
  Booking: BookingReducer,
  Search: SearchReducer,
  User: UserReducer,
  Service: ServiceReducer,
  TypeParty: TypePartyReducer,
  TypeTime: TypeTimeReducer,
  UserList: UserListReducer,
  BookingList: BookingListReducer,
  Revenue: RevenueReducer,
  Comment: CommentReducer,
};

const store = configureStore({
  reducer: rootReducer,
});

export default store;
