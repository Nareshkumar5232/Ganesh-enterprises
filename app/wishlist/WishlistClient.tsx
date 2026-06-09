'use client';

// Sri Ganesh Enterprises ENTERPRISES PVT LTD
// File: app/wishlist/WishlistClient.tsx
// Validates: Requirements 7.1, 7.2, 7.3, 7.4

import { useWishlistStore } from '@/store/wishlistStore';
import { useCartStore } from '@/store/cartStore';
import { Button } from '@/components/ui/button';
import { ProductCard } from '@/components/products/ProductCard';
import { AnimatePresence, motion } from 'framer-motion';
import { Heart, ShoppingCart } from 'lucide-react';
import Link from 'next/link';
import { useToast } from '@/hooks/use-toast';
import type { Product } from '@/types';

export default function WishlistClient() {
  const { items, toggleItem } = useWishlistStore();
  const addItem = useCartStore((s) => s.addItem);
  const { toast } = useToast();

  const handleMoveToCart = (product: Product) => {
    addItem(product);
    // remove from wishlist using toggle
    toggleItem(product);
    toast({
      title: 'Moved to Cart',
      description: `${product.name} has been moved to your cart.`,
      action: (
        <Link href="/cart">
          <Button variant="secondary" size="sm">
            View Cart
          </Button>
        </Link>
      ),
    });
  };

  return (
    <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8 text-center"
      >
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl">
          My Wishlist
        </h1>
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
          Products you love, saved for later.
        </p>
      </motion.div>

      {items.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center py-20 bg-gray-50 dark:bg-gray-800/50 rounded-lg"
        >
          <Heart className="mx-auto h-16 w-16 text-gray-400" />
          <h2 className="mt-6 text-2xl font-semibold text-gray-900 dark:text-white">
            Your wishlist is empty
          </h2>
          <p className="mt-2 text-gray-500 dark:text-gray-400">
            Looks like you have not added anything to your wishlist yet.
          </p>
          <div className="mt-8">
            <Link href="/products">
              <Button size="lg">
                <ShoppingCart className="mr-2 h-5 w-5" />
                Start Shopping
              </Button>
            </Link>
          </div>
        </motion.div>
      ) : (
        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          <AnimatePresence>
            {items.map(({ product }) => (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3 }}
                className="relative group"
              >
                <ProductCard product={product} />
                <div className="absolute top-4 right-4 z-10 flex flex-col space-y-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button
                    variant="destructive"
                    size="icon"
                    onClick={() => toggleItem(product)}
                    aria-label="Remove from wishlist"
                  >
                    <Heart className="h-5 w-5" />
                  </Button>
                  <Button
                    variant="secondary"
                    size="icon"
                    onClick={() => handleMoveToCart(product)}
                    aria-label="Move to cart"
                  >
                    <ShoppingCart className="h-5 w-5" />
                  </Button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}
