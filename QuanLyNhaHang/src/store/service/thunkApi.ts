import {
  ActionReducerMapBuilder,
  createAsyncThunk,
  PayloadAction,
} from '@reduxjs/toolkit';
import {IServiceStore} from '.';
import {ServiceApi} from '../../apis';
import {IServiceRes} from '../../type/service';
import {saveStorage} from '../../utils/storage';
import {ISearchParam} from '../../type/common';
import {withParamsToastCatcher} from '../ToastCatcherWeb';

export const getListService = createAsyncThunk(
  'service/getListService',
  async (params: ISearchParam) => {
    const result = await ServiceApi.getListService(params);
    return result.data;
  },
);

export const getListServiceAdmin = createAsyncThunk(
  'service/getListService',
  async (params: ISearchParam) => {
    const result = await ServiceApi.getListServiceAdmin(params);
    return result.data;
  },
);

export const addService = createAsyncThunk(
  'service/addService',
  withParamsToastCatcher(async (service: IServiceRes) => {
    const result = await ServiceApi.addService(service);
    return result.data;
  }, 'Create service successfully'),
);

export const deleteService = createAsyncThunk(
  'service/deleteService',
  async (id: number) => {
    const result = await ServiceApi.deleteService(id);
    return result;
  },
);

export const updateService = createAsyncThunk(
  'service/updateService',
  withParamsToastCatcher(async (service: IServiceRes) => {
    const result = await ServiceApi.updateService(service);
    return result;
  }, 'Update service successfully'),
);

export const extraReducers = (
  builders: ActionReducerMapBuilder<IServiceStore>,
) => {};
