import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useMemo} from 'react';
import Modal from '../../../../components/Modal';
import {useForm} from 'react-hook-form';
import {ImagePicker, TextField} from '../../../../components';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, AppState} from '../../../../../store';
import {ILobby, ILobbyRes} from '../../../../../type/lobby';
import {addLooby, updateLobby} from '../../../../../store/lobby/thunkApi';
import {convertImageToFile} from '../../../../../utils/convertImageToFile';
import {Loading} from '../../../../components/Loading';
import * as yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';

interface IModalEdit {
  handleClose: () => void;
  open: boolean;
  data?: ILobby;
  onReLoadData: () => void;
}

const schema = yup
  .object({
    capacity: yup
      .number()
      .required('This field is required.')
      .min(1, 'This field is required.')
      .typeError('Only input number'),
    name: yup.string().required('This field is required.'),
    price: yup
      .number()
      .required('This field is required.')
      .min(1, 'This field is required.')
      .typeError('Only input number'),
    image: yup
      .mixed<File>()
      .required('This field is required.')
      .test('check-size-thumbnail', 'Maximum 2MB.', value => {
        if (!value) return true;

        return value.size <= 2 * 1024 * 1024;
      }),
    image360: yup
      .mixed<File>()
      .required('This field is required.')
      .test('check-size-thumbnail', 'Maximum 2MB.', value => {
        if (!value) return true;

        return value.size <= 2 * 1024 * 1024;
      }),
  })
  .required();

const ModalEdit = ({handleClose, open, data, onReLoadData}: IModalEdit) => {
  const {control, reset, handleSubmit, getValues} = useForm<ILobbyRes>({
    defaultValues: {
      capacity: 0,
      describe: '',
      price: 0,
      name: '',
      status: true,
    },
    resolver: yupResolver(schema),
  });

  const mode = useMemo(() => {
    if (!!data) return 'edit';
    return 'create';
  }, [data]);

  const isLoading = useSelector<AppState, boolean>(
    state => !!state.global.isLoading,
  );

  const dispatch = useDispatch<AppDispatch>();

  const onSubmit = (data: ILobbyRes) => {
    dispatch(
      mode === 'edit'
        ? updateLobby({
            ...data,
          })
        : addLooby({
            ...data,
          }),
    )
      .unwrap()
      .then(() => {
        reset({});
        handleClose();
        onReLoadData();
      });
  };

  useEffect(() => {
    if (data) {
      (async () => {
        reset({
          id: data?.id,
          name: data?.name,
          price: data?.price,
          image: await convertImageToFile(data?.image || ''),
          capacity: data?.capacity,
          describe: data?.describe || '',
          image360: await convertImageToFile(data?.image360 || ''),
          status: data?.status || true,
        });
      })();
    } else reset({});
  }, [data]);

  return (
    <Modal
      cancelButton={{
        title: 'Cancel',
        variant: 'outlined',
        onClick: () => {
          reset({});
          handleClose();
        },
        color: 'dark',
      }}
      saveButton={{
        title: 'Save',
        onClick: handleSubmit(onSubmit),
        color: 'primary',
      }}
      open={open}
      header={{title: mode === 'create' ? 'Create Lobby' : 'Edit Lobby'}}>
      <>
        <View
          style={{
            paddingVertical: 12,
          }}>
          <ImagePicker
            initPreviewImg={data?.image}
            label="Image"
            disabled={false}
            control={control}
            name="image"
          />
          <ImagePicker
            initPreviewImg={data?.image360}
            label="Image 360"
            disabled={false}
            control={control}
            name="image360"
          />
          <View>
            <Text>Name</Text>
            <TextField control={control} name="name" />
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <View
              style={{
                width: '40%',
              }}>
              <Text>Capacity</Text>
              <TextField
                keyboardType="number-pad"
                control={control}
                name="capacity"
              />
            </View>
            <View
              style={{
                width: '40%',
              }}>
              <Text>Price</Text>
              <TextField
                keyboardType="number-pad"
                control={control}
                name="price"
              />
            </View>
          </View>
          <View>
            <Text>Description</Text>
            <TextField
              multiline
              numberOfLines={6}
              maxLength={40}
              control={control}
              name="describe"
            />
          </View>
        </View>
        <Loading
          isLoading={isLoading || (!getValues('image') && mode === 'edit')}
        />
      </>
    </Modal>
  );
};

export default ModalEdit;

const styles = StyleSheet.create({});
