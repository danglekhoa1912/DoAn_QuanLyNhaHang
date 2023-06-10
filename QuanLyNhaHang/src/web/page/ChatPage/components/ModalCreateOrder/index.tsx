import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '../../../../components/Modal';
import {View} from 'react-native';
import SelectLobby from '../SelectLobby';
import * as yup from 'yup';
import _ from 'lodash';
import {useForm} from 'react-hook-form';
import {IFormBooking, ORDER_STATUS} from '../../../../../type/booking';
import moment from 'moment';
import {yupResolver} from '@hookform/resolvers/yup';
import {updateInfoBooking} from '../../../../../store/booking';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, AppState} from '../../../../../store';
import SelectDish from '../SelectDish';
import SelectService from '../SelectService';
import Confirm from '../Confirm';
import {COLORS} from '../../../../../utils/color';
import {
  addOrder,
  getTypeParty,
  getTypeTime,
} from '../../../../../store/booking/thunkApi';
import {IDish} from '../../../../../type/dish';
import {IService} from '../../../../../type/service';
import {useParams} from 'react-router-dom';
import {send} from 'process';

const steps = ['Select Lobby', 'Select Dish', 'Select Service', 'Confirm'];

const schema = yup
  .object({
    time: yup.object().test('checkEmpty', 'Test' || '', value => {
      return !_.isEmpty(value);
    }),
    type_party: yup.object().test('checkEmpty', 'Test' || '', value => {
      return !_.isEmpty(value);
    }),
    quantityTable: yup
      .number()
      .required('Test' || '')
      .min(1, 'Test' || ''),
    // .max(
    //   pLobbyInOrder.capacity,
    //   `${'Test'} ${pLobbyInOrder.capacity}` || '',
    // ),
  })
  .required();

interface IModalCreateOrder {
  handleClose: () => void;
  open: boolean;
  onSend: (id?: number) => Promise<void>;
}

export default function ModalCreateOrder({
  handleClose,
  open,
  onSend,
}: IModalCreateOrder) {
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set<number>());
  const dispatch = useDispatch<AppDispatch>();
  const pDetailBooking = useSelector<AppState, any>(
    state => state.booking.order,
  );

  let {userId} = useParams();
  const {
    control,
    handleSubmit,
    formState: {errors},
    watch,
    reset,
  } = useForm<IFormBooking>({
    defaultValues: {
      date: moment(new Date()).add(1, 'd').toDate(),
      quantityTable: 0,
      time: {},
      type_party: {},
      lobby: {},
    },
    resolver: yupResolver(schema),
  });

  const isStepOptional = (step: number) => {
    return step === 2;
  };

  const isStepSkipped = (step: number) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep(prevActiveStep => prevActiveStep + 1);
    setSkipped(newSkipped);
    if (activeStep === steps.length - 1) {
      dispatch(
        addOrder({
          orderDate: pDetailBooking.date,
          amount: 1000,
          idUser: +(userId || 0),
          menu: pDetailBooking.menu.dishList.map((dish: IDish) => dish.id),
          note: '',
          status: ORDER_STATUS.DRAW,
          pwtId: pDetailBooking.time.value,
          quantity: pDetailBooking.quantityTable,
          service: pDetailBooking.service.serviceList.map(
            (service: IService) => service.id,
          ),
          type_party: pDetailBooking.type_party.value,
          whId: pDetailBooking.lobby.id,
          typePay: pDetailBooking.type_pay,
        }),
      ).then((data: any) => {
        onSend(data?.payload?.data?.id);
      });

      handleClose();
    }
  };

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep(prevActiveStep => prevActiveStep + 1);
    setSkipped(prevSkipped => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const renderContent = (step: number) => {
    switch (step) {
      case 0:
        return <SelectLobby control={control} />;
      case 1:
        return <SelectDish />;
      case 2:
        return <SelectService />;
      case 3:
        return <Confirm />;
      default:
        return <SelectLobby control={control} />;
    }
  };

  const onSubmitSelectLooby = (data: IFormBooking) => {
    dispatch(updateInfoBooking(data));
    handleNext();
  };

  React.useEffect(() => {
    dispatch(getTypeParty());
    dispatch(getTypeTime());
  }, []);

  React.useEffect(() => {
    if (!open) setActiveStep(0);
  }, [open]);

  return (
    <Modal
      minWidth={'80%'}
      height={'80%'}
      isShowFooter={false}
      open={open}
      cancelButton={{
        onClick: handleClose,
      }}
      header={{title: 'Create Order'}}>
      <View
        style={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
        }}>
        <Stepper activeStep={activeStep}>
          {steps.map((label, index) => {
            const stepProps: {completed?: boolean} = {};
            const labelProps: {
              optional?: React.ReactNode;
            } = {};
            if (isStepOptional(index)) {
              labelProps.optional = (
                <Typography variant="caption">Optional</Typography>
              );
            }
            if (isStepSkipped(index)) {
              stepProps.completed = false;
            }
            return (
              <Step key={label} {...stepProps}>
                <StepLabel {...labelProps}>{label}</StepLabel>
              </Step>
            );
          })}
        </Stepper>
        <React.Fragment>
          <View
            style={{
              flex: 1,
            }}>
            {renderContent(activeStep)}
          </View>
          <Box sx={{display: 'flex', flexDirection: 'row', paddingY: 1}}>
            <Button
              style={{
                backgroundColor: 'white',
                borderColor: 'black',
                borderWidth: 1,
                borderStyle: 'solid',
                color: 'black',
              }}
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{mr: 1}}>
              Back
            </Button>
            <Box sx={{flex: '1 1 auto'}} />
            {isStepOptional(activeStep) && (
              <Button
                style={{
                  backgroundColor: 'white',
                  borderColor: COLORS.secondary,
                  borderWidth: 1,
                  borderStyle: 'solid',
                  color: COLORS.secondary,
                }}
                onClick={handleSkip}
                sx={{mr: 1}}>
                Skip
              </Button>
            )}
            <Button
              style={{
                backgroundColor: COLORS.primary,
                color: 'white',
              }}
              onClick={
                activeStep ? handleNext : handleSubmit(onSubmitSelectLooby)
              }>
              {activeStep === steps.length - 1 ? 'Send' : 'Next'}
            </Button>
          </Box>
        </React.Fragment>
      </View>
    </Modal>
  );
}
