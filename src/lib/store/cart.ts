import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CartItemData } from '../types';

interface CartState {
  items: CartItemData[];
  isOpen: boolean;
  addItem: (item: Omit<CartItemData, 'quantity'>) => void;
  removeItem: (productId: string, colorId: string, sizeId: string) => void;
  updateQuantity: (productId: string, colorId: string, sizeId: string, quantity: number) => void;
  clearCart: () => void;
  toggleCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  getItemCount: () => number;
  getSubtotal: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,

      addItem: (item) => {
        set((state) => {
          const existingIndex = state.items.findIndex(
            (i) =>
              i.productId === item.productId &&
              i.colorId === item.colorId &&
              i.sizeId === item.sizeId
          );

          if (existingIndex > -1) {
            const newItems = [...state.items];
            newItems[existingIndex].quantity += 1;
            return { items: newItems, isOpen: true };
          }

          return {
            items: [...state.items, { ...item, quantity: 1 }],
            isOpen: true,
          };
        });
      },

      removeItem: (productId, colorId, sizeId) => {
        set((state) => ({
          items: state.items.filter(
            (i) =>
              !(i.productId === productId && i.colorId === colorId && i.sizeId === sizeId)
          ),
        }));
      },

      updateQuantity: (productId, colorId, sizeId, quantity) => {
        if (quantity < 1) {
          get().removeItem(productId, colorId, sizeId);
          return;
        }

        set((state) => ({
          items: state.items.map((i) =>
            i.productId === productId && i.colorId === colorId && i.sizeId === sizeId
              ? { ...i, quantity }
              : i
          ),
        }));
      },

      clearCart: () => set({ items: [] }),
      toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),
      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),

      getItemCount: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0);
      },

      getSubtotal: () => {
        return get().items.reduce(
          (total, item) => total + item.price * item.quantity,
          0
        );
      },
    }),
    {
      name: 'delphine-cart',
      skipHydration: true,
    }
  )
);
