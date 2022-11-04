import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import { AntDesign } from '@expo/vector-icons';
import Colors from '../../constants/Colors';
import { goBack } from '../../naviagtion/service';
import { Card } from '../../components';
import TitleAndText from './components/TitleAndText';
import moment from 'moment/moment';
import { useSelector } from 'react-redux';
import { CategorySelector } from '../../redux/selector';
import { DishListByCategory, ItemService } from './components';

const DetailBookingHistoryScreen = ({ route }) => {
  const { order } = route.params;
  const category = useSelector(CategorySelector);
  return (
    <ScrollView style={styles.container}>
      <View>
        <Text style={styles.title}>#{order.id}</Text>
        <View>
          <Card style={styles.container_order_infor}>
            <TitleAndText title='Tên sảnh'>{order.hall}</TitleAndText>
            <TitleAndText title='Số lượng bàn'>
              {order.countTable} bàn
            </TitleAndText>
            <TitleAndText title='Thời gian'>
              {moment(new Date(order.date)).format('DD/MM/YYYY')}-{order.time}
            </TitleAndText>
            <TitleAndText title='Phương thức thanh toán'>
              {order.typePay}
            </TitleAndText>
            <TitleAndText title='Tổng tiền'>{order.price}</TitleAndText>
            <TitleAndText title='Tình trạng thanh toán'>
              {order.paymentstt ? 'Đã thanh toán' : 'Chưa thanh toán'}
            </TitleAndText>
          </Card>
          <View>
            <Text style={styles.mainText}>Danh sách món ắn</Text>
            {category.listCategory.map((item) => (
              <DishListByCategory
                menu={order.dishList}
                key={item.id}
                category={item}
              />
            ))}
          </View>
          <View>
            <Text style={styles.mainText}>Danh sách dịch vụ</Text>
            {order.serviceList.map((service) => (
              <ItemService
                service={service.serviceId}
                key={service.serviceId.id}
              />
            ))}
          </View>
        </View>
      </View>
      <TouchableOpacity
        onPress={() => {
          goBack();
        }}
        style={styles.button_back}
      >
        <AntDesign name='left' size={30} color={Colors.Primary} />
      </TouchableOpacity>
    </ScrollView>
  );
};

export default DetailBookingHistoryScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.Background,
    flex: 1,
    position: 'relative',
    paddingHorizontal: 12,
  },
  button_back: {
    position: 'absolute',
    top: 20,
    left: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingTop: 20,
    color: Colors.Primary,
  },
  mainText: {
    fontSize: 20,
  },
  container_order_infor: {
    width: '100%',
    marginVertical: 12,
  },
});
