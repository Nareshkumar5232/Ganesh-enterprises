"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Search, ShoppingCart, Heart, User, Menu, X, ChevronDown, Phone } from "lucide-react";
import { useCartStore } from "@/store/cartStore";

/* ── Shield Logo SVG ── */
function ShieldLogo({ size = 40 }: { size?: number }) {
  return (
    <svg viewBox="0 0 80 80" width={size} height={size} aria-hidden>
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

const PRODUCTS_MENU = [
  { label: "Televisions",          href: "/products?category=tv" },
  { label: "Laptops & Desktops",   href: "/products?category=computers" },
  { label: "Smartphones",          href: "/products?category=mobile" },
  { label: "Printers",             href: "/products?category=printers" },
  { label: "Networking Equipment", href: "/products?category=networking" },
  { label: "CCTV & Security",      href: "/products?category=security" },
  { label: "Home Appliances",      href: "/products?category=appliances" },
  { label: "Computer Accessories", href: "/products?category=accessories" },
];

const CATEGORIES_MENU = [
  { label: "TV Zone",              href: "/products?category=tv" },
  { label: "Computer Zone",        href: "/products?category=computers" },
  { label: "Mobile Zone",          href: "/products?category=mobile" },
  { label: "Security Zone",        href: "/products?category=security" },
  { label: "Home Appliance Zone",  href: "/products?category=appliances" },
];

export default function Navbar() {
  const pathname = usePathname();
  const router   = useRouter();
  const totalItems = useCartStore((s) => s.totalItems());

  const [scrolled,      setScrolled]      = useState(false);
  const [mobileOpen,    setMobileOpen]    = useState(false);
  const [searchQuery,   setSearchQuery]   = useState("");
  const [productsOpen,  setProductsOpen]  = useState(false);
  const [catsOpen,      setCatsOpen]      = useState(false);

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

  function closeAll() { setProductsOpen(false); setCatsOpen(false); }

  const isHome = pathname === "/";

  return (
    <header
      className={[
        "fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 border-b",
        scrolled
          ? "bg-white/80 backdrop-blur-md shadow-[0_4px_20px_rgba(0,0,0,0.05)] border-[#E5E7EB]/40"
          : "bg-white border-[#E5E7EB]",
      ].join(" ")}
      onMouseLeave={closeAll}
    >
      <div className="max-w-7xl mx-auto px-4 lg:px-6">
        <div className="flex items-center h-16 gap-4">

          {/* ── Logo ── */}
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <ShieldLogo size={44} />
            <div className="flex flex-col leading-tight">
              <span className="font-bold text-[#0F172A] text-[15px] tracking-tight leading-none">
                Sri Ganesh Enterprises
              </span>
              <span className="text-[#6B7280] text-[10px] font-medium mt-0.5 leading-none">
                Wholesale: TV, Laptop, Mobiles &amp; Home Appliances
              </span>
            </div>
          </Link>

          {/* ── Desktop nav ── */}
          <nav className="hidden lg:flex items-center flex-nowrap flex-1 justify-center gap-3 xl:gap-5" aria-label="Main">

            <Link href="/"
              className={`relative px-2.5 py-1.5 text-[13.5px] font-semibold font-outfit whitespace-nowrap transition-colors ${isHome ? "text-[#B91C1C]" : "text-[#374151] hover:text-[#B91C1C]"}`}>
              Home
              {isHome && <span className="absolute bottom-0 left-2.5 right-2.5 h-0.5 bg-[#B91C1C] rounded-full" />}
            </Link>

            {/* Products */}
            <div className="relative" onMouseEnter={() => { setProductsOpen(true); setCatsOpen(false); }}>
              <button className="flex items-center gap-1 px-2.5 py-1.5 text-[13.5px] font-semibold font-outfit whitespace-nowrap text-[#374151] hover:text-[#B91C1C] transition-colors">
                Products <ChevronDown className={`w-3.5 h-3.5 transition-transform ${productsOpen ? "rotate-180 text-[#B91C1C]" : ""}`} />
              </button>
              {productsOpen && (
                <div className="nav-dropdown">
                  {PRODUCTS_MENU.map((d) => <Link key={d.href} href={d.href} onClick={closeAll}>{d.label}</Link>)}
                </div>
              )}
            </div>

            <Link href="/products"
              className="px-2.5 py-1.5 text-[13.5px] font-semibold font-outfit whitespace-nowrap text-[#374151] hover:text-[#B91C1C] transition-colors">
              Brands
            </Link>

            {/* Categories */}
            <div className="relative" onMouseEnter={() => { setCatsOpen(true); setProductsOpen(false); }}>
              <button className="flex items-center gap-1 px-2.5 py-1.5 text-[13.5px] font-semibold font-outfit whitespace-nowrap text-[#374151] hover:text-[#B91C1C] transition-colors">
                Categories <ChevronDown className={`w-3.5 h-3.5 transition-transform ${catsOpen ? "rotate-180 text-[#B91C1C]" : ""}`} />
              </button>
              {catsOpen && (
                <div className="nav-dropdown">
                  {CATEGORIES_MENU.map((d) => <Link key={d.href} href={d.href} onClick={closeAll}>{d.label}</Link>)}
                </div>
              )}
            </div>

            <Link href="/about"
              className="px-2.5 py-1.5 text-[13.5px] font-semibold font-outfit whitespace-nowrap text-[#374151] hover:text-[#B91C1C] transition-colors">
              About Us
            </Link>

            <Link href="/contact"
              className="px-2.5 py-1.5 text-[13.5px] font-semibold font-outfit whitespace-nowrap text-[#374151] hover:text-[#B91C1C] transition-colors">
              Contact Us
            </Link>
          </nav>

          {/* ── Right side ── */}
          <div className="flex items-center gap-2 ml-auto shrink-0">
            {/* Search */}
            <form onSubmit={handleSearch} className="hidden xl:flex items-center border border-[#E5E7EB] rounded-lg px-3 py-1.5 gap-2 focus-within:border-[#B91C1C] bg-white transition-colors">
              <Search className="w-3.5 h-3.5 text-[#9CA3AF]" />
              <input value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search…" className="bg-transparent text-[13px] text-[#0F172A] placeholder-[#9CA3AF] outline-none w-28 focus:w-36 transition-all duration-200" />
            </form>

            {/* Icon buttons */}
            <Link href="/login"   aria-label="Account"  className="hidden xl:flex p-2 text-[#6B7280] hover:text-[#B91C1C] rounded-lg hover:bg-red-50 transition-colors"><User className="w-5 h-5" /></Link>
            <Link href="/wishlist" aria-label="Wishlist" className="hidden xl:flex p-2 text-[#6B7280] hover:text-[#B91C1C] rounded-lg hover:bg-red-50 transition-colors"><Heart className="w-5 h-5" /></Link>
            <Link href="/cart" aria-label={`Cart (${totalItems})`} className="relative p-2 text-[#6B7280] hover:text-[#B91C1C] rounded-lg hover:bg-red-50 transition-colors">
              <ShoppingCart className="w-5 h-5" />
              <span className="absolute -top-0.5 -right-0.5 min-w-[17px] h-[17px] flex items-center justify-center rounded-full bg-[#B91C1C] text-white text-[9px] font-bold px-1">
                {totalItems > 99 ? "99+" : totalItems}
              </span>
            </Link>

            {/* Phone */}
            <a href="tel:+919150310876"
              className="hidden xl:flex items-center gap-1.5 text-[13px] font-semibold font-outfit text-[#0F172A] hover:text-[#B91C1C] transition-colors">
              <Phone className="w-3.5 h-3.5" />
              9150310876
            </a>

            {/* CTA */}
            <Link href="/contact" className="hidden sm:inline-flex btn-red ml-1 text-[13.5px] px-4 py-2 font-outfit whitespace-nowrap">
              Get Wholesale Quote
            </Link>

            {/* Hamburger */}
            <button onClick={() => setMobileOpen(true)} aria-label="Open menu"
              className="lg:hidden p-2 text-[#374151]">
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* ── Mobile drawer ── */}
      {mobileOpen && (
        <div className="fixed inset-0 z-[60] bg-white flex flex-col overflow-y-auto">
          <div className="flex items-center justify-between px-4 h-16 border-b border-[#E5E7EB]">
            <Link href="/" onClick={() => setMobileOpen(false)} className="flex items-center gap-2">
              <ShieldLogo size={36} />
              <span className="font-bold text-[#0F172A] text-sm">Sri Ganesh Enterprises</span>
            </Link>
            <button onClick={() => setMobileOpen(false)} aria-label="Close"><X className="w-5 h-5 text-[#374151]" /></button>
          </div>
          <nav className="flex-1 px-4 py-4 flex flex-col gap-0.5">
            {[
              { label: "Home",       href: "/" },
              { label: "Products",   href: "/products" },
              { label: "Brands",     href: "/products" },
              { label: "Categories", href: "/products" },
              { label: "About Us",   href: "/about" },
              { label: "Contact Us", href: "/contact" },
            ].map((n) => (
              <Link key={n.label} href={n.href} onClick={() => setMobileOpen(false)}
                className="px-3 py-3 rounded-lg text-sm font-semibold text-[#374151] hover:text-[#B91C1C] hover:bg-red-50 transition-colors">
                {n.label}
              </Link>
            ))}
          </nav>
          <div className="px-4 py-4 border-t border-[#E5E7EB] space-y-2">
            <a href="tel:+919150310876" className="flex items-center justify-center gap-2 py-2.5 border border-[#E5E7EB] rounded-lg text-sm font-semibold text-[#0F172A]">
              <Phone className="w-4 h-4" /> 9150310876
            </a>
            <Link href="/contact" onClick={() => setMobileOpen(false)}
              className="flex items-center justify-center w-full btn-red py-3 text-sm">
              Get Wholesale Quote
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
