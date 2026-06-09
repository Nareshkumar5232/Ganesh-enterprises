"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Phone } from "lucide-react";

export default function CTABanner() {
  return (
    <section className="section-white">
      <div className="max-w-7xl mx-auto px-4 lg:px-6 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="bg-[#0F172A] rounded-2xl p-10 lg:p-14 flex flex-col lg:flex-row items-center justify-between gap-8"
        >
          <div className="text-center lg:text-left">
            <p className="text-[#93C5FD] text-xs font-semibold uppercase tracking-wider mb-3">Ready to Partner With Us?</p>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
              Bulk Orders, Competitive Pricing, Fast Delivery
            </h2>
            <p className="text-slate-400 text-sm max-w-lg leading-relaxed">
              Whether you are a retailer, institution or enterprise — we supply genuine technology products at the best wholesale prices across Chennai.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#2563EB] text-white text-sm font-semibold rounded-md hover:bg-[#1D4ED8] transition-colors shadow-sm"
            >
              Get a Quote <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href="tel:+919342698344"
              className="inline-flex items-center gap-2 px-6 py-3 border border-slate-600 text-white text-sm font-semibold rounded-md hover:border-slate-400 hover:bg-white/5 transition-colors"
            >
              <Phone className="w-4 h-4" /> Call Now
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
