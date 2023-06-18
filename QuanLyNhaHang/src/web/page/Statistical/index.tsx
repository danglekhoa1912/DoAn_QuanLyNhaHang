import React, {useEffect, useMemo, useState} from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import {Bar} from 'react-chartjs-2';
import {
  getStatisticalCurrentMonth,
  getStatisticalRangeMonth,
} from '../../../apis/statistical';
import {IStatistical} from '../../../type/statistical';
import {StyleSheet, Text, View} from 'react-native';
import {DatePicker} from '@mui/x-date-pickers';
import {FormControl, InputLabel, MenuItem, Select} from '@mui/material';
import moment, {Moment, months} from 'moment';
import {Button} from '../../components';
import {Controller, useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';

const schema = yup
  .object({
    start: yup
      .date()
      .typeError('Please select a start date')
      .required('Please select a start date'),
    end: yup
      .date()
      .typeError('Please select a end date')
      .required('Please select a end date')
      .test(
        'end',
        'The end date must be greater than end date',
        (value, context) => {
          return moment(value).isAfter(moment(context.parent.start));
        },
      ),
    //   .default(null)
    //   .when(
    //     'start',
    //     (start, schema) =>
    //       start &&
    //       schema.min(start, 'The end date must be greater than end date'),
    //   ),
  })
  .required();

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

export const optionsRevenue = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'Revenue Statistics By Lobby',
    },
  },
};

export const optionsCountBooking = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'Statistics On The Number Of Halls Booked',
    },
  },
};

function Statistical() {
  const [statisticalList, setStatisticalList] = useState<IStatistical[]>([]);
  const [timeStatistical, setTimeStatistical] = useState(1);

  const {control, reset, handleSubmit, getValues, formState} = useForm({
    defaultValues: {
      start: '',
      end: '',
    },
    resolver: yupResolver(schema),
  });

  const labels = useMemo(() => {
    return statisticalList?.map(item => item.name);
  }, [statisticalList]);

  const timeStatisticalOpts = [
    {
      id: 1,
      value: 1,
      label: 'Statistical current month',
    },
    {
      id: 2,
      value: 2,
      label: 'Statistical by date optional',
    },
  ];

  const dataRevenue = useMemo(() => {
    return {
      labels,
      datasets: [
        {
          label: 'Revenue',
          data: statisticalList?.map(item => item.total),
          backgroundColor: 'rgba(255, 99, 132, 0.5)',
        },
      ],
    };
  }, [labels]);

  const dataQuantity = useMemo(() => {
    return {
      labels,
      datasets: [
        {
          label: 'Quantity',
          data: statisticalList?.map(item => item.count),
          backgroundColor: 'rgba(255, 99, 132, 0.5)',
        },
      ],
    };
  }, [labels]);

  const onSubmit = (data: any) => {
    getStatisticalRangeMonth({
      start: moment(data.start),
      end: moment(data?.end),
    }).then(data => {
      setStatisticalList(data.data);
    });
  };

  useEffect(() => {
    if (timeStatistical === 1)
      getStatisticalCurrentMonth().then(data => {
        setStatisticalList(data.data);
      });
  }, [timeStatistical]);

  return (
    <View>
      <View
        style={{
          flexDirection: 'row',
          gap: 30,
        }}>
        <FormControl
          style={{
            width: 200,
          }}>
          <InputLabel>Time</InputLabel>
          <Select
            defaultValue=""
            style={{
              height: 40,
            }}
            value={timeStatistical}
            label="Time"
            onChange={e => {
              setTimeStatistical(+e.target.value);
              control._reset();
            }}>
            {timeStatisticalOpts.map(item => (
              <MenuItem key={item.id} value={item.id}>
                {item.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        {timeStatistical === 2 && (
          <View
            style={{
              flexDirection: 'row',
              gap: 30,
            }}>
            <Controller
              control={control}
              name="start"
              render={({field: {value, onChange}, fieldState: {error}}) => (
                <View>
                  <DatePicker
                    label="Start"
                    value={moment(value)}
                    onChange={onChange}
                    format="DD/MM/YYYY"
                  />
                  {error && (
                    <Text style={styles.error_text}>*{error?.message}</Text>
                  )}
                </View>
              )}
            />

            <Controller
              control={control}
              name="end"
              render={({field: {value, onChange}, fieldState: {error}}) => (
                <View>
                  <DatePicker
                    label="End"
                    value={moment(value)}
                    onChange={onChange}
                    format="DD/MM/YYYY"
                  />
                  {error && (
                    <Text style={styles.error_text}>*{error?.message}</Text>
                  )}
                </View>
              )}
            />
            <Button onPress={handleSubmit(onSubmit)} title="Statistical" />
          </View>
        )}
      </View>
      <View
        style={{
          gap: 20,
        }}>
        <Bar options={optionsRevenue} data={dataRevenue} />;
        <Bar options={optionsCountBooking} data={dataQuantity} />;
      </View>
    </View>
  );
}

export default Statistical;

const styles = StyleSheet.create({
  error_text: {
    color: 'red',
  },
});
