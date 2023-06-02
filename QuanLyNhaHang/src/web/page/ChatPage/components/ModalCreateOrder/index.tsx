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
import {IFormBooking} from '../../../../../type/booking';
import moment from 'moment';
import {yupResolver} from '@hookform/resolvers/yup';
import {updateInfoBooking} from '../../../../../store/booking';
import {useDispatch} from 'react-redux';
import {AppDispatch} from '../../../../../store';
import SelectDish from '../SelectDish';

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
}

export default function ModalCreateOrder({
  handleClose,
  open,
}: IModalCreateOrder) {
  const [activeStep, setActiveStep] = React.useState(1);
  const [skipped, setSkipped] = React.useState(new Set<number>());
  const dispatch = useDispatch<AppDispatch>();

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

  console.log('errors', errors);

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
      default:
        return <SelectLobby control={control} />;
    }
  };

  const onSubmitSelectLooby = (data: IFormBooking) => {
    console.log(data);
    dispatch(updateInfoBooking(data));
    handleNext();
  };

  console.log(activeStep);

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
          <Box sx={{display: 'flex', flexDirection: 'row', pt: 2}}>
            <Button
              color="inherit"
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{mr: 1}}>
              Back
            </Button>
            <Box sx={{flex: '1 1 auto'}} />
            {isStepOptional(activeStep) && (
              <Button color="inherit" onClick={handleSkip} sx={{mr: 1}}>
                Skip
              </Button>
            )}
            <Button
              onClick={
                activeStep ? handleNext : handleSubmit(onSubmitSelectLooby)
              }>
              {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
            </Button>
          </Box>
        </React.Fragment>
      </View>
    </Modal>
  );
}
