"use client";

import { useRef } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const ZONES = [
  {
    id: "tv",
    name: "TV Zone",
    tagline: "Crystal Clear. Cinematic Experience.",
    bg: "#111827",
    accent: "#D4AF37",
    textColor: "text-white",
    products: [
      { name: "Samsung QLED 4K", detail: "55\" – 85\" Range" },
      { name: "LG OLED Series", detail: "48\" – 77\" Range" },
      { name: "Sony Bravia XR", detail: "65\" – 75\" Range" },
      { name: "Mi TV 5X Pro", detail: "43\" – 65\" Range" },
    ],
    brands: ["Samsung", "LG", "Sony", "OnePlus", "Xiaomi", "Hisense"],
    href: "/products?category=tv",
  },
  {
    id: "computer",
    name: "Computer Zone",
    tagline: "Power. Performance. Productivity.",
    bg: "#F4F4F5",
    accent: "#DC2626",
    textColor: "text-[#111827]",
    products: [
      { name: "Dell Latitude 5540", detail: "i5 / i7 / i9 Config" },
      { name: "HP EliteBook 840", detail: "Business Grade" },
      { name: "Lenovo ThinkPad X1", detail: "Carbon Series" },
      { name: "HP LaserJet Pro", detail: "MFP Series" },
    ],
    brands: ["Dell", "HP", "Lenovo", "Asus", "Acer", "Apple"],
    href: "/products?category=computers",
  },
  {
    id: "mobile",
    name: "Mobile Zone",
    tagline: "Stay Connected. Stay Ahead.",
    bg: "#111827",
    accent: "#D4AF37",
    textColor: "text-white",
    products: [
      { name: "Samsung Galaxy S24", detail: "Ultra / Plus / Base" },
      { name: "iPhone 15 Series", detail: "Pro Max · Pro · Base" },
      { name: "OnePlus 12", detail: "Flagship Performance" },
      { name: "Realme GT Series", detail: "Gaming Edition" },
    ],
    brands: ["Apple", "Samsung", "OnePlus", "Realme", "Xiaomi", "Vivo"],
    href: "/products?category=mobile",
  },
  {
    id: "security",
    name: "Security Zone",
    tagline: "Protect. Monitor. Control.",
    bg: "#F4F4F5",
    accent: "#DC2626",
    textColor: "text-[#111827]",
    products: [
      { name: "Hikvision 4K CCTV", detail: "8-Channel Kit" },
      { name: "Dahua DVR System", detail: "16-Channel HD" },
      { name: "CP Plus Turret Cam", detail: "2MP / 4MP / 5MP" },
      { name: "TP-Link Network Switch", detail: "Managed / Unmanaged" },
    ],
    brands: ["Hikvision", "Dahua", "CP Plus", "Honeywell", "TP-Link", "D-Link"],
    href: "/products?category=security",
  },
  {
    id: "appliances",
    name: "Home Appliance Zone",
    tagline: "Smart Living. Wholesale Prices.",
    bg: "#111827",
    accent: "#D4AF37",
    textColor: "text-white",
    products: [
      { name: "Samsung Double Door", detail: "253L – 670L" },
      { name: "LG Front Load WM", detail: "7kg – 10kg" },
      { name: "Daikin Split AC", detail: "1.0 – 2.0 Ton" },
      { name: "Philips Air Fryer", detail: "Kitchen Appliances" },
    ],
    brands: ["Samsung", "LG", "Daikin", "Whirlpool", "Bosch", "Philips"],
    href: "/products?category=appliances",
  },
];

