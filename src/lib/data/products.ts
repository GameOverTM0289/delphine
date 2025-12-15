import { Product, Collection } from '@/lib/types';

export const collections: Collection[] = [
  {
    id: '1',
    name: 'Mediterranean Summer',
    slug: 'mediterranean-summer',
    description: 'Inspired by the azure waters and sun-kissed shores of the Mediterranean.',
    image: '/images/collections/mediterranean.jpg',
    productCount: 12,
  },
  {
    id: '2',
    name: 'Côte d\'Azur',
    slug: 'cote-dazur',
    description: 'Elegant pieces inspired by the French Riviera\'s timeless glamour.',
    image: '/images/collections/cote-dazur.jpg',
    productCount: 8,
  },
  {
    id: '3',
    name: 'Santorini Dreams',
    slug: 'santorini-dreams',
    description: 'White and blue hues reminiscent of Greek island beauty.',
    image: '/images/collections/santorini.jpg',
    productCount: 10,
  },
  {
    id: '4',
    name: 'Amalfi Coast',
    slug: 'amalfi-coast',
    description: 'Vibrant colors inspired by Italy\'s stunning coastline.',
    image: '/images/collections/amalfi.jpg',
    productCount: 9,
  },
];

export const products: Product[] = [
  {
    id: '1',
    name: 'Capri One-Piece',
    slug: 'capri-one-piece',
    description: 'A timeless one-piece swimsuit featuring a flattering scoop neckline and elegant back detail. Perfect for beach days or pool parties.',
    price: 129,
    compareAtPrice: 159,
    images: [
      '/images/products/capri-1.jpg',
      '/images/products/capri-2.jpg',
      '/images/products/capri-3.jpg',
    ],
    category: 'one-piece',
    collection: 'mediterranean-summer',
    colors: [
      { name: 'Ocean Blue', hex: '#0ea5e9', image: '/images/products/capri-blue.jpg' },
      { name: 'Coral', hex: '#f97316', image: '/images/products/capri-coral.jpg' },
      { name: 'Black', hex: '#171717', image: '/images/products/capri-black.jpg' },
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    tags: ['bestseller', 'sustainable'],
    isNew: false,
    isBestSeller: true,
    inStock: true,
    material: '78% Recycled Nylon, 22% Elastane',
    careInstructions: ['Hand wash cold', 'Do not bleach', 'Lay flat to dry'],
  },
  {
    id: '2',
    name: 'Riviera Bikini Set',
    slug: 'riviera-bikini-set',
    description: 'A sophisticated bikini set with adjustable straps and gold-tone hardware. The high-waisted bottom provides a retro-inspired silhouette.',
    price: 149,
    images: [
      '/images/products/riviera-1.jpg',
      '/images/products/riviera-2.jpg',
    ],
    category: 'bikini',
    collection: 'cote-dazur',
    colors: [
      { name: 'White', hex: '#ffffff', image: '/images/products/riviera-white.jpg' },
      { name: 'Navy', hex: '#1e3a5f', image: '/images/products/riviera-navy.jpg' },
      { name: 'Blush', hex: '#fdb5b5', image: '/images/products/riviera-blush.jpg' },
    ],
    sizes: ['XS', 'S', 'M', 'L'],
    tags: ['new', 'premium'],
    isNew: true,
    isBestSeller: false,
    inStock: true,
    material: '80% Recycled Polyamide, 20% Elastane',
    careInstructions: ['Hand wash cold', 'Do not tumble dry', 'Iron on low heat'],
  },
  {
    id: '3',
    name: 'Mykonos Triangle Top',
    slug: 'mykonos-triangle-top',
    description: 'A classic triangle bikini top with adjustable ties and removable padding. Perfect for mixing and matching.',
    price: 69,
    images: [
      '/images/products/mykonos-top-1.jpg',
      '/images/products/mykonos-top-2.jpg',
    ],
    category: 'bikini-top',
    collection: 'santorini-dreams',
    colors: [
      { name: 'Aegean Blue', hex: '#1d4ed8', image: '/images/products/mykonos-blue.jpg' },
      { name: 'Terracotta', hex: '#c2410c', image: '/images/products/mykonos-terra.jpg' },
      { name: 'Cream', hex: '#fef3c7', image: '/images/products/mykonos-cream.jpg' },
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    isNew: true,
    inStock: true,
    material: '72% Recycled Nylon, 28% Spandex',
  },
  {
    id: '4',
    name: 'Positano High-Waist Bottom',
    slug: 'positano-high-waist-bottom',
    description: 'High-waisted bikini bottom with a flattering cut and full coverage. Pairs perfectly with our triangle tops.',
    price: 79,
    images: [
      '/images/products/positano-1.jpg',
      '/images/products/positano-2.jpg',
    ],
    category: 'bikini-bottom',
    collection: 'amalfi-coast',
    colors: [
      { name: 'Lemon', hex: '#fde047', image: '/images/products/positano-lemon.jpg' },
      { name: 'Ocean', hex: '#0ea5e9', image: '/images/products/positano-ocean.jpg' },
      { name: 'Black', hex: '#171717', image: '/images/products/positano-black.jpg' },
    ],
    sizes: ['XS', 'S', 'M', 'L'],
    isBestSeller: true,
    inStock: true,
    material: '78% Recycled Nylon, 22% Elastane',
  },
  {
    id: '5',
    name: 'Monaco Swim Dress',
    slug: 'monaco-swim-dress',
    description: 'An elegant swim dress with built-in support and a flowy skirt. Perfect for those who prefer more coverage without sacrificing style.',
    price: 159,
    compareAtPrice: 189,
    images: [
      '/images/products/monaco-1.jpg',
      '/images/products/monaco-2.jpg',
    ],
    category: 'swim-dress',
    collection: 'cote-dazur',
    colors: [
      { name: 'Navy', hex: '#1e3a5f', image: '/images/products/monaco-navy.jpg' },
      { name: 'Red', hex: '#dc2626', image: '/images/products/monaco-red.jpg' },
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    tags: ['elegant', 'coverage'],
    inStock: true,
    material: '85% Nylon, 15% Spandex',
  },
  {
    id: '6',
    name: 'Sardinia Cover-Up',
    slug: 'sardinia-cover-up',
    description: 'A lightweight, flowing cover-up perfect for transitioning from beach to bar. Features a beautiful embroidered hem.',
    price: 89,
    images: [
      '/images/products/sardinia-1.jpg',
      '/images/products/sardinia-2.jpg',
    ],
    category: 'cover-up',
    collection: 'mediterranean-summer',
    colors: [
      { name: 'White', hex: '#ffffff', image: '/images/products/sardinia-white.jpg' },
      { name: 'Sand', hex: '#d4a574', image: '/images/products/sardinia-sand.jpg' },
    ],
    sizes: ['One Size'],
    isNew: true,
    inStock: true,
    material: '100% Organic Cotton',
  },
  {
    id: '7',
    name: 'Athens Wrap Bikini',
    slug: 'athens-wrap-bikini',
    description: 'A wrap-style bikini set featuring a flattering V-neckline and tie sides. Adjustable for the perfect fit.',
    price: 139,
    images: [
      '/images/products/athens-1.jpg',
      '/images/products/athens-2.jpg',
    ],
    category: 'bikini',
    collection: 'santorini-dreams',
    colors: [
      { name: 'Olive', hex: '#65a30d', image: '/images/products/athens-olive.jpg' },
      { name: 'Wine', hex: '#881337', image: '/images/products/athens-wine.jpg' },
      { name: 'White', hex: '#ffffff', image: '/images/products/athens-white.jpg' },
    ],
    sizes: ['XS', 'S', 'M', 'L'],
    isBestSeller: true,
    inStock: true,
    material: '78% Recycled Polyester, 22% Elastane',
  },
  {
    id: '8',
    name: 'Corsica Ruched One-Piece',
    slug: 'corsica-ruched-one-piece',
    description: 'A stunning ruched one-piece that flatters every figure. Features a plunging neckline and open back.',
    price: 169,
    images: [
      '/images/products/corsica-1.jpg',
      '/images/products/corsica-2.jpg',
    ],
    category: 'one-piece',
    collection: 'mediterranean-summer',
    colors: [
      { name: 'Emerald', hex: '#047857', image: '/images/products/corsica-emerald.jpg' },
      { name: 'Black', hex: '#171717', image: '/images/products/corsica-black.jpg' },
      { name: 'Coral', hex: '#f97316', image: '/images/products/corsica-coral.jpg' },
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    tags: ['premium', 'flattering'],
    inStock: true,
    material: '80% Recycled Nylon, 20% Elastane',
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getCollectionBySlug(slug: string): Collection | undefined {
  return collections.find((c) => c.slug === slug);
}

export function getProductsByCollection(collectionSlug: string): Product[] {
  return products.filter((p) => p.collection === collectionSlug);
}

export function getProductsByCategory(category: string): Product[] {
  return products.filter((p) => p.category === category);
}

export function getFeaturedProducts(limit: number = 4): Product[] {
  return products.filter((p) => p.isBestSeller || p.isNew).slice(0, limit);
}

export function getNewArrivals(limit: number = 4): Product[] {
  return products.filter((p) => p.isNew).slice(0, limit);
}

export function getBestSellers(limit: number = 4): Product[] {
  return products.filter((p) => p.isBestSeller).slice(0, limit);
}
