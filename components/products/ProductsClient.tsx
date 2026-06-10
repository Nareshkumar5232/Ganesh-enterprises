"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  SlidersHorizontal,
  X,
  RotateCcw,
  Star,
  ChevronDown,
  Sparkles,
  ShoppingBag,
  Heart,
  Eye,
  Check,
  ArrowUpDown,
} from "lucide-react";
import { toast } from "sonner";
import { useProductFilterStore, type SortOption } from "@/store/productFilterStore";
import { useCartStore } from "@/store/cartStore";
import { useWishlistStore } from "@/store/wishlistStore";
import { ProductCard } from "@/components/products/ProductCard";
import { formatCurrency, getDiscountPercentage } from "@/lib/utils";
import { useDebounce } from "@/hooks/useDebounce";
import { useProductsQuery } from "@/hooks/useProducts";
import type { Product, ProductCategory } from "@/types";

const PLACEHOLDER = "/images/placeholder-product.svg";

interface ProductsClientProps {
  initialSearchQuery?: string;
}

const CATEGORY_MAP: Record<ProductCategory, { title: string; desc: string }> = {
  "mobile-accessories": {
    title: "Mobile Accessories",
    desc: "Premium shields, stands, and mounts for your everyday mobile devices.",
  },
  electronics: {
    title: "Electronics",
    desc: "Advanced consumer electronics, audio systems, and measurement tools.",
  },
  "electrical-appliances": {
    title: "Technology Solutions",
    desc: "Computing essentials, IT accessories, networking gear, and practical tech solutions.",
  },
  "computer-accessories": {
    title: "Computer Accessories",
    desc: "Keyboards, mice, and productivity hubs designed for modern professionals.",
  },
  chargers: {
    title: "Chargers",
    desc: "High-speed GaN adapters, wireless docks, and high-performance cables.",
  },
  earphones: {
    title: "Earphones",
    desc: "Immersive acoustics, noise-canceling headphones, and true wireless earbuds.",
  },
  "smart-devices": {
    title: "Smart Devices",
    desc: "Smart cameras, plugs, and lights to automate and secure your living space.",
  },
};

const CATEGORIES_LIST: { id: ProductCategory | "all"; label: string }[] = [
  { id: "all", label: "All Products" },
  { id: "mobile-accessories", label: "Mobile Accessories" },
  { id: "electronics", label: "Electronics" },
  { id: "electrical-appliances", label: "Technology Solutions" },
  { id: "computer-accessories", label: "Computer Accessories" },
  { id: "chargers", label: "Chargers" },
  { id: "earphones", label: "Earphones" },
  { id: "smart-devices", label: "Smart Devices" },
];

const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: "popular", label: "Most Popular" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "newest", label: "Newest First" },
  { value: "rating", label: "Highest Rated" },
  { value: "az", label: "Alphabetical: A-Z" },
];

