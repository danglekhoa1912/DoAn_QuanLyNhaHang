import { createDrawerNavigator } from '@react-navigation/drawer';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { CustomDrawer } from '../../../components';
import Colors from '../../../constants/Colors';
import StaffScreens from '../../../screens/staff';
import { staffName } from '../../../configs/NavigationContants';
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
        name={staffName.homeStaffStack}
        component={AdminScreens.HomeScreen}
      />
      <Drawer.Screen
        options={{
          title: 'Danh sách sảnh',
        }}
        name={staffName.lobbyStaffStack}
        component={StaffScreens.LobbyManagement}
      />
      <Drawer.Screen
        options={{
          title: 'Danh sách món ăn',
        }}
        name={staffName.dishStaffStack}
        component={StaffScreens.DishManagement}
      />
      <Drawer.Screen
        options={{
          title: 'Danh sách dịch vụ',
        }}
        name={staffName.serviceStaffStack}
        component={StaffScreens.ServiceManagement}
      />
      <Drawer.Screen
        options={{
          title: 'Quản lý đặt tiệc',
        }}
        name={staffName.bookingStaffStack}
        component={StaffScreens.BookingManagement}
      />
      <Drawer.Screen
        options={{
          title: 'Góp ý khách hàng',
        }}
        name={staffName.commentStaffStack}
        component={StaffScreens.CommentManagement}
      />
    </Drawer.Navigator>
  );
}

export default DrawerNavigation;
