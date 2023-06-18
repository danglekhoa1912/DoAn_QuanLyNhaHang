import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useMemo} from 'react';
import Modal from '../../../../components/Modal';
import {useForm} from 'react-hook-form';
import {ImagePicker, TextField} from '../../../../components';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, AppState} from '../../../../../store';
import {IService, IServiceRes} from '../../../../../type/service';
import {addService, updateService} from '../../../../../store/service/thunkApi';
import {convertImageToFile} from '../../../../../utils/convertImageToFile';
import {Loading} from '../../../../components/Loading';
import * as yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';

interface IModalEdit {
  handleClose: () => void;
  open: boolean;
  data?: IService;
  onReloadData: () => void;
}

const schema = yup
  .object({
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
  })
  .required();

const ModalEdit = ({handleClose, open, data, onReloadData}: IModalEdit) => {
  const {control, reset, handleSubmit, getValues} = useForm<IServiceRes>({
    defaultValues: {
      image: '',
      name: '',
      price: 0,
      serviceDescribe: '',
      status: true,
    },
    resolver: yupResolver(schema),
  });

  const mode = useMemo(() => {
    if (!!data) return 'edit';
    return 'create';
  }, [data]);

  const pIsLoading = useSelector<AppState, boolean>(
    state => !!state.global.isLoading,
  );

  const dispatch = useDispatch<AppDispatch>();

  const onSubmit = (data: IServiceRes) => {
    dispatch(
      mode === 'edit'
        ? updateService({
            ...data,
          })
        : addService({
            ...data,
          }),
    )
      .unwrap()
      .then(data => {
        onClose();
        onReloadData();
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
          serviceDescribe: data?.serviceDescribe,
          status: data?.status,
        });
      })();
    }
  }, [data]);

  const onClose = () => {
    reset({});
    handleClose();
  };

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
      header={{title: mode === 'create' ? 'Create Service' : 'Edit Service'}}>
      <>
        <View style={{paddingVertical: 12}}>
          <ImagePicker
            initPreviewImg={data?.image}
            label="Image"
            disabled={false}
            control={control}
            name="image"
          />
          <View>
            <Text>Name</Text>
            <TextField control={control} name="name" />
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
          <View>
            <Text>Description</Text>
            <TextField
              multiline
              numberOfLines={6}
              control={control}
              name="serviceDescribe"
            />
          </View>
        </View>
        <Loading
          isLoading={pIsLoading || (!getValues('image') && mode === 'edit')}
        />
      </>
    </Modal>
  );
};

export default ModalEdit;

const styles = StyleSheet.create({});
