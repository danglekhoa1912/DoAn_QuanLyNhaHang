import {Platform} from 'react-native';
import {setupInterceptors} from './interceptor';
import axios from 'axios';
export * as BookingApi from './booking';
export * as DishApi from './dish';
export * as LobbyApi from './lobby';
export * as ServiceApi from './service';
export * as UserApi from './user';

const AxiosClient = axios.create({
  baseURL:
    Platform.OS === 'web'
      ? process.env.REACT_APP_BASE_URL_WEB
      : process.env.REACT_APP_BASE_URL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

setupInterceptors(AxiosClient);

export default AxiosClient;
