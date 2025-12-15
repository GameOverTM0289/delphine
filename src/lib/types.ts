export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  compareAtPrice?: number;
  images: string[];
  category: string;
  collection?: string;
  colors: ProductColor[];
  sizes: string[];
  tags?: string[];
  isNew?: boolean;
  isBestSeller?: boolean;
  inStock?: boolean;
  material?: string;
  careInstructions?: string[];
}

export interface ProductColor {
  name: string;
  hex: string;
  image?: string;
}

export interface CartItem {
  productId: string;
  productName: string;
  productImage: string;
  variantId: string;
  variantName: string;
  size: string;
  color: string;
  price: number;
  quantity: number;
}

export interface Collection {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  productCount?: number;
}

export interface CheckoutFormData {
  email: string;
  firstName: string;
  lastName: string;
  address: string;
  apartment?: string;
  city: string;
  country: string;
  postalCode: string;
  phonePrefix: string;
  phone: string;
}

export interface FormErrors {
  email?: string;
  firstName?: string;
  lastName?: string;
  address?: string;
  city?: string;
  country?: string;
  postalCode?: string;
  phone?: string;
}

export interface NewsletterSubscriber {
  id: string;
  email: string;
  firstName?: string;
  isActive: boolean;
  subscribedAt: Date;
  unsubscribedAt?: Date;
}

export interface ContactFormData {
  firstName: string;
  lastName: string;
  email: string;
  subject: string;
  message: string;
}

export interface ShippingMethod {
  id: string;
  name: string;
  description: string;
  price: number;
  estimatedDays: string;
}
