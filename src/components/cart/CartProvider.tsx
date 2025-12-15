'use client';

import { useEffect } from 'react';
import { useCartStore } from '@/lib/store/cart';

export default function CartProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    useCartStore.persist.rehydrate();
  }, []);

  return <>{children}</>;
}
