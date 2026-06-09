"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Mail } from "lucide-react";
import { newsletterSchema, type NewsletterFormData } from "@/lib/validations";

export default function NewsletterSection() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<NewsletterFormData>({ resolver: zodResolver(newsletterSchema) });

  function onSubmit() {
    toast.success("Subscribed! We'll keep you updated on new arrivals and offers.");
    reset();
  }

  return (
    <section className="section-gray">
      <div className="max-w-7xl mx-auto px-4 lg:px-6 py-14">
        <div className="max-w-2xl mx-auto text-center">
          <div className="w-10 h-10 bg-blue-50 dark:bg-blue-950 rounded-full flex items-center justify-center mx-auto mb-4">
            <Mail className="w-5 h-5 text-[#2563EB]" />
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-[#0F172A] dark:text-white mb-2">
            Stay Updated on New Arrivals
          </h2>
          <p className="text-[#64748B] text-sm mb-6">
            Subscribe for product launches, exclusive offers and industry news.
          </p>
          <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col sm:flex-row gap-3 justify-center">
            <div className="flex flex-col gap-1 flex-1 max-w-sm">
              <input
                {...register("email")}
                type="email"
                placeholder="Enter your business email"
                className="w-full px-4 py-2.5 border border-[#E2E8F0] dark:border-slate-700 rounded-md text-sm text-[#111827] dark:text-white bg-white dark:bg-[#1E293B] placeholder-[#94A3B8] focus:outline-none focus:border-[#2563EB] focus:ring-1 focus:ring-[#2563EB] transition-colors"
              />
              {errors.email && (
                <p className="text-red-500 text-xs text-left" role="alert">{errors.email.message}</p>
              )}
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="shrink-0 px-5 py-2.5 bg-[#2563EB] text-white text-sm font-semibold rounded-md hover:bg-[#1D4ED8] disabled:opacity-60 transition-colors"
            >
              {isSubmitting ? "Subscribing…" : "Subscribe"}
            </button>
          </form>
          <p className="text-[#94A3B8] text-xs mt-3">No spam. Unsubscribe at any time.</p>
        </div>
      </div>
    </section>
  );
}
