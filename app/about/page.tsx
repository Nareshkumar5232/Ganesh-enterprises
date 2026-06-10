import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Shield, Users, Building, Phone, Mail, MapPin } from "lucide-react";

export const metadata: Metadata = {
  title: "About Us | Sri Ganesh Enterprises",
  description: "Learn about Sri Ganesh Enterprises Pvt Ltd - Chennai's trusted partner for wholesale electronics, computers, IT accessories, and smart home appliances.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#F7F7F7] text-[#0F172A] pt-24 pb-16">
      
      {/* ── Page Header ── */}
      <section className="px-4 py-12 md:py-16 text-center max-w-4xl mx-auto">
        <span className="text-[#D4AF37] text-sm font-bold tracking-widest uppercase font-outfit">
          Established B2B Distributor
        </span>
        <h1 className="text-4xl md:text-5xl font-extrabold text-[#B91C1C] mt-2 mb-4 font-heading">
          About Sri Ganesh Enterprises
        </h1>
        <p className="text-base sm:text-lg text-[#6B7280] font-sans max-w-2xl mx-auto leading-relaxed">
          Supplying Chennai and Tamil Nadu with high-quality electronics, computers, and IT infrastructure solutions for over a decade.
        </p>
      </section>

      {/* ── Brand Strength Stats ── */}
      <section className="px-4 mb-16">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {[
            { value: "10+", label: "Years Experience" },
            { value: "5000+", label: "Wholesale Products" },
            { value: "100+", label: "Global Brands" },
            { value: "1200+", label: "Dealers Served" },
          ].map((stat) => (
            <div key={stat.label} className="bg-white border border-[#E5E7EB] rounded-xl p-6 text-center shadow-sm hover:shadow-md transition-shadow">
              <span className="block text-3xl sm:text-4xl font-bold text-[#B91C1C] font-mono tracking-tight">
                {stat.value}
              </span>
              <span className="block text-xs sm:text-sm font-semibold text-[#6B7280] font-outfit mt-1 uppercase tracking-wider">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* ── Company Overview ── */}
      <section className="px-4 py-12 bg-white border-t border-b border-[#E5E7EB]/50">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-5 text-left">
            <h2 className="text-3xl font-extrabold text-[#0F172A] font-heading tracking-tight">
              Who We Are
            </h2>
            <p className="text-[#374151] text-base leading-relaxed font-sans">
              Sri Ganesh Enterprises is Chennai's trusted B2B electronics supplier. We bridge the gap between world-leading technology manufacturers and regional retailers, corporate offices, system integrators, and institutional buyers.
            </p>
            <p className="text-[#374151] text-base leading-relaxed font-sans">
              By maintaining deep, local inventory across televisions, laptops, mobiles, CCTV, networking, and home appliances, we ensure immediate availability and fast delivery for bulk dealer orders.
            </p>
            <div className="flex gap-4 pt-2">
              <Link href="/products" className="btn-red text-sm font-outfit">
                Explore Catalog
              </Link>
              <Link href="/contact" className="btn-outline text-sm font-outfit">
                Request Dealer Pricing
              </Link>
            </div>
          </div>
          <div className="flex justify-center">
            <div className="w-full h-72 sm:h-80 bg-gradient-to-br from-[#B91C1C]/5 to-[#D4AF37]/5 rounded-2xl border border-[#E5E7EB] flex flex-col items-center justify-center p-6 text-center relative group overflow-hidden">
              <Shield className="w-16 h-16 text-[#B91C1C] mb-4 group-hover:scale-110 transition-transform duration-300" strokeWidth={1.5} />
              <h3 className="text-xl font-bold text-[#0F172A] font-heading">100% Genuine Products</h3>
              <p className="text-[#6B7280] text-sm mt-2 max-w-xs font-sans">
                Every single item in our catalog is sourced directly from official brand channels and carries full OEM warranty support.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Business Strengths ── */}
      <section className="px-4 py-16 max-w-6xl mx-auto">
        <h2 className="text-3xl font-extrabold text-center text-[#0F172A] font-heading tracking-tight mb-12">
          Why B2B Partners Trust Us
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              title: "Direct OEM Sourcing",
              description: "Direct partnerships with brands like Samsung, LG, Dell, and Canon guarantee official products and proper pricing.",
              icon: <Building className="w-6 h-6 text-[#B91C1C]" />,
            },
            {
              title: "Volume Margin Benefits",
              description: "Structured wholesale tiers designed to maximize your profit margin on bulk commercial hardware buys.",
              icon: <Shield className="w-6 h-6 text-[#B91C1C]" />,
            },
            {
              title: "Fast Local Dispatch",
              description: "Same-day dispatch and rapid delivery across Chennai and neighboring districts directly from our hub.",
              icon: <Users className="w-6 h-6 text-[#B91C1C]" />,
            },
            {
              title: "After-Sales Support",
              description: "Dedicated support team assisting with corporate installations, warranty claims, and technical inquiries.",
              icon: <Shield className="w-6 h-6 text-[#B91C1C]" />,
            },
            {
              title: "Customized Quotations",
              description: "Personalized corporate and tender RFQ support for bulk technology procurement requirements.",
              icon: <Building className="w-6 h-6 text-[#B91C1C]" />,
            },
            {
              title: "Flexible Procurement",
              description: "Convenient order channels via WhatsApp, email, or catalog requests to streamline your workflow.",
              icon: <Users className="w-6 h-6 text-[#B91C1C]" />,
            },
          ].map((item) => (
            <div
              key={item.title}
              className="p-6 bg-white border border-[#E5E7EB] rounded-xl hover:border-[#B91C1C]/50 hover:shadow-lg transition-all duration-300 text-left flex flex-col gap-4"
            >
              <div className="w-12 h-12 rounded-lg bg-[#FEF2F2] flex items-center justify-center shrink-0">
                {item.icon}
              </div>
              <div>
                <h3 className="text-lg font-bold text-[#0F172A] font-heading mb-2">
                  {item.title}
                </h3>
                <p className="text-[#6B7280] text-sm leading-relaxed font-sans">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Contact Details ── */}
      <section className="px-4 py-12 bg-white border-t border-b border-[#E5E7EB]/50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-extrabold text-[#0F172A] font-heading tracking-tight mb-8">
            Get In Touch With Us
          </h2>
          <div className="grid md:grid-cols-2 gap-8 text-left">
            <div className="p-6 bg-[#F7F7F7] rounded-xl border border-[#E5E7EB]">
              <h3 className="text-[#B91C1C] text-sm font-bold font-outfit uppercase tracking-widest mb-4">
                Contact Details
              </h3>
              <ul className="space-y-3 font-sans">
                <li className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-[#B91C1C]" />
                  <a href="tel:+919150310876" className="text-[#374151] hover:text-[#B91C1C] transition-colors">
                    +91 91503 10876
                  </a>
                </li>
                <li className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-[#B91C1C]" />
                  <a href="mailto:info@sriganeshenterprises.in" className="text-[#374151] hover:text-[#B91C1C] transition-colors">
                    info@sriganeshenterprises.in
                  </a>
                </li>
                <li className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-[#B91C1C]" />
                  <a href="mailto:contact@sriganeshenterprises.in" className="text-[#374151] hover:text-[#B91C1C] transition-colors">
                    contact@sriganeshenterprises.in
                  </a>
                </li>
              </ul>
            </div>
            
            <div className="p-6 bg-[#F7F7F7] rounded-xl border border-[#E5E7EB]">
              <h3 className="text-[#B91C1C] text-sm font-bold font-outfit uppercase tracking-widest mb-4">
                Head Office
              </h3>
              <div className="flex gap-3">
                <MapPin className="w-5 h-5 text-[#B91C1C] shrink-0 mt-0.5" />
                <p className="text-[#374151] text-sm leading-relaxed font-sans">
                  No.18/19 Meeran Sahib Street, 1st Floor,<br />
                  UNO Arcade Complex, Shop No: F49,<br />
                  Chennai - 600002
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
