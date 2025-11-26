import { getCarById } from '@/services/serverApi';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import type { Metadata } from 'next';
import CarClient from './CarClient';

type PageProps = {
  params: Promise<{ id: string }>;
};

export const metadata: Metadata = {
  title: 'Car details | RentalCar',
  description: 'View full information about a specific car available for rent.',
};

export default async function CarPage({ params }: PageProps) {
  const queryClient = new QueryClient();
  const { id } = await params;

  await queryClient.prefetchQuery({
    queryKey: ['car', id],
    queryFn: () => getCarById(id),
  });

  return (
    <main className="flex flex-col min-h-screen text-center px-30 pb-26 pt-21">
      <HydrationBoundary state={dehydrate(queryClient)}>
        <CarClient id={id} />
      </HydrationBoundary>
    </main>
  );
}
