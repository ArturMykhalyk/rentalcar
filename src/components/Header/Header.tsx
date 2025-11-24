'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Header() {
  const pathname = usePathname();

  const linkClasses = (path: string) =>
    `hover:text-button-hover transition leading-tight hover:scale-105 transition-all duration-300 ease-out ${
      pathname === path ? 'text-button font-semibold' : 'text-main'
    }`;

  return (
    <header className="w-full px-30 bg-white ">
      <nav className="w-full mx-auto flex justify-between items-center py-6  ">
        <Link
          href="/"
          className="text-base font-bold transform  hover:scale-105 transition-all duration-300 ease-out "
        >
          Rental<span className="text-button">Car</span>
        </Link>

        <div className="flex gap-8 text-sm">
          <Link href="/" className={linkClasses('/')}>
            Home
          </Link>
          <Link href="/catalog" className={linkClasses('/catalog')}>
            Catalog
          </Link>
        </div>
      </nav>
    </header>
  );
}
