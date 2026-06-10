"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { CheckCircle, Package, Truck } from "lucide-react";

export default function OrderConfirmationPage() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId") || "ORD-XXXXXXXX";

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0F0F0F] pt-24 pb-16 flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        <div className="bg-white dark:bg-[#121212] rounded-2xl p-8 text-center border border-gray-200 dark:border-white/6 shadow-lg">
          {/* Success Icon */}
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-[#DC2626]/20 rounded-full flex items-center justify-center">
              <CheckCircle className="w-10 h-10 text-[#DC2626]" />
            </div>
          </div>

          {/* Success Message */}
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Order Confirmed!</h1>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Your order has been placed successfully. We'll process it shortly.
          </p>

          {/* Order ID */}
          <div className="bg-gray-50 dark:bg-[#1A1A1A] rounded-lg p-4 mb-6 border border-gray-200 dark:border-white/6">
            <p className="text-xs text-gray-600 dark:text-gray-400 uppercase tracking-widest mb-1">Order ID</p>
            <p className="text-2xl font-bold text-[#DC2626] font-mono">{orderId}</p>
          </div>

          {/* Next Steps */}
          <div className="space-y-4 mb-8 text-left">
            <div className="flex gap-3">
              <Package className="w-5 h-5 text-[#DC2626] flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-gray-900 dark:text-white">Processing</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Your order is being prepared</p>
              </div>
            </div>
            <div className="flex gap-3">
              <Truck className="w-5 h-5 text-[#DC2626] flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-gray-900 dark:text-white">Delivery</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">You'll receive it within 3-5 business days</p>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="space-y-3">
            <Link
              href="/products"
              className="block w-full py-3 bg-[#DC2626] text-white font-bold rounded-lg hover:bg-[#B91C1C] transition-colors text-center"
            >
              Continue Shopping
            </Link>
            <Link
              href="/"
              className="block w-full py-3 border-2 border-gray-300 dark:border-white/10 text-gray-900 dark:text-white font-bold rounded-lg hover:bg-gray-100 dark:hover:bg-white/5 transition-colors text-center"
            >
              Back to Home
            </Link>
          </div>

          {/* Help Section */}
          <div className="mt-8 pt-6 border-t border-gray-200 dark:border-white/10">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">Need help?</p>
            <a
              href="https://wa.me/919150310876?text=Hello%20Sri%20Ganesh%20Enterprises%2C%20I%20have%20a%20question%20about%20my%20order"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#DC2626] font-medium hover:underline"
            >
              Chat with us on WhatsApp
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
