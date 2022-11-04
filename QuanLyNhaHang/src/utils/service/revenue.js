import { instance } from './instance';

export const getRevenueByLobbyCurrentMonthService = (token) => {
  return instance.get('admin/statistical/hall/thismonth', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getRevenueCurrentMontService = (token) => {
  return instance.post('admin/statistical/thismonth', undefined, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getRevenueLastMontService = (token) => {
  return instance.get('admin/statistical/hall/lastmonth', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getRevenueRangeMontService = (token, date) => {
  return instance.post(
    'admin/statistical/hall/search',
    {
      start: date.start,
      end: date.end,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};
