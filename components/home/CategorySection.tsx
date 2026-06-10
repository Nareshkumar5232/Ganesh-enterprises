import Link from "next/link";
import { ArrowRight } from "lucide-react";

/* Category data — using SVG emoji icons styled as product images */
const CATEGORIES = [
  {
    id: "tv",
    name: "Televisions",
    href: "/products?category=tv",
    emoji: "📺",
    bgColor: "#EFF6FF",
  },
  {
    id: "laptop",
    name: "Laptops",
    href: "/products?category=computers",
    emoji: "💻",
    bgColor: "#F0FDF4",
  },
  {
    id: "mobile",
    name: "Mobiles",
    href: "/products?category=mobile",
    emoji: "📱",
    bgColor: "#FFF7ED",
  },
  {
    id: "printer",
    name: "Printers",
    href: "/products?category=printers",
    emoji: "🖨️",
    bgColor: "#F5F3FF",
  },
  {
    id: "networking",
    name: "Networking",
    href: "/products?category=networking",
    emoji: "📡",
    bgColor: "#FFF1F2",
  },
  {
    id: "cctv",
    name: "CCTV Systems",
    href: "/products?category=security",
    emoji: "📷",
    bgColor: "#ECFDF5",
  },
  {
    id: "accessories",
    name: "Computer Accessories",
    href: "/products?category=accessories",
    emoji: "⌨️",
    bgColor: "#FFFBEB",
  },
  {
    id: "appliances",
    name: "Home Appliances",
    href: "/products?category=appliances",
    emoji: "🏠",
    bgColor: "#FEF2F2",
  },
];

