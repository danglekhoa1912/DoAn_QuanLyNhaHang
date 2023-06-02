import {StyleSheet, Text, TextInput, View} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, AppState} from '../../../store';
import {getOrderHistory} from '../../../store/profile/thunkApi';
import {Button, TabelData} from '../../components';
import {styled} from '@mui/material/styles';
import {TableCell, tableCellClasses} from '@mui/material';
import {IOrderHistory, ISession} from '../../../type/booking';
import {getTypeParty} from '../../../store/booking/thunkApi';
import {getTypeTime} from '../../../store/booking/thunkApi';
import {ITypeParty} from '../../../type/lobby';
import {useNavigate} from 'react-router-dom';
import ModalEdit from './components/ModalEdit';

const StyledTableCell = styled(TableCell)(({theme}) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '#f8f8f9',
    color: theme.palette.common.black,
    padding: 12,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: theme.typography.body1,
    height: 50,
  },
}));

const BookingManager = () => {
  const [bookingList, setBookingList] = useState<IOrderHistory[]>([]);
  const [page, setPage] = useState(0);
  const [search, setSearch] = useState('');
  const totalItem = useRef<number>(0);
  const dispatch = useDispatch<AppDispatch>();
  const [open, setOpen] = React.useState(false);
  const order = useRef<IOrderHistory>();

  const navigate = useNavigate();

  const pTypeParty = useSelector<AppState, ITypeParty[]>(
    state => state.booking.typeParty,
  );
  const pTypeSession = useSelector<AppState, ISession[]>(
    state => state.booking.typeTime,
  );

  const handleChangePage = (event: any, newPage: number) => {
    setPage(newPage);
  };

  const handleSelectItem = (data: any) => {
    order.current = data;
  };

  const viewDetail = (data: any) => {
    setOpen(true);
    order.current = data;
  };

  const handleClose = () => setOpen(false);

  const handleLoadData = () => {
    dispatch(
      getOrderHistory({
        page: page + 1,
        searchByName: search,
      }),
    ).then((data: any) => {
      console.log(data.payload.data.record);
      setBookingList(data.payload.data.record);
      totalItem.current = data.payload.data.totalRecord;
    });
  };

  const renderStatusPay = (isPay: boolean) => {
    if (isPay) {
      return (
        <Text
          style={[
            styles.statusPay,
            {
              backgroundColor: '#6BA80C',
            },
          ]}>
          Paid
        </Text>
      );
    }
    return (
      <Text
        style={[
          styles.statusPay,
          {
            backgroundColor: '#F74340',
          },
        ]}>
        Unpaid
      </Text>
    );
  };

  useEffect(() => {
    handleLoadData();
  }, [page, search]);

  useEffect(() => {
    dispatch(getTypeParty());
    dispatch(getTypeTime());
  }, []);

  return (
    <View
      style={{
        flex: 1,
        paddingHorizontal: 30,
      }}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <h1>Booking Manager</h1>
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
      </View>
      <TabelData
        handleSelectItem={handleSelectItem}
        renderData={data => {
          return (
            <>
              <StyledTableCell align={'center'}>
                {data.username}
              </StyledTableCell>
              <StyledTableCell align={'center'}>{data.hall}</StyledTableCell>
              <StyledTableCell align={'center'}>
                {data.countTable}
              </StyledTableCell>
              <StyledTableCell align={'center'}>{data.date}</StyledTableCell>
              <StyledTableCell align={'center'}>
                {
                  pTypeParty.find(party => party.id === data.typeParty)
                    ?.nameParty
                }
              </StyledTableCell>
              <StyledTableCell align={'center'}>
                {
                  pTypeSession.find(session => session.id === data.time)
                    ?.session
                }
              </StyledTableCell>
              <StyledTableCell align={'center'}>{data.typePay}</StyledTableCell>
              <StyledTableCell align={'center'}>
                {renderStatusPay(data.paymentstt)}
              </StyledTableCell>
            </>
          );
        }}
        currentPage={page}
        onChangePage={handleChangePage}
        totalItem={totalItem.current}
        data={bookingList}
        menu={[
          {label: 'Detail', action: viewDetail},
          {label: 'Remove', action: () => {}},
        ]}
        rowTitle={[
          {label: '#', minWidth: 10},
          {label: 'Customer', minWidth: 70},
          {label: 'Lobby', minWidth: 50},
          {label: 'Quantity', minWidth: 50},
          {label: 'Booking Date', minWidth: 60},
          {label: 'Party Type', minWidth: 10},
          {label: 'Time', minWidth: 10},
          {label: 'Type Pay', minWidth: 10},
          {label: 'Payment Status', minWidth: 10},
          {label: 'Action', minWidth: 10},
        ]}
      />
      <ModalEdit
        onReLoadData={handleLoadData}
        data={order.current}
        open={open}
        handleClose={handleClose}
      />
    </View>
  );
};

export default BookingManager;

const styles = StyleSheet.create({
  statusPay: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 25,
    fontSize: 12,
    color: 'white',
  },
});