function ZoneSection({ zone, index }: { zone: typeof ZONES[number]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isDark = zone.bg === "#111827";

  return (
    <div
      ref={ref}
      className="zone-section"
      style={{ background: zone.bg }}
    >
      {/* Dept divider header */}
      <div
        className="max-w-7xl mx-auto px-6 pt-12 pb-0"
        style={{ borderTop: index === 0 ? "none" : undefined }}
      >
        <div className="dept-divider mb-10" style={{ color: zone.accent }}>
          <span>━━━━━━━━━━━━━━</span>
          <span
            className="font-black text-xl tracking-[0.15em]"
            style={{ color: zone.accent, WebkitTextFillColor: zone.accent }}
          >
            {zone.name.toUpperCase()}
          </span>
          <span>━━━━━━━━━━━━━━</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 pb-16">
        <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${index % 2 !== 0 ? "lg:grid-flow-dense" : ""}`}>

          {/* Left — zone info */}
          <div className={index % 2 !== 0 ? "lg:col-start-2" : ""}>
            <h2 className={`text-4xl font-black leading-tight mb-3 ${zone.textColor}`}>
              {zone.name}
            </h2>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] mb-6" style={{ color: zone.accent }}>
              {zone.tagline}
            </p>

            {/* Featured products list */}
            <div className="space-y-0 mb-8">
              {zone.products.map((p, i) => (
                <div
                  key={p.name}
                  className={`flex items-center justify-between py-3.5 border-b transition-colors ${
                    isDark ? "border-[#1F2937] hover:bg-[#1F2937]/60" : "border-[#E5E7EB] hover:bg-white"
                  }`}
                  style={{ animationDelay: `${i * 80}ms` }}
                >
                  <div className="flex items-center gap-3">
                    <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: zone.accent }} />
                    <span className={`font-semibold text-sm ${isDark ? "text-white" : "text-[#111827]"}`}>
                      {p.name}
                    </span>
                  </div>
                  <span className="text-xs font-medium" style={{ color: isDark ? "#6B7280" : "#9CA3AF" }}>
                    {p.detail}
                  </span>
                </div>
              ))}
            </div>

            {/* Brand tags */}
            <div className="flex flex-wrap gap-2 mb-8">
              {zone.brands.map((b) => (
                <span
                  key={b}
                  className="text-[11px] font-bold px-3 py-1.5 rounded tracking-wider uppercase"
                  style={{
                    background: isDark ? "rgba(212,175,55,0.1)" : "rgba(17,24,39,0.06)",
                    color: zone.accent,
                    border: `1px solid ${zone.accent}30`,
                  }}
                >
                  {b}
                </span>
              ))}
            </div>

            <Link
              href={zone.href}
              className="inline-flex items-center gap-2 font-bold text-sm uppercase tracking-widest group transition-colors"
              style={{ color: zone.accent }}
            >
              Explore Department
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
            </Link>
          </div>

          {/* Right — visual panel */}
          <div className={index % 2 !== 0 ? "lg:col-start-1 lg:row-start-1" : ""}>
            <div
              className="relative rounded-xl overflow-hidden"
              style={{
                background: isDark
                  ? "linear-gradient(135deg, #1F2937 0%, #111827 100%)"
                  : "linear-gradient(135deg, #FFFFFF 0%, #F4F4F5 100%)",
                border: `1px solid ${zone.accent}25`,
                minHeight: 300,
              }}
            >
              {/* Zone name watermark */}
              <div
                className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
                aria-hidden
              >
                <span
                  className="text-[96px] font-black leading-none tracking-tighter opacity-[0.04]"
                  style={{ color: zone.accent }}
                >
                  {zone.id.toUpperCase()}
                </span>
              </div>

              {/* Content grid inside panel */}
              <div className="relative z-10 p-8 grid grid-cols-2 gap-4">
                {zone.products.map((p, i) => (
                  <div
                    key={p.name}
                    className="rounded-lg p-4 flex flex-col gap-1.5"
                    style={{
                      background: isDark
                        ? `rgba(${zone.accent === "#D4AF37" ? "212,175,55" : "220,38,38"},0.06)`
                        : `rgba(${zone.accent === "#D4AF37" ? "212,175,55" : "220,38,38"},0.05)`,
                      border: `1px solid ${zone.accent}18`,
                    }}
                  >
                    <div className="w-6 h-0.5 rounded" style={{ background: zone.accent }} />
                    <p className={`text-xs font-bold leading-tight ${isDark ? "text-white" : "text-[#111827]"}`}>
                      {p.name}
                    </p>
                    <p className="text-[10px]" style={{ color: isDark ? "#6B7280" : "#9CA3AF" }}>
                      {p.detail}
                    </p>
                  </div>
                ))}
              </div>

              {/* Zone badge */}
              <div
                className="absolute top-4 right-4 px-3 py-1 rounded text-[10px] font-black uppercase tracking-widest"
                style={{ background: zone.accent, color: isDark ? "#111827" : "#FFFFFF" }}
              >
                {zone.name}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ShowroomFloor() {
  return (
    <section id="showroom-floor" aria-label="Showroom departments">
      {/* Entry label */}
      <div className="bg-[#F4F4F5] py-10 text-center">
        <p className="text-[10px] font-bold text-[#D4AF37] uppercase tracking-[0.3em] mb-2">
          ━━ Showroom Floor ━━
        </p>
        <h2 className="text-3xl font-black text-[#111827]">
          Explore Our Departments
        </h2>
        <p className="text-[#6B7280] text-sm mt-3 max-w-lg mx-auto">
          Five specialised zones covering every segment of the electronics market.
          Wholesale pricing across all departments.
        </p>
      </div>

      {ZONES.map((zone, i) => (
        <ZoneSection key={zone.id} zone={zone} index={i} />
      ))}
    </section>
  );
}
