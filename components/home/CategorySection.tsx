"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Laptop, Wifi, Camera, Smartphone, Tv, Zap, Cpu, ArrowRight
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface Category {
  name: string;
  slug: string;
  description: string;
  examples: string;
  icon: LucideIcon;
}

const CATEGORIES: Category[] = [
  {
    name: "Computers & IT",
    slug: "computer-accessories",
    description: "Business computing solutions for every scale",
    examples: "Laptops, desktops, monitors, keyboards, mice",
    icon: Laptop,
  },
  {
    name: "Networking",
    slug: "electronics",
    description: "Enterprise networking and connectivity products",
    examples: "Routers, switches, access points, LAN cables",
    icon: Wifi,
  },
  {
    name: "Security Systems",
    slug: "smart-devices",
    description: "Comprehensive surveillance and access control",
    examples: "CCTV cameras, DVRs, biometric devices",
    icon: Camera,
  },
  {
    name: "Mobile Devices",
    slug: "mobile-accessories",
    description: "Smartphones, tablets and accessories",
    examples: "Cases, chargers, earphones, power banks",
    icon: Smartphone,
  },
  {
    name: "Home Appliances",
    slug: "electrical-appliances",
    description: "Quality home and office appliances",
    examples: "LED TVs, fans, extension boards, bulbs",
    icon: Tv,
  },
  {
    name: "Electrical Products",
    slug: "electrical-appliances",
    description: "Switchgear and electrical accessories",
    examples: "Wiring, MCBs, sockets, extension boards",
    icon: Zap,
  },
  {
    name: "Smart Devices",
    slug: "smart-devices",
    description: "IoT and intelligent home products",
    examples: "Smart plugs, bulbs, watches, speakers",
    icon: Cpu,
  },
  {
    name: "Chargers & Cables",
    slug: "chargers",
    description: "Universal charging and connectivity accessories",
    examples: "GaN chargers, USB-C cables, wireless pads",
    icon: Zap,
  },
];

export default function CategorySection() {
  return (
    <section className="section-white">
      <div className="max-w-7xl mx-auto px-4 lg:px-6 py-16">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <p className="text-[#2563EB] text-xs font-semibold uppercase tracking-wider mb-2">Product Divisions</p>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#0F172A] dark:text-white">
              Complete Technology Portfolio
            </h2>
          </div>
          <Link href="/products"
            className="flex items-center gap-1.5 text-sm font-semibold text-[#2563EB] hover:text-[#1D4ED8] transition-colors shrink-0">
            View All Products <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {CATEGORIES.map((cat, i) => {
            const Icon = cat.icon;
            return (
              <motion.div
                key={cat.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: i * 0.06 }}
              >
                <Link
                  href={`/products?category=${cat.slug}`}
                  className="enterprise-card group flex flex-col gap-3 p-5 h-full block"
                >
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-md bg-blue-50 dark:bg-blue-950 flex items-center justify-center group-hover:bg-[#2563EB] transition-colors duration-200">
                      <Icon className="w-5 h-5 text-[#2563EB] group-hover:text-white transition-colors duration-200" />
                    </div>
                    <ArrowRight className="w-4 h-4 text-[#CBD5E1] group-hover:text-[#2563EB] transition-colors duration-200" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#0F172A] dark:text-white text-sm mb-1">{cat.name}</h3>
                    <p className="text-[#64748B] text-xs leading-relaxed">{cat.description}</p>
                  </div>
                  <p className="text-[#94A3B8] text-xs mt-auto pt-2 border-t border-[#F1F5F9] dark:border-slate-700">
                    {cat.examples}
                  </p>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
