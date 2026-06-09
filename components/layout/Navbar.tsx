"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import {
  Menu, X, Search, ShoppingCart, Phone, Sun, Moon,
  ChevronDown, Zap
} from "lucide-react";
import { useCartStore } from "@/store/cartStore";

const NAV = [
  { label: "Home",     href: "/" },
  { label: "Products", href: "/products" },
  { label: "About",    href: "/about" },
  { label: "Contact",  href: "/contact" },
];

export default function Navbar() {
  const pathname   = usePathname();
  const router     = useRouter();
  const { theme, setTheme } = useTheme();
  const totalItems = useCartStore((s) => s.totalItems());

  const [scrolled,    setScrolled]    = useState(false);
  const [mobileOpen,  setMobileOpen]  = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [userOpen,    setUserOpen]    = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 4);
    fn();
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    const q = searchQuery.trim();
    if (q) { router.push(`/products?q=${encodeURIComponent(q)}`); setSearchQuery(""); }
  }

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <>
      {/* ── Top utility bar ── */}
      <div className="hidden lg:block bg-[#0F172A] text-slate-300 text-xs">
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-9">
          <span className="flex items-center gap-1.5">
            <Phone className="w-3 h-3" />
            +91 9342698344 &nbsp;|&nbsp; +91 9342798344 &nbsp;|&nbsp; 044-3154 4571
          </span>
          <span>Wholesale Electronics Distributor · Chennai, Tamil Nadu</span>
        </div>
      </div>

      {/* ── Main navbar ── */}
      <header
        className={[
          "sticky top-0 z-50 w-full transition-all duration-200",
          scrolled
            ? "bg-white/95 backdrop-blur-md border-b border-[#E2E8F0] shadow-sm"
            : "bg-white border-b border-[#E2E8F0]",
          "dark:bg-[#0F172A]/95 dark:border-[#1E293B]",
        ].join(" ")}
      >
        <div className="max-w-7xl mx-auto px-4 lg:px-6">
          <div className="flex items-center justify-between h-16 gap-4">

            {/* Logo */}
            <Link href="/" className="flex items-center gap-2.5 shrink-0">
              <div className="w-8 h-8 rounded bg-[#2563EB] flex items-center justify-center">
                <Zap className="w-4 h-4 text-white" />
              </div>
              <div className="flex flex-col leading-none">
                <span className="font-bold text-[#0F172A] dark:text-white text-[15px] tracking-tight">
                  Sri Ganesh Enterprises
                </span>
                <span className="text-[#64748B] text-[10px] tracking-widest uppercase font-medium">
                  Enterprises Pvt Ltd
                </span>
              </div>
            </Link>

            {/* Desktop nav */}
            <nav className="hidden md:flex items-center gap-1" aria-label="Main">
              {NAV.map((n) => (
                <Link
                  key={n.href}
                  href={n.href}
                  className={[
                    "px-3.5 py-2 rounded-md text-sm font-medium transition-colors duration-150",
                    isActive(n.href)
                      ? "text-[#2563EB] bg-blue-50 dark:bg-blue-950"
                      : "text-[#374151] dark:text-slate-300 hover:text-[#0F172A] hover:bg-slate-50 dark:hover:bg-slate-800",
                  ].join(" ")}
                >
                  {n.label}
                </Link>
              ))}
            </nav>

            {/* Right actions */}
            <div className="flex items-center gap-1.5">
              {/* Search */}
              <form onSubmit={handleSearch} className="hidden lg:flex items-center bg-[#F8FAFC] border border-[#E2E8F0] rounded-md px-3 py-1.5 gap-2">
                <Search className="w-3.5 h-3.5 text-[#64748B]" />
                <input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search products…"
                  className="bg-transparent text-sm text-[#111827] placeholder-[#94A3B8] outline-none w-40 focus:w-52 transition-all duration-300"
                />
              </form>

              {/* Cart */}
              <Link href="/cart" aria-label={`Cart (${totalItems})`}
                className="relative p-2 text-[#374151] dark:text-slate-300 hover:text-[#2563EB] transition-colors rounded-md hover:bg-slate-50 dark:hover:bg-slate-800">
                <ShoppingCart className="w-5 h-5" />
                {totalItems > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] flex items-center justify-center rounded-full bg-[#2563EB] text-white text-[9px] font-bold px-1">
                    {totalItems > 99 ? "99+" : totalItems}
                  </span>
                )}
              </Link>

              {/* User */}
              <div className="relative hidden md:block">
                <button
                  onClick={() => setUserOpen((p) => !p)}
                  className="flex items-center gap-1 px-3 py-1.5 text-sm font-medium text-[#374151] dark:text-slate-300 border border-[#E2E8F0] dark:border-slate-700 rounded-md hover:border-[#CBD5E1] transition-colors"
                >
                  Account <ChevronDown className="w-3.5 h-3.5" />
                </button>
                {userOpen && (
                  <div className="absolute right-0 top-full mt-1.5 w-44 bg-white dark:bg-[#1E293B] border border-[#E2E8F0] dark:border-slate-700 rounded-lg shadow-lg py-1 z-50">
                    {[["Login", "/login"], ["Register", "/register"]].map(([l, h]) => (
                      <Link key={h} href={h} onClick={() => setUserOpen(false)}
                        className="block px-4 py-2.5 text-sm text-[#374151] dark:text-slate-300 hover:bg-[#F8FAFC] dark:hover:bg-slate-800 hover:text-[#2563EB] transition-colors">
                        {l}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* Theme */}
              <button onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                aria-label="Toggle theme"
                className="p-2 rounded-md text-[#64748B] hover:text-[#0F172A] dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </button>

              {/* Get Quote CTA */}
              <Link href="/contact"
                className="hidden lg:inline-flex items-center gap-1.5 px-4 py-2 bg-[#2563EB] text-white text-sm font-semibold rounded-md hover:bg-[#1D4ED8] transition-colors shadow-sm">
                Get Quote
              </Link>

              {/* Hamburger */}
              <button onClick={() => setMobileOpen(true)} aria-label="Open menu"
                className="md:hidden p-2 text-[#374151] hover:text-[#0F172A] transition-colors">
                <Menu className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* ── Mobile drawer ── */}
      {mobileOpen && (
        <div className="fixed inset-0 z-[60] bg-white dark:bg-[#0F172A] flex flex-col">
          <div className="flex items-center justify-between px-4 h-16 border-b border-[#E2E8F0] dark:border-slate-800">
            <Link href="/" onClick={() => setMobileOpen(false)} className="flex items-center gap-2">
              <div className="w-7 h-7 rounded bg-[#2563EB] flex items-center justify-center">
                <Zap className="w-3.5 h-3.5 text-white" />
              </div>
              <span className="font-bold text-[#0F172A] dark:text-white text-sm tracking-tight">Sri Ganesh Enterprises</span>
            </Link>
            <button onClick={() => setMobileOpen(false)} aria-label="Close">
              <X className="w-5 h-5 text-[#374151]" />
            </button>
          </div>
          <nav className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-1">
            {NAV.map((n) => (
              <Link key={n.href} href={n.href} onClick={() => setMobileOpen(false)}
                className={["px-4 py-3 rounded-md text-sm font-medium transition-colors",
                  isActive(n.href)
                    ? "bg-blue-50 text-[#2563EB] dark:bg-blue-950"
                    : "text-[#374151] dark:text-slate-300 hover:bg-[#F8FAFC] dark:hover:bg-slate-800",
                ].join(" ")}>
                {n.label}
              </Link>
            ))}
            <div className="border-t border-[#E2E8F0] dark:border-slate-800 my-3" />
            {[["Login", "/login"], ["Register", "/register"]].map(([l, h]) => (
              <Link key={h} href={h} onClick={() => setMobileOpen(false)}
                className="px-4 py-3 rounded-md text-sm font-medium text-[#374151] dark:text-slate-300 hover:bg-[#F8FAFC] dark:hover:bg-slate-800 transition-colors">
                {l}
              </Link>
            ))}
          </nav>
          <div className="px-4 py-4 border-t border-[#E2E8F0] dark:border-slate-800">
            <Link href="/contact" onClick={() => setMobileOpen(false)}
              className="flex items-center justify-center w-full py-3 bg-[#2563EB] text-white text-sm font-semibold rounded-md hover:bg-[#1D4ED8] transition-colors">
              Get a Quote
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
