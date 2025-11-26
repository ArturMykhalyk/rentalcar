import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { useCatalogStore } from '../../store/useCarsStore';
import { Car } from '../../types/car';

type CarCardProps = {
  car: Car;
};

export const CarCard = ({ car }: CarCardProps) => {
  const { favorites, toggleFavorite } = useCatalogStore();
  const isFavorite = favorites.includes(car.id);
  const [loading, setLoading] = useState(false);

  const handleReadMore = () => {
    setLoading(true);
    // невелика затримка для ефекту (імітація завантаження)
    setTimeout(() => setLoading(false), 800);
  };

  return (
    <li key={car.id} className="flex flex-col bg-white overflow-hidden transition-transform">
      {/* Image */}
      <div className="relative w-full h-66 mb-4">
        <Image
          src={car.img}
          alt={`${car.brand} ${car.model}`}
          fill
          className="object-cover rounded-[14px]"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 400px"
        />

        <button
          onClick={() => toggleFavorite(car.id)}
          className="cursor-pointer absolute top-3 right-3 bg-white/80 p-2 rounded-full shadow-sm hover:bg-white transition"
          aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
        >
          {isFavorite ? (
            <svg width={20} height={20} className="fill-button">
              <use href="/sprite.svg#icon-heart-full"></use>
            </svg>
          ) : (
            <svg width={20} height={20} className="stroke-button">
              <use href="/sprite.svg#icon-heart"></use>
            </svg>
          )}
        </button>
      </div>

      <div className="flex flex-col justify-between flex-1">
        <div>
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-base leading-tight font-family font-semibold text-main">
              {car.brand} <span className="text-button">{car.model}</span>, {car.year}
            </h2>
            <p className="text-base font-semibold text-main">${car.rentalPrice}</p>
          </div>

          <div className="flex flex-wrap text-xs font-normal font-family leading-snug text-gray gap-x-1.5">
            <span>
              {car.address ? car.address.split(',').slice(1).join(' |').trim() : 'Unknown location'}
            </span>
            |<span>{car.rentalCompany}</span>
          </div>

          <div className="flex flex-wrap text-xs font-normal font-family leading-snug text-gray gap-x-1.5 mt-1 mb-8">
            <span>{car.type}</span>|<span>{car.mileage.toLocaleString()} km</span>
          </div>
        </div>

        <Link
          href={`/catalog/${car.id}`}
          onClick={handleReadMore}
          className="cursor-pointer flex items-center justify-center gap-2 text-base leading-tight w-full bg-button hover:bg-button-hover text-white font-medium py-3 rounded-xl transition-colors"
        >
          {loading ? 'Loading...' : 'Read more'}
        </Link>
      </div>
    </li>
  );
};
