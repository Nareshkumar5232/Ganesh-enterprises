"use client";

import { motion } from "framer-motion";
import {
  ShieldCheck, Truck, Award, HeadphonesIcon, PackageCheck, BadgeCheck
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface Feature {
  icon: LucideIcon;
  title: string;
  description: string;
}

const FEATURES: Feature[] = [
  {
    icon: BadgeCheck,
    title: "100% Genuine Products",
    description: "Every product comes with manufacturer warranty. We source directly from authorised distributors.",
  },
  {
    icon: PackageCheck,
    title: "Bulk Order Experts",
    description: "Competitive pricing for bulk and institutional orders with flexible payment terms.",
  },
  {
    icon: Truck,
    title: "Fast & Reliable Delivery",
    description: "Prompt delivery across Chennai and Tamil Nadu with real-time order tracking.",
  },
  {
    icon: ShieldCheck,
    title: "After-Sales Support",
    description: "Dedicated support team for warranty claims, replacements and technical assistance.",
  },
  {
    icon: Award,
    title: "Authorised Dealer",
    description: "Official authorised distributor for 100+ leading technology brands.",
  },
  {
    icon: HeadphonesIcon,
    title: "Dedicated Account Manager",
    description: "Every business client gets a dedicated account manager for seamless procurement.",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="section-gray">
      <div className="max-w-7xl mx-auto px-4 lg:px-6 py-16">
        <div className="text-center mb-12">
          <p className="text-[#2563EB] text-xs font-semibold uppercase tracking-wider mb-2">Why Choose Us</p>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#0F172A] dark:text-white mb-3">
            The Preferred Distributor for Businesses
          </h2>
          <p className="text-[#64748B] max-w-xl mx-auto text-sm leading-relaxed">
            From small retailers to large enterprises, Sri Ganesh Enterprises delivers genuine technology products with unmatched service.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {FEATURES.map((f, i) => {
            const Icon = f.icon;
            return (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="enterprise-card p-6 flex gap-4"
              >
                <div className="w-10 h-10 rounded-md bg-blue-50 dark:bg-blue-950 flex items-center justify-center shrink-0 mt-0.5">
                  <Icon className="w-5 h-5 text-[#2563EB]" />
                </div>
                <div>
                  <h3 className="font-semibold text-[#0F172A] dark:text-white text-sm mb-1">{f.title}</h3>
                  <p className="text-[#64748B] text-xs leading-relaxed">{f.description}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
