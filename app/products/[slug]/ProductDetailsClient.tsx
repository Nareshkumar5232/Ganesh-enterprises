'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Star, ShoppingCart, Heart, Minus, Plus, Share2 } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';
import { useCartStore } from '@/store/cartStore';
import { useWishlistStore } from '@/store/wishlistStore';
import { useToast } from '@/hooks/use-toast';
import { motion, AnimatePresence } from 'framer-motion';
import type { Product } from '@/types';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';
import { apiClient } from '@/services/api';

export default function ProductDetailsClient({ product }: { product: Product }) {
  const addItem = useCartStore((s) => s.addItem);
  const { toggleItem: toggleWishlistItem, isInWishlist } = useWishlistStore();
  const { toast } = useToast();
  const [quantity, setQuantity] = useState(1);

  // Inquiry Modal States
  const [inquiryModalOpen, setInquiryModalOpen] = useState(false);
  const [inquiryForm, setInquiryForm] = useState({
    companyName: '',
    customerName: '',
    mobileNumber: '',
    email: '',
    requirementDetails: '',
  });
  const [inquiryErrors, setInquiryErrors] = useState<Record<string, string>>({});
  const [inquirySubmitted, setInquirySubmitted] = useState(false);
  const [inquiryLoading, setInquiryLoading] = useState(false);

  const handleAddToCart = () => {
    addItem(product, quantity);
    toast({
      title: 'Added to Cart',
      description: `${quantity} x ${product.name} added to your cart.`,
      action: (
        <Link href="/cart">
          <Button variant="secondary" size="sm">
            View Cart
          </Button>
        </Link>
      ),
    });
  };

  const router = useRouter();
  const isAuth = useAuthStore((s) => s.isAuthenticated);

  const handleBuyNow = () => {
    if (!isAuth) {
      toast({ title: 'Please login to continue your purchase' });
      router.push(`/login?redirect=${encodeURIComponent('/cart')}`);
      return;
    }
    addItem(product, quantity);
    router.push('/cart');
  };

  const handleWishlistToggle = () => {
    const currently = isInWishlist(product.id);
    toggleWishlistItem(product);
    if (currently) {
      toast({
        title: 'Removed from Wishlist',
        description: `${product.name} has been removed from your wishlist.`,
      });
    } else {
      toast({
        title: 'Added to Wishlist',
        description: `${product.name} has been added to your wishlist.`,
        action: (
          <Link href="/wishlist">
            <Button variant="secondary" size="sm">
              View Wishlist
            </Button>
          </Link>
        ),
      });
    }
  };

  const handleShare = async () => {
    if (typeof window !== 'undefined') {
      try {
        if (navigator.share) {
          await navigator.share({
            title: product.name,
            text: product.shortDescription || product.description,
            url: window.location.href,
          });
        } else {
          await navigator.clipboard.writeText(window.location.href);
          toast({
            title: 'Link Copied',
            description: 'Product link copied to clipboard.',
          });
        }
      } catch (err) {
        console.error(err);
      }
    }
  };

  const handleInquiryChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setInquiryForm((prev) => ({ ...prev, [name]: value }));
    if (inquiryErrors[name]) {
      setInquiryErrors((prev) => {
        const copy = { ...prev };
        delete copy[name];
        return copy;
      });
    }
  };

  const handleInquirySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errors: Record<string, string> = {};

    if (!inquiryForm.customerName.trim()) errors.customerName = 'Name is required';
    if (!inquiryForm.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(inquiryForm.email)) {
      errors.email = 'Invalid email format';
    }
    if (!inquiryForm.mobileNumber.trim()) {
      errors.mobileNumber = 'Mobile number is required';
    } else if (!/^[6-9]\d{9}$/.test(inquiryForm.mobileNumber)) {
      errors.mobileNumber = 'Valid 10-digit mobile number required (starting with 6-9)';
    }

    if (Object.keys(errors).length > 0) {
      setInquiryErrors(errors);
      return;
    }

    setInquiryLoading(true);
    try {
      const res = await apiClient.post('/inquiries', {
          companyName: inquiryForm.companyName,
          customerName: inquiryForm.customerName,
          mobileNumber: inquiryForm.mobileNumber,
          email: inquiryForm.email,
          requirementDetails: inquiryForm.requirementDetails,
          productName: product.name,
          quantity: quantity.toString(),
        });

      const data = res.data;
      if (data.success) {
        setInquirySubmitted(true);
        setInquiryForm({
          companyName: '',
          customerName: '',
          mobileNumber: '',
          email: '',
          requirementDetails: '',
        });
      } else {
        toast({
          title: 'Error',
          description: data.error || 'Failed to submit quote request.',
          type: 'error',
        });
      }
    } catch (err) {
      toast({
        title: 'Error',
        description: 'Failed to submit quote request. Please try again.',
        type: 'error',
      });
    } finally {
      setInquiryLoading(false);
    }
  };

  const whatsAppLink = `https://wa.me/919150310876?text=${encodeURIComponent(
    `Hello Sri Ganesh Enterprises,\n\nI am interested in:\n[${product.name}]\n\nPlease share wholesale pricing, stock availability, and dealer terms.\n\nThank you.`
  )}`;

  return (
    <>
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col justify-center"
      >
        <div>
          <p className="text-sm uppercase text-gray-500 dark:text-gray-400">{product.brand}</p>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl mt-2 font-heading">
            {product.name}
          </h1>
        </div>

        <div className="mt-4">
          <div className="flex items-center">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-5 w-5 ${
                    i < Math.round(product.rating)
                      ? 'text-yellow-400 fill-yellow-400'
                      : 'text-gray-300 dark:text-gray-600'
                  }`}
                />
              ))}
            </div>
            <p className="ml-2 text-sm text-gray-500 dark:text-gray-400">
              {product.rating.toFixed(1)} ({product.reviewCount} reviews)
            </p>
          </div>
        </div>

        <div className="mt-6">
          <p className="text-3xl text-gray-900 dark:text-white font-bold font-mono">
            {formatCurrency(product.price)}
            {product.originalPrice && (
              <span className="ml-4 text-xl text-gray-500 line-through">
                {formatCurrency(product.originalPrice)}
              </span>
            )}
          </p>
        </div>

        <div className="mt-6">
          <h3 className="sr-only">Description</h3>
          <div className="space-y-6 text-base text-gray-700 dark:text-gray-300 font-sans leading-relaxed">
            <p>{product.description}</p>
          </div>
        </div>

        {/* Quantity selector */}
        <div className="mt-8">
          <div className="flex items-center space-x-4">
            <p className="text-sm font-medium text-gray-900 dark:text-white">Quantity:</p>
            <div className="flex items-center rounded-md border border-gray-300 dark:border-gray-600">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="h-8 w-8 text-gray-500 hover:text-black dark:hover:text-white"
              >
                <Minus className="h-4 w-4" />
              </Button>
              <span className="w-10 text-center font-bold font-mono">{quantity}</span>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setQuantity(quantity + 1)}
                className="h-8 w-8 text-gray-500 hover:text-black dark:hover:text-white"
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Interactive B2B Buttons Grid */}
        <div className="mt-10 flex flex-col gap-4">
          <div className="flex gap-4">
            <Button onClick={handleAddToCart} size="lg" className="flex-1 btn-red !bg-[#B91C1C] !border-[#B91C1C] hover:!bg-[#991B1B] hover:!border-[#991B1B] shadow-[0_4px_14px_rgba(185,28,28,0.3)]">
              <ShoppingCart className="mr-2 h-5 w-5" />
              Add to Cart
            </Button>
            <Button onClick={() => setInquiryModalOpen(true)} variant="secondary" size="lg" className="flex-1 font-bold text-sm bg-gray-100 hover:bg-gray-200 text-gray-900 dark:bg-slate-800 dark:text-white border border-gray-300 dark:border-slate-700">
              Request B2B Quote
            </Button>
          </div>

          <div className="flex gap-4">
            <a
              href={whatsAppLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1"
            >
              <Button variant="outline" className="w-full text-green-600 border-green-600 hover:bg-green-50 dark:hover:bg-green-950/20 font-bold text-sm h-11">
                {/* WhatsApp SVG Icon */}
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.458 5.705 1.459h.005c6.56 0 11.9-5.336 11.902-11.894a11.83 11.83 0 00-3.481-8.413z" />
                </svg>
                Enquire on WhatsApp
              </Button>
            </a>
            
            <Button onClick={handleWishlistToggle} variant="outline" className="px-4 h-11 border-gray-300 dark:border-slate-700">
              <Heart
                className={`h-5 w-5 ${isInWishlist(product.id) ? 'text-red-500 fill-red-500' : ''}`}
              />
            </Button>

            <Button onClick={handleShare} variant="outline" className="px-4 h-11 border-gray-300 dark:border-slate-700" aria-label="Share product">
              <Share2 className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            </Button>
          </div>
        </div>

        {/* Specifications */}
        <div className="mt-12">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white font-heading">Specifications</h3>
          <div className="mt-4 flow-root">
            <div className="-my-2 divide-y divide-gray-200 dark:divide-gray-700 font-sans text-sm">
              {Object.entries(product.specifications || {}).map(([key, value]) => (
                <div key={key} className="py-3 flex justify-between text-sm">
                  <dt className="font-medium text-gray-500 dark:text-gray-400">{key}</dt>
                  <dd className="text-gray-900 dark:text-white text-right ml-4">{value}</dd>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Dynamic B2B Inquiry Modal */}
      <AnimatePresence>
        {inquiryModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black"
              onClick={() => setInquiryModalOpen(false)}
            />

            {/* Modal Body */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white dark:bg-[#121212] border border-gray-200 dark:border-slate-800 rounded-2xl max-w-md w-full p-6 shadow-2xl relative z-10 overflow-hidden"
            >
              {inquirySubmitted ? (
                <div className="text-center py-8 space-y-4">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-green-100 dark:bg-green-950 text-green-600 mb-2">
                    <Star className="w-6 h-6 fill-green-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Quote Request Sent!</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                    Thank you for your bulk inquiry. Our wholesale sales representative will contact you with dealer-exclusive pricing within 2 hours.
                  </p>
                  <Button
                    onClick={() => {
                      setInquirySubmitted(false);
                      setInquiryModalOpen(false);
                    }}
                    className="mt-6 w-full btn-red !bg-[#B91C1C]"
                  >
                    Done
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleInquirySubmit} className="space-y-4">
                  <div className="flex justify-between items-center border-b pb-3 border-gray-100 dark:border-slate-800">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                      Request B2B Wholesale Quote
                    </h3>
                    <button
                      type="button"
                      onClick={() => setInquiryModalOpen(false)}
                      className="text-gray-400 hover:text-gray-600 dark:hover:text-white"
                    >
                      &times;
                    </button>
                  </div>

                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Product: <strong className="text-gray-900 dark:text-white">{product.name}</strong> (Qty: {quantity})
                  </p>

                  <div className="space-y-3">
                    {/* Customer Name */}
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-gray-600 dark:text-gray-400 uppercase tracking-widest">
                        Customer Name *
                      </label>
                      <input
                        type="text"
                        name="customerName"
                        value={inquiryForm.customerName}
                        onChange={handleInquiryChange}
                        placeholder="Your name"
                        className="w-full px-3 py-2 rounded-lg border text-sm bg-background border-gray-300 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-[#DC2626]/50"
                      />
                      {inquiryErrors.customerName && (
                        <p className="text-red-500 text-xs">{inquiryErrors.customerName}</p>
                      )}
                    </div>

                    {/* Company Name */}
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-gray-600 dark:text-gray-400 uppercase tracking-widest">
                        Company / Shop Name
                      </label>
                      <input
                        type="text"
                        name="companyName"
                        value={inquiryForm.companyName}
                        onChange={handleInquiryChange}
                        placeholder="Optional"
                        className="w-full px-3 py-2 rounded-lg border text-sm bg-background border-gray-300 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-[#DC2626]/50"
                      />
                    </div>

                    {/* Mobile Number */}
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-gray-600 dark:text-gray-400 uppercase tracking-widest">
                        Mobile Number *
                      </label>
                      <input
                        type="tel"
                        name="mobileNumber"
                        value={inquiryForm.mobileNumber}
                        onChange={handleInquiryChange}
                        placeholder="10-digit number"
                        className="w-full px-3 py-2 rounded-lg border text-sm bg-background border-gray-300 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-[#DC2626]/50"
                      />
                      {inquiryErrors.mobileNumber && (
                        <p className="text-red-500 text-xs">{inquiryErrors.mobileNumber}</p>
                      )}
                    </div>

                    {/* Email */}
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-gray-600 dark:text-gray-400 uppercase tracking-widest">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={inquiryForm.email}
                        onChange={handleInquiryChange}
                        placeholder="email@example.com"
                        className="w-full px-3 py-2 rounded-lg border text-sm bg-background border-gray-300 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-[#DC2626]/50"
                      />
                      {inquiryErrors.email && (
                        <p className="text-red-500 text-xs">{inquiryErrors.email}</p>
                      )}
                    </div>

                    {/* Requirement Details */}
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-gray-600 dark:text-gray-400 uppercase tracking-widest">
                        Requirement Details
                      </label>
                      <textarea
                        name="requirementDetails"
                        value={inquiryForm.requirementDetails}
                        onChange={handleInquiryChange}
                        rows={3}
                        placeholder="Brand preference, delivery timeline, target price etc."
                        className="w-full px-3 py-2 rounded-lg border text-sm bg-background border-gray-300 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-[#DC2626]/50 resize-none"
                      />
                    </div>
                  </div>

                  <div className="flex gap-3 pt-3 border-t border-gray-100 dark:border-slate-800">
                    <Button
                      type="button"
                      variant="outline"
                      className="flex-1"
                      onClick={() => setInquiryModalOpen(false)}
                      disabled={inquiryLoading}
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      className="flex-1 btn-red !bg-[#B91C1C]"
                      disabled={inquiryLoading}
                    >
                      {inquiryLoading ? 'Submitting...' : 'Submit Request'}
                    </Button>
                  </div>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
