"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { CheckCircle, Package, Truck, User, MapPin, CreditCard, ShoppingBag } from "lucide-react";
import { formatCurrency } from "@/lib/utils";

export default function OrderConfirmationPage() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId") || "";
  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!orderId) {
      setLoading(false);
      return;
    }

    fetch(`/api/orders?orderId=${encodeURIComponent(orderId)}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setOrder(data.order);
        } else {
          // Fallback to local storage
          const localOrders = JSON.parse(localStorage.getItem("orders") || "[]");
          const found = localOrders.find((o: any) => o.orderId === orderId);
          if (found) setOrder(found);
        }
      })
      .catch((err) => {
        const localOrders = JSON.parse(localStorage.getItem("orders") || "[]");
        const found = localOrders.find((o: any) => o.orderId === orderId);
        if (found) setOrder(found);
      })
      .finally(() => setLoading(false));
  }, [orderId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-[#0F0F0F] pt-24 pb-16 flex items-center justify-center px-4">
        <div className="text-center">
          <div className="w-12 h-12 rounded-full border-2 border-[#DC2626] border-t-transparent animate-spin mx-auto mb-4" />
          <p className="text-gray-600 dark:text-gray-400">Loading order details...</p>
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-[#0F0F0F] pt-24 pb-16 flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white dark:bg-[#121212] rounded-2xl p-8 text-center border border-gray-200 dark:border-white/6 shadow-lg">
          <CheckCircle className="w-12 h-12 text-[#DC2626] mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Order Completed!</h1>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Thank you for your order. We were unable to load the details on screen, but your order is being processed.
          </p>
          <div className="bg-gray-50 dark:bg-[#1A1A1A] rounded-lg p-4 mb-6 border border-gray-200 dark:border-white/6">
            <p className="text-xs text-gray-600 dark:text-gray-400 uppercase tracking-widest mb-1">Order ID</p>
            <p className="text-xl font-bold text-[#DC2626] font-mono">{orderId || "ORD-XXXXXXXX"}</p>
          </div>
          <Link href="/products" className="block w-full py-3 bg-[#DC2626] text-white font-bold rounded-lg hover:bg-[#B91C1C] transition-colors text-center">
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  const { deliveryAddress, items, total, subtotal, paymentMethod, status } = order;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0F0F0F] pt-24 pb-16 px-4">
      <div className="max-w-3xl mx-auto space-y-6">
        {/* Success Card */}
        <div className="bg-white dark:bg-[#121212] rounded-2xl p-8 text-center border border-gray-200 dark:border-white/6 shadow-lg">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-[#DC2626]/20 rounded-full flex items-center justify-center">
              <CheckCircle className="w-10 h-10 text-[#DC2626]" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Order Confirmed!</h1>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Your B2B order has been successfully placed. Our wholesale team will get in touch shortly.
          </p>

          <div className="bg-gray-50 dark:bg-[#1A1A1A] rounded-lg p-4 max-w-sm mx-auto border border-gray-200 dark:border-white/6">
            <p className="text-xs text-gray-600 dark:text-gray-400 uppercase tracking-widest mb-1">Order ID</p>
            <p className="text-2xl font-bold text-[#DC2626] font-mono">{orderId}</p>
          </div>
        </div>

        {/* Details Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Customer Details */}
          <div className="bg-white dark:bg-[#121212] rounded-2xl p-6 border border-gray-200 dark:border-white/6 shadow-lg space-y-4">
            <div className="flex items-center gap-2 pb-3 border-b border-gray-100 dark:border-white/5">
              <User className="w-5 h-5 text-[#DC2626]" />
              <h2 className="text-lg font-bold text-gray-900 dark:text-white">Customer Details</h2>
            </div>
            <div className="text-sm space-y-2 text-gray-700 dark:text-gray-300">
              <p><span className="font-semibold text-gray-900 dark:text-white">Name:</span> {deliveryAddress.fullName}</p>
              <p><span className="font-semibold text-gray-900 dark:text-white">Phone:</span> {deliveryAddress.mobileNumber}</p>
              <p><span className="font-semibold text-gray-900 dark:text-white">Email:</span> {deliveryAddress.email}</p>
              <div className="flex gap-1.5 items-start mt-3">
                <MapPin className="w-4 h-4 text-[#DC2626] shrink-0 mt-0.5" />
                <p>
                  <span className="font-semibold text-gray-900 dark:text-white">Address:</span><br />
                  {deliveryAddress.addressLine}<br />
                  {deliveryAddress.landmark && `${deliveryAddress.landmark}, `}
                  {deliveryAddress.city}, {deliveryAddress.state} - {deliveryAddress.pincode}
                </p>
              </div>
            </div>
          </div>

          {/* Payment & Status */}
          <div className="bg-white dark:bg-[#121212] rounded-2xl p-6 border border-gray-200 dark:border-white/6 shadow-lg space-y-4">
            <div className="flex items-center gap-2 pb-3 border-b border-gray-100 dark:border-white/5">
              <CreditCard className="w-5 h-5 text-[#DC2626]" />
              <h2 className="text-lg font-bold text-gray-900 dark:text-white">Payment Summary</h2>
            </div>
            <div className="text-sm space-y-3 text-gray-700 dark:text-gray-300">
              <p>
                <span className="font-semibold text-gray-900 dark:text-white">Method:</span>{" "}
                <span className="capitalize">{paymentMethod === "online" ? "Online Payment Gateway" : "Cash on Delivery (COD)"}</span>
              </p>
              <p>
                <span className="font-semibold text-gray-900 dark:text-white">Order Status:</span>{" "}
                <span className="px-2 py-1 text-xs rounded-full font-bold uppercase bg-[#DC2626]/10 text-[#DC2626]">
                  {status}
                </span>
              </p>
              <div className="pt-3 border-t border-gray-100 dark:border-white/5 space-y-2">
                <div className="flex justify-between text-gray-600 dark:text-gray-400">
                  <span>Subtotal:</span>
                  <span>{formatCurrency(subtotal)}</span>
                </div>
                <div className="flex justify-between font-bold text-base text-gray-900 dark:text-white">
                  <span>Grand Total:</span>
                  <span className="text-[#DC2626]">{formatCurrency(total)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Product Summary */}
        <div className="bg-white dark:bg-[#121212] rounded-2xl p-6 border border-gray-200 dark:border-white/6 shadow-lg space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-gray-100 dark:border-white/5">
            <ShoppingBag className="w-5 h-5 text-[#DC2626]" />
            <h2 className="text-lg font-bold text-gray-900 dark:text-white">Product Summary</h2>
          </div>
          <div className="divide-y divide-gray-100 dark:divide-white/5">
            {items.map((item: any) => (
              <div key={item.product.id} className="py-3.5 flex gap-4 items-center">
                <div className="w-12 h-12 bg-gray-50 dark:bg-[#1A1A1A] border rounded-lg overflow-hidden shrink-0 relative">
                  <Image
                    src={item.product.images?.[0] || "/images/placeholder-product.svg"}
                    alt={item.product.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-gray-900 dark:text-white line-clamp-1">{item.product.name}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">Qty: {item.quantity}</p>
                </div>
                <div className="text-sm font-bold text-[#DC2626]">
                  {formatCurrency(item.product.price * item.quantity)}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Next Steps & Actions */}
        <div className="bg-white dark:bg-[#121212] rounded-2xl p-8 border border-gray-200 dark:border-white/6 shadow-lg space-y-6">
          <div className="grid sm:grid-cols-2 gap-4">
            <Link
              href="/products"
              className="block w-full py-3 bg-[#DC2626] text-white font-bold rounded-lg hover:bg-[#B91C1C] transition-colors text-center text-sm"
            >
              Continue Shopping
            </Link>
            <Link
              href="/"
              className="block w-full py-3 border-2 border-gray-300 dark:border-white/10 text-gray-900 dark:text-white font-bold rounded-lg hover:bg-gray-100 dark:hover:bg-white/5 transition-colors text-center text-sm"
            >
              Back to Home
            </Link>
          </div>

          <div className="text-center pt-4 border-t border-gray-100 dark:border-white/5">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Need assistance with your bulk order?</p>
            <a
              href={`https://wa.me/919150310876?text=Hello%20Sri%20Ganesh%20Enterprises%2C%20I%20have%20a%20question%20about%20my%20order%20%2A${orderId}%2A`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#DC2626] font-bold hover:underline inline-flex items-center gap-1.5"
            >
              Chat with us on WhatsApp
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
