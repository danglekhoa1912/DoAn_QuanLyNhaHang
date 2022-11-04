import {
  Keyboard,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React, { Fragment } from 'react';
import { useForm } from 'react-hook-form';
import {
  ActivityIndicator,
  ButtonBack,
  CusButton,
  CusInput,
  CusInputImage,
} from '../../../components';
import Colors from '../../../constants/Colors';
import { CategorySelector, dishSelector } from '../../../redux/selector';
import { useDispatch, useSelector } from 'react-redux';
import CusDropDown from '../../../components/CusDropDown';
import {
  addDish,
  deleteDish,
  updateDish,
} from '../../../redux/slice/DishSlice';

const EditDishScreen = ({ route }) => {
  const param = route.params;
  const categoryList = useSelector(CategorySelector).listCategory;
  const dish = useSelector(dishSelector);
  const dispatch = useDispatch();
  const category = categoryList.map((item) => ({
    label: item.name,
    value: item.id,
  }));
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: param ? param.dish.name : '',
      image: param ? param.dish.imgae : '',
      price: param ? param.dish.price.toString() : 0,
      category: param ? param.dish.categoryId.id : 1,
    },
  });

  const onAddDish = (dish) => {
    dispatch(addDish(dish));
  };
  const onUpdateDish = (dish) => {
    dispatch(updateDish(dish));
  };
  const onDeleteDish = (id) => {
    dispatch(deleteDish(id));
  };

  const onSubmit = (data) => {
    if (param) {
      onUpdateDish({ ...data, id: param.dish.id });
    } else {
      onAddDish({ ...data });
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={{ flex: 1 }}>
          <Text style={styles.title}>
            {param ? 'Chỉnh món ăn' : 'Thêm món ăn'}
          </Text>
          <View style={{ flex: 1 }}>
            <CusInputImage
              control={control}
              errors={errors.image}
              label='image'
            />
            <CusInput control={control} errors={errors.name} label='name' />
            <CusInput
              keyboardType='number-pad'
              control={control}
              errors={errors.price}
              label='price'
            />
            <CusDropDown
              placeholder='Loại'
              control={control}
              errors={errors.category}
              label='category'
              itemList={category}
            />
          </View>
          <View
            style={{ flexDirection: 'row', justifyContent: 'space-between' }}
          >
            {param ? (
              <Fragment>
                <CusButton
                  buttonColor={Colors.Cyan}
                  textColor={Colors.Background}
                  onPress={handleSubmit(onSubmit)}
                  styleButton={styles.button}
                  styleText={styles.button_text}
                >
                  {dish.status === 'loading' ? (
                    <ActivityIndicator color={Colors.White} />
                  ) : (
                    'Lưu món ăn'
                  )}
                </CusButton>
                <CusButton
                  buttonColor={Colors.Primary}
                  textColor={Colors.Background}
                  onPress={() => onDeleteDish(param.dish.id)}
                  styleButton={styles.button}
                  styleText={styles.button_text}
                >
                  Xóa món ăn
                </CusButton>
              </Fragment>
            ) : (
              <CusButton
                buttonColor={Colors.Primary}
                textColor={Colors.Background}
                onPress={handleSubmit(onSubmit)}
                styleButton={[styles.button, { width: '100%' }]}
                styleText={styles.button_text}
              >
                {dish.status === 'loading' ? (
                  <ActivityIndicator color={Colors.White} />
                ) : (
                  'Thêm món ăn'
                )}
              </CusButton>
            )}
          </View>
          <ButtonBack />
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default EditDishScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.Background,
    paddingHorizontal: 12,
    paddingBottom: 20,
  },
  title: {
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.Primary,
    paddingTop: 12,
  },
  button: {
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    height: 70,
    width: '40%',
  },
  button_text: {
    fontSize: 18,
    fontWeight: '600',
  },
});
