import { Dimensions, ScrollView, StyleSheet, Text, View } from 'react-native';
import React, { Fragment, useCallback, useEffect, useState } from 'react';
import { PieChart } from 'react-native-chart-kit';
import DropDownPicker from 'react-native-dropdown-picker';
import CusPickDate from '../../../components/CusPickDate';
import { useForm } from 'react-hook-form';
import { ActivityIndicator, CusButton } from '../../../components';
import Colors, { RevenueColor } from '../../../constants/Colors';
import { useDispatch, useSelector } from 'react-redux';
import {
  getRevenueLastMonth,
  getRevenueMonth,
  getRevenueRangeMonth,
} from '../../../redux/slice/RevenueSlice';
import { revenueSelector } from '../../../redux/selector';

const RevenueStatistics = () => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(1);
  const revenue = useSelector(revenueSelector);
  const dispatch = useDispatch();

  const itemList = [
    {
      label: 'Doanh thu tháng hiện tại',
      value: 1,
    },
    {
      label: 'Doanh thu tháng trước',
      value: 2,
    },
    {
      label: 'Doanh thu theo tháng',
      value: 3,
    },
  ];

  const chartConfig = {
    color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
    barPercentage: 0.5,
  };

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      start: new Date(),
      end: new Date(),
    },
  });

  const onSubmit = (data) => {
    dispatch(getRevenueRangeMonth(data));
  };
  useEffect(() => {
    if (value === 1) dispatch(getRevenueMonth());
    else if (value === 2) dispatch(getRevenueLastMonth());
  }, [value]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <DropDownPicker
        listMode='SCROLLVIEW'
        open={open}
        value={value}
        items={itemList}
        setOpen={setOpen}
        setValue={setValue}
        onSelectItem={(item) => setValue(item.value)}
        containerStyle={styles.dropdown}
      />

      {value === 3 && (
        <Fragment>
          <View style={styles.container_date}>
            <View>
              <Text>Từ</Text>
              <CusPickDate
                control={control}
                errors={errors.start}
                label='start'
              />
            </View>
            <View>
              <Text>Đến</Text>
              <CusPickDate control={control} errors={errors.end} label='end' />
            </View>
          </View>
          <CusButton
            buttonColor={Colors.Primary}
            textColor={Colors.Background}
            onPress={handleSubmit(onSubmit)}
            styleButton={styles.button}
            styleText={styles.button_text}
          >
            Thống kê
          </CusButton>
        </Fragment>
      )}
      {revenue.status === 'loading' ? (
        <ActivityIndicator />
      ) : (
        <View>
          {!revenue.count ? (
            <Text>Chưa có tiệc được đặt trong khoảng thời gian này</Text>
          ) : (
            <Fragment>
              <Text style={styles.title}>Thống kê theo số lượng tiệc</Text>
              <PieChart
                data={revenue.revenue.map((data, index) => ({
                  name: data.name,
                  booking: data.count,
                  legendFontColor: Colors.Gray,
                  legendFontSize: 15,
                  color: RevenueColor[index],
                }))}
                width={Dimensions.get('window').width}
                height={250}
                chartConfig={chartConfig}
                accessor={'booking'}
                backgroundColor={'transparent'}
                absolute
              />
              <Text style={styles.text}>Tổng tiệc: {revenue.count}</Text>
              <Text style={styles.title}>Thống kê theo doanh thu</Text>
              <PieChart
                data={revenue.revenue.map((data, index) => ({
                  name: data.name,
                  total: data.total,
                  legendFontColor: Colors.Gray,
                  legendFontSize: 15,
                  color: RevenueColor[index],
                }))}
                width={Dimensions.get('window').width}
                height={250}
                chartConfig={chartConfig}
                accessor={'total'}
                backgroundColor={'transparent'}
                absolute
              />
              <Text style={styles.text}>
                Tổng doanh thu: {revenue.total} VND
              </Text>
            </Fragment>
          )}
        </View>
      )}
    </ScrollView>
  );
};

export default RevenueStatistics;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 12,
    paddingBottom: 20,
  },
  dropdown: {
    width: '100%',
    marginVertical: 20,
  },
  container_date: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  container_content: {},
  text: {
    fontSize: 18,
    paddingVertical: 5,
    textAlign: 'center',
  },
  button: {
    alignItems: 'center',
    paddingVertical: 10,
  },
  button_text: {
    fontSize: 18,
    fontWeight: '600',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.Primary,
    textAlign: 'center',
  },
});
