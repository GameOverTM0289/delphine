import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface WishlistItem {
  productId: string;
  productName: string;
  productSlug: string;
  productImage: string;
  price: number;
}

interface WishlistState {
  items: WishlistItem[];
  isOpen: boolean;
  
  // Actions
  addItem: (item: WishlistItem) => void;
  removeItem: (productId: string) => void;
  toggleItem: (item: WishlistItem) => void;
  isInWishlist: (productId: string) => boolean;
  clearWishlist: () => void;
  toggleWishlist: () => void;
  openWishlist: () => void;
  closeWishlist: () => void;
  
  // Computed
  getItemCount: () => number;
}

export const useWishlistStore = create<WishlistState>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,

      addItem: (item) => {
        set((state) => {
          const exists = state.items.some((i) => i.productId === item.productId);
          if (exists) return state;
          return { items: [...state.items, item] };
        });
      },

      removeItem: (productId) => {
        set((state) => ({
          items: state.items.filter((i) => i.productId !== productId),
        }));
      },

      toggleItem: (item) => {
        const exists = get().items.some((i) => i.productId === item.productId);
        if (exists) {
          get().removeItem(item.productId);
        } else {
          get().addItem(item);
        }
      },

      isInWishlist: (productId) => {
        return get().items.some((i) => i.productId === productId);
      },

      clearWishlist: () => set({ items: [] }),
      toggleWishlist: () => set((state) => ({ isOpen: !state.isOpen })),
      openWishlist: () => set({ isOpen: true }),
      closeWishlist: () => set({ isOpen: false }),

      getItemCount: () => {
        return get().items.length;
      },
    }),
    {
      name: 'delphine-wishlist',
      skipHydration: true,
    }
  )
);
