import type { Metadata } from 'next';
import { Inter, Manrope } from 'next/font/google';
import Header from '../components/Header/Header';
import ReactQueryProvider from '../components/ReactQueryProvider/ReactQueryProvider';
import './globals.css';

// Імпортуємо шрифти
const inter = Inter({
  subsets: ['latin'],
  variable: '--second-family',
  display: 'swap',
});

const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-family',
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
        <ReactQueryProvider>{children}</ReactQueryProvider>
      </body>
    </html>
  );
}
