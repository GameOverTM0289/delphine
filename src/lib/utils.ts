export function formatPrice(price: number): string {
  return new Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency: 'EUR',
  }).format(price);
}

export function cn(...classes: (string | boolean | undefined | null)[]): string {
  return classes.filter(Boolean).join(' ');
}

export function generateOrderNumber(): string {
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `DLP-${timestamp}-${random}`;
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

export function formatDate(date: Date | string): string {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(new Date(date));
}

export function formatDateTime(date: Date | string): string {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(date));
}

export const PLACEHOLDER_IMAGE = 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800';

// Image path helper - makes it easy to swap between local and remote images
export function getImageUrl(path: string): string {
  // If it's already a full URL, return as is
  if (path.startsWith('http://') || path.startsWith('https://')) {
    return path;
  }
  
  // If it's a local path starting with /images/, check if file exists
  // For now, return Unsplash placeholder
  // TODO: Return actual path once images are added
  const placeholders: Record<string, string> = {
    // Hero slides
    '/images/hero/slide-1.jpg': 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1920',
    '/images/hero/slide-2.jpg': 'https://images.unsplash.com/photo-1519046904884-53103b34b206?w=1920',
    '/images/hero/slide-3.jpg': 'https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=1920',
    // Products
    '/images/products/riviera-bikini-set-1.jpg': 'https://images.unsplash.com/photo-1570976447640-ac859083963f?w=800',
    '/images/products/riviera-bikini-set-2.jpg': 'https://images.unsplash.com/photo-1582639590011-f5a8416d1101?w=800',
    '/images/products/aegean-one-piece-1.jpg': 'https://images.unsplash.com/photo-1597345303950-50c8a33df1c9?w=800',
    '/images/products/aegean-one-piece-2.jpg': 'https://images.unsplash.com/photo-1580618864180-af464afa5c71?w=800',
    '/images/products/santorini-bandeau-set-1.jpg': 'https://images.unsplash.com/photo-1594046243098-0fceea9d451e?w=800',
    '/images/products/santorini-bandeau-set-2.jpg': 'https://images.unsplash.com/photo-1570976447640-ac859083963f?w=800',
    '/images/products/capri-sport-bikini-1.jpg': 'https://images.unsplash.com/photo-1582639590011-f5a8416d1101?w=800',
    '/images/products/capri-sport-bikini-2.jpg': 'https://images.unsplash.com/photo-1570976447640-ac859083963f?w=800',
    // Categories
    '/images/categories/bikinis.jpg': 'https://images.unsplash.com/photo-1570976447640-ac859083963f?w=800',
    '/images/categories/one-pieces.jpg': 'https://images.unsplash.com/photo-1597345303950-50c8a33df1c9?w=800',
    // Collections
    '/images/collections/summer-2024.jpg': 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200',
  };

  return placeholders[path] || PLACEHOLDER_IMAGE;
}

// Constants
export const SHIPPING = {
  FREE_THRESHOLD: 100,
  STANDARD: 8.99,
  EXPRESS: 15.99,
};

export const TAX_RATE = 0.20;
