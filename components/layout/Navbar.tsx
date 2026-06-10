"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Search, ShoppingCart, Heart, User, Menu, X, ChevronDown, Phone, Store,
  Shield, Tag, Truck
} from "lucide-react";
import { useCartStore } from "@/store/cartStore";

/* Logo — red shield with M + laurel wreath */
function BrandLogo() {
  return (
    <svg viewBox="0 0 80 80" className="w-14 h-14 shrink-0" aria-hidden>
      {/* Outer laurel left */}
      <g fill="#B8860B" opacity="0.9">
        <ellipse cx="10" cy="38" rx="3" ry="5" transform="rotate(-20 10 38)" />
        <ellipse cx="14" cy="30" rx="3" ry="5" transform="rotate(-10 14 30)" />
        <ellipse cx="10" cy="22" rx="3" ry="5" transform="rotate(10 10 22)" />
        <ellipse cx="14" cy="46" rx="3" ry="5" transform="rotate(-30 14 46)" />
        <ellipse cx="11" cy="54" rx="3" ry="5" transform="rotate(-40 11 54)" />
      </g>
      {/* Stem left */}
      <path d="M17 20 Q12 40 17 60" stroke="#B8860B" strokeWidth="1.5" fill="none" />
      {/* Outer laurel right */}
      <g fill="#B8860B" opacity="0.9">
        <ellipse cx="70" cy="38" rx="3" ry="5" transform="rotate(20 70 38)" />
        <ellipse cx="66" cy="30" rx="3" ry="5" transform="rotate(10 66 30)" />
        <ellipse cx="70" cy="22" rx="3" ry="5" transform="rotate(-10 70 22)" />
        <ellipse cx="66" cy="46" rx="3" ry="5" transform="rotate(30 66 46)" />
        <ellipse cx="69" cy="54" rx="3" ry="5" transform="rotate(40 69 54)" />
      </g>
      {/* Stem right */}
      <path d="M63 20 Q68 40 63 60" stroke="#B8860B" strokeWidth="1.5" fill="none" />
      {/* Shield body */}
      <path
        d="M40 8 L60 16 L60 42 C60 56 40 68 40 68 C40 68 20 56 20 42 L20 16 Z"
        fill="#CC0000"
      />
      {/* Shield highlight */}
      <path
        d="M40 12 L56 19 L56 42 C56 53 40 63 40 63"
        fill="none"
        stroke="rgba(255,255,255,0.15)"
        strokeWidth="2"
      />
      {/* M letter */}
      <text
        x="40"
        y="46"
        textAnchor="middle"
        fill="#FFFFFF"
        fontSize="26"
        fontWeight="900"
        fontFamily="Georgia, serif"
        letterSpacing="-1"
      >
        M
      </text>
    </svg>
  );
}

const PRODUCTS_DROPDOWN = [
  { label: "Televisions", href: "/products?category=tv" },
  { label: "Laptops & Desktops", href: "/products?category=computers" },
  { label: "Smartphones", href: "/products?category=mobile" },
  { label: "Printers & Scanners", href: "/products?category=printers" },
  { label: "Networking Equipment", href: "/products?category=networking" },
  { label: "CCTV & Security", href: "/products?category=security" },
  { label: "Home Appliances", href: "/products?category=appliances" },
  { label: "Computer Accessories", href: "/products?category=accessories" },
];

const CATEGORIES_DROPDOWN = [
  { label: "TV Zone", href: "/products?category=tv" },
  { label: "Computer Zone", href: "/products?category=computers" },
  { label: "Mobile Zone", href: "/products?category=mobile" },
  { label: "Security Zone", href: "/products?category=security" },
  { label: "Home Appliance Zone", href: "/products?category=appliances" },
];

