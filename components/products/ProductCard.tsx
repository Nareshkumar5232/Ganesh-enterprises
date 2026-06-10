"use client";

import { useState } from "react";
import Image from "next/image";
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

  const fullStars = Math.floor(product.rating);

  return (
    <Link href={`/products/${product.slug}`} passHref className="h-full block">
      <div className="bg-white border border-[#E5E7EB] rounded-xl flex flex-col overflow-hidden group relative cursor-pointer shadow-sm hover:shadow-lg hover:border-[#B91C1C]/40 transition-all duration-300 h-full">
        
        {/* Aspect Ratio Boxed Product Image Container */}
        <div className="relative w-full aspect-square bg-[#F7F7F7] flex items-center justify-center p-4 overflow-hidden border-b border-[#E5E7EB]/50">
          {!imgLoaded && (
            <div className="absolute inset-0 flex items-center justify-center animate-pulse bg-gray-100">
              <div className="w-16 h-16 bg-gray-200 rounded-md" />
            </div>
          )}
          <Image
            src={product.images[0] ?? "/file.svg"}
            alt={product.name}
            width={240}
            height={240}
            loading="eager"
            className={`object-contain max-w-full max-h-full transition-transform duration-300 group-hover:scale-[1.03] ${imgLoaded ? '' : 'opacity-0'}`}
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).src = "/file.svg";
            }}
            onLoad={() => setImgLoaded(true)}
          />

          {/* Discount badge */}
          {hasDiscount && (
            <span className="absolute top-3 left-3 bg-[#B91C1C] text-white text-[10px] font-extrabold px-2 py-0.5 rounded-full z-10 font-outfit shadow-sm">
              {discountPct}% OFF
            </span>
          )}

          {/* Wishlist toggle */}
          <button
            onClick={handleWishlistToggle}
            aria-label={inWishlist ? "Remove from wishlist" : "Add to wishlist"}
            className="absolute top-3 right-3 z-10 p-1.5 rounded-full bg-white/80 backdrop-blur-sm border border-[#E5E7EB] transition-colors hover:bg-white text-[#6B7280] hover:text-[#B91C1C] shadow-sm"
          >
            <Heart
              className={`w-3.5 h-3.5 transition-colors ${
                inWishlist ? "fill-[#B91C1C] text-[#B91C1C]" : ""
              }`}
            />
          </button>

          {/* Quick View overlay */}
          {onQuickView && (
            <button
              onClick={handleQuickView}
              aria-label="Quick view"
              className="absolute inset-0 flex items-center justify-center bg-black/25 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
            >
              <span className="flex items-center gap-1.5 bg-white/95 backdrop-blur-sm border border-[#E5E7EB] text-[#0F172A] text-xs font-semibold px-3.5 py-2 rounded-lg font-outfit shadow-md hover:bg-white transition-colors">
                <Eye className="w-3.5 h-3.5 text-[#B91C1C]" />
                Quick View
              </span>
            </button>
          )}
        </div>

        {/* Content area */}
        <div className="p-4 flex flex-col flex-grow">
          <p className="text-[10px] text-[#6B7280] uppercase tracking-wider font-semibold font-outfit">
            {product.category.replace(/-/g, " ")}
          </p>
          
          <h3 className="mt-1 font-bold text-sm sm:text-base text-[#0F172A] font-heading leading-snug group-hover:text-[#B91C1C] transition-colors line-clamp-2 min-h-[40px]">
            {product.name}
          </h3>

          {/* Rating */}
          <div className="mt-2.5 flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-3 h-3 ${
                  i < fullStars
                    ? "text-[#D4AF37] fill-[#D4AF37]"
                    : "text-gray-200"
                }`}
              />
            ))}
            <span className="text-[11px] text-[#6B7280] font-mono ml-1">
              ({product.reviewCount})
            </span>
          </div>

          <div className="flex-grow mt-3" />

          {/* Price and Add to Cart */}
          <div className="flex items-end justify-between pt-2">
            <div className="flex flex-col font-outfit">
              <span className="text-base sm:text-lg font-extrabold text-[#0F172A] tracking-tight leading-none">
                {formatCurrency(product.price)}
              </span>
              {hasDiscount && (
                <span className="text-xs text-[#6B7280] line-through mt-0.5 leading-none">
                  {formatCurrency(product.originalPrice!)}
                </span>
              )}
            </div>
            <button
              onClick={handleAddToCart}
              aria-label="Add to cart"
              className="p-2.5 rounded-full bg-[#B91C1C] hover:bg-[#991B1B] text-white transition-all duration-200 hover:scale-105 shadow-sm"
            >
              <ShoppingCart className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </Link>
  );
}
