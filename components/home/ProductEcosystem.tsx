"use client";

import Link from "next/link";

const ECO_ITEMS = [
  {
    name: "Mobile Accessories",
    href: "/products?category=mobile-accessories",
    icon: (
      <svg viewBox="0 0 48 48" className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="13" y="3" width="22" height="42" rx="4" />
        <circle cx="24" cy="39" r="1.5" fill="currentColor" />
        <line x1="20" y1="8" x2="28" y2="8" />
        <path d="M16 18h16M16 24h16" opacity="0.4" />
      </svg>
    ),
  },
  {
    name: "Computer Accessories",
    href: "/products?category=computer-accessories",
    icon: (
      <svg viewBox="0 0 48 48" className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="4" y="14" width="40" height="26" rx="3" />
        <rect x="8" y="18" width="6" height="5" rx="1" />
        <rect x="16" y="18" width="6" height="5" rx="1" />
        <rect x="24" y="18" width="6" height="5" rx="1" />
        <rect x="32" y="18" width="8" height="5" rx="1" />
        <rect x="8" y="26" width="10" height="5" rx="1" />
        <rect x="20" y="26" width="6" height="5" rx="1" />
        <rect x="28" y="26" width="6" height="5" rx="1" />
        <rect x="36" y="26" width="4" height="5" rx="1" />
      </svg>
    ),
  },
  {
    name: "Electronics & TVs",
    href: "/products?category=electronics",
    icon: (
      <svg viewBox="0 0 48 48" className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="6" width="44" height="30" rx="3" />
        <polyline points="14,42 24,36 34,42" />
        <line x1="14" y1="42" x2="34" y2="42" />
      </svg>
    ),
  },
  {
    name: "Smart Devices",
    href: "/products?category=smart-devices",
    icon: (
      <svg viewBox="0 0 48 48" className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 22l26-8v16L6 22z" />
        <rect x="30" y="16" width="12" height="12" rx="2" />
        <line x1="6" y1="22" x2="2" y2="22" />
        <line x1="2" y1="16" x2="2" y2="38" />
        <circle cx="42" cy="18" r="2" fill="currentColor" />
      </svg>
    ),
  },
  {
    name: "Chargers",
    href: "/products?category=chargers",
    icon: (
      <svg viewBox="0 0 48 48" className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M26 4 L14 26 h10 L22 44 l12 -22 H24 Z" />
      </svg>
    ),
  },
  {
    name: "Earphones",
    href: "/products?category=earphones",
    icon: (
      <svg viewBox="0 0 48 48" className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M8 22 L8 34 A6 6 0 0 0 14 40 L18 40 L18 24 L14 24" />
        <path d="M40 22 L40 34 A6 6 0 0 1 34 40 L30 40 L30 24 L34 24" />
        <path d="M8 22 A16 16 0 0 1 40 22" />
      </svg>
    ),
  },
  {
    name: "Tech Solutions",
    href: "/products?category=electrical-appliances",
    icon: (
      <svg viewBox="0 0 48 48" className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="4" y="28" width="40" height="12" rx="3" />
        <circle cx="10" cy="34" r="1.5" fill="currentColor" />
        <circle cx="16" cy="34" r="1.5" fill="currentColor" />
        <line x1="24" y1="28" x2="24" y2="20" />
        <path d="M17 20 Q24 14 31 20" />
        <path d="M12 16 Q24 8 36 16" />
      </svg>
    ),
  },
];

