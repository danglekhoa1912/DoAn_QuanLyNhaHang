import {StyleSheet, Text, TextInput, View} from 'react-native';
import React, {useEffect, useMemo, useRef, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, AppState} from '../../../store';
import {getAllOrder, getOrderHistory} from '../../../store/profile/thunkApi';
import {Button, TabelData} from '../../components';
import {styled} from '@mui/material/styles';
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TableCell,
  tableCellClasses,
} from '@mui/material';
import {
  IOrderHistory,
  IOrderHistoryAdmin,
  ISession,
} from '../../../type/booking';
import {getTypeParty, updateOrderStatus} from '../../../store/booking/thunkApi';
import {getTypeTime} from '../../../store/booking/thunkApi';
import {ITypeParty} from '../../../type/lobby';
import {useNavigate} from 'react-router-dom';
import ModalEdit from './components/ModalEdit';
import {ORDER_STATUS} from '../../../type/booking';
import {convertBookingStatus} from '../../../utils/convertEnum';
import {setResolveBookingId} from '../../../store/global';
import {refundZalo} from '../../../apis/booking';
import moment from 'moment';
import {APP_ID_ZALO} from '../../../utils/constant';

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
  const [bookingList, setBookingList] = useState<IOrderHistoryAdmin[]>([]);
  const [page, setPage] = useState(0);
  const totalItem = useRef<number>(0);
  const dispatch = useDispatch<AppDispatch>();
  const [open, setOpen] = React.useState(false);
  const order = useRef<IOrderHistoryAdmin>();
  const [status, setStatus] = useState(1);

  const navigate = useNavigate();

  const pTypeParty = useSelector<AppState, ITypeParty[]>(
    state => state.booking.typeParty,
  );
  const pTypeSession = useSelector<AppState, ISession[]>(
    state => state.booking.typeTime,
  );

  const pStatusOpts = useMemo(() => {
    return (
      Object.keys(ORDER_STATUS).filter(v => {
        return isNaN(Number(v)) && ORDER_STATUS.DRAW !== ORDER_STATUS[v];
      }) as (keyof typeof ORDER_STATUS)[]
    ).map(status => {
      return {
        id: ORDER_STATUS[status],
        value: ORDER_STATUS[status],
        label: convertBookingStatus(ORDER_STATUS[status]),
      };
    });
  }, []);

  const handleChange = (event: SelectChangeEvent) => {
    setStatus(+event.target.value);
    setPage(0);
  };

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

  const confirmCancelBooking = (data: any) => {
    console.log(data);
    const timestamp = new Date().getTime();
    const uid = timestamp + '' + (111 + Math.random() * 888);
    const mrefundid = moment().format('YYMMDD') + '_' + APP_ID_ZALO + '_' + uid;
    refundZalo(data?.amount, data?.transId, mrefundid, timestamp)
      .then(res => {
        dispatch(
          updateOrderStatus({
            id: data?.id,
            status: ORDER_STATUS.CANCELED,
            transId: mrefundid,
          }),
        ).then(() => {
          handleLoadData();
        });
      })
      .catch(e => {
        console.log(e);
      });
  };

  const handleClose = () => setOpen(false);

  const handleContact = (id: number, bookingId: number) => {
    navigate(`/chat/${id}`);
  };

  const handleConfirmPayment = (data: any) => {
    dispatch(
      updateOrderStatus({
        id: data?.id,
        status: ORDER_STATUS.SUCCESS,
      }),
    ).then(() => {
      handleLoadData();
    });
  };

  const handleConfirmBooking = (data: any) => {
    dispatch(
      updateOrderStatus({
        id: data?.id,
        status:
          data?.typePay === 'Cash'
            ? ORDER_STATUS.WAIT_PAYMENT
            : ORDER_STATUS.SUCCESS,
      }),
    ).then(() => {
      handleLoadData();
    });
  };

  const handleLoadData = () => {
    dispatch(
      getAllOrder({
        page: page + 1,
        status: status,
      }),
    ).then((data: any) => {
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
  }, [page, status]);

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
        <h1>Booking Manager</h1>
        <FormControl
          style={{
            width: 200,
          }}>
          <InputLabel>Status</InputLabel>
          <Select
            style={{
              height: 40,
            }}
            value={status}
            label="Status"
            onChange={handleChange}>
            {pStatusOpts.map(item => (
              <MenuItem key={item.id} value={item.id}>
                {item.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </View>
      <TabelData
        showStatus={false}
        handleSelectItem={handleSelectItem}
        renderData={(data: IOrderHistoryAdmin) => {
          return (
            <>
              <StyledTableCell align={'center'}>
                {data.userId?.name}
              </StyledTableCell>
              <StyledTableCell align={'center'}>
                {data.whId?.name}
              </StyledTableCell>
              <StyledTableCell align={'center'}>
                {data.quantityTable}
              </StyledTableCell>
              <StyledTableCell align={'center'}>
                {data.orderDate}
              </StyledTableCell>
              <StyledTableCell align={'center'}>
                {data.typeParty.nameParty}
              </StyledTableCell>
              <StyledTableCell align={'center'}>
                {/* {
                  pTypeSession.find(session => session.id === data.time)
                    ?.session
                } */}
              </StyledTableCell>
              <StyledTableCell align={'center'}>{data.typePay}</StyledTableCell>
              <StyledTableCell align={'center'}>
                {/* {renderStatusPay(data.paymentstt)} */}
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
          {
            label: 'Contact',
            action: data => {
              handleContact(data?.userId?.id, data?.id);
            },
          },
          {
            label: 'Confirm Booking',
            action: data => {
              handleConfirmBooking(data);
            },
            hidden: status !== ORDER_STATUS.WAIT_CONFIRM,
          },
          {
            label: 'Confirm Cancel',
            action: data => {
              confirmCancelBooking(data);
            },
            hidden: status !== ORDER_STATUS.WAIT_CONFIRM_CANCEL,
          },
          {
            label: 'Confirm Payment',
            action: data => {
              handleConfirmPayment(data);
            },
            hidden: status !== ORDER_STATUS.WAIT_PAYMENT,
          },
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
