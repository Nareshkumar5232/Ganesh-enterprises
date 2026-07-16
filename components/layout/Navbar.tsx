"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Search, ShoppingCart, Heart, User, Menu, X, ChevronDown, Phone } from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import { formatCurrency } from "@/lib/utils";
import { apiClient } from "@/services/api";

/* ── Shield Logo SVG ── */
function ShieldLogo({ size = 40, className }: { size?: number; className?: string }) {
  return (
    <svg viewBox="0 0 80 80" width={size} height={size} className={className} aria-hidden>
      {/* Laurel left */}
      <g fill="#D4AF37" opacity="0.85">
        <ellipse cx="9" cy="40" rx="2.5" ry="5" transform="rotate(-25 9 40)" />
        <ellipse cx="12" cy="31" rx="2.5" ry="5" transform="rotate(-12 12 31)" />
        <ellipse cx="9"  cy="22" rx="2.5" ry="5" transform="rotate(8  9  22)" />
        <ellipse cx="12" cy="49" rx="2.5" ry="5" transform="rotate(-35 12 49)" />
        <ellipse cx="10" cy="57" rx="2.5" ry="5" transform="rotate(-45 10 57)" />
      </g>
      <path d="M16 18 Q10 40 16 62" stroke="#D4AF37" strokeWidth="1.5" fill="none" opacity="0.7" />
      {/* Laurel right */}
      <g fill="#D4AF37" opacity="0.85">
        <ellipse cx="71" cy="40" rx="2.5" ry="5" transform="rotate(25 71 40)" />
        <ellipse cx="68" cy="31" rx="2.5" ry="5" transform="rotate(12 68 31)" />
        <ellipse cx="71" cy="22" rx="2.5" ry="5" transform="rotate(-8 71 22)" />
        <ellipse cx="68" cy="49" rx="2.5" ry="5" transform="rotate(35 68 49)" />
        <ellipse cx="70" cy="57" rx="2.5" ry="5" transform="rotate(45 70 57)" />
      </g>
      <path d="M64 18 Q70 40 64 62" stroke="#D4AF37" strokeWidth="1.5" fill="none" opacity="0.7" />
      {/* Shield */}
      <path d="M40 7 L62 17 L62 43 C62 57 40 69 40 69 C40 69 18 57 18 43 L18 17 Z" fill="#B91C1C" />
      <path d="M40 11 L58 20 L58 43 C58 54 40 65 40 65" stroke="rgba(255,255,255,0.12)" strokeWidth="2" fill="none" />
      {/* M */}
      <text x="40" y="47" textAnchor="middle" fill="#FFFFFF" fontSize="25" fontWeight="900" fontFamily="Georgia,serif" letterSpacing="-1">M</text>
    </svg>
  );
}

const CATEGORIES_MENU = [
  { label: "Mobile Accessories",   href: "/products?category=mobile-accessories" },
  { label: "Computer Accessories", href: "/products?category=computer-accessories" },
  { label: "Electronics & TVs",    href: "/products?category=electronics" },
  { label: "Smart Devices & CCTV", href: "/products?category=smart-devices" },
  { label: "Technology Solutions", href: "/products?category=electrical-appliances" },
];

