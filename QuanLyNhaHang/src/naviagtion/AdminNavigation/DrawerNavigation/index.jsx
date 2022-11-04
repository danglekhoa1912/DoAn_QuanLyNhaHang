import { createDrawerNavigator } from '@react-navigation/drawer';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { CustomDrawer } from '../../../components';
import Colors from '../../../constants/Colors';
import StaffScreens from '../../../screens/staff';
import { adminName, staffName } from '../../../configs/NavigationContants';
import AdminScreens from '../../../screens/admin';

const Drawer = createDrawerNavigator();

function DrawerNavigation() {
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
        name={adminName.homeAdminStack}
        component={AdminScreens.HomeScreen}
      />
      <Drawer.Screen
        options={{
          title: 'Quản lý sảnh',
        }}
        name={adminName.lobbyAdminStack}
        component={AdminScreens.LobbyManagement}
      />
      <Drawer.Screen
        options={{
          title: 'Quản lý món ăn',
        }}
        name={adminName.dishAdminStack}
        component={AdminScreens.DishManagement}
      />

      <Drawer.Screen
        options={{
          title: 'Quản lý dịch vụ',
        }}
        name={adminName.serviceAdminStack}
        component={AdminScreens.ServiceManagement}
      />
      <Drawer.Screen
        options={{
          title: 'Quản lý người dùng',
        }}
        name={adminName.userAdminStack}
        component={AdminScreens.UserManagement}
      />
      <Drawer.Screen
        options={{
          title: 'Quản lý tiệc',
        }}
        name={adminName.bookingAdminStack}
        component={AdminScreens.BookingManagement}
      />
      <Drawer.Screen
        options={{
          title: 'Thống kê doanh thu',
        }}
        name={adminName.revenueStatisticsAdminStack}
        component={AdminScreens.RevenueStatistics}
      />
      <Drawer.Screen
        options={{
          title: 'Góp ý khách hàng',
        }}
        name={adminName.commentAdminStack}
        component={AdminScreens.CommentManagement}
      />
    </Drawer.Navigator>
  );
}

export default DrawerNavigation;
