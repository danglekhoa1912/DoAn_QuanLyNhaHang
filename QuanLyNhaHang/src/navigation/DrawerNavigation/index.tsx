import {createDrawerNavigator} from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/MaterialIcons';
import CustomDrawer from '../../components/CustomDrawer';
import {useTheme} from '@ui-kitten/components';
import HomePage from '../../screens/Home';
import {getStorage} from '../../utils/storage';
import {navigate} from '../../utils/navigate';
import {useDispatch} from 'react-redux';
import {AppDispatch} from '../../store';
import {useEffect} from 'react';
import ProfilePage from '../../screens/Profile';
import SettingLanguage from '../../screens/Settinglanguage';
import OrderHistoryPage from '../../screens/OrderHistory';
import {useTranslation} from 'react-i18next';
import {getUser} from '../../store/user/thunkApi';
import analytics from '@react-native-firebase/analytics';

const Drawer = createDrawerNavigator();

function DrawerScreen() {
  const theme = useTheme();
  const dispatch = useDispatch<AppDispatch>();
  const {t} = useTranslation();

  useEffect(() => {
    getStorage('accessToken').then(data => {
      if (!data) navigate('LoginScreen');
      else {
        dispatch(getUser()).then(data => {
          analytics().setUserId(data.payload?.id.toString());
        });
      }
    });
  }, []);

  return (
    <Drawer.Navigator
      drawerContent={props => <CustomDrawer {...props} />}
      screenOptions={{
        title: '',
        drawerActiveBackgroundColor: theme['color-primary-default'],
        drawerActiveTintColor: theme['color-background'],
        drawerStyle: {
          backgroundColor: 'white',
        },
      }}>
      <Drawer.Screen
        options={{
          drawerIcon: ({focused, color}) => (
            <Icon name="feedback" size={22} color={color} />
          ),
          title: `${t('screen.home.title') || ''}`,
        }}
        name="HomeScreen"
        component={HomePage}
      />
      <Drawer.Screen
        options={{
          drawerIcon: ({focused, color}) => (
            <Icon name="person" size={22} color={color} />
          ),
          title: `${t('screen.profile.title') || ''}`,
        }}
        name="ProfileScreen"
        component={ProfilePage}
      />
      <Drawer.Screen
        options={{
          drawerIcon: ({focused, color}) => (
            <Icon name="history" size={22} color={color} />
          ),
          title: `${t('screen.order_history.title') || ''}`,
        }}
        name="HistoryScreen"
        component={OrderHistoryPage}
      />
      <Drawer.Screen
        options={{
          drawerIcon: ({focused, color}) => (
            <Icon name="language" size={22} color={color} />
          ),
          title: `${t('screen.language.title') || ''}`,
        }}
        name="LanguageScreen"
        component={SettingLanguage}
      />
    </Drawer.Navigator>
  );
}

export default DrawerScreen;
