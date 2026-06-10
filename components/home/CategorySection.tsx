import Link from "next/link";

const CATEGORIES = [
  {
    id: "mobile-accessories",
    name: "Mobile Accessories",
    href: "/products?category=mobile-accessories",
    icon: (
      <svg viewBox="0 0 48 48" className="w-9 h-9" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="13" y="3" width="22" height="42" rx="4" />
        <circle cx="24" cy="39" r="1.5" fill="currentColor" />
        <line x1="20" y1="8" x2="28" y2="8" />
        <path d="M16 18h16M16 24h16" opacity="0.4" />
      </svg>
    ),
  },
  {
    id: "computer-accessories",
    name: "Computer Accessories",
    href: "/products?category=computer-accessories",
    icon: (
      <svg viewBox="0 0 48 48" className="w-9 h-9" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
    id: "electronics",
    name: "Electronics & TVs",
    href: "/products?category=electronics",
    icon: (
      <svg viewBox="0 0 48 48" className="w-9 h-9" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="6" width="44" height="30" rx="3" />
        <polyline points="14,42 24,36 34,42" />
        <line x1="14" y1="42" x2="34" y2="42" />
      </svg>
    ),
  },
  {
    id: "smart-devices",
    name: "Smart Devices & CCTV",
    href: "/products?category=smart-devices",
    icon: (
      <svg viewBox="0 0 48 48" className="w-9 h-9" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 22l26-8v16L6 22z" />
        <rect x="30" y="16" width="12" height="12" rx="2" />
        <line x1="6" y1="22" x2="2" y2="22" />
        <line x1="2" y1="16" x2="2" y2="38" />
        <circle cx="42" cy="18" r="2" fill="currentColor" />
      </svg>
    ),
  },
  {
    id: "chargers",
    name: "Chargers & Adapters",
    href: "/products?category=chargers",
    icon: (
      <svg viewBox="0 0 48 48" className="w-9 h-9" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M26 4 L14 26 h10 L22 44 l12 -22 H24 Z" />
      </svg>
    ),
  },
  {
    id: "earphones",
    name: "Earphones & Audio",
    href: "/products?category=earphones",
    icon: (
      <svg viewBox="0 0 48 48" className="w-9 h-9" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M8 22 L8 34 A6 6 0 0 0 14 40 L18 40 L18 24 L14 24" />
        <path d="M40 22 L40 34 A6 6 0 0 1 34 40 L30 40 L30 24 L34 24" />
        <path d="M8 22 A16 16 0 0 1 40 22" />
      </svg>
    ),
  },
  {
    id: "electrical-appliances",
    name: "Technology Solutions",
    href: "/products?category=electrical-appliances",
    icon: (
      <svg viewBox="0 0 48 48" className="w-9 h-9" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="4" y="28" width="40" height="12" rx="3" />
        <circle cx="10" cy="34" r="1.5" fill="currentColor" />
        <circle cx="16" cy="34" r="1.5" fill="currentColor" />
        <line x1="24" y1="28" x2="24" y2="20" />
        <path d="M17 20 Q24 14 31 20" />
        <path d="M12 16 Q24 8 36 16" />
      </svg>
    ),
  },
  {
    id: "all",
    name: "All Showroom",
    href: "/products",
    icon: (
      <svg viewBox="0 0 48 48" className="w-9 h-9" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="4" y="4" width="16" height="16" rx="2" />
        <rect x="28" y="4" width="16" height="16" rx="2" />
        <rect x="4" y="28" width="16" height="16" rx="2" />
        <rect x="28" y="28" width="16" height="16" rx="2" />
      </svg>
    ),
  },
];

export default function CategorySection() {
  return (
    <section className="section-bg py-16 px-4" aria-label="Shop by category">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="text-center mb-12">
          <div className="section-divider" />
          <h2 className="text-3xl font-extrabold text-[#0F172A] tracking-tight font-heading">
            Shop by Category
          </h2>
          <p className="text-sm text-[#6B7280] font-outfit mt-2">
            Instant B2B bulk stock filtering by product range
          </p>
        </div>

        {/* Grid — 8 cols on desktop, 4 on tablet, 2 on mobile */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.id}
              href={cat.href}
              className="group flex flex-col items-center p-6 bg-white border border-[#E5E7EB]/70 rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.02)] hover:border-[#B91C1C] hover:shadow-[0_12px_24px_rgba(185,28,28,0.08)] hover:-translate-y-1.5 transition-all duration-300 text-center"
            >
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-red-50 to-red-100/30 flex items-center justify-center text-[#B91C1C] group-hover:scale-105 group-hover:from-red-100 group-hover:to-red-200/20 transition-all duration-300 shadow-[0_8px_16px_rgba(185,28,28,0.04)] mb-4">
                {cat.icon}
              </div>
              <span className="text-[14px] font-bold text-[#0F172A] group-hover:text-[#B91C1C] transition-colors leading-tight font-outfit">
                {cat.name}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
