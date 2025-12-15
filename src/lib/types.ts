export interface Product {
  id: string;
  slug: string;
  name: string;
  description: string;
  price: number;
  compareAtPrice?: number;
  category: 'bikini' | 'one-piece';
  collection?: string;
  colors: ProductColor[];
  sizes: ProductSize[];
  images: ProductImage[];
  featured: boolean;
  isNew: boolean;
  isBestseller: boolean;
  inStock: boolean;
  stockQuantity: number;
  careInstructions: string[];
  details: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface ProductColor {
  id: string;
  name: string;
  hex: string;
  available: boolean;
}

export interface ProductSize {
  id: string;
  name: 'S' | 'M' | 'L';
  inStock: boolean;
  stockQuantity: number;
}

export interface ProductImage {
  id: string;
  url: string;
  alt: string;
  isPrimary: boolean;
}

export interface Collection {
  id: string;
  slug: string;
  name: string;
  description: string;
  image: string;
  featured: boolean;
  productCount: number;
}

export interface CartItemData {
  productId: string;
  productName: string;
  productSlug: string;
  productImage: string;
  colorId: string;
  colorName: string;
  colorHex: string;
  sizeId: string;
  sizeName: string;
  price: number;
  quantity: number;
}