/* Inline SVG product icons for each category */
function CategoryIcon({ id }: { id: string }) {
  const icons: Record<string, React.ReactNode> = {
    tv: (
      <svg viewBox="0 0 64 64" className="w-12 h-12" fill="none">
        <rect x="6" y="10" width="52" height="34" rx="4" fill="#1F2937" />
        <rect x="8" y="12" width="48" height="30" rx="3" fill="#374151" />
        <rect x="10" y="14" width="44" height="26" rx="2" fill="#1D4ED8" opacity="0.7" />
        <rect x="14" y="18" width="36" height="18" rx="1" fill="#3B82F6" opacity="0.5" />
        <path d="M24 44 L28 50 M40 44 L36 50" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" />
        <rect x="22" y="50" width="20" height="3" rx="1" fill="#6B7280" />
        <circle cx="50" cy="42" r="2" fill="#EF4444" />
      </svg>
    ),
    laptop: (
      <svg viewBox="0 0 64 64" className="w-12 h-12" fill="none">
        <rect x="10" y="12" width="44" height="30" rx="3" fill="#374151" />
        <rect x="12" y="14" width="40" height="26" rx="2" fill="#1D4ED8" opacity="0.8" />
        <rect x="14" y="16" width="36" height="22" rx="1" fill="#3B82F6" opacity="0.4" />
        <path d="M4 44 L8 42 L56 42 L60 44 L60 47 Q60 50 57 50 L7 50 Q4 50 4 47 Z" fill="#4B5563" />
        <rect x="26" y="42" width="12" height="2" rx="1" fill="#9CA3AF" />
        <circle cx="48" cy="20" r="1.5" fill="#10B981" />
      </svg>
    ),
    mobile: (
      <svg viewBox="0 0 64 64" className="w-12 h-12" fill="none">
        <rect x="18" y="6" width="28" height="52" rx="6" fill="#1F2937" />
        <rect x="20" y="10" width="24" height="44" rx="4" fill="#374151" />
        <rect x="21" y="12" width="22" height="40" rx="3" fill="#1D4ED8" opacity="0.7" />
        <circle cx="32" cy="54" r="2.5" fill="#9CA3AF" />
        <rect x="28" y="8" width="8" height="2" rx="1" fill="#6B7280" />
      </svg>
    ),
    printer: (
      <svg viewBox="0 0 64 64" className="w-12 h-12" fill="none">
        <rect x="10" y="24" width="44" height="22" rx="3" fill="#6B7280" />
        <rect x="14" y="28" width="36" height="14" rx="2" fill="#9CA3AF" />
        <rect x="16" y="10" width="32" height="14" rx="2" fill="#D1D5DB" />
        <rect x="18" y="12" width="28" height="10" rx="1" fill="#F9FAFB" />
        <rect x="14" y="40" width="36" height="18" rx="2" fill="#E5E7EB" />
        <rect x="18" y="43" width="28" height="8" rx="1" fill="#FFFFFF" />
        <circle cx="44" cy="32" r="2.5" fill="#10B981" />
        <circle cx="50" cy="32" r="2.5" fill="#EF4444" />
      </svg>
    ),
    networking: (
      <svg viewBox="0 0 64 64" className="w-12 h-12" fill="none">
        <rect x="10" y="36" width="44" height="16" rx="3" fill="#374151" />
        <circle cx="18" cy="44" r="2.5" fill="#10B981" />
        <circle cx="26" cy="44" r="2.5" fill="#F59E0B" />
        <path d="M32 36 L32 26" stroke="#6B7280" strokeWidth="2" />
        <path d="M22 28 Q32 20 42 28" stroke="#3B82F6" strokeWidth="2" fill="none" />
        <path d="M16 24 Q32 14 48 24" stroke="#60A5FA" strokeWidth="2" fill="none" strokeDasharray="3 2" />
        <path d="M12 20 Q32 8 52 20" stroke="#93C5FD" strokeWidth="1.5" fill="none" strokeDasharray="3 2" />
      </svg>
    ),
    cctv: (
      <svg viewBox="0 0 64 64" className="w-12 h-12" fill="none">
        <ellipse cx="32" cy="32" rx="18" ry="18" fill="#374151" />
        <ellipse cx="32" cy="32" rx="14" ry="14" fill="#4B5563" />
        <ellipse cx="32" cy="32" rx="9" ry="9" fill="#1F2937" />
        <ellipse cx="32" cy="32" rx="5" ry="5" fill="#111827" />
        <ellipse cx="32" cy="32" rx="2" ry="2" fill="#6B7280" />
        <path d="M50 20 L54 16 M50 44 L54 48" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" />
        <circle cx="28" cy="28" r="2" fill="#60A5FA" opacity="0.6" />
        <circle cx="50" cy="16" r="3" fill="#EF4444" />
      </svg>
    ),
    accessories: (
      <svg viewBox="0 0 64 64" className="w-12 h-12" fill="none">
        <rect x="6" y="24" width="52" height="24" rx="4" fill="#374151" />
        <rect x="10" y="28" width="6" height="6" rx="1.5" fill="#6B7280" />
        <rect x="18" y="28" width="6" height="6" rx="1.5" fill="#6B7280" />
        <rect x="26" y="28" width="6" height="6" rx="1.5" fill="#6B7280" />
        <rect x="34" y="28" width="6" height="6" rx="1.5" fill="#6B7280" />
        <rect x="42" y="28" width="12" height="6" rx="1.5" fill="#9CA3AF" />
        <rect x="10" y="36" width="8" height="6" rx="1.5" fill="#9CA3AF" />
        <rect x="20" y="36" width="6" height="6" rx="1.5" fill="#6B7280" />
        <rect x="28" y="36" width="6" height="6" rx="1.5" fill="#6B7280" />
        <rect x="36" y="36" width="6" height="6" rx="1.5" fill="#6B7280" />
        <rect x="44" y="36" width="10" height="6" rx="1.5" fill="#9CA3AF" />
      </svg>
    ),
    appliances: (
      <svg viewBox="0 0 64 64" className="w-12 h-12" fill="none">
        <rect x="16" y="6" width="32" height="52" rx="4" fill="#D1D5DB" />
        <rect x="18" y="8" width="28" height="24" rx="2" fill="#9CA3AF" />
        <rect x="18" y="34" width="28" height="22" rx="2" fill="#B0B8C1" />
        <rect x="20" y="10" width="24" height="20" rx="1" fill="#E5E7EB" />
        <circle cx="40" cy="14" r="2" fill="#6B7280" />
        <rect x="38" y="34" width="6" height="1.5" rx="0.75" fill="#6B7280" />
        <path d="M22 38 h20" stroke="#9CA3AF" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M22 42 h20" stroke="#9CA3AF" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  };
  return <>{icons[id] || null}</>;
}

export default function CategorySection() {
  return (
    <section className="section-white py-10 px-4" aria-label="Shop by category">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-[22px] font-black text-[#111111]">Shop by Category</h2>
          <Link
            href="/products"
            className="flex items-center gap-1 text-[#CC0000] text-sm font-semibold hover:text-[#AA0000] transition-colors"
          >
            Explore all categories <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Category cards grid */}
        <div className="grid grid-cols-4 sm:grid-cols-4 lg:grid-cols-8 gap-3">
          {CATEGORIES.map((cat) => (
            <Link key={cat.id} href={cat.href} className="cat-card flex flex-col items-center">
              {/* Icon container */}
              <div
                className="w-full aspect-square rounded-lg flex items-center justify-center mb-2.5"
                style={{ background: cat.bgColor, maxWidth: 90, margin: "0 auto 10px" }}
              >
                <CategoryIcon id={cat.id} />
              </div>
              <span className="text-[#111111] text-[12px] font-semibold text-center leading-tight">
                {cat.name}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
