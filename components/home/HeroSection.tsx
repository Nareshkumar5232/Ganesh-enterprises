"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  CheckCircle2, ArrowRight, Laptop, Tv, Smartphone,
  Router, Camera, Printer
} from "lucide-react";

const TRUST = [
  "Genuine Products",
  "Bulk Orders Welcome",
  "Competitive Pricing",
  "Fast Delivery",
];

/* Floating product badges */
const PRODUCT_BADGES = [
  { icon: Laptop,     label: "Laptops & PCs",      color: "bg-blue-50   border-blue-100", iconColor: "text-[#2563EB]", top: "top-4",   left: "left-4"   },
  { icon: Tv,         label: "Smart Televisions",   color: "bg-slate-50  border-slate-200", iconColor: "text-[#0F172A]", top: "top-4",   right: "right-4" },
  { icon: Smartphone, label: "Mobile Devices",      color: "bg-amber-50  border-amber-100", iconColor: "text-[#F59E0B]", bottom: "bottom-24", left: "left-2" },
  { icon: Router,     label: "Networking",          color: "bg-green-50  border-green-100", iconColor: "text-green-600", bottom: "bottom-24", right: "right-2" },
  { icon: Camera,     label: "Security Systems",    color: "bg-rose-50   border-rose-100",  iconColor: "text-rose-600",  top: "top-1/2",  left: "-left-2"  },
  { icon: Printer,    label: "Printers & Scanners", color: "bg-purple-50 border-purple-100",iconColor: "text-purple-600",top: "top-1/2",  right: "-right-2" },
];

const fadeUp = {
  hidden:  { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.5, delay: i * 0.1, ease: "easeOut" as const },
  }),
};

export default function HeroSection() {
  return (
    <section className="section-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 lg:px-6 py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* ── LEFT ── */}
          <div className="flex flex-col gap-6 max-w-[700px]">

            {/* Badge */}
            <motion.div custom={0} variants={fadeUp} initial="hidden" animate="visible">
              <span className="inline-flex items-center gap-2 text-xs font-semibold text-[#2563EB] bg-blue-50 border border-blue-100 px-3 py-1.5 rounded-full uppercase tracking-wider">
                <span className="w-1.5 h-1.5 rounded-full bg-[#2563EB] animate-pulse inline-block" />
                Trusted Electronics Wholesale Distributor
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              custom={1} variants={fadeUp} initial="hidden" animate="visible"
              className="text-4xl sm:text-5xl lg:text-[52px] font-bold text-[#0F172A] dark:text-white leading-[1.12] tracking-tight"
            >
              Wholesale Electronics,<br />
              <span className="text-[#2563EB]">Computers</span> &amp; IT Products
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              custom={2} variants={fadeUp} initial="hidden" animate="visible"
              className="text-[#64748B] text-lg leading-relaxed"
            >
              Supplying genuine electronics, computers, networking equipment, security
              systems, mobile devices and home appliances to retailers, businesses and
              institutions across Chennai.
            </motion.p>

            {/* CTA buttons */}
            <motion.div
              custom={3} variants={fadeUp} initial="hidden" animate="visible"
              className="flex flex-wrap gap-3"
            >
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#2563EB] text-white font-semibold rounded-md hover:bg-[#1D4ED8] transition-colors shadow-sm text-sm"
              >
                Get a Quote <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/products"
                className="inline-flex items-center gap-2 px-6 py-3 border border-[#E2E8F0] text-[#0F172A] dark:text-white font-semibold rounded-md hover:border-[#2563EB] hover:text-[#2563EB] transition-colors text-sm"
              >
                Explore Products
              </Link>
            </motion.div>

            {/* Trust indicators */}
            <motion.div
              custom={4} variants={fadeUp} initial="hidden" animate="visible"
              className="flex flex-wrap gap-4 pt-1"
            >
              {TRUST.map((t) => (
                <span key={t} className="flex items-center gap-1.5 text-sm text-[#374151] dark:text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-[#2563EB] shrink-0" />
                  {t}
                </span>
              ))}
            </motion.div>
          </div>

          {/* ── RIGHT: product showcase ── */}
          <motion.div
            initial={{ opacity: 0, x: 32 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
            className="relative flex items-center justify-center"
          >
            {/* Center card */}
            <div className="relative w-full max-w-sm aspect-square bg-gradient-to-br from-[#F0F4FF] via-white to-[#F8FAFC] dark:from-[#1E293B] dark:to-[#0F172A] rounded-2xl border border-[#E2E8F0] dark:border-slate-700 shadow-lg flex flex-col items-center justify-center gap-4 p-8">
              <div className="grid grid-cols-3 gap-4">
                {[Laptop, Tv, Smartphone, Router, Camera, Printer].map((Icon, i) => (
                  <motion.div
                    key={i}
                    animate={{ y: [0, i % 2 === 0 ? -6 : 6, 0] }}
                    transition={{ repeat: Infinity, duration: 3 + i * 0.4, ease: "easeInOut" }}
                    className="w-16 h-16 flex items-center justify-center bg-white dark:bg-[#1E293B] rounded-xl border border-[#E2E8F0] dark:border-slate-700 shadow-sm"
                  >
                    <Icon className="w-7 h-7 text-[#2563EB]" />
                  </motion.div>
                ))}
              </div>
              <p className="text-center text-[#64748B] text-xs font-medium tracking-wide uppercase">
                500+ Premium Products
              </p>
            </div>

            {/* Floating labels */}
            {PRODUCT_BADGES.map((b, i) => {
              const Icon = b.icon;
              return (
                <motion.div
                  key={b.label}
                  animate={{ y: [0, i % 2 === 0 ? -4 : 4, 0] }}
                  transition={{ repeat: Infinity, duration: 4 + i * 0.5, ease: "easeInOut" }}
                  style={Object.fromEntries(
                    Object.entries({ top: b.top, left: b.left, right: b.right, bottom: b.bottom })
                      .filter(([, v]) => v !== undefined)
                  )}
                  className={`absolute flex items-center gap-2 ${b.color} border rounded-lg px-2.5 py-1.5 shadow-sm text-xs font-medium text-[#0F172A] dark:text-white whitespace-nowrap`}
                >
                  <Icon className={`w-3.5 h-3.5 ${b.iconColor}`} />
                  {b.label}
                </motion.div>
              );
            })}
          </motion.div>

        </div>
      </div>
    </section>
  );
}
