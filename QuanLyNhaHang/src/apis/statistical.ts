import AxiosClient from '.';
import {IStatisticalParam} from '../type/statistical';

export const getStatisticalCurrentMonth = () => {
  return AxiosClient.get(`admin/statistical/hall/thismonth`);
};

export const getStatisticalRangeMonth = (params: IStatisticalParam) => {
  return AxiosClient.get(`admin/statistical/hall/search`, {
    params: {
      start: params.start.toDate(),
      end: params.end?.toDate(),
    },
  });
};