export default function Navbar() {
  const pathname = usePathname();
  const router   = useRouter();
  const totalItems = useCartStore((s) => s.totalItems());

  const [scrolled,      setScrolled]      = useState(false);
  const [mobileOpen,    setMobileOpen]    = useState(false);
  const [searchQuery,   setSearchQuery]   = useState("");
  const [catsOpen,      setCatsOpen]      = useState(false);
  const [allProducts,   setAllProducts]   = useState<any[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  useEffect(() => {
    apiClient.get("/product?limit=1000")
      .then((res) => res.data)
      .then((data) => {
        if (data && data.products) {
          setAllProducts(data.products);
        }
      })
      .catch((err) => console.error("Suggestions fetch error:", err));
  }, []);

  const suggestions = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return [];
    return allProducts.filter((product) => {
      return (
        product.name.toLowerCase().includes(q) ||
        product.brand.toLowerCase().includes(q) ||
        product.category.replace("-", " ").toLowerCase().includes(q) ||
        (product.tags && product.tags.some((t: string) => t.toLowerCase().includes(q)))
      );
    }).slice(0, 5);
  }, [searchQuery, allProducts]);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 2);
    fn(); window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    const q = searchQuery.trim();
    if (q) { router.push(`/products?q=${encodeURIComponent(q)}`); setSearchQuery(""); }
  }

  function closeAll() { setCatsOpen(false); }

  const isHome = pathname === "/";

  return (
    <header
      className={[
        "fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 border-b",
        scrolled
          ? "bg-[#0F172A]/95 backdrop-blur-md shadow-[0_4px_24px_rgba(0,0,0,0.25)] border-[#1E293B]/60"
          : "bg-[#0F172A] border-[#1E293B]",
      ].join(" ")}
      onMouseLeave={closeAll}
    >
      <div className="max-w-7xl mx-auto px-2 lg:px-4">
        <div className="flex items-center h-16 gap-4 justify-between">

          {/* ── Logo ── */}
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <ShieldLogo size={36} className="sm:w-[44px] sm:h-[44px]" />
            <div className="flex flex-col leading-tight">
              <span className="font-bold text-white text-[15px] sm:text-[18px] tracking-tight leading-none whitespace-nowrap">
                Sri Ganesh Enterprises
              </span>
              <span className="hidden xl:inline text-[#D4AF37] text-[12px] font-medium mt-0.5 leading-none">
                Wholesale: TV, Laptop, Mobiles &amp; Home Appliances
              </span>
            </div>
          </Link>

          {/* ── Desktop nav ── */}
          <nav className="hidden lg:flex items-center flex-nowrap flex-1 justify-center gap-2 xl:gap-3.5" aria-label="Main">

            <Link href="/"
              className={`relative px-2.5 py-1.5 text-[13.5px] font-semibold font-outfit whitespace-nowrap transition-colors ${isHome ? "text-[#D4AF37]" : "text-slate-300 hover:text-[#D4AF37]"}`}>
              Home
              {isHome && <span className="absolute bottom-0 left-2.5 right-2.5 h-0.5 bg-[#D4AF37] rounded-full" />}
            </Link>

            {/* Products direct link */}
            <Link href="/products"
              className={`relative px-2.5 py-1.5 text-[13.5px] font-semibold font-outfit whitespace-nowrap transition-colors ${pathname === "/products" ? "text-[#D4AF37]" : "text-slate-300 hover:text-[#D4AF37]"}`}>
              Products
              {pathname === "/products" && <span className="absolute bottom-0 left-2.5 right-2.5 h-0.5 bg-[#D4AF37] rounded-full" />}
            </Link>

            {/* Brands Section Link */}
            <Link href="/#brands"
              className="px-2.5 py-1.5 text-[13.5px] font-semibold font-outfit whitespace-nowrap text-slate-300 hover:text-[#D4AF37] transition-colors">
              Brands
            </Link>

            {/* Categories */}
            <div className="relative" onMouseEnter={() => { setCatsOpen(true); }}>
              <button className="flex items-center gap-1 px-2.5 py-1.5 text-[13.5px] font-semibold font-outfit whitespace-nowrap text-slate-300 hover:text-[#D4AF37] transition-colors">
                Categories <ChevronDown className={`w-3.5 h-3.5 transition-transform ${catsOpen ? "rotate-180 text-[#D4AF37]" : ""}`} />
              </button>
              {catsOpen && (
                <div className="nav-dropdown bg-[#1E293B] border border-[#2D3748] shadow-2xl rounded-lg">
                  {CATEGORIES_MENU.map((d) => (
                    <Link
                      key={d.href}
                      href={d.href}
                      onClick={closeAll}
                      className="block px-4 py-2.5 text-[13px] font-semibold font-outfit text-slate-300 hover:bg-[#2D3748] hover:text-[#D4AF37] transition-colors"
                    >
                      {d.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link href="/about"
              className={`relative px-2.5 py-1.5 text-[13.5px] font-semibold font-outfit whitespace-nowrap transition-colors ${pathname === "/about" ? "text-[#D4AF37]" : "text-slate-300 hover:text-[#D4AF37]"}`}>
              About Us
              {pathname === "/about" && <span className="absolute bottom-0 left-2.5 right-2.5 h-0.5 bg-[#D4AF37] rounded-full" />}
            </Link>

            <Link href="/contact"
              className={`relative px-2.5 py-1.5 text-[13.5px] font-semibold font-outfit whitespace-nowrap transition-colors ${pathname === "/contact" ? "text-[#D4AF37]" : "text-slate-300 hover:text-[#D4AF37]"}`}>
              Contact Us
              {pathname === "/contact" && <span className="absolute bottom-0 left-2.5 right-2.5 h-0.5 bg-[#D4AF37] rounded-full" />}
            </Link>
          </nav>

          {/* ── Right side ── */}
          <div className="flex items-center gap-2 ml-auto shrink-0">
            {/* Search */}
            <div className="relative">
              <form onSubmit={handleSearch} className="hidden xl:flex items-center border border-[#1E293B] rounded-lg px-3 py-1.5 gap-2 focus-within:border-[#D4AF37] bg-[#1E293B]/50 transition-colors">
                <Search className="w-3.5 h-3.5 text-slate-400" />
                <input
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setShowSuggestions(true);
                  }}
                  onFocus={() => setShowSuggestions(true)}
                  placeholder="Search…"
                  className="bg-transparent text-[13px] text-white placeholder-slate-400 outline-none w-28 focus:w-36 transition-all duration-200"
                />
              </form>

              {showSuggestions && suggestions.length > 0 && (
                <div
                  className="absolute top-full right-0 left-0 mt-1 bg-[#1E293B] border border-[#2D3748] rounded-lg shadow-2xl overflow-hidden z-[100] min-w-[240px]"
                  onMouseLeave={() => setShowSuggestions(false)}
                >
                  <div className="p-2 text-[10px] font-bold text-slate-400 border-b border-[#2D3748] uppercase tracking-wider">
                    Suggestions
                  </div>
                  <div className="divide-y divide-[#2D3748]">
                    {suggestions.map((p) => {
                      const productSlug = p.slug || p._id || p.id;
                      return (
                        <Link
                          key={p._id || p.id}
                          href={`/products/${productSlug}`}
                          onClick={() => {
                            setShowSuggestions(false);
                            setSearchQuery("");
                          }}
                          className="flex items-center gap-3 p-2.5 hover:bg-[#2D3748] transition-colors text-left"
                        >
                          <div className="w-8 h-8 bg-slate-800 rounded overflow-hidden shrink-0 relative">
                            <img
                              src={p.images?.[0]?.url || "/images/placeholder-product.svg"}
                              alt={p.name}
                              className="object-cover w-full h-full"
                            />
                          </div>
                          <div className="flex-1 min-w-0 font-sans">
                            <p className="text-xs font-semibold text-white truncate">{p.name}</p>
                            <p className="text-[10px] text-slate-400">{p.brand} · {formatCurrency(p.price)}</p>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Icon buttons */}
            <Link href="/login"   aria-label="Account"  className="hidden 2xl:flex p-2 text-slate-400 hover:text-[#D4AF37] rounded-lg hover:bg-slate-800/50 transition-colors"><User className="w-5 h-5" /></Link>
            <Link href="/wishlist" aria-label="Wishlist" className="hidden 2xl:flex p-2 text-slate-400 hover:text-[#D4AF37] rounded-lg hover:bg-slate-800/50 transition-colors"><Heart className="w-5 h-5" /></Link>
            <Link href="/cart" aria-label={`Cart (${totalItems})`} className="relative p-2 text-slate-400 hover:text-[#D4AF37] rounded-lg hover:bg-slate-800/50 transition-colors">
              <ShoppingCart className="w-5 h-5" />
              <span className="absolute -top-0.5 -right-0.5 min-w-[17px] h-[17px] flex items-center justify-center rounded-full bg-[#B91C1C] text-white text-[9px] font-bold px-1">
                {totalItems > 99 ? "99+" : totalItems}
              </span>
            </Link>

            {/* Hamburger */}
            <button onClick={() => setMobileOpen(true)} aria-label="Open menu"
              className="lg:hidden p-2 text-slate-300 hover:text-[#D4AF37]">
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* ── Mobile drawer ── */}
      {mobileOpen && (
        <div className="fixed inset-0 z-[60] bg-[#0F172A] flex flex-col overflow-y-auto">
          <div className="flex items-center justify-between px-4 h-16 border-b border-[#1E293B]">
            <Link href="/" onClick={() => setMobileOpen(false)} className="flex items-center gap-2">
              <ShieldLogo size={36} />
              <span className="font-bold text-white text-sm">Sri Ganesh Enterprises</span>
            </Link>
            <button onClick={() => setMobileOpen(false)} aria-label="Close"><X className="w-5 h-5 text-slate-300" /></button>
          </div>
          <nav className="flex-1 px-4 py-4 flex flex-col gap-0.5">
            {[
              { label: "Home",       href: "/" },
              { label: "Products",   href: "/products" },
              { label: "Brands",     href: "/#brands" },
              { label: "Categories", href: "/products" },
              { label: "About Us",   href: "/about" },
              { label: "Contact Us", href: "/contact" },
              { label: "Cart",       href: "/cart" },
              { label: "Wishlist",   href: "/wishlist" },
              { label: "Login/Profile", href: "/login" },
            ].map((n) => (
              <Link key={n.label} href={n.href} onClick={() => setMobileOpen(false)}
                className="px-3 py-3 rounded-lg text-sm font-semibold text-slate-300 hover:text-[#D4AF37] hover:bg-slate-800/50 transition-colors">
                {n.label}
              </Link>
            ))}
          </nav>
          <div className="px-4 py-4 border-t border-[#1E293B] space-y-2">
            <a href="tel:+919150310876" className="flex items-center justify-center gap-2 py-2.5 border border-[#1E293B] rounded-lg text-sm font-semibold text-slate-200">
              <Phone className="w-4 h-4 text-[#D4AF37]" /> 9150310876
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
