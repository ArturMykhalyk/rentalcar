'use client';

import { fetchBrands } from '@/services/clientApi';

import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { useCatalogStore } from '../../store/useCarsStore';

export default function FiltersCars() {
  const { data: brands } = useQuery({
    queryKey: ['brands'],
    queryFn: fetchBrands,
  });

  const { filters, setFilters } = useCatalogStore();

  const [brand, setBrand] = useState(filters.brand || '');
  const [rentalPrice, setRentalPrice] = useState(filters.rentalPrice || '');
  const [minMileage, setMinMileage] = useState(filters.minMileage || '');
  const [maxMileage, setMaxMileage] = useState(filters.maxMileage || '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFilters({ brand, rentalPrice, minMileage, maxMileage });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-wrap items-center justify-center gap-4 mb-12"
    >
      <select
        className="border rounded-xl px-4 py-2"
        value={brand}
        onChange={(e) => setBrand(e.target.value)}
      >
        <option value="">Choose a brand</option>
        {brands?.map((b) => (
          <option key={b} value={b}>
            {b}
          </option>
        ))}
      </select>

      <select
        className="border rounded-xl px-4 py-2"
        value={rentalPrice}
        onChange={(e) => setRentalPrice(e.target.value)}
      >
        <option value="">Choose a price</option>
        {[30, 40, 50, 60, 70, 80].map((p) => (
          <option key={p} value={p}>
            To ${p}
          </option>
        ))}
      </select>

      <input
        type="number"
        placeholder="From mileage"
        className="border rounded-xl px-4 py-2 w-36"
        value={minMileage}
        onChange={(e) => setMinMileage(e.target.value)}
      />
      <input
        type="number"
        placeholder="To mileage"
        className="border rounded-xl px-4 py-2 w-36"
        value={maxMileage}
        onChange={(e) => setMaxMileage(e.target.value)}
      />

      <button
        type="submit"
        className="bg-button hover:bg-button-hover cursor-pointer font-family text-white font-semibold px-[51] py-3 rounded-xl transition-colors"
      >
        Search
      </button>
    </form>
  );
}
