import Link from "next/link";

const CATEGORIES = [
  {
    id: "tv",
    name: "Televisions",
    href: "/products?category=tv",
    icon: (
      <svg viewBox="0 0 48 48" className="w-9 h-9" fill="none" stroke="#B91C1C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="6" width="44" height="30" rx="3" />
        <polyline points="14,42 24,36 34,42" />
        <line x1="14" y1="42" x2="34" y2="42" />
      </svg>
    ),
  },
  {
    id: "laptops",
    name: "Laptops",
    href: "/products?category=computers",
    icon: (
      <svg viewBox="0 0 48 48" className="w-9 h-9" fill="none" stroke="#B91C1C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="6" y="8" width="36" height="24" rx="2" />
        <path d="M2 36h44l-3-4H5z" />
        <line x1="20" y1="36" x2="28" y2="36" />
      </svg>
    ),
  },
  {
    id: "mobile",
    name: "Mobiles",
    href: "/products?category=mobile",
    icon: (
      <svg viewBox="0 0 48 48" className="w-9 h-9" fill="none" stroke="#B91C1C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="13" y="3" width="22" height="42" rx="4" />
        <circle cx="24" cy="39" r="1.5" fill="#B91C1C" />
        <line x1="20" y1="8" x2="28" y2="8" />
      </svg>
    ),
  },
  {
    id: "printers",
    name: "Printers",
    href: "/products?category=printers",
    icon: (
      <svg viewBox="0 0 48 48" className="w-9 h-9" fill="none" stroke="#B91C1C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="8" y="16" width="32" height="20" rx="3" />
        <path d="M12 16V8h24v8" />
        <rect x="14" y="28" width="20" height="12" />
        <line x1="18" y1="24" x2="22" y2="24" />
        <circle cx="38" cy="24" r="1.5" fill="#B91C1C" />
      </svg>
    ),
  },
  {
    id: "networking",
    name: "Networking",
    href: "/products?category=networking",
    icon: (
      <svg viewBox="0 0 48 48" className="w-9 h-9" fill="none" stroke="#B91C1C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="4" y="28" width="40" height="12" rx="3" />
        <circle cx="10" cy="34" r="1.5" fill="#B91C1C" />
        <circle cx="16" cy="34" r="1.5" fill="#B91C1C" />
        <line x1="24" y1="28" x2="24" y2="20" />
        <path d="M17 20 Q24 14 31 20" />
        <path d="M12 16 Q24 8 36 16" />
      </svg>
    ),
  },
  {
    id: "cctv",
    name: "CCTV Systems",
    href: "/products?category=security",
    icon: (
      <svg viewBox="0 0 48 48" className="w-9 h-9" fill="none" stroke="#B91C1C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 22l26-8v16L6 22z" />
        <rect x="30" y="16" width="12" height="12" rx="2" />
        <line x1="6" y1="22" x2="2" y2="22" />
        <line x1="2" y1="16" x2="2" y2="38" />
        <circle cx="42" cy="18" r="2" fill="#B91C1C" />
      </svg>
    ),
  },
  {
    id: "accessories",
    name: "Computer Accessories",
    href: "/products?category=accessories",
    icon: (
      <svg viewBox="0 0 48 48" className="w-9 h-9" fill="none" stroke="#B91C1C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="4" y="18" width="40" height="22" rx="3" />
        <rect x="8" y="22" width="6" height="5" rx="1" />
        <rect x="16" y="22" width="6" height="5" rx="1" />
        <rect x="24" y="22" width="6" height="5" rx="1" />
        <rect x="32" y="22" width="8" height="5" rx="1" />
        <rect x="8" y="30" width="10" height="5" rx="1" />
        <rect x="20" y="30" width="6" height="5" rx="1" />
        <rect x="28" y="30" width="6" height="5" rx="1" />
        <rect x="36" y="30" width="4" height="5" rx="1" />
      </svg>
    ),
  },
  {
    id: "appliances",
    name: "Home Appliances",
    href: "/products?category=appliances",
    icon: (
      <svg viewBox="0 0 48 48" className="w-9 h-9" fill="none" stroke="#B91C1C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="14" y="4" width="20" height="40" rx="3" />
        <line x1="14" y1="22" x2="34" y2="22" />
        <circle cx="30" cy="13" r="2" />
        <line x1="18" y1="28" x2="30" y2="28" />
        <line x1="18" y1="33" x2="30" y2="33" />
      </svg>
    ),
  },
];

export default function CategorySection() {
  return (
    <section className="section-bg py-14 px-4" aria-label="Shop by category">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="text-center mb-10">
          <div className="section-divider" />
          <h2 className="text-[26px] font-bold text-[#0F172A]">Shop by Category</h2>
        </div>

        {/* Grid — 4 cols on desktop, 2 on mobile */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4">
          {CATEGORIES.map((cat) => (
            <Link key={cat.id} href={cat.href} className="cat-card">
              <div className="cat-icon-wrap">
                {cat.icon}
              </div>
              <span className="text-[13px] font-semibold text-[#0F172A] leading-tight text-center">
                {cat.name}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
