import { api } from '@/services/api';
import type { Car, CarsQueryParams, CarsResponse } from '@/types/car';

export const fetchCars = async (params?: CarsQueryParams): Promise<CarsResponse> => {
  const { data } = await api.get<CarsResponse>('/cars', { params });
  return data;
};

export const fetchBrands = async (): Promise<string[]> => {
  const { data } = await api.get<string[]>('/brands');
  return data;
};

export const fetchCarById = async (id: string): Promise<Car> => {
  const { data } = await api.get<Car>(`/cars/${id}`);
  return data;
};
