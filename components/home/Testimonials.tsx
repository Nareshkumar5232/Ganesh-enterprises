"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import type { Testimonial } from "@/types";

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`${rating} of 5`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`w-3.5 h-3.5 ${i < rating ? "text-[#F59E0B] fill-[#F59E0B]" : "text-[#E2E8F0] fill-[#E2E8F0]"}`}
        />
      ))}
    </div>
  );
}

function initials(name: string) {
  return name.split(" ").slice(0, 2).map((n) => n[0]).join("").toUpperCase();
}

function TestimonialCard({ t }: { t: Testimonial }) {
  return (
    <div className="enterprise-card p-6 flex flex-col gap-4 h-full bg-white border rounded-xl shadow-sm">
      <Quote className="w-6 h-6 text-[#E2E8F0] dark:text-slate-700" aria-hidden="true" />
      <p className="text-[#374151] dark:text-slate-300 text-sm leading-relaxed flex-1">
        &ldquo;{t.content}&rdquo;
      </p>
      <div>
        <Stars rating={t.rating} />
      </div>
      <div className="flex items-center gap-3 pt-2 border-t border-[#F1F5F9] dark:border-slate-700">
        <div className="w-9 h-9 rounded-full bg-[#EFF6FF] dark:bg-blue-950 flex items-center justify-center shrink-0">
          <span className="text-[#2563EB] text-xs font-bold">{initials(t.name)}</span>
        </div>
        <div>
          <p className="text-[#0F172A] dark:text-white text-sm font-semibold">{t.name}</p>
          <p className="text-[#64748B] text-xs">{t.role} {t.company && `at ${t.company}`}</p>
        </div>
      </div>
    </div>
  );
}

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);

  useEffect(() => {
    fetch("/api/testimonials")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setTestimonials(data.testimonials);
        }
      })
      .catch((err) => console.error("Failed to load testimonials:", err));
  }, []);

  return (
    <section className="section-gray">
      <div className="max-w-7xl mx-auto px-4 lg:px-6 py-16">
        <div className="text-center mb-10">
          <p className="text-[#2563EB] text-xs font-semibold uppercase tracking-wider mb-2 font-outfit">Customer Reviews</p>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#0F172A] dark:text-white font-heading">
            Trusted by Businesses Across Chennai
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
            >
              <TestimonialCard t={t} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
