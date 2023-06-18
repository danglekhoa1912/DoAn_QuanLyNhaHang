import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useMemo} from 'react';
import {IUser, IUserRes} from '../../../../type/user';
import {useForm} from 'react-hook-form';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, AppState} from '../../../../store';
import {convertImageToFile} from '../../../../utils/convertImageToFile';
import {ImagePicker, TextField} from '../../../components';
import Modal from '../../../components/Modal';
import DatePicker from '../../../components/DatePicker';
import moment from 'moment';
import {addStaff, updateStaff} from '../../../../store/user/thunkApi';
import {Loading} from '../../../components/Loading';
import * as yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';

interface IModalEdit {
  handleClose: () => void;
  open: boolean;
  data?: IUser;
  onReLoadData: () => void;
}

const schema = yup
  .object({
    name: yup.string().required('This field is required.'),
    mobile: yup.string().required('Please enter your mobile').min(10).max(12),
    email: yup
      .string()
      .required('Please enter your email')
      .email('Email invalidate'),
    avatar: yup
      .mixed<File>()
      .required('This field is required.')
      .test('check-size-thumbnail', 'Maximum 2MB.', value => {
        if (!value) return true;

        return value.size <= 2 * 1024 * 1024;
      }),
    birthday: yup
      .date()
      .typeError('Please enter your birthday')
      .test('birthday', 'You must be 18 years old to register', value => {
        return moment(new Date()).diff(moment(value), 'years') >= 18;
      }),
  })
  .required();

const ModalEdit = ({handleClose, open, data, onReLoadData}: IModalEdit) => {
  const {control, reset, handleSubmit, getValues} = useForm<IUserRes>({
    defaultValues: {
      name: '',
      mobile: '',
      role: '',
      email: '',
    },
    resolver: yupResolver(schema),
  });

  const mode = useMemo(() => {
    if (!!data) return 'edit';
    return 'create';
  }, [data]);

  const dispatch = useDispatch<AppDispatch>();
  const pIsLoading = useSelector<AppState, boolean>(
    state => !!state.global.isLoading,
  );

  const onSubmit = (data: IUserRes) => {
    dispatch(
      mode === 'edit'
        ? updateStaff({
            ...data,
          })
        : addStaff({
            ...data,
          }),
    )
      .unwrap()
      .then(() => {
        onClose();
        onReLoadData();
      });
  };

  const onClose = () => {
    reset({});
    handleClose();
  };

  useEffect(() => {
    if (data) {
      (async () => {
        reset({
          id: data?.id,
          name: data?.name,
          birthday: moment(new Date(data?.birthday)).format('yyyy-MM-DD'),
          email: data?.email,
          mobile: data?.mobile,
          role: data?.role,
          avatar: await convertImageToFile(data?.avatar || ''),
        });
      })();
    } else reset({});
  }, [data]);

  return (
    <Modal
      cancelButton={{
        title: 'Cancel',
        variant: 'outlined',
        onClick: onClose,
        color: 'dark',
      }}
      saveButton={{
        title: 'Save',
        onClick: handleSubmit(onSubmit),
        color: 'primary',
      }}
      open={open}
      header={{title: 'Edit Staff'}}>
      <>
        <View
          style={{
            paddingVertical: 12,
          }}>
          <ImagePicker
            initPreviewImg={data?.avatar}
            label="Avatar"
            disabled={mode === 'edit'}
            control={control}
            name="avatar"
          />
          <View>
            <Text>Name</Text>
            <TextField
              aria-disabled={mode === 'edit'}
              control={control}
              name="name"
            />
          </View>
          <View>
            <Text>Email</Text>
            <TextField
              aria-disabled={mode === 'edit'}
              control={control}
              name="email"
            />
          </View>
          <View>
            <Text>Number phone</Text>
            <TextField
              aria-disabled={mode === 'edit'}
              control={control}
              name="mobile"
            />
          </View>
          <View>
            <Text>Birth Day</Text>
            <DatePicker
              disabled={mode === 'edit'}
              control={control}
              name="birthday"
            />
          </View>
        </View>
        <Loading
          isLoading={pIsLoading || (!getValues('avatar') && mode === 'edit')}
        />
      </>
    </Modal>
  );
};

export default ModalEdit;

const styles = StyleSheet.create({});
