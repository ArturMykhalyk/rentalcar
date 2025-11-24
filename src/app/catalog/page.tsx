import type { Metadata } from 'next';
import { getCars } from '../../services/serverApi';

export const metadata: Metadata = {
  title: 'Catalog | RentalCar',
  description: 'Browse all available cars for rent. Filter by brand, price, and mileage.',
};

export default async function HomePage() {
  const data = await getCars();

  return (
    <main className="flex flex-col items-center justify-center min-h-screen text-center p-8">
      <h1 className="text-5xl font-bold mb-8">Catalog</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.cars.map((car) => (
          <div key={car.id} className="border rounded-xl p-4 shadow-sm bg-white text-left">
            <img
              src={car.img}
              alt={`${car.brand} ${car.model}`}
              className="w-full h-48 object-cover rounded-md mb-3"
            />
            <h2 className="text-xl font-semibold mb-1">
              {car.brand} {car.model}
            </h2>
            <p className="text-gray-500 text-sm mb-2">{car.type}</p>
            <p className="font-medium text-blue-600 mb-2">${car.rentalPrice} / day</p>
            <p className="text-sm text-gray-600">{car.mileage.toLocaleString()} km</p>
          </div>
        ))}
      </div>
    </main>
  );
}
