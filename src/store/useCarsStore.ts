import type { Car, CarsQueryParams } from '@/types/car';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type CatalogState = {
  cars: Car[];
  filters: CarsQueryParams;
  favorites: string[];
  setCars: (cars: Car[]) => void;
  addCars: (cars: Car[]) => void;
  clearCars: () => void;
  setFilters: (filters: CarsQueryParams) => void;
  toggleFavorite: (id: string) => void;
};

export const useCatalogStore = create<CatalogState>()(
  persist(
    (set) => ({
      cars: [],
      filters: {},
      favorites: [],

      setCars: (cars) => set({ cars }),

      addCars: (cars) =>
        set((state) => ({
          cars: [...state.cars, ...cars],
        })),

      clearCars: () => set({ cars: [] }),

      setFilters: (filters) =>
        set(() => ({
          filters,
          cars: [],
        })),

      toggleFavorite: (id) =>
        set((state) => ({
          favorites: state.favorites.includes(id)
            ? state.favorites.filter((f) => f !== id)
            : [...state.favorites, id],
        })),
    }),
    {
      name: 'catalog-storage',
      partialize: (state) => ({
        favorites: state.favorites,
        filters: state.filters,
      }),
    }
  )
);
