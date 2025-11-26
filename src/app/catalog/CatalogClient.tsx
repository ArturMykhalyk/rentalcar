'use client';

import { CarCard } from '@/components/CarCard/CarCard';
import { fetchCars } from '@/services/clientApi';
import { useInfiniteQuery } from '@tanstack/react-query';
import FiltersCars from '../../components/FiltersCars/FilterCars';
import { useCatalogStore } from '../../store/useCarsStore';

export default function CatalogClient() {
  const { filters } = useCatalogStore();
  const { data, isLoading, isFetchingNextPage, fetchNextPage, hasNextPage, error } =
    useInfiniteQuery({
      queryKey: ['cars', filters],
      queryFn: ({ pageParam = 1 }) =>
        fetchCars({ ...filters, limit: '12', page: pageParam.toString() }),
      initialPageParam: 1,
      getNextPageParam: (lastPage) => {
        if (!lastPage) return undefined;
        const current = Number(lastPage.page);
        const total = Number(lastPage.totalPages);
        return current < total ? current + 1 : undefined;
      },
      staleTime: Infinity,
      refetchOnMount: false,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
    });

  if (isLoading) return <p>Loading cars...</p>;
  if (error) return <p>Failed to load cars</p>;

  const cars = data?.pages.flatMap((page) => page.cars) ?? [];

  return (
    <div className="flex flex-col items-center w-full">
      <FiltersCars />
      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12 w-full mb-20">
        {cars.map((car) => (
          <CarCard key={car.id} car={car} />
        ))}
      </ul>

      {hasNextPage && (
        <button
          onClick={() => fetchNextPage()}
          disabled={isFetchingNextPage}
          className="cursor-pointer font-family  px-[38px] py-3 border border-button text-main text-base font-semibold leading-tight rounded-xl hover:border-button-hover transition-all disabled:opacity-50"
        >
          {isFetchingNextPage ? 'Loading...' : 'Load more'}
        </button>
      )}
    </div>
  );
}
