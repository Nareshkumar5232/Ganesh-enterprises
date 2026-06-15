"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function TrustedBrands() {
  const [brands, setBrands] = useState<any[]>([]);

  useEffect(() => {
    fetch("/api/brands")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setBrands(data.brands);
        }
      })
      .catch((err) => console.error("Failed to load brands:", err));
  }, []);

  const secondaryBrands = [
    "Xiaomi",
    "Realme",
    "OnePlus",
    "Sony",
    "Panasonic",
    "Bosch",
    "Whirlpool",
    "Daikin",
    "D-Link",
    "TP-Link",
    "Hikvision",
    "CP Plus",
    "Cisco",
    "Apple",
  ];

  return (
    <section className="section-white py-14 px-4 lg:px-6 scroll-mt-20" aria-label="Trusted brands" id="brands">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="section-divider" />
          <h2 className="text-[26px] font-bold text-[#0F172A] font-heading">Trusted by Leading Brands</h2>
        </div>

        {/* Brand logos grid — responsive grid */}
        <div className="grid grid-cols-2 sm:grid-cols-5 lg:grid-cols-9 border border-[#E5E7EB] rounded-xl overflow-hidden bg-white shadow-sm">
          {brands.map((brand, i) => (
            <Link
              key={brand.id}
              href={`/brands/${brand.id}`}
              className="brand-cell flex items-center justify-center p-5 border-r border-b border-[#E5E7EB] hover:bg-red-50/20 transition-colors"
            >
              <img
                src={brand.logoUrl}
                alt={`${brand.name} Logo`}
                className="h-7 max-w-[80%] object-contain select-none transition-transform duration-150 hover:scale-105"
              />
            </Link>
          ))}
        </div>

        {/* Secondary brand tags */}
        <div className="flex flex-wrap justify-center gap-2 mt-5">
          {secondaryBrands.map((b) => (
            <Link
              key={b}
              href={`/products?q=${encodeURIComponent(b)}`}
              className="text-[12px] font-medium text-[#6B7280] px-3 py-1 border border-[#E5E7EB] rounded-full bg-white hover:border-[#B91C1C] hover:text-[#B91C1C] transition-colors cursor-pointer font-outfit"
            >
              {b}
            </Link>
          ))}
          <span className="text-[12px] font-semibold text-[#B91C1C] px-3 py-1 font-outfit">
            + 80 more brands
          </span>
        </div>
      </div>
    </section>
  );
}
