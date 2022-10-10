import { configureStore } from "@reduxjs/toolkit";
import DishReducer from "./slice/DishSlice";
import CategoryReducer from "./slice/CategorySlice";
import LoobyReducer from "./slice/LobbySlice";
import SearchReducer from "./slice/SearchSlice";
import BookingReducer from "./slice/BookingSlice";

const rootReducer = {
   Dish: DishReducer,
   Category: CategoryReducer,
   Lobby: LoobyReducer,
   Booking: BookingReducer,
   Search: SearchReducer,
};

const store = configureStore({
   reducer: rootReducer,
});

export default store;
