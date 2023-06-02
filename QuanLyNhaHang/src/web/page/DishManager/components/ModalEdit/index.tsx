import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useMemo} from 'react';
import Modal from '../../../../components/Modal';
import {IDish, IDishRes} from '../../../../../type/dish';
import {useForm} from 'react-hook-form';
import {DropDown, ImagePicker, TextField} from '../../../../components';
import {Select} from '@mui/material';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, AppState} from '../../../../../store';
import {ISelectItem} from '../../../../../type/common';
import {sCategoryOpts} from '../../../../../store/dish/selector';
import {addDish, updateDish} from '../../../../../store/dish/thunkApi';
import {convertImageToFile} from '../../../../../utils/convertImageToFile';
import {Loading} from '../../../../components/Loading';

interface IModalEdit {
  handleClose: () => void;
  open: boolean;
  data?: IDish;
  onReLoadData: () => void;
}

const ModalEdit = ({handleClose, open, data, onReLoadData}: IModalEdit) => {
  const {control, reset, handleSubmit, getValues} = useForm<IDishRes>({
    defaultValues: {
      category: 0,
      name: '',
      price: 0,
    },
  });

  const mode = useMemo(() => {
    if (!!data) return 'edit';
    return 'create';
  }, [data]);

  const dispatch = useDispatch<AppDispatch>();
  const pIsLoading = useSelector<AppState, boolean>(
    state => !!state.global.isLoading,
  );

  const pCategoryOpts = useSelector<AppState, ISelectItem[]>(state =>
    sCategoryOpts(state),
  );

  const onSubmit = (data: IDishRes) => {
    dispatch(
      mode === 'edit'
        ? updateDish({
            ...data,
          })
        : addDish({...data}),
    ).then(() => {
      handleClose();
      onReLoadData();
    });
  };

  useEffect(() => {
    (async () => {
      reset({
        id: data?.id,
        name: data?.name,
        price: data?.price,
        category: data?.categoryId?.id,
        image: await convertImageToFile(data?.image || ''),
      });
    })();
  }, [data, pCategoryOpts]);

  return (
    <Modal
      cancelButton={{
        title: 'Cancel',
        variant: 'outlined',
        onClick: handleClose,
        color: 'dark',
      }}
      saveButton={{
        title: 'Save',
        onClick: handleSubmit(onSubmit),
        color: 'primary',
      }}
      open={open}
      header={{title: mode === 'create' ? 'Create Dish' : 'Edit Dish'}}>
      <>
        <View>
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
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <View
              style={{
                width: '40%',
              }}>
              <Text>Category</Text>
              <DropDown
                options={pCategoryOpts}
                control={control}
                name="category"
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
