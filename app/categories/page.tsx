"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Sparkles, ArrowRight } from "lucide-react";
import { apiClient } from "@/services/api";

export default function CategoriesPage() {
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiClient.get("/categories")
      .then((res) => res.data)
      .then((data) => {
        if (data.success) {
          setCategories(data.categories);
        }
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-[#F7F7F7] text-[#0F172A] pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 lg:px-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-[#E5E7EB] mb-12">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-5 h-5 text-[#B91C1C]" />
              <span className="text-xs uppercase tracking-widest text-[#B91C1C] font-extrabold font-outfit">Dynamic Catalog</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-[#0F172A] tracking-tight font-heading">
              Our B2B <span className="text-[#B91C1C]">Categories</span>
            </h1>
            <p className="text-[#6B7280] mt-2 text-sm md:text-base font-sans">
              Explore our diverse wholesale product lines and catalog segments.
            </p>
          </div>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((s) => (
              <div key={s} className="h-44 rounded-2xl bg-white border border-gray-200 animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {categories.map((cat) => (
              <Link
                key={cat.id}
                href={`/categories/${cat.id}`}
                className="group p-6 bg-white border border-[#E5E7EB]/70 rounded-2xl shadow-sm hover:border-[#B91C1C] hover:shadow-md transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2 font-heading">{cat.name}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 font-sans line-clamp-3 leading-relaxed mb-6">
                    {cat.description}
                  </p>
                </div>
                <div className="flex items-center gap-2 text-sm font-bold text-[#B91C1C] font-outfit group-hover:translate-x-1.5 transition-transform">
                  Browse Products <ArrowRight className="w-4 h-4" />
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
