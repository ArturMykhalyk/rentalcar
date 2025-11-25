import { CarsQueryParams, CarsResponse } from '../types/car';
import { api } from './api';

export const getCars = async (params?: CarsQueryParams): Promise<CarsResponse> => {
  const { data } = await api.get<CarsResponse>('/cars', {
    params: params ?? { limit: '12', page: '1' },
  });
  return data;
};
