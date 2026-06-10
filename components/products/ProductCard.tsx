"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Heart, ShoppingCart, Eye, Star } from "lucide-react";
import { toast } from "sonner";
import { useCartStore } from "@/store/cartStore";
import { useWishlistStore } from "@/store/wishlistStore";
import { formatCurrency, getDiscountPercentage } from "@/lib/utils";
import type { Product } from "@/types";
import Link from "next/link";

interface ProductCardProps {
  product: Product;
  onQuickView?: (product: Product) => void;
}

export function ProductCard({ product, onQuickView }: ProductCardProps) {
  const addItemToCart = useCartStore((s) => s.addItem);
  const { toggleItem, isInWishlist } = useWishlistStore();
  const [imgLoaded, setImgLoaded] = useState(false);

  const inWishlist = isInWishlist(product.id);
  const hasDiscount =
    product.originalPrice !== undefined && product.originalPrice > product.price;
  const discountPct = hasDiscount
    ? getDiscountPercentage(product.originalPrice!, product.price)
    : 0;

  function handleAddToCart(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    addItemToCart(product);
    toast.success(`${product.name} added to cart!`);
  }

  function handleWishlistToggle(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    toggleItem(product);
    if (inWishlist) {
      toast.success(`${product.name} removed from wishlist.`);
    } else {
      toast.success(`${product.name} added to wishlist!`);
    }
  }

  function handleQuickView(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    onQuickView?.(product);
  }

  // Render filled stars based on rating (0–5)
  const fullStars = Math.floor(product.rating);

  return (
    <Link href={`/products/${product.slug}`} passHref>
      <motion.div
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.2 }}
        className="glass-card neon-hover flex flex-col overflow-hidden group relative cursor-pointer"
      >
        {/* Image area */}
        <div className="relative w-full h-[200px] bg-gray-100 dark:bg-[#1A1A1A] overflow-hidden transition-colors duration-300">
          {!imgLoaded && (
            <div className="absolute inset-0 flex items-center justify-center animate-pulse bg-gray-100 dark:bg-gray-800">
              <div className="w-24 h-24 bg-gray-200 dark:bg-gray-700 rounded-md" />
            </div>
          )}
          <Image
            src={product.images[0] ?? "/file.svg"}
            alt={product.name}
            width={280}
            height={280}
            loading="eager"
            className={`object-cover w-full h-full transition-transform duration-300 group-hover:scale-105 ${imgLoaded ? '' : 'opacity-0'}`}
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).src = "/file.svg";
            }}
            onLoad={() => setImgLoaded(true)}
          />

          {/* Discount badge */}
          {hasDiscount && (
            <span className="absolute top-2 left-2 bg-[#DC2626] text-white text-xs font-bold px-2 py-0.5 rounded-full z-10">
              {discountPct}% OFF
            </span>
          )}

          {/* Wishlist toggle */}
          <button
            onClick={handleWishlistToggle}
            aria-label={inWishlist ? "Remove from wishlist" : "Add to wishlist"}
            className="absolute top-2 right-2 z-10 p-1.5 rounded-full bg-black/50 backdrop-blur-sm transition-colors hover:bg-black/70"
          >
            <Heart
              className={`w-4 h-4 transition-colors ${
                inWishlist ? "fill-red-500 text-red-500" : "text-white"
              }`}
            />
          </button>

          {/* Quick View overlay */}
          {onQuickView && (
            <button
              onClick={handleQuickView}
              aria-label="Quick view"
              className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
            >
              <span className="flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 text-white text-sm font-medium px-4 py-2 rounded-lg">
                <Eye className="w-4 h-4" />
                Quick View
              </span>
            </button>
          )}
        </div>

        {/* Content area */}
        <div className="p-4 flex flex-col flex-grow">
          <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider">
            {product.category.replace(/-/g, " ")}
          </p>
          <h3 className="mt-1 font-semibold text-base text-gray-900 dark:text-white leading-tight truncate group-hover:text-[#DC2626]">
            {product.name}
          </h3>

          {/* Rating */}
          <div className="mt-2 flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-3.5 h-3.5 ${
                  i < fullStars
                    ? "text-yellow-400 fill-yellow-400"
                    : "text-gray-300 dark:text-gray-600"
                }`}
              />
            ))}
            <span className="text-xs text-gray-500 dark:text-gray-400 ml-1">
              ({product.reviewCount})
            </span>
          </div>

          <div className="flex-grow" />

          {/* Price and Add to Cart */}
          <div className="mt-4 flex items-end justify-between">
            <div className="flex flex-col">
              <span className="text-lg font-bold text-gray-900 dark:text-white">
                {formatCurrency(product.price)}
              </span>
              {hasDiscount && (
                <span className="text-xs text-gray-400 dark:text-gray-500 line-through">
                  {formatCurrency(product.originalPrice!)}
                </span>
              )}
            </div>
            <button
              onClick={handleAddToCart}
              aria-label="Add to cart"
              className="p-2 rounded-full bg-[#DC2626] text-white transition-transform hover:scale-110"
            >
              <ShoppingCart className="w-5 h-5" />
            </button>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}
