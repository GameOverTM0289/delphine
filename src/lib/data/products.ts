import { Product, Collection, ProductSize, ProductColor } from '../types';

const standardSizes: ProductSize[] = [
  { id: 'size-s', name: 'S', inStock: true, stockQuantity: 10 },
  { id: 'size-m', name: 'M', inStock: true, stockQuantity: 15 },
  { id: 'size-l', name: 'L', inStock: true, stockQuantity: 12 },
];

const standardColors: ProductColor[] = [
  { id: 'color-cream', name: 'Cream', hex: '#FFFDD0', available: true },
  { id: 'color-black', name: 'Black', hex: '#000000', available: true },
  { id: 'color-sky', name: 'Sky Blue', hex: '#9EB8EE', available: true },
];

export const products: Product[] = [
  {
    id: 'prod-1',
    slug: 'riviera-bikini-set',
    name: 'Riviera Bikini Set',
    description: 'A timeless triangle bikini set inspired by the French Riviera. Features adjustable ties and a flattering cut.',
    price: 89,
    category: 'bikini',
    collection: 'summer-2024',
    colors: standardColors,
    sizes: standardSizes,
    images: [
      { id: 'img-1', url: 'https://images.unsplash.com/photo-1570976447640-ac859083963f?w=800', alt: 'Riviera Bikini Set', isPrimary: true },
      { id: 'img-2', url: 'https://images.unsplash.com/photo-1582639590011-f5a8416d1101?w=800', alt: 'Riviera Bikini Set Back', isPrimary: false },
    ],
    featured: true,
    isNew: true,
    isBestseller: false,
    inStock: true,
    stockQuantity: 37,
    careInstructions: ['Hand wash cold', 'Lay flat to dry', 'Do not bleach'],
    details: ['Italian fabric', 'UPF 50+ protection', 'Fully lined'],
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15'),
  },
  {
    id: 'prod-2',
    slug: 'aegean-one-piece',
    name: 'Aegean One Piece',
    description: 'An elegant one-piece swimsuit with a plunging neckline and crossed back straps.',
    price: 120,
    category: 'one-piece',
    collection: 'summer-2024',
    colors: standardColors,
    sizes: standardSizes,
    images: [
      { id: 'img-3', url: 'https://images.unsplash.com/photo-1597345303950-50c8a33df1c9?w=800', alt: 'Aegean One Piece', isPrimary: true },
      { id: 'img-4', url: 'https://images.unsplash.com/photo-1580618864180-af464afa5c71?w=800', alt: 'Aegean One Piece Side', isPrimary: false },
    ],
    featured: true,
    isNew: false,
    isBestseller: true,
    inStock: true,
    stockQuantity: 28,
    careInstructions: ['Hand wash cold', 'Lay flat to dry', 'Do not bleach'],
    details: ['Italian fabric', 'UPF 50+ protection', 'Fully lined'],
    createdAt: new Date('2024-01-10'),
    updatedAt: new Date('2024-01-10'),
  },
  {
    id: 'prod-3',
    slug: 'santorini-bandeau-set',
    name: 'Santorini Bandeau Set',
    description: 'A chic bandeau bikini set perfect for sun-soaked days. Features removable straps.',
    price: 95,
    category: 'bikini',
    collection: 'summer-2024',
    colors: standardColors,
    sizes: standardSizes,
    images: [
      { id: 'img-5', url: 'https://images.unsplash.com/photo-1594046243098-0fceea9d451e?w=800', alt: 'Santorini Bandeau Set', isPrimary: true },
      { id: 'img-6', url: 'https://images.unsplash.com/photo-1570976447640-ac859083963f?w=800', alt: 'Santorini Bandeau Set Back', isPrimary: false },
    ],
    featured: true,
    isNew: true,
    isBestseller: false,
    inStock: true,
    stockQuantity: 22,
    careInstructions: ['Hand wash cold', 'Lay flat to dry', 'Do not bleach'],
    details: ['Italian fabric', 'UPF 50+ protection', 'Fully lined'],
    createdAt: new Date('2024-01-20'),
    updatedAt: new Date('2024-01-20'),
  },
  {
    id: 'prod-4',
    slug: 'capri-sport-bikini',
    name: 'Capri Sport Bikini',
    description: 'A sporty bikini designed for active beach days. Secure fit with maximum comfort.',
    price: 85,
    category: 'bikini',
    collection: 'sport',
    colors: standardColors,
    sizes: standardSizes,
    images: [
      { id: 'img-7', url: 'https://images.unsplash.com/photo-1582639590011-f5a8416d1101?w=800', alt: 'Capri Sport Bikini', isPrimary: true },
      { id: 'img-8', url: 'https://images.unsplash.com/photo-1570976447640-ac859083963f?w=800', alt: 'Capri Sport Bikini Side', isPrimary: false },
    ],
    featured: false,
    isNew: false,
    isBestseller: true,
    inStock: true,
    stockQuantity: 45,
    careInstructions: ['Hand wash cold', 'Lay flat to dry', 'Do not bleach'],
    details: ['Quick-dry fabric', 'UPF 50+ protection', 'Chlorine resistant'],
    createdAt: new Date('2024-01-05'),
    updatedAt: new Date('2024-01-05'),
  },
];

export const collections: Collection[] = [
  {
    id: 'col-1',
    slug: 'summer-2024',
    name: 'Summer 2024',
    description: 'Our latest collection inspired by the Mediterranean coastline.',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200',
    featured: true,
    productCount: 3,
  },
  {
    id: 'col-2',
    slug: 'bikinis',
    name: 'Bikinis',
    description: 'Classic and modern bikini sets for every style.',
    image: 'https://images.unsplash.com/photo-1570976447640-ac859083963f?w=1200',
    featured: true,
    productCount: 3,
  },
  {
    id: 'col-3',
    slug: 'one-pieces',
    name: 'One Pieces',
    description: 'Elegant one-piece swimsuits with sophisticated designs.',
    image: 'https://images.unsplash.com/photo-1597345303950-50c8a33df1c9?w=1200',
    featured: true,
    productCount: 1,
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getFeaturedProducts(): Product[] {
  return products.filter((p) => p.featured);
}

export function getFeaturedCollections(): Collection[] {
  return collections.filter((c) => c.featured);
}

export function getCollectionBySlug(slug: string): Collection | undefined {
  return collections.find((c) => c.slug === slug);
}

export function getProductsByCollection(slug: string): Product[] {
  if (slug === 'bikinis') {
    return products.filter((p) => p.category === 'bikini');
  }
  if (slug === 'one-pieces') {
    return products.filter((p) => p.category === 'one-piece');
  }
  return products.filter((p) => p.collection === slug);
}
