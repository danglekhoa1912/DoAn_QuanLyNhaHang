import {
  AxiosError,
  AxiosInstance,
  AxiosResponse,
  AxiosRequestConfig,
} from 'axios';
import {store} from '../store';
import {clearSpinner, hideSpinner, showSpinner} from '../store/global';
import {getStorage} from '../utils/storage';
import {Platform} from 'react-native';

interface IRequestAxios extends AxiosRequestConfig {
  skipLoading?: boolean;
}

const onRequestConfig = async (config: IRequestAxios) => {
  if (!config.headers['Authorization']) {
    let token;
    if (Platform.OS === 'web') token = localStorage.getItem('accessToken');
    else token = await getStorage('accessToken');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
  }
  if (!config.headers['Content-Type']) {
    config.headers['Content-Type'] = 'application/json';
  }
  config.timeout = 30000;
  !config.skipLoading && store.dispatch(showSpinner());
  return config;
};

const onRequestError = (error: AxiosError): Promise<AxiosError> => {
  store.dispatch(clearSpinner());
  return Promise.reject(error);
};

const onResponse = (res: AxiosResponse): AxiosResponse => {
  store.dispatch(hideSpinner());
  return res;
};

const onResponseError = async (
  err: AxiosError,
  axiosInstance: AxiosInstance,
): Promise<AxiosError | undefined> => {
  store.dispatch(clearSpinner());
  if (err.response?.status === 500) {
    localStorage.removeItem('accessToken');
    window.location.href = '/';
    // TODO: process expiredApiQueue
    // let token: any = null
    // if (!expiredApiQueue.length) {
    //   token = await userApi.refreshToken(currentRefreshToken)
    //   localStorage.setItem("accessToken", token.data.accessToken)
    //   localStorage.setItem("refreshToken", token.data.refreshToken)
    //   originalConfig.headers.Authorization = `Bearer ${token.data.accessToken}`
    // }

    // return new Promise((resolve, reject) => {
    //   if (!token.data.accessToken || !token.data.refreshToken)
    //     expiredApiQueue.push(reject(err))
    //   else expiredApiQueue.push(resolve(axiosInstance(originalConfig)))
    // })
  }

  return Promise.reject(err?.response?.data);
};

export const setupInterceptors = (axiosInstance: AxiosInstance) => {
  axiosInstance.interceptors.request.use(onRequestConfig, onRequestError);
  axiosInstance.interceptors.response.use(onResponse, (err: AxiosError) =>
    onResponseError(err, axiosInstance),
  );
};
