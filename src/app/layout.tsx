import type { Metadata } from 'next';
import { Raleway, Playfair_Display } from 'next/font/google';
import './globals.css';

const raleway = Raleway({
  subsets: ['latin'],
  variable: '--font-raleway',
  display: 'swap',
  weight: ['300', '400', '500', '600', '700'],
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
});

export const metadata: Metadata = {
  title: 'Delphine | Mediterranean Swimwear',
  description: 'Elegant swimwear inspired by the Mediterranean coastline. Premium quality, sustainable materials, and timeless designs.',
  keywords: ['swimwear', 'bikini', 'beachwear', 'mediterranean', 'luxury swimwear', 'sustainable fashion'],
  authors: [{ name: 'Delphine Swimwear' }],
  openGraph: {
    title: 'Delphine | Mediterranean Swimwear',
    description: 'Elegant swimwear inspired by the Mediterranean coastline.',
    type: 'website',
    locale: 'en_US',
    siteName: 'Delphine Swimwear',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Delphine | Mediterranean Swimwear',
    description: 'Elegant swimwear inspired by the Mediterranean coastline.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${raleway.variable} ${playfair.variable} font-sans`}>
        {children}
      </body>
    </html>
  );
}
