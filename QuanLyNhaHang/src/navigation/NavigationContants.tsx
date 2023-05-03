import BookingPage from '../screens/Booking';
import DishPage from '../screens/Dish';
import HomePage from '../screens/Home';
import LobbyPage from '../screens/Lobby';
import LobbyDetailPage from '../screens/LobbyDetail';
import LoginPage from '../screens/Login';
import RegisterPage from '../screens/Register';
import ServicePage from '../screens/Service';
import WelcomePage from '../screens/Welcome';
import DrawerScreen from './DrawerNavigation';

export const privateScreen = [
  {
    name: 'DrawerScreen',
    component: DrawerScreen,
  },
  {
    name: 'HomeScreen',
    component: HomePage,
  },
  {
    name: 'BookingScreen',
    component: BookingPage,
  },
  {
    name: 'DishScreen',
    component: DishPage,
  },
  {
    name: 'LobbyScreen',
    component: LobbyPage,
  },
  {
    name: 'LobbyDetailScreen',
    component: LobbyDetailPage,
  },
  {
    name: 'ServiceScreen',
    component: ServicePage,
  },
];

export const publicScreen = [
  {
    name: 'WelcomeScreen',
    component: WelcomePage,
  },
  {
    name: 'LoginScreen',
    component: LoginPage,
  },
  {
    name: 'RegisterScreen',
    component: RegisterPage,
  },
];
