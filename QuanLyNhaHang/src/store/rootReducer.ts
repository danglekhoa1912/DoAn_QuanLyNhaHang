import {combineReducers} from 'redux';
import userSlice from './user';
import globalSlice from './global';
import lobbySlice from './lobby';
import dishSlice from './dish';
import serviceSlice from './service';
import bookingSlice from './booking';
import profileSlice from './profile';

const rootReducer = combineReducers({
  global: globalSlice,
  user: userSlice,
  dish: dishSlice,
  service: serviceSlice,
  booking: bookingSlice,
  profile: profileSlice,
  lobby: lobbySlice,
});

export default rootReducer;
