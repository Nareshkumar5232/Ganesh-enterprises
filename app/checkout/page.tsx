"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import { useAuthStore } from "@/store/authStore";
import { useCartStore } from "@/store/cartStore";
import { ShoppingCart, MapPin, CreditCard, Truck } from "lucide-react";
import { formatCurrency } from "@/lib/utils";

// Form validation schema
const checkoutSchema = z.object({
  fullName: z.string().min(2, "Full name required"),
  mobileNumber: z.string().regex(/^[6-9]\d{9}$/, "Valid 10-digit mobile number required"),
  addressLine: z.string().min(5, "Address required"),
  landmark: z.string().optional(),
  city: z.string().min(2, "City required"),
  state: z.string().min(2, "State required"),
  pincode: z.string().regex(/^\d{6}$/, "Valid 6-digit pincode required"),
  paymentMethod: z.enum(["online", "cod"]).refine(val => val !== undefined, "Select payment method"),
});

type CheckoutFormData = z.infer<typeof checkoutSchema>;

export default function CheckoutPage() {
  const router = useRouter();
  const user = useAuthStore((s) => s.user);
  const cartItems = useCartStore((state) => state.items);
  const clearCart = useCartStore((state) => state.clearCart);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { register, handleSubmit, formState: { errors }, watch } = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      paymentMethod: "cod",
    },
  });

  const paymentMethod = watch("paymentMethod");

  // Redirect to login if not authenticated
  React.useEffect(() => {
    if (!user) {
      router.push(`/login?redirect=${encodeURIComponent("/checkout")}`);
    }
  }, [user, router]);

  // Redirect if cart is empty
  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-[#0F0F0F] pt-24 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <ShoppingCart className="w-16 h-16 mx-auto text-gray-400 mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Your cart is empty</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">Add some premium products before checking out.</p>
          <Link href="/products" className="inline-block px-6 py-3 bg-[#DC2626] text-white font-bold rounded-lg hover:bg-[#B91C1C] transition-colors">
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  // Calculate totals
  const subtotal = cartItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  const shipping = subtotal > 5000 ? 0 : 149;
  const tax = Math.round(subtotal * 0.05); // 5% tax
  const total = subtotal + shipping + tax;

  async function onSubmit(data: CheckoutFormData) {
    if (!user) {
      toast.error("Please login to continue");
      router.push(`/login?redirect=${encodeURIComponent("/checkout")}`);
      return;
    }

    setIsSubmitting(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Create order
      const order = {
        orderId: `ORD-${Date.now()}`,
        items: cartItems,
        deliveryAddress: data,
        paymentMethod: data.paymentMethod,
        total,
        subtotal,
        shipping,
        tax,
        status: data.paymentMethod === "cod" ? "confirmed" : "pending",
        createdAt: new Date().toISOString(),
      };

      // Save to localStorage (in real app, send to backend)
      const orders = JSON.parse(localStorage.getItem("orders") || "[]");
      orders.push(order);
      localStorage.setItem("orders", JSON.stringify(orders));

      toast.success(`Order placed successfully! Order ID: ${order.orderId}`);
      clearCart();
      router.push(`/order-confirmation?orderId=${order.orderId}`);
    } catch (error) {
      toast.error("Failed to place order. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0F0F0F] pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">Checkout</h1>
          <p className="text-gray-600 dark:text-gray-400">Review your order and complete your purchase</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Checkout Form (2 columns) */}
          <div className="md:col-span-2">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
              {/* Delivery Address Section */}
              <div className="bg-white dark:bg-[#121212] rounded-2xl p-8 border border-gray-200 dark:border-white/6 shadow-lg">
                <div className="flex items-center gap-3 mb-6">
                  <MapPin className="w-6 h-6 text-[#DC2626]" />
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Delivery Address</h2>
                </div>

                <div className="space-y-4">
                  {/* Full Name */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Full Name *
                    </label>
                    <input
                      {...register("fullName")}
                      type="text"
                      placeholder="Enter your full name"
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-white/10 bg-white dark:bg-[#1A1A1A] text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#DC2626]/50"
                    />
                    {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName.message}</p>}
                  </div>

                  {/* Mobile Number */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Mobile Number *
                    </label>
                    <input
                      {...register("mobileNumber")}
                      type="tel"
                      placeholder="10-digit mobile number"
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-white/10 bg-white dark:bg-[#1A1A1A] text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#DC2626]/50"
                    />
                    {errors.mobileNumber && <p className="text-red-500 text-sm mt-1">{errors.mobileNumber.message}</p>}
                  </div>

                  {/* Address Line */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Address Line *
                    </label>
                    <textarea
                      {...register("addressLine")}
                      placeholder="House No., Building name, Street name"
                      rows={2}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-white/10 bg-white dark:bg-[#1A1A1A] text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#DC2626]/50"
                    />
                    {errors.addressLine && <p className="text-red-500 text-sm mt-1">{errors.addressLine.message}</p>}
                  </div>

                  {/* Landmark & City */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Landmark (Optional)
                      </label>
                      <input
                        {...register("landmark")}
                        type="text"
                        placeholder="e.g., Near Hospital"
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-white/10 bg-white dark:bg-[#1A1A1A] text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#DC2626]/50"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        City *
                      </label>
                      <input
                        {...register("city")}
                        type="text"
                        placeholder="e.g., Chennai"
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-white/10 bg-white dark:bg-[#1A1A1A] text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#DC2626]/50"
                      />
                      {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city.message}</p>}
                    </div>
                  </div>

                  {/* State & Pincode */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        State *
                      </label>
                      <input
                        {...register("state")}
                        type="text"
                        placeholder="e.g., Tamil Nadu"
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-white/10 bg-white dark:bg-[#1A1A1A] text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#DC2626]/50"
                      />
                      {errors.state && <p className="text-red-500 text-sm mt-1">{errors.state.message}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Pincode *
                      </label>
                      <input
                        {...register("pincode")}
                        type="text"
                        placeholder="6-digit pincode"
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-white/10 bg-white dark:bg-[#1A1A1A] text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#DC2626]/50"
                      />
                      {errors.pincode && <p className="text-red-500 text-sm mt-1">{errors.pincode.message}</p>}
                    </div>
                  </div>
                </div>
              </div>

              {/* Payment Method Section */}
              <div className="bg-white dark:bg-[#121212] rounded-2xl p-8 border border-gray-200 dark:border-white/6 shadow-lg">
                <div className="flex items-center gap-3 mb-6">
                  <CreditCard className="w-6 h-6 text-[#DC2626]" />
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Payment Method</h2>
                </div>

                <div className="space-y-3">
                  {/* Online Payment Option */}
                  <label className="flex items-center p-4 border-2 border-gray-300 dark:border-white/10 rounded-lg cursor-pointer hover:border-[#DC2626] dark:hover:border-[#DC2626] transition-colors"
                    style={{ borderColor: paymentMethod === "online" ? "#DC2626" : undefined }}
                  >
                    <input
                      {...register("paymentMethod")}
                      type="radio"
                      value="online"
                      className="w-5 h-5 text-[#DC2626] cursor-pointer"
                    />
                    <span className="ml-3 flex-1 text-gray-900 dark:text-white font-medium">
                      Online Payment (Credit/Debit Card, UPI)
                    </span>
                    <span className="text-sm text-gray-600 dark:text-gray-400">Instant</span>
                  </label>

                  {/* Cash on Delivery Option */}
                  <label className="flex items-center p-4 border-2 border-gray-300 dark:border-white/10 rounded-lg cursor-pointer hover:border-[#DC2626] dark:hover:border-[#DC2626] transition-colors"
                    style={{ borderColor: paymentMethod === "cod" ? "#DC2626" : undefined }}
                  >
                    <input
                      {...register("paymentMethod")}
                      type="radio"
                      value="cod"
                      className="w-5 h-5 text-[#DC2626] cursor-pointer"
                    />
                    <span className="ml-3 flex-1 text-gray-900 dark:text-white font-medium">
                      Cash on Delivery (COD)
                    </span>
                    <span className="text-sm text-gray-600 dark:text-gray-400">Pay at door</span>
                  </label>
                </div>

                {errors.paymentMethod && (
                  <p className="text-red-500 text-sm mt-3">{errors.paymentMethod.message}</p>
                )}
              </div>

              {/* Place Order Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 bg-[#DC2626] text-white font-bold text-lg rounded-lg hover:bg-[#B91C1C] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Processing..." : `Place Order - ${formatCurrency(total)}`}
              </button>
            </form>
          </div>

          {/* Order Summary (1 column) */}
          <div>
            <div className="bg-white dark:bg-[#121212] rounded-2xl p-6 border border-gray-200 dark:border-white/6 shadow-lg sticky top-24">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Order Summary</h3>

              {/* Cart Items */}
              <div className="space-y-4 mb-6 pb-6 border-b border-gray-200 dark:border-white/10">
                {cartItems.map((item) => (
                  <div key={`${item.product.id}-${item.quantity}`} className="flex gap-3">
                    <Image
                      src={item.product.images?.[0] || "/images/placeholder-product.svg"}
                      alt={item.product.name}
                      width={60}
                      height={60}
                      className="rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900 dark:text-white line-clamp-2">{item.product.name}</p>
                      <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">Qty: {item.quantity}</p>
                      <p className="text-sm font-bold text-[#DC2626] mt-1">{formatCurrency(item.product.price * item.quantity)}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Price Breakdown */}
              <div className="space-y-3 text-sm">
                <div className="flex justify-between text-gray-600 dark:text-gray-400">
                  <span>Subtotal</span>
                  <span>{formatCurrency(subtotal)}</span>
                </div>
                <div className="flex justify-between text-gray-600 dark:text-gray-400">
                  <span>Tax (5%)</span>
                  <span>{formatCurrency(tax)}</span>
                </div>
                <div className="flex justify-between text-gray-600 dark:text-gray-400">
                  <span className="flex items-center gap-1">
                    <Truck className="w-4 h-4" /> Shipping
                  </span>
                  <span>{shipping === 0 ? "FREE" : formatCurrency(shipping)}</span>
                </div>
                {shipping === 0 && <p className="text-xs text-[#DC2626] font-medium">Free shipping on orders above ₹5000</p>}
                <div className="pt-3 border-t border-gray-200 dark:border-white/10 flex justify-between font-bold text-lg text-gray-900 dark:text-white">
                  <span>Total</span>
                  <span className="text-[#DC2626]">{formatCurrency(total)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
