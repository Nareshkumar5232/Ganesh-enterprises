"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ShoppingCart, Heart, ArrowRight, Star } from "lucide-react";
import { toast } from "sonner";
import { featuredProducts } from "@/lib/mock-data";
import { useCartStore } from "@/store/cartStore";
import { useWishlistStore } from "@/store/wishlistStore";
import { formatPrice, getDiscountPercentage } from "@/lib/utils";
import type { Product } from "@/types";

function ProductCard({ p }: { p: Product }) {
  const addItem       = useCartStore((s) => s.addItem);
  const toggleItem    = useWishlistStore((s) => s.toggleItem);
  const isInWishlist  = useWishlistStore((s) => s.isInWishlist(p.id));
  const discount      = p.originalPrice ? getDiscountPercentage(p.originalPrice, p.price) : 0;

  return (
    <div className="enterprise-card flex flex-col overflow-hidden group shrink-0 w-[220px] sm:w-[240px]">
      {/* Image */}
      <div className="relative h-[160px] bg-[#F8FAFC] dark:bg-[#1E293B] overflow-hidden">
        <Image
          src={p.images[0] ?? "/placeholder.jpg"}
          alt={p.name}
          fill
          className="object-contain p-4 group-hover:scale-105 transition-transform duration-300"
          sizes="240px"
        />
        {discount > 0 && (
          <span className="absolute top-2 left-2 bg-[#F59E0B] text-white text-[10px] font-bold px-1.5 py-0.5 rounded">
            -{discount}%
          </span>
        )}
        <button
          onClick={() => {
            toggleItem(p);
            toast.success(isInWishlist ? "Removed from wishlist" : "Added to wishlist");
          }}
          className={`absolute top-2 right-2 p-1.5 rounded-full border transition-all ${
            isInWishlist
              ? "bg-red-50 border-red-200 text-red-500"
              : "bg-white border-[#E2E8F0] text-[#94A3B8] hover:text-red-400"
          }`}
          aria-label={isInWishlist ? "Remove from wishlist" : "Add to wishlist"}
        >
          <Heart className={`w-3.5 h-3.5 ${isInWishlist ? "fill-current" : ""}`} />
        </button>
      </div>
      {/* Info */}
      <div className="flex flex-col gap-2 p-4 flex-1">
        <p className="text-[#94A3B8] text-[10px] uppercase tracking-wide font-medium">{p.brand}</p>
        <h3 className="text-[#0F172A] dark:text-white text-xs font-semibold leading-snug line-clamp-2 flex-1">{p.name}</h3>
        <div className="flex items-center gap-1">
          <Star className="w-3 h-3 text-[#F59E0B] fill-[#F59E0B]" />
          <span className="text-[#64748B] text-[10px]">{p.rating} ({p.reviewCount})</span>
        </div>
        <div className="flex items-baseline gap-1.5">
          <span className="text-[#0F172A] dark:text-white font-bold text-sm">{formatPrice(p.price)}</span>
          {p.originalPrice && p.originalPrice > p.price && (
            <span className="text-[#94A3B8] text-[10px] line-through">{formatPrice(p.originalPrice)}</span>
          )}
        </div>
        <button
          onClick={() => { addItem(p); toast.success(`${p.name} added to cart`); }}
          className="mt-1 flex items-center justify-center gap-1.5 w-full py-2 bg-[#2563EB] text-white text-xs font-semibold rounded-md hover:bg-[#1D4ED8] transition-colors"
        >
          <ShoppingCart className="w-3.5 h-3.5" /> Add to Cart
        </button>
      </div>
    </div>
  );
}

export default function FeaturedProducts() {
  return (
    <section className="section-gray">
      <div className="max-w-7xl mx-auto px-4 lg:px-6 py-16">
        <div className="flex items-end justify-between gap-4 mb-8">
          <div>
            <p className="text-[#2563EB] text-xs font-semibold uppercase tracking-wider mb-1">Top Sellers</p>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#0F172A] dark:text-white">Featured Products</h2>
          </div>
          <Link href="/products"
            className="flex items-center gap-1.5 text-sm font-semibold text-[#2563EB] hover:text-[#1D4ED8] transition-colors shrink-0">
            View All <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide"
        >
          {featuredProducts.map((p: any) => (
            <ProductCard key={p.id} p={p} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
