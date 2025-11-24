import type { Metadata } from 'next';
import { Inter, Manrope } from 'next/font/google';
import Header from '../components/Header/Header';
import './globals.css';

// Імпортуємо шрифти
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-manrope',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'RentalCar',
  description: 'Car rental web app built with Next.js',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${manrope.variable} antialiased w-360 mx-auto`}>
        <Header />
        {children}
      </body>
    </html>
  );
}
