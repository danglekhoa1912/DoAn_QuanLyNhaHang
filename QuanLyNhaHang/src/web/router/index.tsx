import {IRoute} from '../../type/common';
import BookingManager from '../page/BookingManager';
import DishManager from '../page/DishManager';
import LobbyManager from '../page/LobbyManager';
import ServiceManager from '../page/ServiceManager';
import UserManager from '../page/UserManager';

export const ADMIN_ROUTES: IRoute[] = [
  {
    label: 'Dish Manager',
    path: 'dish-manager',
    element: <DishManager />,
  },
  {
    label: 'Lobby Manager',
    path: 'lobby-manager',
    element: <LobbyManager />,
  },
  {
    label: 'Service Manager',
    path: 'service-manager',
    element: <ServiceManager />,
  },
  {
    label: 'Booking Manager',
    path: 'booking-manager',
    element: <BookingManager />,
  },
  {
    label: 'User Manager',
    path: 'user-manager',
    element: <UserManager />,
  },
];

export const STAFF_ROUTES: IRoute[] = [
  {
    label: 'Dish Manager',
    path: 'dish-manager',
    element: <DishManager />,
  },
  {
    label: 'Lobby Manager',
    path: 'lobby-manager',
    element: <LobbyManager />,
  },
  {
    label: 'Service Manager',
    path: 'service-manager',
    element: <ServiceManager />,
  },
  {
    label: 'Booking Manager',
    path: 'booking-manager',
    element: <BookingManager />,
  },
];
