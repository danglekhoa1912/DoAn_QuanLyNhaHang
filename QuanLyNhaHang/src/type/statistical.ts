import {Moment} from 'moment';

export interface IStatisticalParam {
  start: Moment;
  end: Moment;
}

export interface IStatistical {
  name: string;
  total: number;
  count: number;
}
