// Sri Ganesh Enterprises — Wishlist Store
// Validates: Requirements 5.10, 15.1, 15.2, 15.3

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { WishlistItem, Product } from '@/types';

interface WishlistStore {
  items: WishlistItem[];
  toggleItem: (product: Product) => void;
  isInWishlist: (productId: string) => boolean;
  clearWishlist: () => void;
}

export const useWishlistStore = create<WishlistStore>()(
  persist(
    (set, get) => ({
      items: [],

      toggleItem: (product: Product) => {
        set((state) => {
          const exists = state.items.some((item) => item.product.id === product.id);
          if (exists) {
            return {
              items: state.items.filter((item) => item.product.id !== product.id),
            };
          }
          return {
            items: [
              ...state.items,
              { product, addedAt: new Date().toISOString() },
            ],
          };
        });
      },

      isInWishlist: (productId: string) => {
        return get().items.some((item) => item.product.id === productId);
      },

      clearWishlist: () => {
        set({ items: [] });
      },
    }),
    {
      name: 'sri-ganesh-enterprises-wishlist',
      skipHydration: true,
    }
  )
);
