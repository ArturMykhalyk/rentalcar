import { CarsResponse } from '../types/car';
import { api } from './api';

export const getCars = async () => {
  const res = await api.get<CarsResponse>('/cars', {
    params: { limit: 12, page: 1 },
  });
  return res.data;
};
