import { getCars } from '@/services/serverApi';
import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query';
import { Metadata } from 'next';
import CatalogClient from './CatalogClient';

export const metadata: Metadata = {
  title: 'Catalog | RentalCar',
  description: 'Browse all available cars for rent. Filter by brand, price, and mileage.',
  openGraph: {
    title: 'Catalog | RentalCar',
    description: 'Browse all available cars for rent. Filter by brand, price, and mileage.',
    url: 'https://rentalcar-fawn.vercel.app/catalog',
  },
};

const CatalogPage = async () => {
  const queryClient = new QueryClient();

  const firstPage = await getCars({ limit: '12', page: '1' });

  queryClient.setQueryData(['cars'], {
    pages: [firstPage],
    pageParams: [1],
  });

  return (
    <main className="flex flex-col min-h-screen text-center px-30 pb-31 pt-21">
      <HydrationBoundary state={dehydrate(queryClient)}>
        <CatalogClient />
      </HydrationBoundary>
    </main>
  );
};

export default CatalogPage;
