import type { Metadata } from 'next';
import { Inter, Cormorant_Garamond } from 'next/font/google';
import './globals.css';
import { Providers } from '@/components/Providers';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  weight: ['300', '400', '500'],
});

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  variable: '--font-cormorant',
  weight: ['300', '400', '500', '600'],
});

export const metadata: Metadata = {
  title: {
    default: 'Delphine | Luxury Swimwear',
    template: '%s | Delphine',
  },
  description: 'Elegant swimwear crafted with premium materials. Timeless designs for the modern woman.',
  keywords: ['luxury swimwear', 'designer bikini', 'premium swimwear', 'elegant beachwear'],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${cormorant.variable}`}>
      <body className="font-sans antialiased bg-ivory-100 text-charcoal-700">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