export default function ProductsClient({ initialSearchQuery = "" }: ProductsClientProps) {
  // Store states
  const {
    searchQuery,
    category,
    priceRange,
    minRating,
    availability,
    newArrivalsOnly,
    sortBy,
    setSearchQuery,
    setCategory,
    setPriceRange,
    setMinRating,
    setAvailability,
    setNewArrivalsOnly,
    setSortBy,
    resetFilters,
  } = useProductFilterStore();

  const addItemToCart = useCartStore((s) => s.addItem);
  const { toggleItem, isInWishlist } = useWishlistStore();
  const debouncedSearchQuery = useDebounce(searchQuery, 350);
  const { data, isLoading, isError, refetch } = useProductsQuery({
    search: debouncedSearchQuery.trim() || undefined,
    category: category === "all" ? undefined : category,
    limit: 1000,
  });
  const backendProducts = data?.products ?? [];

  // Local UI states
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [quickViewQty, setQuickViewQty] = useState(1);
  const [activeVisibleSection, setActiveVisibleSection] = useState<ProductCategory | "all">("all");
  const [priceInput, setPriceInput] = useState<number>(priceRange[1]);

  // Sync initial query from URL search parameters if any
  useEffect(() => {
    if (initialSearchQuery && searchQuery !== initialSearchQuery) {
      setSearchQuery(initialSearchQuery);
    }
  }, [initialSearchQuery]);

  // Sync price range slide input
  useEffect(() => {
    setPriceInput(priceRange[1]);
  }, [priceRange]);

  // Scroll section refs & intersection observer to track active scroll section
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});
  const navContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "-120px 0px -60% 0px", // Trigger when section is in top-middle of view
      threshold: 0.1,
    };

    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.getAttribute("data-section-id") as ProductCategory;
          if (sectionId) {
            setActiveVisibleSection(sectionId);
          }
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, observerOptions);

    Object.values(sectionRefs.current).forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, [category]);

  // Filter and Sort calculation
  const filteredAndSortedProducts = useMemo(() => {
    let result = [...backendProducts];

    // Search query filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter((p) => {
        return (
          p.name.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q) ||
          p.category.replace("-", " ").toLowerCase().includes(q) ||
          p.tags.some((t) => t.toLowerCase().includes(q))
        );
      });
    }

    // Category filter
    if (category !== "all") {
      result = result.filter((p) => p.category === category);
    }

    // Price filter
    result = result.filter((p) => p.price >= priceRange[0] && p.price <= priceRange[1]);

    // Rating filter
    if (minRating > 0) {
      result = result.filter((p) => p.rating >= minRating);
    }

    // Availability filter
    if (availability === "in-stock") {
      result = result.filter((p) => p.stock > 0);
    }

    // New arrivals filter
    if (newArrivalsOnly) {
      result = result.filter((p) => p.tags.includes("new") || p.isFeatured);
    }

    // Sorting
    result.sort((a, b) => {
      switch (sortBy) {
        case "price-asc":
          return a.price - b.price;
        case "price-desc":
          return b.price - a.price;
        case "newest":
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        case "rating":
          return b.rating - a.rating;
        case "az":
          return a.name.localeCompare(b.name);
        case "popular":
        default:
          return b.reviewCount - a.reviewCount;
      }
    });

    return result;
  }, [backendProducts, searchQuery, category, priceRange, minRating, availability, newArrivalsOnly, sortBy]);

  // Group products by category
  const groupedProducts = useMemo(() => {
    const groups: Record<ProductCategory, Product[]> = {
      "mobile-accessories": [],
      electronics: [],
      "electrical-appliances": [],
      "computer-accessories": [],
      chargers: [],
      earphones: [],
      "smart-devices": [],
    };

    filteredAndSortedProducts.forEach((p) => {
      if (groups[p.category]) {
        groups[p.category].push(p);
      }
    });

    return groups;
  }, [filteredAndSortedProducts]);

  // Detect count of active filters
  const activeFiltersCount = useMemo(() => {
    let count = 0;
    if (searchQuery) count++;
    if (category !== "all") count++;
    if (priceRange[0] !== 0 || priceRange[1] !== 20000) count++;
    if (minRating > 0) count++;
    if (availability !== "all") count++;
    if (newArrivalsOnly) count++;
    return count;
  }, [searchQuery, category, priceRange, minRating, availability, newArrivalsOnly]);

  const scrollToSection = (catId: ProductCategory | "all") => {
    if (catId === "all") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      setActiveVisibleSection("all");
      setCategory("all");
      return;
    }

    setCategory(catId);
    setTimeout(() => {
      const element = sectionRefs.current[catId];
      if (element) {
        const yOffset = -140; // Height of sticky navbar & tabs
        const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: "smooth" });
        setActiveVisibleSection(catId);
      }
    }, 100);
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    setPriceInput(value);
    setPriceRange([priceRange[0], value]);
  };

  const hasDiscount = (product: Product) => {
    return product.originalPrice !== undefined && product.originalPrice > product.price;
  };

  return (
    <div className="min-h-screen bg-background text-foreground pt-24 pb-20">
      {/* ── TOP HERO HEADER ── */}
      <div className="max-w-7xl mx-auto px-4 mb-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-white/10">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-5 h-5 text-[#DC2626]" />
              <span className="text-xs uppercase tracking-widest text-[#DC2626] font-bold">Premium Showroom</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight">
              Enterprise <span className="text-[#DC2626] font-light">Products</span>
            </h1>
            <p className="text-gray-400 mt-2 text-sm md:text-base">
              Explore our carefully curated premium components and appliances built to the highest specifications.
            </p>
          </div>
          <div className="text-right flex items-center md:flex-col gap-2 md:gap-0 justify-between">
            <span className="text-2xl font-mono font-black text-white">{filteredAndSortedProducts.length}</span>
            <span className="text-xs text-gray-500 uppercase tracking-wider">Products Available</span>
          </div>
        </div>
      </div>

      {/* ── STICKY CATEGORY TABS ── */}
      <div className="sticky top-20 z-40 bg-background/95 backdrop-blur-md border-b border-white/5 py-4 mb-8">
        <div className="max-w-7xl mx-auto px-4">
          <div
            ref={navContainerRef}
            className="flex items-center gap-3 overflow-x-auto no-scrollbar scroll-smooth"
          >
            {CATEGORIES_LIST.map((cat) => {
              const isActive = category === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => scrollToSection(cat.id)}
                  className={`flex-shrink-0 px-4 py-2 text-xs font-semibold rounded-full border transition-all duration-300 select-none ${
                    isActive
                      ? "bg-[#DC2626] text-white border-[#DC2626] shadow-[0_0_12px_rgba(220, 38, 38, 0.3)] font-bold"
                      : "bg-white/5 text-gray-300 border-white/10 hover:border-white/30 hover:text-white"
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── MAIN PRODUCTS CONTAINER ── */}
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* ── SIDEBAR FILTERS (DESKTOP) ── */}
          <aside className="hidden lg:block lg:col-span-1 space-y-6 self-start sticky top-40">
            <div className="glass-card p-6 border border-white/10 space-y-6">
              {/* Header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <SlidersHorizontal className="w-4 h-4 text-[#DC2626]" />
                  <h2 className="text-sm uppercase tracking-wider font-bold text-white">Filters</h2>
                </div>
                {activeFiltersCount > 0 && (
                  <button
                    onClick={resetFilters}
                    className="flex items-center gap-1 text-[11px] font-semibold text-[#DC2626] hover:underline"
                  >
                    <RotateCcw className="w-3 h-3" />
                    Reset
                  </button>
                )}
              </div>

              {/* Categories Filter */}
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-wider text-gray-400 font-semibold">Category</label>
                <div className="flex flex-col gap-1.5 mt-2">
                  {CATEGORIES_LIST.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => setCategory(cat.id)}
                      className={`text-left text-sm py-1 px-2 rounded-md transition-all duration-200 flex items-center justify-between ${
                        category === cat.id
                          ? "bg-white/10 text-[#DC2626] font-semibold"
                          : "text-gray-400 hover:bg-white/5 hover:text-white"
                      }`}
                    >
                      <span>{cat.label}</span>
                      {category === cat.id && <Check className="w-3.5 h-3.5 text-[#DC2626]" />}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Filter */}
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <label className="text-xs uppercase tracking-wider text-gray-400 font-semibold">Max Price</label>
                  <span className="font-mono text-xs text-[#DC2626]">{formatCurrency(priceInput)}</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="20000"
                  step="500"
                  value={priceInput}
                  onChange={handlePriceChange}
                  className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-[#DC2626]"
                />
                <div className="flex justify-between text-[10px] text-gray-500 font-mono">
                  <span>₹0</span>
                  <span>₹20,000+</span>
                </div>
              </div>

              {/* Ratings Filter */}
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-wider text-gray-400 font-semibold">Minimum Rating</label>
                <div className="flex items-center gap-1.5 mt-1.5">
                  {[1, 2, 3, 4, 5].map((stars) => {
                    const isActive = minRating === stars;
                    return (
                      <button
                        key={stars}
                        onClick={() => setMinRating(isActive ? 0 : stars)}
                        className={`flex items-center justify-center flex-1 py-1.5 rounded-md border text-xs font-semibold transition-all duration-200 ${
                          isActive
                            ? "bg-[#DC2626] text-white border-[#DC2626] font-bold shadow-[0_0_8px_rgba(220, 38, 38, 0.25)]"
                            : "bg-white/5 border-white/10 text-gray-300 hover:border-white/20 hover:text-white"
                        }`}
                      >
                        {stars} <Star className={`w-3 h-3 ml-0.5 ${isActive ? "fill-black" : "fill-none"}`} />
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Toggle Switches */}
              <div className="space-y-3 pt-2">
                {/* Availability */}
                <label className="flex items-center justify-between cursor-pointer group select-none">
                  <span className="text-xs uppercase tracking-wider text-gray-400 font-semibold group-hover:text-white transition-colors">
                    In Stock Only
                  </span>
                  <input
                    type="checkbox"
                    checked={availability === "in-stock"}
                    onChange={(e) => setAvailability(e.target.checked ? "in-stock" : "all")}
                    className="sr-only peer"
                  />
                  <div className="relative w-8 h-4 bg-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-gray-400 peer-checked:after:bg-black after:rounded-full after:h-3 after:w-3 after:transition-all peer-checked:bg-[#DC2626]" />
                </label>

                {/* New Arrivals */}
                <label className="flex items-center justify-between cursor-pointer group select-none">
                  <span className="text-xs uppercase tracking-wider text-gray-400 font-semibold group-hover:text-white transition-colors">
                    New Arrivals
                  </span>
                  <input
                    type="checkbox"
                    checked={newArrivalsOnly}
                    onChange={(e) => setNewArrivalsOnly(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="relative w-8 h-4 bg-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-gray-400 peer-checked:after:bg-black after:rounded-full after:h-3 after:w-3 after:transition-all peer-checked:bg-[#DC2626]" />
                </label>
              </div>
            </div>
          </aside>

          {/* ── MAIN PRODUCTS DISPLAY ── */}
          <main className="col-span-1 lg:col-span-3 space-y-10">
            {/* ── TOPBAR TOOLBAR ── */}
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-between bg-white/5 border border-white/10 p-4 rounded-xl">
              {/* Search input */}
              <div className="relative w-full sm:max-w-md">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <input
                  type="text"
                  placeholder="Search products, brands, tags..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 text-sm bg-black/40 border border-white/15 rounded-lg outline-none focus:border-[#DC2626] focus:ring-1 focus:ring-[#DC2626]/30 transition-all duration-300 text-white placeholder-gray-500"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-0.5 rounded-full hover:bg-white/15"
                  >
                    <X className="w-3.5 h-3.5 text-gray-400" />
                  </button>
                )}
              </div>

              {/* Sort by */}
              <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
                <div className="flex items-center gap-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  <ArrowUpDown className="w-3.5 h-3.5 text-[#DC2626]" />
                  <span>Sort By</span>
                </div>
                <div className="relative">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as SortOption)}
                    className="appearance-none bg-black/60 border border-white/15 rounded-lg px-4 pr-10 py-2 text-sm text-white font-medium outline-none focus:border-[#DC2626] transition-colors cursor-pointer select-none"
                  >
                    {SORT_OPTIONS.map((opt) => (
                      <option key={opt.value} value={opt.value} className="bg-[#0F0F0F] text-white">
                        {opt.label}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                </div>
              </div>
            </div>

            {/* Active filters display */}
            {activeFiltersCount > 0 && (
              <div className="flex flex-wrap items-center gap-2 mt-2">
                <span className="text-xs text-gray-500 uppercase tracking-wider font-semibold mr-1">Active filters:</span>
                {searchQuery && (
                  <span className="flex items-center gap-1 bg-white/5 border border-white/10 px-2.5 py-1 rounded-md text-xs text-white">
                    Search: "{searchQuery}"
                    <button onClick={() => setSearchQuery("")} className="hover:text-[#DC2626] ml-1">
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}
                {category !== "all" && (
                  <span className="flex items-center gap-1 bg-white/5 border border-white/10 px-2.5 py-1 rounded-md text-xs text-[#DC2626]">
                    Category: {CATEGORY_MAP[category]?.title || category}
                    <button onClick={() => setCategory("all")} className="hover:text-white ml-1">
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}
                {(priceRange[0] !== 0 || priceRange[1] !== 20000) && (
                  <span className="flex items-center gap-1 bg-white/5 border border-white/10 px-2.5 py-1 rounded-md text-xs text-white">
                    Max Price: {formatCurrency(priceRange[1])}
                    <button onClick={() => setPriceRange([0, 20000])} className="hover:text-[#DC2626] ml-1">
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}
                {minRating > 0 && (
                  <span className="flex items-center gap-1 bg-white/5 border border-white/10 px-2.5 py-1 rounded-md text-xs text-white">
                    Rating: {minRating}+ ★
                    <button onClick={() => setMinRating(0)} className="hover:text-[#DC2626] ml-1">
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}
                {availability === "in-stock" && (
                  <span className="flex items-center gap-1 bg-white/5 border border-white/10 px-2.5 py-1 rounded-md text-xs text-white">
                    In Stock Only
                    <button onClick={() => setAvailability("all")} className="hover:text-[#DC2626] ml-1">
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}
                {newArrivalsOnly && (
                  <span className="flex items-center gap-1 bg-white/5 border border-white/10 px-2.5 py-1 rounded-md text-xs text-white">
                    New Arrivals Only
                    <button onClick={() => setNewArrivalsOnly(false)} className="hover:text-[#DC2626] ml-1">
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}
                <button
                  onClick={resetFilters}
                  className="text-xs text-[#DC2626] hover:underline flex items-center gap-1 ml-1"
                >
                  Clear All
                </button>
              </div>
            )}

            {/* ── DYNAMIC SECTIONS GRID ── */}
            <div className="space-y-16">
              {isLoading ? (
                <div className="text-center py-20 bg-white/5 border border-white/10 rounded-2xl">
                  <div className="mx-auto mb-4 h-12 w-12 rounded-full border-2 border-[#DC2626] border-t-transparent animate-spin" />
                  <h3 className="text-xl font-bold text-white mb-2">Loading products...</h3>
                  <p className="text-gray-400 text-sm max-w-sm mx-auto">
                    Fetching the latest catalog from the backend.
                  </p>
                </div>
              ) : isError ? (
                <div className="text-center py-20 bg-white/5 border border-white/10 rounded-2xl">
                  <SlidersHorizontal className="w-12 h-12 text-[#DC2626] mx-auto mb-4 opacity-40 animate-pulse" />
                  <h3 className="text-xl font-bold text-white mb-2">Unable to load products. Please try again later.</h3>
                  <p className="text-gray-400 text-sm max-w-sm mx-auto mb-6">
                    The backend is unavailable right now.
                  </p>
                  <button
                    onClick={() => refetch()}
                    className="px-6 py-2 text-xs font-bold uppercase tracking-wider rounded-lg bg-[#DC2626] text-white hover:scale-105 active:scale-95 transition-all shadow-[0_0_12px_rgba(220, 38, 38, 0.3)]"
                  >
                    Retry
                  </button>
                </div>
              ) : filteredAndSortedProducts.length === 0 ? (
                <div className="text-center py-20 bg-white/5 border border-white/10 rounded-2xl">
                  <SlidersHorizontal className="w-12 h-12 text-[#DC2626] mx-auto mb-4 opacity-40 animate-pulse" />
                  <h3 className="text-xl font-bold text-white mb-2">No matching products found</h3>
                  <p className="text-gray-400 text-sm max-w-sm mx-auto mb-6">
                    We couldn't find any products matching your filters. Try resetting the filters or tweaking your search terms.
                  </p>
                  <button
                    onClick={resetFilters}
                    className="px-6 py-2 text-xs font-bold uppercase tracking-wider rounded-lg bg-[#DC2626] text-white hover:scale-105 active:scale-95 transition-all shadow-[0_0_12px_rgba(220, 38, 38, 0.3)]"
                  >
                    Reset Filters
                  </button>
                </div>
              ) : (
                Object.keys(groupedProducts).map((catKey) => {
                  const catId = catKey as ProductCategory;
                  const catData = CATEGORY_MAP[catId];
                  const products = groupedProducts[catId];

                  // Hide sections with no products to clean up UI when filtering
                  if (products.length === 0) return null;

                  return (
                    <section
                      key={catId}
                      ref={(el) => {
                        sectionRefs.current[catId] = el;
                      }}
                      data-section-id={catId}
                      className="space-y-6 scroll-mt-36"
                    >
                      {/* Section Title, Description, and Separation Glow */}
                      <div className="relative pb-4">
                        <div className="flex items-center gap-2.5">
                          <span className="w-1.5 h-6 bg-[#DC2626] rounded-full shadow-[0_0_8px_rgba(220,38,38,0.4)]" />
                          <h2 className="text-2xl font-extrabold text-white tracking-tight">
                            {catData.title}
                          </h2>
                          <span className="text-xs text-gray-500 font-mono">({products.length} products)</span>
                        </div>
                        <p className="text-gray-400 text-xs mt-1 md:text-sm">{catData.desc}</p>
                        {/* Elegant divider with visual glow center */}
                        <div className="w-full h-[1px] bg-gradient-to-r from-white/10 via-[#DC2626]/30 to-white/10 mt-3 relative">
                          <div className="absolute top-1/2 left-0 -translate-y-1/2 w-20 h-[3px] bg-gradient-to-r from-transparent via-[#DC2626] to-transparent shadow-[0_0_10px_#DC2626]" />
                        </div>
                      </div>

                      {/* Product Grid */}
                      <motion.div
                        layout
                        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
                      >
                        <AnimatePresence mode="popLayout">
                          {products.map((product) => (
                            <motion.div
                              key={product.id}
                              initial={{ opacity: 0, scale: 0.95 }}
                              animate={{ opacity: 1, scale: 1 }}
                              exit={{ opacity: 0, scale: 0.95 }}
                              transition={{ duration: 0.3 }}
                              layout
                            >
                              <ProductCard
                                product={product}
                                onQuickView={(p) => {
                                  setQuickViewProduct(p);
                                  setQuickViewQty(1);
                                }}
                              />
                            </motion.div>
                          ))}
                        </AnimatePresence>
                      </motion.div>
                    </section>
                  );
                })
              )}
            </div>
          </main>
        </div>
      </div>

      {/* ── MOBILE BAR BUTTONS (STICKY BOTTOM) ── */}
      <div className="lg:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-40 w-full max-w-[280px]">
        <div className="flex items-center justify-center gap-3 bg-black/80 backdrop-blur-md border border-white/10 p-2.5 rounded-full shadow-[0_4px_30px_rgba(0,0,0,0.8)]">
          <button
            onClick={() => setMobileFilterOpen(true)}
            className="flex items-center justify-center gap-2 flex-1 py-2 rounded-full bg-[#DC2626] text-white text-xs font-bold uppercase tracking-wider"
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            Filter {activeFiltersCount > 0 ? `(${activeFiltersCount})` : ""}
          </button>
          <div className="w-[1px] h-6 bg-white/20" />
          <button
            onClick={() => {
              // Open quick sorting menu
              const order = sortBy === "price-asc" ? "price-desc" : "price-asc";
              setSortBy(order);
              toast.success(`Sorting toggled: ${order === "price-asc" ? "Low to High" : "High to Low"}`);
            }}
            className="flex items-center justify-center gap-1.5 flex-1 py-2 text-white hover:text-[#DC2626] text-xs font-bold uppercase tracking-wider transition-colors"
          >
            <ArrowUpDown className="w-3.5 h-3.5" />
            Sort
          </button>
        </div>
      </div>

      {/* ── MOBILE FILTERS DRAWER / MODAL ── */}
      <AnimatePresence>
        {mobileFilterOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileFilterOpen(false)}
              className="fixed inset-0 bg-black z-50 lg:hidden"
            />
            {/* Drawer */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 bottom-0 w-full max-w-sm bg-[#0F0F0F] border-l border-white/10 z-50 p-6 overflow-y-auto lg:hidden"
            >
              <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
                <div className="flex items-center gap-2">
                  <SlidersHorizontal className="w-4 h-4 text-[#DC2626]" />
                  <h3 className="text-sm uppercase tracking-wider font-bold text-white">Filters</h3>
                </div>
                <button
                  onClick={() => setMobileFilterOpen(false)}
                  className="p-1 rounded-full hover:bg-white/10 text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-6">
                {/* Reset */}
                {activeFiltersCount > 0 && (
                  <button
                    onClick={() => {
                      resetFilters();
                      toast.success("Filters cleared");
                    }}
                    className="w-full flex items-center justify-center gap-2 py-2 rounded-lg border border-white/15 hover:border-[#DC2626] hover:text-[#DC2626] transition-colors text-xs font-bold uppercase tracking-wider text-gray-300"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    Reset All Filters
                  </button>
                )}

                {/* Categories */}
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-wider text-gray-400 font-semibold">Category</label>
                  <div className="flex flex-col gap-1.5 mt-2">
                    {CATEGORIES_LIST.map((cat) => (
                      <button
                        key={cat.id}
                        onClick={() => {
                          setCategory(cat.id);
                          setMobileFilterOpen(false);
                          scrollToSection(cat.id);
                        }}
                        className={`text-left text-sm py-2 px-3 rounded-md transition-all flex items-center justify-between ${
                          category === cat.id
                            ? "bg-white/10 text-[#DC2626] font-semibold"
                            : "text-gray-400 hover:bg-white/5 hover:text-white"
                        }`}
                      >
                        <span>{cat.label}</span>
                        {category === cat.id && <Check className="w-3.5 h-3.5 text-[#DC2626]" />}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Price Range */}
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <label className="text-xs uppercase tracking-wider text-gray-400 font-semibold">Max Price</label>
                    <span className="font-mono text-xs text-[#DC2626]">{formatCurrency(priceInput)}</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="20000"
                    step="500"
                    value={priceInput}
                    onChange={handlePriceChange}
                    className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-[#DC2626]"
                  />
                  <div className="flex justify-between text-[10px] text-gray-500 font-mono">
                    <span>₹0</span>
                    <span>₹20,000+</span>
                  </div>
                </div>

                {/* Ratings */}
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-wider text-gray-400 font-semibold">Minimum Rating</label>
                  <div className="flex items-center gap-1.5 mt-1.5">
                    {[1, 2, 3, 4, 5].map((stars) => {
                      const isActive = minRating === stars;
                      return (
                        <button
                          key={stars}
                          onClick={() => setMinRating(isActive ? 0 : stars)}
                          className={`flex items-center justify-center flex-1 py-2 rounded-md border text-xs font-semibold transition-all ${
                            isActive
                              ? "bg-[#DC2626] text-white border-[#DC2626] font-bold"
                              : "bg-white/5 border-white/10 text-gray-300"
                          }`}
                        >
                          {stars} <Star className={`w-3 h-3 ml-0.5 ${isActive ? "fill-black" : "fill-none"}`} />
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Toggles */}
                <div className="space-y-4 pt-2 border-t border-white/10">
                  <label className="flex items-center justify-between cursor-pointer group select-none">
                    <span className="text-xs uppercase tracking-wider text-gray-400 font-semibold">In Stock Only</span>
                    <input
                      type="checkbox"
                      checked={availability === "in-stock"}
                      onChange={(e) => setAvailability(e.target.checked ? "in-stock" : "all")}
                      className="sr-only peer"
                    />
                    <div className="relative w-8 h-4 bg-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-gray-400 peer-checked:after:bg-black after:rounded-full after:h-3 after:w-3 after:transition-all peer-checked:bg-[#DC2626]" />
                  </label>

                  <label className="flex items-center justify-between cursor-pointer group select-none">
                    <span className="text-xs uppercase tracking-wider text-gray-400 font-semibold">New Arrivals</span>
                    <input
                      type="checkbox"
                      checked={newArrivalsOnly}
                      onChange={(e) => setNewArrivalsOnly(e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="relative w-8 h-4 bg-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-gray-400 peer-checked:after:bg-black after:rounded-full after:h-3 after:w-3 after:transition-all peer-checked:bg-[#DC2626]" />
                  </label>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* ── PREMIUM QUICK VIEW MODAL / DIALOG ── */}
      <AnimatePresence>
        {quickViewProduct && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.75 }}
              exit={{ opacity: 0 }}
              onClick={() => setQuickViewProduct(null)}
              className="fixed inset-0 bg-black z-50 backdrop-blur-md"
            />
            {/* Modal */}
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                className="w-full max-w-4xl bg-[#121212]/95 border border-[#DC2626]/30 rounded-2xl shadow-[0_0_50px_rgba(220, 38, 38, 0.15)] overflow-hidden flex flex-col md:flex-row relative"
              >
                {/* Close Button */}
                <button
                  onClick={() => setQuickViewProduct(null)}
                  className="absolute right-4 top-4 p-1.5 rounded-full bg-black/60 border border-white/10 hover:border-white/30 text-white z-10 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>

                {/* Left: Product Images */}
                <div className="w-full md:w-1/2 h-[300px] md:h-auto bg-[#1A1A1A] relative flex items-center justify-center p-8 border-b md:border-b-0 md:border-r border-white/10">
                  <div className="relative w-full h-full max-h-[350px] aspect-square">
                    <Image
                      src={quickViewProduct.images[0] || PLACEHOLDER}
                      alt={quickViewProduct.name}
                      fill
                      priority
                      className="object-contain"
                    />
                  </div>

                  {hasDiscount(quickViewProduct) && (
                    <span className="absolute top-4 left-4 bg-[#DC2626] text-white text-xs font-extrabold px-3 py-1 rounded-full">
                      {getDiscountPercentage(quickViewProduct.originalPrice!, quickViewProduct.price)}% OFF
                    </span>
                  )}
                </div>

                {/* Right: Product Details */}
                <div className="w-full md:w-1/2 p-8 flex flex-col justify-between">
                  <div>
                    {/* Category Tag */}
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-[10px] uppercase font-mono tracking-widest text-[#DC2626] font-extrabold px-2 py-0.5 bg-[#DC2626]/10 border border-[#DC2626]/30 rounded">
                        {CATEGORY_MAP[quickViewProduct.category]?.title || quickViewProduct.category.replace("-", " ")}
                      </span>
                      <span className="text-xs text-gray-500 font-semibold">• {quickViewProduct.brand}</span>
                    </div>

                    {/* Product Name */}
                    <h2 className="text-xl md:text-2xl font-black text-white leading-tight mb-2 hover:text-[#DC2626] transition-colors">
                      {quickViewProduct.name}
                    </h2>

                    {/* Ratings */}
                    <div className="flex items-center gap-1.5 mb-4">
                      <div className="flex items-center text-yellow-400">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-3.5 h-3.5 ${
                              i < Math.floor(quickViewProduct.rating) ? "fill-yellow-400" : "fill-none text-gray-600"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-xs text-gray-400">({quickViewProduct.reviewCount} reviews)</span>
                    </div>

                    {/* Pricing */}
                    <div className="flex items-baseline gap-3 mb-6 bg-white/5 p-3 rounded-lg border border-white/5 inline-flex">
                      <span className="text-2xl font-mono font-black text-[#DC2626]">
                        {formatCurrency(quickViewProduct.price)}
                      </span>
                      {hasDiscount(quickViewProduct) && (
                        <span className="text-sm font-mono text-gray-500 line-through">
                          {formatCurrency(quickViewProduct.originalPrice!)}
                        </span>
                      )}
                    </div>

                    {/* Short Description */}
                    <p className="text-gray-400 text-xs md:text-sm leading-relaxed mb-6">
                      {quickViewProduct.description}
                    </p>
                  </div>

                  {/* Add to Cart, Wishlist, Quantity */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold uppercase tracking-wider text-gray-400">Quantity</span>
                      <div className="flex items-center bg-black/60 border border-white/10 rounded-lg overflow-hidden">
                        <button
                          onClick={() => setQuickViewQty(Math.max(1, quickViewQty - 1))}
                          className="px-3 py-1.5 text-white hover:bg-white/5 active:bg-white/10 font-bold"
                        >
                          -
                        </button>
                        <span className="px-4 font-mono font-bold text-sm">{quickViewQty}</span>
                        <button
                          onClick={() => setQuickViewQty(Math.min(quickViewProduct.stock, quickViewQty + 1))}
                          className="px-3 py-1.5 text-white hover:bg-white/5 active:bg-white/10 font-bold"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <button
                        onClick={() => {
                          addItemToCart(quickViewProduct, quickViewQty);
                          toast.success(`${quickViewProduct.name} added to cart!`);
                          setQuickViewProduct(null);
                        }}
                        className="flex-1 py-3 bg-[#DC2626] hover:bg-[#B91C1C] text-white text-xs font-extrabold uppercase tracking-widest rounded-xl transition-all shadow-[0_0_15px_rgba(220, 38, 38, 0.3)] flex items-center justify-center gap-2"
                      >
                        <ShoppingBag className="w-4 h-4" />
                        Add To Cart
                      </button>

                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          toggleItem(quickViewProduct);
                          const isWish = isInWishlist(quickViewProduct.id);
                          if (isWish) {
                            toast.success(`${quickViewProduct.name} removed from wishlist.`);
                          } else {
                            toast.success(`${quickViewProduct.name} added to wishlist!`);
                          }
                        }}
                        className="p-3 bg-white/5 border border-white/10 hover:border-white/30 text-white hover:text-red-500 rounded-xl transition-all"
                      >
                        <Heart
                          className={`w-5 h-5 ${
                            isInWishlist(quickViewProduct.id) ? "fill-red-500 text-red-500" : ""
                          }`}
                        />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
