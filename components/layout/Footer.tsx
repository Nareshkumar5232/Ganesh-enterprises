"use client";

import Link from "next/link";
import { Phone, Mail, MapPin, ArrowRight } from "lucide-react";

function FooterLogo() {
  return (
    <svg viewBox="0 0 80 80" width={52} height={52} aria-hidden>
      <g fill="#D4AF37" opacity="0.8">
        <ellipse cx="9" cy="40" rx="2.5" ry="5" transform="rotate(-25 9 40)" />
        <ellipse cx="12" cy="31" rx="2.5" ry="5" transform="rotate(-12 12 31)" />
        <ellipse cx="9"  cy="22" rx="2.5" ry="5" transform="rotate(8  9  22)" />
        <ellipse cx="12" cy="49" rx="2.5" ry="5" transform="rotate(-35 12 49)" />
      </g>
      <path d="M16 18 Q10 40 16 62" stroke="#D4AF37" strokeWidth="1.5" fill="none" opacity="0.6" />
      <g fill="#D4AF37" opacity="0.8">
        <ellipse cx="71" cy="40" rx="2.5" ry="5" transform="rotate(25 71 40)" />
        <ellipse cx="68" cy="31" rx="2.5" ry="5" transform="rotate(12 68 31)" />
        <ellipse cx="71" cy="22" rx="2.5" ry="5" transform="rotate(-8 71 22)" />
        <ellipse cx="68" cy="49" rx="2.5" ry="5" transform="rotate(35 68 49)" />
      </g>
      <path d="M64 18 Q70 40 64 62" stroke="#D4AF37" strokeWidth="1.5" fill="none" opacity="0.6" />
      <path d="M40 7 L62 17 L62 43 C62 57 40 69 40 69 C40 69 18 57 18 43 L18 17 Z" fill="#B91C1C" />
      <text x="40" y="47" textAnchor="middle" fill="#FFFFFF" fontSize="25" fontWeight="900" fontFamily="Georgia,serif" letterSpacing="-1">M</text>
    </svg>
  );
}

const QUICK_LINKS = [
  { label: "Home",       href: "/" },
  { label: "Products",   href: "/products" },
  { label: "Brands",     href: "/products" },
  { label: "Categories", href: "/products" },
  { label: "About Us",   href: "/about" },
  { label: "Contact Us", href: "/contact" },
];

const CATEGORIES = [
  { label: "Mobile Accessories",   href: "/products?category=mobile-accessories" },
  { label: "Computer Accessories", href: "/products?category=computer-accessories" },
  { label: "Electronics & TVs",    href: "/products?category=electronics" },
  { label: "Smart Devices & CCTV", href: "/products?category=smart-devices" },
  { label: "Technology Solutions", href: "/products?category=electrical-appliances" },
  { label: "Chargers & Adapters",  href: "/products?category=chargers" },
  { label: "Earphones & Audio",    href: "/products?category=earphones" },
];

export default function Footer() {
  return (
    <footer className="bg-[#0F172A] text-[#94A3B8]" aria-label="Footer">

      {/* Top accent line */}
      <div className="h-[3px] bg-gradient-to-r from-[#B91C1C] to-[#D4AF37]" />

      {/* Main grid */}
      <div className="max-w-7xl mx-auto px-4 lg:px-6 py-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10 text-center sm:text-left">

        {/* Col 1 — Brand */}
        <div className="lg:col-span-1 flex flex-col items-center sm:items-start gap-4">
          <div className="flex items-center gap-3">
            <FooterLogo />
            <div className="flex flex-col leading-tight text-left">
              <span className="font-bold text-white text-[15px] tracking-tight">Sri Ganesh Enterprises</span>
              <span className="text-[#D4AF37] text-[10px] font-medium mt-0.5 tracking-wide leading-none">
                Wholesale: TV, Laptop, Mobiles &amp; Home Appliances
              </span>
            </div>
          </div>
          <p className="text-[13px] leading-relaxed">
            No.18/19 Meeran Sahib Street,<br />
            1st Floor, UNO Arcade Complex,<br />
            Shop No F49, Chennai – 600002
          </p>
        </div>

        {/* Col 2 — Quick Links */}
        <div className="flex flex-col items-center sm:items-start">
          <h4 className="text-white text-[13px] font-bold uppercase tracking-widest mb-4 w-full">Quick Links</h4>
          <ul className="space-y-2.5 w-full">
            {QUICK_LINKS.map((l) => (
              <li key={l.label}>
                <Link href={l.href}
                  className="text-[13px] text-[#94A3B8] hover:text-white transition-colors block py-1.5 sm:py-0">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Col 3 — Categories */}
        <div className="flex flex-col items-center sm:items-start">
          <h4 className="text-white text-[13px] font-bold uppercase tracking-widest mb-4 w-full">Categories</h4>
          <ul className="space-y-2.5 w-full">
            {CATEGORIES.map((c) => (
              <li key={c.label}>
                <Link href={c.href}
                  className="text-[13px] text-[#94A3B8] hover:text-white transition-colors block py-1.5 sm:py-0">
                  {c.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Col 4 — Contact Us */}
        <div className="flex flex-col items-center sm:items-start">
          <h4 className="text-white text-[13px] font-bold uppercase tracking-widest mb-4 w-full">Contact Us</h4>
          <ul className="space-y-3.5 w-full flex flex-col items-center sm:items-start">
            <li className="flex items-center gap-2.5 justify-center sm:justify-start py-1 sm:py-0">
              <Phone className="w-4 h-4 text-[#B91C1C] shrink-0" />
              <a href="tel:+919150310876"
                className="text-[13px] text-[#94A3B8] hover:text-white transition-colors">
                9150310876
              </a>
            </li>
            <li className="flex items-center gap-2.5 justify-center sm:justify-start py-1 sm:py-0 w-full max-w-xs">
              <Mail className="w-4 h-4 text-[#B91C1C] shrink-0" />
              <a href="mailto:info@sriganeshenterprises.in"
                className="text-[13px] text-[#94A3B8] hover:text-white transition-colors break-all">
                info@sriganeshenterprises.in
              </a>
            </li>
            <li className="flex items-start gap-2.5 justify-center sm:justify-start py-1 sm:py-0">
              <MapPin className="w-4 h-4 text-[#B91C1C] shrink-0 mt-0.5" />
              <span className="text-[13px] leading-relaxed text-center sm:text-left">
                No.18/19 Meeran Sahib Street,<br />
                1st Floor, UNO Arcade Complex,<br />
                Shop No F49, Chennai – 600002
              </span>
            </li>
          </ul>
        </div>

        {/* Col 5 — Get Wholesale Quote */}
        <div className="flex flex-col items-center sm:items-start">
          <h4 className="text-white text-[13px] font-bold uppercase tracking-widest mb-4 w-full">
            Get Wholesale Quote
          </h4>
          <p className="text-[13px] leading-relaxed mb-5">
            For bulk orders and special pricing for businesses, dealers and institutions.
          </p>
          <Link href="/contact"
            className="btn-red inline-flex items-center gap-2 text-[13px] px-5 py-2.5 w-full sm:w-auto">
            Request a Quote <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-[#1E293B]">
        <div className="max-w-7xl mx-auto px-4 lg:px-6 py-4 text-center">
          <p className="text-[12px] text-[#64748B]">
            © {new Date().getFullYear()} Sri Ganesh Enterprises. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
