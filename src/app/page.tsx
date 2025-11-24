import Image from 'next/image';
import Link from 'next/link';

export default function HomePage() {
  return (
    <section className="relative flex items-end justify-center h-175 text-center text-white">
      <Image
        src="/hero.jpg"
        alt="Car driving on the road"
        fill
        priority
        className="object-cover "
      />

      <div className="relative z-10  px-6 mb-14">
        <h1 className="text-[60px] leading-tight  font-manrope font-semibold mb-4">
          Find your perfect rental car
        </h1>
        <p className="text-2xl leading-snug text-white mb-10">
          Reliable and budget-friendly rentals for any journey
        </p>
        <Link
          className="  inline-block px-22 py-3 text-base text-white bg-button rounded-xl transform hover:bg-button-hover hover:scale-105 transition-all duration-300 ease-out"
          href="/catalog"
        >
          View Catalog
        </Link>
      </div>
    </section>
  );
}
