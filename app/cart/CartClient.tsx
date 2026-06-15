"use client";

import { useCartStore } from "@/store/cartStore";
import { formatCurrency } from "@/lib/utils";
import { Minus, Plus, Trash2, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";
import { useEffect, useState } from "react";
import { calculateOrderDetails } from "@/lib/pricing";

export default function CartClient() {
  const { items, updateQuantity, removeItem, subtotal } = useCartStore();
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // This effect intentionally sets mounted after hydration
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  if (!mounted) return null;

  if (items.length === 0) {
    return (
      <div className="min-h-screen pt-24 pb-12 flex flex-col items-center justify-center bg-gray-50 dark:bg-[#0F0F0F] transition-colors duration-300">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Your Cart is Empty</h1>
          <p className="text-gray-500 dark:text-gray-400 mb-8 max-w-md text-center">
          Looks like you have not added anything yet. Discover our premium electrical and electronics collection.
        </p>
        <Link
          href="/products"
          className="inline-flex items-center gap-2 bg-[#DC2626] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#B91C1C] transition-colors shadow-[0_4px_12px_rgba(220,38,38,0.2)]"
        >
          Start Shopping <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  const { subtotal: orderSubtotal, gst, shipping, grandTotal } = calculateOrderDetails(subtotal());

  return (
    <div className="min-h-screen pt-24 pb-12 bg-gray-50 dark:bg-[#0F0F0F] transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Shopping Cart</h1>

        <div className="grid lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8 space-y-4">
            {items.map((item) => (
              <motion.div
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                key={item.product.id}
                className="bg-white dark:bg-[#1A1A1A] p-4 rounded-xl border border-gray-200 dark:border-white/10 flex flex-col sm:flex-row gap-4 items-center group transition-colors duration-300"
              >
                <div className="w-24 h-24 bg-gray-100 dark:bg-black rounded-lg overflow-hidden shrink-0 relative transition-colors duration-300">
                  <Image
                    src={item.product.images[0] ?? "/file.svg"}
                    alt={item.product.name}
                    fill
                    className="object-cover"
                  />
                </div>
                
                <div className="flex-grow text-center sm:text-left">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white line-clamp-1">
                    <Link href={`/products/${item.product.slug}`} className="hover:text-[#DC2626] transition-colors">
                      {item.product.name}
                    </Link>
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{item.product.brand}</p>
                  <p className="text-[#DC2626] font-bold mt-2 sm:hidden">{formatCurrency(item.product.price)}</p>
                </div>

                <div className="flex flex-col sm:items-end gap-3 shrink-0">
                  <p className="text-[#DC2626] font-bold text-lg hidden sm:block">
                    {formatCurrency(item.product.price)}
                  </p>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center bg-gray-100 dark:bg-black rounded-lg border border-gray-200 dark:border-white/10 transition-colors duration-300">
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                        className="p-2 text-gray-500 hover:text-gray-900 dark:hover:text-white"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="w-8 text-center text-sm font-medium text-gray-900 dark:text-white">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                        className="p-2 text-gray-500 hover:text-gray-900 dark:hover:text-white"
                        aria-label="Increase quantity"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                    <button
                      onClick={() => {
                        removeItem(item.product.id);
                        toast.success("Item removed from cart");
                      }}
                      className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg transition-colors"
                      aria-label="Remove item"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="lg:col-span-4">
            <div className="bg-white dark:bg-[#1A1A1A] p-6 rounded-xl border border-gray-200 dark:border-white/10 sticky top-24 transition-colors duration-300">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Order Summary</h2>
              
              <div className="space-y-3 text-sm text-gray-600 dark:text-gray-300">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="text-gray-900 dark:text-white font-medium">{formatCurrency(orderSubtotal)}</span>
                </div>
                {gst > 0 && (
                  <div className="flex justify-between">
                    <span>GST</span>
                    <span className="text-gray-900 dark:text-white font-medium">{formatCurrency(gst)}</span>
                  </div>
                )}
                {shipping > 0 ? (
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span className="text-gray-900 dark:text-white font-medium">{formatCurrency(shipping)}</span>
                  </div>
                ) : (
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span className="text-green-600 dark:text-green-400">Free</span>
                  </div>
                )}
                
                <div className="border-t border-gray-200 dark:border-white/10 pt-3 mt-3">
                  <div className="flex justify-between text-base font-bold text-gray-900 dark:text-white">
                    <span>Total</span>
                    <span>{formatCurrency(grandTotal)}</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => {
                  const isAuth = useAuthStore.getState().isAuthenticated;
                  if (!isAuth) {
                    toast.error("Please login to continue your purchase");
                    const redirect = encodeURIComponent('/cart');
                    router.push(`/login?redirect=${redirect}`);
                    return;
                  }
                  router.push("/checkout");
                }}
                className="w-full bg-[#DC2626] text-white font-bold py-3 px-4 rounded-lg mt-6 hover:bg-[#B91C1C] transition-colors shadow-[0_4px_12px_rgba(220,38,38,0.2)]"
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}