const TOP_BAR_ITEMS = [
  { icon: Store,  text: "Wholesale Electronics Distributor" },
  { icon: Shield, text: "Genuine Products" },
  { icon: Tag,    text: "Best Wholesale Prices" },
  { icon: Truck,  text: "Fast Delivery Across Chennai" },
];

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const totalItems = useCartStore((s) => s.totalItems());

  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [productsOpen, setProductsOpen] = useState(false);
  const [categoriesOpen, setCategoriesOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 2);
    fn();
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    const q = searchQuery.trim();
    if (q) { router.push(`/products?q=${encodeURIComponent(q)}`); setSearchQuery(""); }
  }

  function closeAll() {
    setProductsOpen(false);
    setCategoriesOpen(false);
  }

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href.split("?")[0]);

  return (
    <>
      {/* ── Top utility bar ── */}
      <div className="bg-white border-b border-[#E5E7EB] hidden lg:block">
        <div className="max-w-7xl mx-auto px-6 h-10 flex items-center justify-between">
          {/* Left — feature tags */}
          <div className="flex items-center gap-0">
            {TOP_BAR_ITEMS.map((item, i) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.text}
                  className="flex items-center gap-1.5 text-[#374151] text-[11.5px] font-medium"
                >
                  {i > 0 && <span className="mx-3 text-[#D1D5DB] text-base leading-none">|</span>}
                  <Icon className="w-3.5 h-3.5 text-[#6B7280]" />
                  <span>{item.text}</span>
                </div>
              );
            })}
          </div>
          {/* Right — owner + phone */}
          <div className="flex items-center gap-4 text-[11.5px]">
            <span className="font-bold text-[#CC0000]">K. Ganesh Rao</span>
            <div className="flex items-center gap-1.5 text-[#374151] font-medium">
              <Phone className="w-3 h-3 text-[#6B7280]" />
              <span>9150310876</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Main navbar ── */}
      <header
        className={[
          "sticky top-0 z-50 w-full bg-white transition-all duration-200",
          scrolled
            ? "shadow-[0_2px_12px_rgba(0,0,0,0.08)] border-b border-[#E5E7EB]"
            : "border-b border-[#E5E7EB]",
        ].join(" ")}
        onMouseLeave={closeAll}
      >
        <div className="max-w-7xl mx-auto px-4 lg:px-6">
          <div className="flex items-center gap-4 h-[72px]">

            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 shrink-0">
              <BrandLogo />
              <div className="flex flex-col leading-tight">
                <span className="font-black text-[#111111] text-[17px] tracking-tight leading-none">
                  Sri Ganesh Enterprises
                </span>
                <span className="text-[#6B7280] text-[10.5px] font-medium mt-0.5 leading-none">
                  Wholesale: TV, Laptop, Mobiles &amp; Home Appliances
                </span>
              </div>
            </Link>

            {/* Desktop nav */}
            <nav className="hidden lg:flex items-center gap-0 ml-2 flex-1" aria-label="Main">

              {/* Home */}
              <Link
                href="/"
                className={[
                  "px-4 py-2 text-sm font-semibold relative transition-colors",
                  isActive("/") ? "text-[#CC0000]" : "text-[#374151] hover:text-[#CC0000]",
                ].join(" ")}
              >
                Home
                {isActive("/") && (
                  <span className="absolute bottom-0 left-4 right-4 h-0.5 bg-[#CC0000] rounded-full" />
                )}
              </Link>

              {/* Products dropdown */}
              <div
                className="relative"
                onMouseEnter={() => { setProductsOpen(true); setCategoriesOpen(false); }}
              >
                <button
                  className="flex items-center gap-1 px-4 py-2 text-sm font-semibold text-[#374151] hover:text-[#CC0000] transition-colors"
                >
                  Products <ChevronDown className={`w-3.5 h-3.5 transition-transform ${productsOpen ? "rotate-180 text-[#CC0000]" : ""}`} />
                </button>
                {productsOpen && (
                  <div className="nav-dropdown">
                    {PRODUCTS_DROPDOWN.map((d) => (
                      <Link key={d.href} href={d.href} onClick={closeAll}>{d.label}</Link>
                    ))}
                  </div>
                )}
              </div>

              {/* Brands */}
              <Link
                href="/products"
                className="px-4 py-2 text-sm font-semibold text-[#374151] hover:text-[#CC0000] transition-colors"
              >
                Brands
              </Link>

              {/* Categories dropdown */}
              <div
                className="relative"
                onMouseEnter={() => { setCategoriesOpen(true); setProductsOpen(false); }}
              >
                <button
                  className="flex items-center gap-1 px-4 py-2 text-sm font-semibold text-[#374151] hover:text-[#CC0000] transition-colors"
                >
                  Categories <ChevronDown className={`w-3.5 h-3.5 transition-transform ${categoriesOpen ? "rotate-180 text-[#CC0000]" : ""}`} />
                </button>
                {categoriesOpen && (
                  <div className="nav-dropdown">
                    {CATEGORIES_DROPDOWN.map((d) => (
                      <Link key={d.href} href={d.href} onClick={closeAll}>{d.label}</Link>
                    ))}
                  </div>
                )}
              </div>

              {/* About Us */}
              <Link
                href="/about"
                className="px-4 py-2 text-sm font-semibold text-[#374151] hover:text-[#CC0000] transition-colors"
              >
                About Us
              </Link>

              {/* Contact Us */}
              <Link
                href="/contact"
                className="px-4 py-2 text-sm font-semibold text-[#374151] hover:text-[#CC0000] transition-colors"
              >
                Contact Us
              </Link>
            </nav>

            {/* Right icons */}
            <div className="flex items-center gap-1 ml-auto">
              {/* Search */}
              <form onSubmit={handleSearch} className="hidden lg:flex items-center border border-[#E5E7EB] rounded-md px-3 py-1.5 gap-2 focus-within:border-[#CC0000] transition-colors">
                <Search className="w-4 h-4 text-[#9CA3AF]" />
                <input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search products…"
                  className="bg-transparent text-sm text-[#111111] placeholder-[#9CA3AF] outline-none w-32 focus:w-44 transition-all duration-300"
                />
              </form>

              {/* User */}
              <Link href="/login" className="p-2 text-[#6B7280] hover:text-[#CC0000] transition-colors rounded-md hover:bg-red-50" aria-label="Account">
                <User className="w-5 h-5" />
              </Link>

              {/* Wishlist */}
              <Link href="/wishlist" className="relative p-2 text-[#6B7280] hover:text-[#CC0000] transition-colors rounded-md hover:bg-red-50" aria-label="Wishlist">
                <Heart className="w-5 h-5" />
              </Link>

              {/* Cart */}
              <Link href="/cart" className="relative p-2 text-[#6B7280] hover:text-[#CC0000] transition-colors rounded-md hover:bg-red-50" aria-label={`Cart (${totalItems})`}>
                <ShoppingCart className="w-5 h-5" />
                <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] flex items-center justify-center rounded-full bg-[#CC0000] text-white text-[9px] font-bold px-1">
                  {totalItems > 99 ? "99+" : totalItems}
                </span>
              </Link>

              {/* CTA */}
              <Link
                href="/contact"
                className="hidden lg:inline-flex btn-primary ml-2"
              >
                Get Wholesale Quote
              </Link>

              {/* Hamburger */}
              <button
                onClick={() => setMobileOpen(true)}
                aria-label="Open menu"
                className="lg:hidden p-2 text-[#374151]"
              >
                <Menu className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* ── Mobile drawer ── */}
      {mobileOpen && (
        <div className="fixed inset-0 z-[60] bg-white flex flex-col">
          <div className="flex items-center justify-between px-4 h-16 border-b border-[#E5E7EB]">
            <Link href="/" onClick={() => setMobileOpen(false)} className="flex items-center gap-2">
              <BrandLogo />
              <span className="font-black text-[#111111] text-sm">Sri Ganesh Enterprises</span>
            </Link>
            <button onClick={() => setMobileOpen(false)} aria-label="Close">
              <X className="w-5 h-5 text-[#374151]" />
            </button>
          </div>
          <nav className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-1">
            {[
              { label: "Home", href: "/" },
              { label: "Products", href: "/products" },
              { label: "Brands", href: "/products" },
              { label: "About Us", href: "/about" },
              { label: "Contact Us", href: "/contact" },
            ].map((n) => (
              <Link key={n.label} href={n.href} onClick={() => setMobileOpen(false)}
                className="px-3 py-3 rounded text-sm font-semibold text-[#374151] hover:text-[#CC0000] hover:bg-red-50 transition-colors">
                {n.label}
              </Link>
            ))}
          </nav>
          <div className="px-4 py-4 border-t border-[#E5E7EB]">
            <Link href="/contact" onClick={() => setMobileOpen(false)}
              className="flex items-center justify-center w-full btn-primary py-3 text-base">
              Get Wholesale Quote
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
