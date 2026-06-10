"use client";

import Link from "next/link";
import { Phone, MapPin, Mail, ArrowRight } from "lucide-react";

const DEPARTMENTS = [
  { label: "Televisions", href: "/products?category=tv" },
  { label: "Laptops & Desktops", href: "/products?category=computers" },
  { label: "Smartphones & Tablets", href: "/products?category=mobile" },
  { label: "Printers & Scanners", href: "/products?category=printers" },
  { label: "Networking Equipment", href: "/products?category=networking" },
  { label: "CCTV & Security Systems", href: "/products?category=security" },
  { label: "Home Appliances", href: "/products?category=appliances" },
];

const QUICK_LINKS = [
  { label: "Home", href: "/" },
  { label: "Products", href: "/products" },
  { label: "About Us", href: "/about" },
  { label: "Contact Us", href: "/contact" },
  { label: "Get Wholesale Quote", href: "/contact" },
];

const SOCIALS = [
  {
    label: "Facebook",
    href: "https://facebook.com",
    path: "M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z",
  },
  {
    label: "Instagram",
    href: "https://instagram.com",
    path: "M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37zm1.5-4.87h.01",
    extra: true,
  },
  {
    label: "WhatsApp",
    href: "https://wa.me/919150310876",
    path: "M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z M12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2 22l4.832-1.438A9.956 9.956 0 0 0 12 22c5.523 0 10-4.477 10-10S17.523 2 12 2z",
  },
];

