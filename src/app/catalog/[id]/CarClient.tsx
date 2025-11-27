'use client';

import { useQuery } from '@tanstack/react-query';

import Image from 'next/image';

import BookingForm from '../../../components/BookingForm/BookingForm';
import { fetchCarById } from '../../../services/clientApi';

export default function CarClient({ id }: { id: string }) {
  const {
    data: car,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['car', id],
    queryFn: () => fetchCarById(id),
    staleTime: Infinity,
  });

  if (isLoading) return <p>Loading...</p>;
  if (error || !car) return <p>Car not found</p>;

  return (
    <div className="flex flex-row gap-18  w-full">
      <div className="flex-1">
        <Image
          src={car.img}
          alt={`${car.brand} ${car.model}`}
          width={640}
          height={512}
          className="rounded-xl w-full h-[512px] object-cover mb-10"
        />
        <BookingForm />
      </div>

      <div className="flex-1 flex flex-col justify-end text-left">
        <h2 className="text-2xl leading-tight font-semibold mb-2">
          {car.brand} {car.model}, {car.year}{' '}
          <span className="text-gray text-base leading-tight">Id: {car.id.slice(-4)}</span>
        </h2>
        <div className="flex items-center mb-4">
          <svg width={16} height={16} className="fill-main ">
            <use href="/sprite.svg#icon-location"></use>
          </svg>
          <p className="text-main leading-tight font-family ">
            {car.address ? car.address.split(',').slice(1).join(',').trim() : 'Unknown location'}
          </p>
          <p className="text-main leading-tight ml-4 font-family">{`Mileage: ${car.mileage} km`}</p>
        </div>
        <p className="text-button text-2xl leading-tight font-semibold mb-8 font-family">
          ${car.rentalPrice}
        </p>
        <p className="text-main mb-17 leading-tight font-family">{car.description}</p>

        <div className="mb-[110px]">
          <h3 className="font-semibold font-family text-xl text-main leading-tight mb-5">
            Rental Conditions:
          </h3>
          <ul className=" text-main flex flex-col gap-4 ">
            {car.rentalConditions.map((cond, i) => (
              <li className="flex font-family leading-tight items-center gap-2" key={i}>
                <svg width={16} height={16}>
                  <use href="/sprite.svg#icon-check-circle"></use>
                </svg>
                {cond}
              </li>
            ))}
          </ul>
        </div>

        <div className="mb-[110px]">
          <h3 className="font-semibold text-lg mb-5 leading-tight">Car Specifications:</h3>
          <ul className="text-main flex flex-col gap-4">
            <li className="flex font-family leading-tight items-center gap-2">
              <svg width={16} height={16}>
                <use href="/sprite.svg#icon-calendar"></use>
              </svg>
              Year: {car.year}
            </li>
            <li className="flex font-family leading-tight items-center gap-2">
              <svg width={16} height={16}>
                <use href="/sprite.svg#icon-car"></use>
              </svg>
              Type: {car.type}
            </li>
            <li className="flex font-family leading-tight items-center gap-2">
              {' '}
              <svg width={16} height={16}>
                <use href="/sprite.svg#icon-fuel"></use>
              </svg>
              Fuel Consumption: {car.fuelConsumption}
            </li>
            <li className="flex font-family leading-tight items-center gap-2">
              {' '}
              <svg width={16} height={16}>
                <use href="/sprite.svg#icon-settings"></use>
              </svg>
              Engine: {car.engineSize}
            </li>
          </ul>
        </div>

        {/* Accessories */}
        <div>
          <h3 className="font-semibold text-lg leading-tight mb-5">
            Accessories & Functionalities:
          </h3>
          <ul className=" text-main  flex flex-col gap-4">
            {[...car.accessories, ...car.functionalities].map((item, i) => (
              <li className="flex font-family leading-tight items-center gap-2" key={i}>
                <svg width={16} height={16}>
                  <use href="/sprite.svg#icon-check-circle"></use>
                </svg>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