export default function ProductEcosystem() {
  return (
    <section className="relative py-20 px-4 bg-white border-t border-b border-[#E5E7EB]/50 overflow-hidden flex flex-col items-center">
      <div className="max-w-7xl mx-auto w-full text-center mb-12">
        <div className="section-divider" />
        <h2 className="text-3xl md:text-4xl font-extrabold text-[#0F172A] tracking-tight">
          Our Product Ecosystem
        </h2>
        <p className="text-sm md:text-base text-[#6B7280] mt-3 font-outfit max-w-2xl mx-auto">
          Explore our vast distribution catalog spanning premium consumer electronics, commercial IT systems, and wholesale smart appliances.
        </p>
      </div>

      {/* Orbit Container */}
      <div className="relative w-[300px] h-[300px] sm:w-[480px] sm:h-[480px] md:w-[560px] md:h-[560px] flex items-center justify-center">
        
        {/* Center Circle Plaque */}
        <div className="absolute w-[130px] h-[130px] sm:w-[190px] sm:h-[190px] md:w-[230px] md:h-[230px] rounded-full bg-gradient-to-br from-white via-[#FDFBF7] to-[#F5EFE0] shadow-[0_20px_50px_rgba(212,175,55,0.15),_inset_0_0_15px_rgba(255,255,255,0.9)] border-2 border-[#D4AF37] flex flex-col items-center justify-center text-center p-3 sm:p-5 z-20">
          <span className="text-[10px] sm:text-xs font-bold text-[#6B7280] uppercase tracking-widest font-outfit">Sri Ganesh</span>
          <span className="text-sm sm:text-xl md:text-2xl font-black text-[#B91C1C] leading-none mt-1 font-heading">Enterprises</span>
          <div className="h-[2px] w-10 bg-[#D4AF37] my-2 sm:my-3 rounded-full" />
          <span className="text-[11px] sm:text-sm md:text-base font-extrabold text-[#0F172A] font-outfit leading-none">5000+ Products</span>
          <span className="text-[9px] sm:text-xs text-[#6B7280] font-medium mt-1">100+ Brands</span>
        </div>

        {/* Double-Orbit Ring Systems */}
        <div className="absolute w-[180px] h-[180px] sm:w-[320px] sm:h-[320px] md:w-[400px] md:h-[400px] rounded-full border border-[#D4AF37]/15 pointer-events-none" />
        <div className="absolute w-[196px] h-[196px] sm:w-[346px] sm:h-[346px] md:w-[426px] md:h-[426px] rounded-full border-2 border-dashed border-[#D4AF37]/35 shadow-[0_0_30px_rgba(212,175,55,0.06)] pointer-events-none" />

        {/* Orbit Rotating Plane */}
        <div className="absolute inset-0 animate-[orbit_50s_linear_infinite] pointer-events-none">
          {ECO_ITEMS.map((item, idx) => {
            const angle = idx * (360 / ECO_ITEMS.length);
            return (
              <div
                key={item.name}
                className="absolute top-1/2 left-1/2 w-12 h-12 sm:w-20 sm:h-20 md:w-24 md:h-24 -mt-6 -ml-6 sm:-mt-10 sm:-ml-10 md:-mt-12 md:-ml-12 pointer-events-auto"
                style={{
                  transform: `rotate(${angle}deg) translate(var(--orbit-radius)) rotate(-${angle}deg)`,
                }}
              >
                {/* Product Node counter-rotated to stay upright */}
                <Link
                  href={item.href}
                  className="w-full h-full rounded-full bg-white/95 border border-slate-200/80 shadow-[0_8px_24px_rgba(0,0,0,0.04)] hover:shadow-[0_16px_36px_rgba(185,28,28,0.18)] hover:border-[#B91C1C] hover:scale-108 flex flex-col items-center justify-center p-1 sm:p-2.5 transition-all duration-300 group animate-[counter-orbit_50s_linear_infinite] text-center"
                >
                  <div className="w-8 h-8 sm:w-11 sm:h-11 md:w-12 md:h-12 rounded-full bg-gradient-to-br from-red-50 to-red-100/30 flex items-center justify-center text-[#B91C1C] group-hover:scale-105 group-hover:from-red-100 group-hover:to-red-200/20 transition-all duration-300 shadow-[0_4px_8px_rgba(185,28,28,0.03)]">
                    {item.icon}
                  </div>
                  <span className="hidden sm:block text-[9px] sm:text-[10px] md:text-[11px] font-bold text-slate-800 mt-2 leading-tight font-outfit px-0.5 truncate max-w-full group-hover:text-[#B91C1C] transition-colors">
                    {item.name}
                  </span>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
