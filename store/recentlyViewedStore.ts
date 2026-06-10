// Sri Ganesh Enterprises — Recently Viewed Store
// Validates: Requirements 6.9, 15.4, 15.5, 15.6

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Product } from '@/types';

interface RecentlyViewedStore {
  products: Product[];
  addProduct: (product: Product) => void;
  clearRecentlyViewed: () => void;
}

export const useRecentlyViewedStore = create<RecentlyViewedStore>()(
  persist(
    (set) => ({
      products: [],

      addProduct: (product: Product) => {
        set((state) => {
          // Remove any existing entry with the same product id (deduplication)
          const filtered = state.products.filter((p) => p.id !== product.id);
          // Prepend the new product to the front and trim to max 10 items
          return {
            products: [product, ...filtered].slice(0, 10),
          };
        });
      },

      clearRecentlyViewed: () => {
        set({ products: [] });
      },
    }),
    {
      name: 'sri-ganesh-enterprises-recently-viewed',
      skipHydration: true,
    }
  )
);
