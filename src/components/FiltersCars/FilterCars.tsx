'use client';

import { fetchBrands } from '@/services/clientApi';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { useCatalogStore } from '../../store/useCarsStore';
import CustomSelect from '../CustomSelect/CustomSelect';

export default function FiltersCars() {
  const { data: brands } = useQuery({
    queryKey: ['brands'],
    queryFn: fetchBrands,
  });

  const { filters, setFilters } = useCatalogStore();

  const [brand, setBrand] = useState<string>(filters.brand || '');
  const [rentalPrice, setRentalPrice] = useState<string>(filters.rentalPrice || '');
  const [minMileage, setMinMileage] = useState<string>(filters.minMileage || '');
  const [maxMileage, setMaxMileage] = useState<string>(filters.maxMileage || '');

  const formatMileage = (value: string) => {
    if (!value) return '';
    const num = parseInt(value, 10);
    if (isNaN(num)) return '';
    return num.toLocaleString('en-US');
  };

  const handleMileageChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setter: React.Dispatch<React.SetStateAction<string>>
  ) => {
    const raw = e.target.value.replace(/\D/g, '');
    setter(raw);
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFilters({ brand, rentalPrice, minMileage, maxMileage });
  };

  const prices = ['30', '40', '50', '60', '70', '80', '90', '100', '110', '120'];

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-wrap items-center justify-center gap-4 mb-12"
    >
      <div>
        <p className="text-start text-gray font-family leading-snug text-xs mb-2">Car brand</p>
        <CustomSelect<string>
          options={brands || []}
          value={brand}
          onChange={(val) => setBrand(val ?? '')}
          placeholder="Choose a brand"
        />
      </div>
      <div>
        <p className="text-start text-gray font-family leading-snug text-xs mb-2">Price/ 1 hour</p>
        <CustomSelect<string>
          options={prices}
          value={rentalPrice}
          onChange={(val) => setRentalPrice(val ?? '')}
          placeholder="Choose a price"
          height={196}
          formatValue={(val) => `To $${val}`}
        />
      </div>
      <div>
        <p className="text-start text-gray font-family leading-snug text-xs mb-2">
          Сar mileage / km
        </p>
        <div className="flex">
          <input
            type="text"
            placeholder="From"
            className="rounded-l-xl px-4  py-2 w-36 bg-inputs placeholder:text-main cursor-pointer focus:outline-none"
            value={minMileage ? `From ${formatMileage(minMileage)}` : ''}
            onChange={(e) => handleMileageChange(e, setMinMileage)}
          />
          <input
            type="text"
            placeholder="To"
            className="border-l border-gray rounded-r-xl px-4 py-2 w-36 bg-inputs placeholder:text-main cursor-pointer focus:outline-none"
            value={maxMileage ? `To ${formatMileage(maxMileage)}` : ''}
            onChange={(e) => handleMileageChange(e, setMaxMileage)}
          />
        </div>
      </div>
      <button
        type="submit"
        className="bg-button hover:bg-button-hover cursor-pointer font-family text-white font-semibold px-[51px] py-3 rounded-xl transition-colors"
      >
        Search
      </button>
    </form>
  );
}
