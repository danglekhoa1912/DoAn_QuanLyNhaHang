import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, AppState} from '../../../../../store';
import {FormControl} from '@mui/material';
import {COLORS} from '../../../../../utils/color';
import {getListService} from '../../../../../store/service/thunkApi';
import {IService} from '../../../../../type/service';
import {
  addServiceToBooking,
  removeServiceToBooking,
} from '../../../../../store/booking';

interface ICardService {
  service: IService;
}

const CardService = ({service}: ICardService) => {
  const pServiceListInMenu = useSelector<AppState, IService[]>(
    state => state.booking.order.service.serviceList,
  );
  const [selected, setSelected] = useState(
    pServiceListInMenu.some(item => item.id == service.id),
  );
  const dispatch = useDispatch<AppDispatch>();

  const onPressService = () => {
    if (selected) {
      dispatch(removeServiceToBooking(service));
    } else {
      dispatch(addServiceToBooking(service));
    }
    setSelected(!selected);
  };

  return (
    <TouchableOpacity
      onPress={onPressService}
      style={{
        padding: 8,
        borderRadius: 6,
        width: 320,
        height: 280,
        shadowOffset: {
          width: 0,
          height: 4,
        },
        shadowOpacity: 0.32,
        shadowRadius: 5.46,
        margin: 16,
        elevation: 9,
        gap: 12,
        borderColor: COLORS.primary,
        borderWidth: selected ? 2 : 0,
      }}>
      <img
        style={{
          width: 300,
          height: 200,
        }}
        src={service.image}
      />
      <Text style={{textAlign: 'center', fontSize: 18}}>{service.name}</Text>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <Text>{service.price}</Text>
        <Text>VND</Text>
      </View>
    </TouchableOpacity>
  );
};

const SelectService = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [search, setSearch] = useState('');
  const [serviceList, setServiceList] = useState<IService[]>([]);

  const pServiceListInBooking = useSelector<AppState, IService[]>(
    state => state.booking.order.service.serviceList,
  );

  useEffect(() => {
    dispatch(
      getListService({
        searchByName: search,
      }),
    ).then(data => {
      setServiceList(data?.payload?.record);
    });
  }, [search]);

  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'row',
      }}>
      <View
        style={{
          flex: 1,
          overflow: 'auto',
          borderRightWidth: 1,
          borderRightColor: COLORS.secondary,
        }}>
        <Text
          style={{
            fontWeight: 'bold',
            fontSize: 20,
            textAlign: 'center',
          }}>
          Service List
        </Text>
        <View>
          {pServiceListInBooking.map(service => (
            <Text
              style={{
                fontWeight: '300',
                fontSize: 14,
                paddingLeft: 8,
                paddingVertical: 4,
              }}>
              {service.name}
            </Text>
          ))}
        </View>
      </View>
      <View
        style={{
          flex: 3,
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'flex-end',
          }}>
          <TextInput
            value={search}
            onChangeText={setSearch}
            style={{
              backgroundColor: '#f3f5f7',
              height: 40,
              width: 240,
              borderRadius: 12,
              marginLeft: 24,
              padding: 12,
            }}
            placeholder="Search"
            placeholderTextColor="gray"
          />
        </View>
        <View
          style={{
            flex: 1,
            marginVertical: 12,
            flexDirection: 'row',
            flexWrap: 'wrap',
            overflow: 'auto',
          }}>
          {serviceList.map(service => (
            <CardService service={service} key={service.id} />
          ))}
        </View>
      </View>
    </View>
  );
};

export default SelectService;

const styles = StyleSheet.create({});
