import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { Dimensions, Image, StyleSheet, View } from "react-native";
import { Logo } from "../../../assets/images";
import { tabName } from "../../configs/NavigationContants";
import Colors from "../../constants/Colors";
import Screens from "../../screens";

const Tab = createMaterialTopTabNavigator();
const { height, width } = Dimensions.get("screen");
console.log(height, width);

const TopTabNavigation = () => {
   return (
      <>
         <View style={styles.container_image}>
            <Image source={Logo} />
         </View>
         <Tab.Navigator
            screenOptions={{
               tabBarAllowFontScaling: true,
               tabBarActiveTintColor: Colors.TextColor,
               tabBarLabelStyle: {
                  fontWeight: "bold",
                  fontSize: 18,
               },
               tabBarContentContainerStyle: {
                  backgroundColor: Colors.Background,
               },
            }}
         >
            <Tab.Screen
               options={{ title: "Login" }}
               name={tabName.loginTab}
               component={Screens.LoginScreen}
            />
            <Tab.Screen
               options={{ title: "Sign-Up" }}
               name={tabName.registerTab}
               component={Screens.RegisterScreen}
            />
         </Tab.Navigator>
      </>
   );
};

export default TopTabNavigation;

const styles = StyleSheet.create({
   container_image: {
      backgroundColor: Colors.Background,
      justifyContent: "center",
      alignItems: "center",
      height: width / 1.5,
   },
});
