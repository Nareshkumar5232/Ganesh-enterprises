"use client";

import { useEffect, useState, use } from "react";
import Link from "next/link";
import { ProductCard } from "@/components/products/ProductCard";
import { useProductsQuery } from "@/hooks/useProducts";
import { apiClient } from "@/services/api";
import { Sparkles, ArrowLeft } from "lucide-react";

interface CategoryPageProps {
  params: Promise<{ id: string }>;
}

export default function CategoryProductsPage({ params }: CategoryPageProps) {
  const resolvedParams = use(params);
  const categoryId = resolvedParams.id;
  const [categoryName, setCategoryName] = useState("");
  const [categoryDescription, setCategoryDescription] = useState("");

  const { data, isLoading, isError } = useProductsQuery({
    category: categoryId as any,
    limit: 1000,
  });
  const filteredProducts = data?.products ?? [];

  useEffect(() => {
    // Fetch category name/desc from categories API
    apiClient.get("/categories")
      .then((res) => res.data)
      .then((data) => {
        if (data.success) {
          const catObj = data.categories.find((c: any) => c.id === categoryId);
          if (catObj) {
            setCategoryName(catObj.name);
            setCategoryDescription(catObj.description);
          } else {
            setCategoryName(categoryId.charAt(0).toUpperCase() + categoryId.slice(1).replace("-", " "));
          }
        }
      })
      .catch(() => {
        setCategoryName(categoryId.charAt(0).toUpperCase() + categoryId.slice(1).replace("-", " "));
      });
  }, [categoryId]);

  return (
    <div className="min-h-screen bg-[#F7F7F7] text-[#0F172A] pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 lg:px-6">
        {/* Back navigation */}
        <Link
          href="/categories"
          className="inline-flex items-center gap-2 text-sm font-semibold text-[#6B7280] hover:text-[#B91C1C] transition-colors mb-6 font-outfit"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Categories
        </Link>

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-[#E5E7EB] mb-12">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-5 h-5 text-[#B91C1C]" />
              <span className="text-xs uppercase tracking-widest text-[#B91C1C] font-extrabold font-outfit">
                Category Segment
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-[#0F172A] font-heading">
              <span className="text-[#B91C1C]">{categoryName}</span> Range
            </h1>
            {categoryDescription && (
              <p className="text-[#6B7280] mt-2 text-sm md:text-base font-sans max-w-2xl leading-relaxed">
                {categoryDescription}
              </p>
            )}
          </div>
          <div className="text-right">
            <span className="text-xl font-bold font-mono text-[#0F172A]">
              {filteredProducts.length}
            </span>
            <span className="text-xs text-[#6B7280] block font-outfit uppercase font-semibold">
              Items Found
            </span>
          </div>
        </div>

        {/* Products Display */}
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((s) => (
              <div key={s} className="h-80 rounded-2xl bg-white border border-gray-200 animate-pulse" />
            ))}
          </div>
        ) : isError ? (
          <div className="text-center py-20 bg-white border rounded-2xl">
            <p className="text-red-500 font-bold">Failed to load category products.</p>
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="text-center py-20 bg-white border border-[#E5E7EB] rounded-2xl p-6 shadow-sm">
            <h3 className="text-xl font-bold text-[#0F172A] mb-2 font-heading">No Products Found</h3>
            <p className="text-[#6B7280] text-sm font-sans mb-6">
              We currently don't have any wholesale stock active for this category segment.
            </p>
            <Link href="/products" className="inline-block px-6 py-2 bg-[#B91C1C] text-white rounded-lg font-bold text-xs uppercase tracking-wider font-outfit">
              Browse All Catalog
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
