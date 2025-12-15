export function formatPrice(price: number): string {
  return new Intl.NumberFormat('en-EU', {
    style: 'currency',
    currency: 'EUR',
  }).format(price);
}

export function cn(...classes: (string | boolean | undefined)[]): string {
  return classes.filter(Boolean).join(' ');
}

export const STORE_CONFIG = {
  freeShippingThreshold: 100,
  standardShipping: 8.99,
  expressShipping: 15.99,
  taxRate: 0.2,
};
