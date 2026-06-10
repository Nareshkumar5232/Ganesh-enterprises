import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { ProductCategory } from "@/types";

export type SortOption =
  | "price-asc"
  | "price-desc"
  | "newest"
  | "popular"
  | "rating"
  | "az";

interface ProductFilterStore {
  searchQuery: string;
  category: ProductCategory | "all";
  priceRange: [number, number];
  minRating: number;
  availability: "all" | "in-stock";
  newArrivalsOnly: boolean;
  sortBy: SortOption;

  setSearchQuery: (query: string) => void;
  setCategory: (category: ProductCategory | "all") => void;
  setPriceRange: (range: [number, number]) => void;
  setMinRating: (rating: number) => void;
  setAvailability: (availability: "all" | "in-stock") => void;
  setNewArrivalsOnly: (only: boolean) => void;
  setSortBy: (sort: SortOption) => void;
  resetFilters: () => void;
}

const initialFilters = {
  searchQuery: "",
  category: "all" as ProductCategory | "all",
  priceRange: [0, 20000] as [number, number],
  minRating: 0,
  availability: "all" as "all" | "in-stock",
  newArrivalsOnly: false,
  sortBy: "popular" as SortOption,
};

export const useProductFilterStore = create<ProductFilterStore>()(
  persist(
    (set) => ({
      ...initialFilters,

      setSearchQuery: (searchQuery) => set({ searchQuery }),
      setCategory: (category) => set({ category }),
      setPriceRange: (priceRange) => set({ priceRange }),
      setMinRating: (minRating) => set({ minRating }),
      setAvailability: (availability) => set({ availability }),
      setNewArrivalsOnly: (newArrivalsOnly) => set({ newArrivalsOnly }),
      setSortBy: (sortBy) => set({ sortBy }),
      resetFilters: () => set(initialFilters),
    }),
    {
      name: "sri-ganesh-enterprises-product-filters",
      skipHydration: true,
    }
  )
);
