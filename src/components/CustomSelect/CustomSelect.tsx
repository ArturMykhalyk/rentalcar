'use client';

import { useEffect, useRef, useState } from 'react';
import SimpleBar from 'simplebar-react';
import 'simplebar-react/dist/simplebar.min.css';

interface CustomSelectProps<T> {
  options?: T[];
  value?: T;
  onChange: (value: T | undefined) => void;
  placeholder?: string;
  className?: string;
  formatValue?: (option: T) => string;
  height?: number;
}

export default function CustomSelect<T>({
  options = [],
  height = 272,
  value,
  onChange,
  placeholder = 'Choose an option',
  className = '',
  formatValue,
}: CustomSelectProps<T>) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (option: T) => {
    onChange(option);
    setOpen(false);
  };

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    onChange(undefined);
  };

  return (
    <div ref={ref} className={`relative inline-block ${className}`}>
      <div
        role="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        tabIndex={0}
        onClick={() => setOpen(!open)}
        className="flex items-center justify-between rounded-xl px-4 py-3 w-51 bg-inputs text-main hover:shadow-md cursor-pointer transition"
      >
        <span className="truncate select-none">
          {value ? (formatValue ? formatValue(value) : String(value)) : placeholder}
        </span>

        {value ? (
          <span
            onClick={handleClear}
            role="button"
            aria-label="Clear selection"
            className="ml-2 text-main text-lg font-semibold hover:text-gray-600 transition-colors cursor-pointer select-none"
          >
            ×
          </span>
        ) : (
          <span className={`transition-transform duration-150 ${open ? 'rotate-180' : 'rotate-0'}`}>
            <svg className="w-4 h-4">
              <use href="/sprite.svg#icon-active_arrow"></use>
            </svg>
          </span>
        )}
      </div>

      {open && (
        <div
          className="absolute left-0 mt-1 z-50 bg-white border border-gray-200 rounded-xl w-51 shadow-lg overflow-hidden"
          style={{ maxHeight: `${height}px` }}
        >
          <SimpleBar style={{ maxHeight: `${height}px`, overflowX: 'hidden' }} autoHide={false}>
            <ul role="listbox">
              {options.map((opt, idx) => (
                <li
                  key={idx}
                  onClick={() => handleSelect(opt)}
                  className={`px-4 py-2 cursor-pointer hover:bg-gray-100 select-none ${
                    value === opt ? 'font-semibold text-main' : 'text-gray'
                  }`}
                >
                  {String(opt)}
                </li>
              ))}
            </ul>
          </SimpleBar>
        </div>
      )}
    </div>
  );
}
