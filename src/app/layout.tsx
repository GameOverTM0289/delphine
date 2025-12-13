import type { Metadata } from 'next';
import { Inter, Cormorant_Garamond } from 'next/font/google';
import './globals.css';
import { Providers } from '@/components/Providers';
import CustomCursor from '@/components/ui/CustomCursor';

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
    default: 'Delphine | Rhythm of a Free Spirit',
    template: '%s | Delphine',
  },
  description: 'Elegant swimwear crafted with premium materials. Timeless designs for the modern woman. Rhythm of a Free Spirit.',
  keywords: ['luxury swimwear', 'designer bikini', 'premium swimwear', 'elegant beachwear', 'Delphine'],
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '32x32' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  manifest: '/manifest.json',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${cormorant.variable}`}>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="32x32" />
        <link rel="icon" href="/favicon-16x16.png" sizes="16x16" type="image/png" />
        <link rel="icon" href="/favicon-32x32.png" sizes="32x32" type="image/png" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      </head>
      <body className="font-sans antialiased bg-ivory-100 text-charcoal-700">
        <Providers>
          <CustomCursor />
          {children}
        </Providers>
      </body>
    </html>
  );
}
