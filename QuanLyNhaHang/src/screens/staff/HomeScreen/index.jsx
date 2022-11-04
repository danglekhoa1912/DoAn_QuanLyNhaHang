import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getListCategory } from '../../../redux/slice/CategorySlice';

const HomeScreen = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getListCategory());
  }, []);
  return (
    <View>
      <Text>Admin</Text>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
