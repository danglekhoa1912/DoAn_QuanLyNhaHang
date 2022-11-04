import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ToastAndroid } from "react-native";
import { stackName } from "../../configs/NavigationContants";
import { navigate, replace } from "../../naviagtion/service";
import { type_pay } from "../../utils/constants";
import {
   addOrderService,
   checkTimeBookingService,
} from "../../utils/service/booking";
import { getTypeTimebyId } from "./TypeTimeSlice";

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
         lobbyPriceByTime: 0,
      },
   },
   reducers: {
      addDishToMenu: (state, action) => {
         state.booking.menu.dishList.push(action.payload);
         state.booking.menu.total += action.payload.price;
      },
      removeDishToMenu: (state, action) => {
         state.booking.menu.dishList = state.booking.menu.dishList.filter(
            (item) => item.id != action.payload.id
         );
         state.booking.menu.total -= action.payload.price;
      },
      addServiceToBooking: (state, action) => {
         state.booking.service.serviceList.push(action.payload);
         state.booking.service.total += action.payload.price;
      },
      removeServiceToBooking: (state, action) => {
         state.booking.service.serviceList =
            state.booking.service.serviceList.filter(
               (item) => item.id != action.payload.id
            );
         state.booking.service.total -= action.payload.price;
      },
      updateTypePay: (state, action) => {
         state.booking.type_pay = action.payload;
      },
   },
   extraReducers: (builder) => {
      builder.addCase(addBooking.pending, (state, { payload }) => {
         state.status = "loading";
      });
      builder.addCase(addBooking.fulfilled, (state, { payload }) => {
         state.status = "idle";
      });
      builder.addCase(updateBooking.pending, (state) => {
         state.status = "loading";
      });
      builder.addCase(updateBooking.fulfilled, (state, { payload }) => {
         if (payload) {
            const newState = { ...state.booking, ...payload };
            return { ...state, booking: newState, status: "idle" };
         } else {
            state.status = "invalidTime";
         }
      });
   },
});

export const addBooking = createAsyncThunk("booking/add", async (order) => {
   try {
      const res = await addOrderService(order);
      if (res.data) {
         ToastAndroid.show("Đặt chỗ thành công!", ToastAndroid.LONG);
         replace(stackName.drawerScreenStack);
      }
      return res.data;
   } catch (err) {
      console.log(err);
   }
});

export const updateBooking = createAsyncThunk(
   "booking/update",
   async (payload) => {
      try {
         const res = await checkTimeBookingService({
            date: payload.date,
            time: payload.time,
            lobbyId: payload.lobby.id,
         });
         if (res.data) {
            navigate(stackName.dishScreenStack);
            const typeTime = await getTypeTimebyId(payload.time);
            return {
               ...payload,
               lobbyPriceByTime: payload.lobby.price * typeTime.price,
            };
         } else {
            return null;
         }
      } catch (err) {
         console.log(err);
      }
   }
);

const { reducer, actions } = Booking;
export const {
   addDishToMenu,
   removeDishToMenu,
   updateTypePay,
   addServiceToBooking,
   removeServiceToBooking,
} = actions;
export default reducer;
