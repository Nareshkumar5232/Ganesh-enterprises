"use client";

import Link from "next/link";
import { X, ShoppingCart, Zap, Sun, Moon } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useTheme } from "next-themes";
import { useCartStore } from "@/store/cartStore";
import { useWishlistStore } from "@/store/wishlistStore";
import { useAuthStore } from "@/store/authStore";

export interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Products", href: "/products" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const { theme, setTheme } = useTheme();
  const totalItems = useCartStore((state) => state.totalItems());
  const wishlistCount = useWishlistStore((s) => s.items.length);
  const user = useAuthStore((s) => s.user);
  const logout = useAuthStore((s) => s.logout);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="mobile-menu"
          initial={{ x: "-100%" }}
          animate={{ x: 0 }}
          exit={{ x: "-100%" }}
          transition={{ type: "tween", duration: 0.3 }}
          className="fixed inset-0 z-[60] bg-white/98 dark:bg-[#0F0F0F]/98 backdrop-blur-md flex flex-col transition-colors duration-300"
          aria-modal="true"
          role="dialog"
          aria-label="Mobile navigation menu"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-4 h-16 border-b border-gray-200 dark:border-white/10 shrink-0 transition-colors duration-300">
            <Link href="/" onClick={onClose} className="flex items-center gap-2">
              <Zap className="w-6 h-6 text-[#DC2626]" aria-hidden="true" />
              <div className="flex flex-col leading-none">
                <span className="font-bold text-[#DC2626] tracking-wide text-base">
                  Sri Ganesh Enterprises
                </span>
                <span className="text-gray-900 dark:text-white text-xs tracking-widest uppercase transition-colors duration-300">
                  ENTERPRISES
                </span>
              </div>
            </Link>
            <button
              onClick={onClose}
              aria-label="Close mobile menu"
              className="p-2 text-gray-500 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Nav links */}
          <nav className="flex flex-col px-4 py-6 gap-1 flex-1 overflow-y-auto" aria-label="Mobile navigation">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={onClose}
                className="flex items-center px-4 py-3 rounded-lg text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/5 text-base font-medium transition-colors duration-200"
              >
                {link.label}
              </Link>
            ))}

            {/* Cart link */}
            <Link
              href="/cart"
              onClick={onClose}
              className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/5 text-base font-medium transition-colors duration-200"
            >
              <ShoppingCart className="w-5 h-5" aria-hidden="true" />
              <span>Cart</span>
              {totalItems > 0 && (
                <span className="ml-auto min-w-[22px] h-[22px] flex items-center justify-center rounded-full bg-[#DC2626] text-white text-xs font-bold px-1">
                  {totalItems > 99 ? "99+" : totalItems}
                </span>
              )}
            </Link>

            {/* Wishlist link */}
            <Link
              href="/wishlist"
              onClick={onClose}
              className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/5 text-base font-medium transition-colors duration-200"
            >
              <Zap className="w-5 h-5" aria-hidden="true" />
              <span>Wishlist</span>
              {wishlistCount > 0 && (
                <span className="ml-auto min-w-[22px] h-[22px] flex items-center justify-center rounded-full bg-[#DC2626] text-white text-xs font-bold px-1">
                  {wishlistCount > 99 ? "99+" : wishlistCount}
                </span>
              )}
            </Link>

            {/* Divider */}
            <div className="my-2 border-t border-gray-200 dark:border-white/10 transition-colors duration-300" />

            {/* Auth links */}
            {!user ? (
              <>
                <Link
                  href="/login"
                  onClick={onClose}
                  className="flex items-center px-4 py-3 rounded-lg text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/5 text-base font-medium transition-colors duration-200"
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  onClick={onClose}
                  className="flex items-center px-4 py-3 rounded-lg text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/5 text-base font-medium transition-colors duration-200"
                >
                  Register
                </Link>
              </>
            ) : (
              <>
                <div className="px-4 py-3 text-sm text-gray-500 dark:text-gray-300 transition-colors duration-300">Signed in as</div>
                <div className="px-4 py-1 text-sm font-semibold text-gray-900 dark:text-white transition-colors duration-300">{user.name}</div>
                <button
                  onClick={() => {
                    logout();
                    onClose();
                  }}
                  className="w-full text-left px-4 py-3 text-sm text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/5 transition-colors duration-300"
                >
                  Logout
                </button>
              </>
            )}
          </nav>

          {/* Theme toggle at bottom */}
          <div className="px-4 py-6 border-t border-gray-200 dark:border-white/10 shrink-0 transition-colors duration-300">
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="flex items-center gap-3 px-4 py-3 w-full rounded-lg text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/5 text-base font-medium transition-colors duration-200"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? (
                <>
                  <Sun className="w-5 h-5" aria-hidden="true" />
                  <span>Light Mode</span>
                </>
              ) : (
                <>
                  <Moon className="w-5 h-5" aria-hidden="true" />
                  <span>Dark Mode</span>
                </>
              )}
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
