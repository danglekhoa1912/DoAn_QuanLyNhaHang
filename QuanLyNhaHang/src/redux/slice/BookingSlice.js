import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { type_pay } from "../../utils/constants";

const Booking = createSlice({
   name: "Booking",
   initialState: {
      status: "idle",
      booking: {
         menu: {
            dishList: [],
            total: 0,
         },
         service: {
            serviceList: [],
            total: 0,
         },
         date: 0,
         lobby: {},
         time: "",
         quantityTable: 0,
         type_pay: type_pay.Cash.type,
         total: 0,
      },
   },
   reducers: {
      addDishToMenu: (state, action) => {
         state.booking.menu.dishList.push(action.payload);
         state.booking.menu.total += action.payload.price;
         state.booking.total += action.payload.price;
      },
      removeDishToMenu: (state, action) => {
         state.booking.menu.dishList = state.booking.menu.dishList.filter(
            (item) => item.id != action.payload.id
         );
         state.booking.menu.total -= action.payload.price;
         state.booking.total -= action.payload.price;
      },
      updateBooking: (state, action) => {
         state.booking = action.payload;
      },
      updateTypePay: (state, action) => {
         state.booking.type_pay = action.payload;
         console.log(state.booking);
      },
   },
   extraReducers: (builder) => {},
});

const { reducer, actions } = Booking;
export const { addDishToMenu, removeDishToMenu, updateBooking, updateTypePay } =
   actions;
export default reducer;
