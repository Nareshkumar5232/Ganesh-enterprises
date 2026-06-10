import Link from "next/link";
import { ArrowRight } from "lucide-react";

/* Brand logos with their official colors — text-based like in the image */
const BRANDS = [
  { name: "SAMSUNG",  color: "#1428A0", weight: "800", size: "22px" },
  { name: "LG",       color: "#A50034", weight: "900", size: "28px", serif: true },
  { name: "DELL",     color: "#007DB8", weight: "800", size: "22px" },
  { name: "HP",       color: "#0096D6", weight: "900", size: "26px" },
  { name: "Lenovo",   color: "#E2231A", weight: "800", size: "20px" },
  { name: "ASUS",     color: "#00539B", weight: "800", size: "22px" },
  { name: "acer",     color: "#83B81A", weight: "800", size: "24px" },
  { name: "Mi",       color: "#FF6900", weight: "900", size: "26px" },
  { name: "Canon",    color: "#CC0000", weight: "800", size: "22px" },
  { name: "EPSON",    color: "#003087", weight: "800", size: "20px" },
];

export default function TrustedBrands() {
  return (
    <section className="section-white py-10 px-4 border-t border-[#F3F4F6]" aria-label="Trusted brands">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-[22px] font-black text-[#111111]">Trusted by Leading Brands</h2>
          <Link
            href="/products"
            className="flex items-center gap-1 text-[#CC0000] text-sm font-semibold hover:text-[#AA0000] transition-colors"
          >
            View all brands <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Brand logos row */}
        <div className="grid grid-cols-5 sm:grid-cols-5 lg:grid-cols-10 gap-0 border border-[#E5E7EB] rounded-lg overflow-hidden">
          {BRANDS.map((brand, i) => (
            <div
              key={brand.name}
              className={[
                "flex items-center justify-center py-5 px-3 cursor-pointer transition-colors hover:bg-[#FEF2F2] group",
                i < BRANDS.length - 1 ? "border-r border-[#E5E7EB]" : "",
              ].join(" ")}
            >
              <span
                className="group-hover:scale-105 transition-transform duration-200 select-none"
                style={{
                  color: brand.color,
                  fontWeight: brand.weight,
                  fontSize: brand.size,
                  fontFamily: brand.serif ? "Georgia, serif" : "inherit",
                  letterSpacing: brand.name === "acer" ? "-0.02em" : "0",
                  lineHeight: 1,
                }}
              >
                {brand.name}
              </span>
            </div>
          ))}
        </div>

        {/* More brands sub-row */}
        <div className="mt-4 flex flex-wrap items-center gap-3 justify-center">
          {["Xiaomi", "Realme", "OnePlus", "Sony", "Panasonic", "Bosch", "Whirlpool", "Daikin", "D-Link", "TP-Link", "Hikvision", "Dahua", "CP Plus", "Cisco"].map((b) => (
            <span
              key={b}
              className="text-[12px] font-semibold text-[#6B7280] px-3 py-1 border border-[#E5E7EB] rounded-full hover:border-[#CC0000] hover:text-[#CC0000] transition-colors cursor-pointer"
            >
              {b}
            </span>
          ))}
          <span className="text-[12px] font-semibold text-[#CC0000]">+ 80 more</span>
        </div>
      </div>
    </section>
  );
}
