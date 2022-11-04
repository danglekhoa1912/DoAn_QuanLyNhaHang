import { createDrawerNavigator } from '@react-navigation/drawer';
import { CustomDrawer } from '../../components';
import { drawerName } from '../../configs/NavigationContants';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import Screens from '../../screens';
import Colors from '../../constants/Colors';

const Drawer = createDrawerNavigator();

function DrawerScreenStack() {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawer {...props} />}
      screenOptions={{
        title: '',
        drawerActiveBackgroundColor: Colors.Primary,
        drawerActiveTintColor: Colors.Background,
        drawerStyle: { backgroundColor: Colors.Background },
      }}
    >
      <Drawer.Screen
        options={{
          drawerIcon: ({ focused, color }) => (
            <Ionicons name='home-outline' size={22} color={color} />
          ),
          title: 'Trang chủ',
        }}
        name={drawerName.homeDrawer}
        component={Screens.HomeScreen}
      />
      <Drawer.Screen
        options={{
          drawerIcon: ({ focused, color }) => (
            <Ionicons name='person-circle-outline' size={22} color={color} />
          ),
          title: 'Hồ sơ',
        }}
        name={drawerName.profileDrawer}
        component={Screens.ProfileScreen}
      />
      <Drawer.Screen
        options={{
          drawerIcon: ({ focused, color }) => (
            <MaterialIcons name='history' size={22} color={color} />
          ),
          title: 'Lịch sử đặt chỗ',
        }}
        name={drawerName.bookingHistoryDrawer}
        component={Screens.BookingHistoryScreen}
      />
      <Drawer.Screen
        options={{
          drawerIcon: ({ focused, color }) => (
            <MaterialIcons name='feedback' size={22} color={color} />
          ),
          title: 'Góp ý',
        }}
        name={drawerName.commentDrawer}
        component={Screens.CommentScreen}
      />
    </Drawer.Navigator>
  );
}

export default DrawerScreenStack;
