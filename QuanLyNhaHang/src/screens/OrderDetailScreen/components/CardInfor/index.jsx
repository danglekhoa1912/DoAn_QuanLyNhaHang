import { StyleSheet } from "react-native";
import React from "react";
import { Card } from "../../../../components";
import Text from "../Text";

const CardInfor = () => {
   return (
      <Card style={styles.container_infor_user}>
         <Text bold>Thông tin cá nhân</Text>
         <Text>Tên khách hàng: Đăng Khoa</Text>
         <Text>Email: dangkhoa123@gmail.com</Text>
         <Text>Số điện thoại: 0972257654</Text>
      </Card>
   );
};

export default CardInfor;

const styles = StyleSheet.create({
   container_infor_user: {
      width: "100%",
      padding: 12,
   },
});