function LogoMark() {
  return (
    <svg viewBox="0 0 80 80" className="w-10 h-10" aria-hidden>
      <g fill="#B8860B" opacity="0.8">
        <ellipse cx="10" cy="38" rx="3" ry="5" transform="rotate(-20 10 38)" />
        <ellipse cx="14" cy="30" rx="3" ry="5" transform="rotate(-10 14 30)" />
        <ellipse cx="10" cy="22" rx="3" ry="5" transform="rotate(10 10 22)" />
        <ellipse cx="14" cy="46" rx="3" ry="5" transform="rotate(-30 14 46)" />
      </g>
      <path d="M17 20 Q12 40 17 60" stroke="#B8860B" strokeWidth="1.5" fill="none" opacity="0.8" />
      <g fill="#B8860B" opacity="0.8">
        <ellipse cx="70" cy="38" rx="3" ry="5" transform="rotate(20 70 38)" />
        <ellipse cx="66" cy="30" rx="3" ry="5" transform="rotate(10 66 30)" />
        <ellipse cx="70" cy="22" rx="3" ry="5" transform="rotate(-10 70 22)" />
        <ellipse cx="66" cy="46" rx="3" ry="5" transform="rotate(30 66 46)" />
      </g>
      <path d="M63 20 Q68 40 63 60" stroke="#B8860B" strokeWidth="1.5" fill="none" opacity="0.8" />
      <path d="M40 8 L60 16 L60 42 C60 56 40 68 40 68 C40 68 20 56 20 42 L20 16 Z" fill="#CC0000" />
      <text x="40" y="46" textAnchor="middle" fill="#FFFFFF" fontSize="26" fontWeight="900" fontFamily="Georgia, serif">M</text>
    </svg>
  );
}

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#111111] text-[#9CA3AF]">

      {/* Top red strip */}
      <div className="h-1 bg-[#CC0000]" />

      <div className="max-w-7xl mx-auto px-4 lg:px-6 py-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

        {/* Brand column */}
        <div className="flex flex-col gap-5">
          <div className="flex items-center gap-3">
            <LogoMark />
            <div className="flex flex-col leading-none">
              <span className="font-black text-white text-[14px] tracking-tight">Sri Ganesh Enterprises</span>
              <span className="text-[#CC0000] text-[10px] tracking-wider uppercase font-bold mt-0.5">Wholesale Electronics</span>
            </div>
          </div>
          <p className="text-[#6B7280] text-[13px] leading-relaxed">
            Chennai&apos;s trusted wholesale electronics distributor. Supplying genuine
            products to retailers, corporates, schools and government offices since 2010.
          </p>
          {/* Socials */}
          <div className="flex gap-2">
            {SOCIALS.map((s) => (
              <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
                aria-label={s.label}
                className="w-8 h-8 flex items-center justify-center rounded border border-[#2D2D2D] text-[#6B7280] hover:text-white hover:border-[#CC0000] hover:bg-[#CC0000]/10 transition-all">
                <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
                  <path d={s.path} />
                </svg>
              </a>
            ))}
          </div>
          {/* Badges */}
          <div className="flex gap-2 flex-wrap">
            <span className="text-[10px] font-bold px-2.5 py-1 rounded bg-[#CC0000]/10 text-[#CC0000] border border-[#CC0000]/20 uppercase tracking-wider">
              GST Registered
            </span>
            <span className="text-[10px] font-bold px-2.5 py-1 rounded bg-[#D4AF37]/10 text-[#D4AF37] border border-[#D4AF37]/20 uppercase tracking-wider">
              Authorised Dealer
            </span>
          </div>
        </div>

        {/* Product categories */}
        <div>
          <h4 className="text-white text-xs font-black uppercase tracking-[0.18em] mb-5">Product Categories</h4>
          <ul className="flex flex-col gap-2.5">
            {DEPARTMENTS.map((d) => (
              <li key={d.href}>
                <Link href={d.href}
                  className="text-[#6B7280] text-[13px] hover:text-white hover:pl-1 transition-all duration-150 flex items-center gap-1.5">
                  <span className="w-1 h-1 bg-[#CC0000] rounded-full shrink-0" />
                  {d.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Quick links */}
        <div>
          <h4 className="text-white text-xs font-black uppercase tracking-[0.18em] mb-5">Quick Links</h4>
          <ul className="flex flex-col gap-2.5">
            {QUICK_LINKS.map((l) => (
              <li key={l.label}>
                <Link href={l.href}
                  className="text-[#6B7280] text-[13px] hover:text-white hover:pl-1 transition-all duration-150 flex items-center gap-1.5">
                  <span className="w-1 h-1 bg-[#D4AF37] rounded-full shrink-0" />
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-6 pt-5 border-t border-[#1F2937]">
            <Link href="/contact"
              className="inline-flex items-center gap-1.5 text-[13px] font-bold text-[#CC0000] hover:text-[#FF2222] transition-colors">
              Request Bulk Quote <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Contact */}
        <div>
          <h4 className="text-white text-xs font-black uppercase tracking-[0.18em] mb-5">Contact Us</h4>
          <ul className="flex flex-col gap-4">
            <li className="flex items-start gap-2.5">
              <MapPin className="w-4 h-4 text-[#CC0000] shrink-0 mt-0.5" />
              <span className="text-[#6B7280] text-[13px] leading-relaxed">
                No.18/19 Meeran Sahib Street,<br />
                1st Floor, UNO Arcade Complex,<br />
                Shop No: F49, Chennai – 600002
              </span>
            </li>
            <li className="flex items-center gap-2.5">
              <Phone className="w-4 h-4 text-[#CC0000] shrink-0" />
              <div>
                <p className="text-white text-[13px] font-bold">+91 91503 10876</p>
                <p className="text-[#6B7280] text-[11px]">Mon–Sat · 9:30 AM – 7:00 PM</p>
              </div>
            </li>
            <li className="flex items-center gap-2.5">
              <Mail className="w-4 h-4 text-[#CC0000] shrink-0" />
              <span className="text-[#6B7280] text-[13px]">info@sriganeshenterprises.in</span>
            </li>
          </ul>
          {/* Owner name callout */}
          <div className="mt-5 p-3 rounded-lg bg-[#1A1A1A] border border-[#2D2D2D]">
            <p className="text-[10px] text-[#6B7280] uppercase tracking-widest mb-1">Proprietor</p>
            <p className="text-[#CC0000] font-black text-[15px]">K. Ganesh Rao</p>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-[#1F2937]">
        <div className="max-w-7xl mx-auto px-4 lg:px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-[#4B5563]">
          <p>© {year} Sri Ganesh Enterprises · All rights reserved.</p>
          <p>Wholesale Electronics Distributor · Chennai, Tamil Nadu, India</p>
        </div>
      </div>
    </footer>
  );
}
