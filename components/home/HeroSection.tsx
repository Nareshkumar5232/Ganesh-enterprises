"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowRight, BadgeIndianRupee, ShieldCheck, Sparkles, Truck } from "lucide-react";

const trustPoints = [
  { label: "Genuine Brands", icon: ShieldCheck, desc: "Direct brand authorization" },
  { label: "Bulk Pricing", icon: BadgeIndianRupee, desc: "Competitive trade discounts" },
  { label: "Chennai Ready Stock", icon: Truck, desc: "Immediate showroom supply" },
  { label: "Fast Dispatch", icon: Sparkles, desc: "Same-day logistics routing" },
];

export default function HeroSection() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section className="relative overflow-hidden pt-28 sm:pt-36 lg:pt-40 pb-20 sm:pb-24 lg:pb-28" aria-label="Hero">
      {/* Background accents */}
      <div className="absolute inset-0 bg-[#07111f]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(212,175,55,0.14),_transparent_35%),radial-gradient(circle_at_85%_20%,_rgba(185,28,28,0.12),_transparent_30%),linear-gradient(135deg,_#091322_0%,_#0e1b30_50%,_#060c16_100%)]" />
      
      {/* Technology grid overlay */}
      <div className="absolute inset-0 opacity-[0.14] bg-[linear-gradient(rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.06)_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:radial-gradient(circle_at_center,black,transparent_80%)]" />
      
      {/* Blur highlights */}
      <div className="absolute -top-24 right-[10%] h-80 w-80 rounded-full bg-[#D4AF37]/10 blur-3xl" />
      <div className="absolute bottom-[10%] left-[5%] h-96 w-96 rounded-full bg-[#B91C1C]/8 blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 lg:px-6 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-[1.18fr_0.82fr] gap-12 lg:gap-16 items-center">
          
          {/* Left: Content Area */}
          <div className={`relative max-w-2xl text-center lg:text-left mx-auto lg:mx-0 transition-all duration-1000 ease-out ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
            
            {/* Pill Label */}
            <div className="inline-flex items-center gap-2.5 rounded-full border border-amber-400/20 bg-amber-400/5 px-4 py-2 text-[11px] sm:text-xs font-semibold uppercase tracking-[0.2em] text-[#F3D98A] backdrop-blur-md">
              <span className="h-2 w-2 rounded-full bg-[#D4AF37] shadow-[0_0_12px_rgba(212,175,55,0.8)] animate-pulse" />
              Trusted Wholesale Electronics Distributor
            </div>

            {/* Typography */}
            <div className="mt-8 space-y-5">
              <p className="text-[#D4AF37] text-xs sm:text-sm font-bold uppercase tracking-[0.3em] font-outfit">
                Enterprise Supply Partner
              </p>
              <h1 className="text-4xl sm:text-5xl lg:text-[3.5rem] xl:text-[4rem] font-extrabold text-white leading-[1.08] tracking-tight font-heading">
                Wholesale Electronics <br className="hidden sm:inline" />
                <span className="bg-gradient-to-r from-white via-slate-100 to-amber-300 bg-clip-text text-transparent">
                  for Businesses &amp; Dealers
                </span>
              </h1>
              <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-sans max-w-xl mx-auto lg:mx-0">
                Sri Ganesh Enterprises provides B2B dealers and retail channels with premium, authorized televisions, laptops, mobile devices, security CCTV, and networking hardware direct from Chennai stock.
              </p>
            </div>

            {/* Trust Indicators (Chips/Cards) */}
            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto lg:mx-0">
              {trustPoints.map((item, index) => {
                const Icon = item.icon;
                return (
                  <div 
                    key={item.label} 
                    className={`flex items-center gap-4.5 rounded-2xl border border-white/5 bg-white/5 px-5 py-4 text-left backdrop-blur-md shadow-[0_12px_28px_rgba(0,0,0,0.15)] transition-all duration-300 hover:-translate-y-1 hover:border-[#D4AF37]/30 hover:bg-white/10 group ${mounted ? "opacity-100" : "opacity-0"}`} 
                    style={{ transitionDelay: `${150 + index * 100}ms` }}
                  >
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#D4AF37]/10 text-[#F3D98A] ring-1 ring-[#D4AF37]/20 group-hover:scale-105 transition-transform duration-300">
                      <Icon className="h-5 w-5" />
                    </span>
                    <div>
                      <p className="text-sm font-bold text-white tracking-wide group-hover:text-[#F3D98A] transition-colors">{item.label}</p>
                      <p className="text-xs text-slate-400 mt-0.5">{item.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* CTA Section */}
            <div className="mt-10 flex flex-col sm:flex-row items-stretch sm:items-center justify-center lg:justify-start gap-4">
              <Link 
                href="/products" 
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#B91C1C] px-8 py-4 text-sm font-semibold text-white shadow-[0_12px_24px_rgba(185,28,28,0.25)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#991B1B] hover:shadow-[0_18px_36px_rgba(185,28,28,0.35)]"
              >
                Explore Products <ArrowRight className="h-4 w-4" />
              </Link>
              <Link 
                href="/contact" 
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/10 bg-white/5 px-8 py-4 text-sm font-semibold text-white backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:border-[#D4AF37]/35 hover:bg-white/10 hover:text-[#F3D98A]"
              >
                Contact Sales <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          {/* Right: Product Showcase Container */}
          <div className={`relative mx-auto w-full max-w-[540px] transition-all duration-1000 ease-out delay-200 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
            
            {/* Ambient card glows */}
            <div className="absolute -top-6 -left-6 h-48 w-48 rounded-full bg-[#D4AF37]/10 blur-3xl pointer-events-none" />
            <div className="absolute -bottom-6 -right-6 h-48 w-48 rounded-full bg-[#B91C1C]/10 blur-3xl pointer-events-none" />
            
            {/* Floating glass card */}
            <div className="relative rounded-[2.5rem] border border-white/10 bg-gradient-to-b from-white/10 to-white/5 p-4 sm:p-5 shadow-[0_32px_80px_rgba(0,0,0,0.4)] backdrop-blur-xl overflow-hidden group">
              <div className="absolute inset-0 rounded-[2.5rem] bg-[linear-gradient(135deg,rgba(255,255,255,0.12),transparent_40%,transparent_75%,rgba(255,255,255,0.06))] pointer-events-none" />
              
              {/* Internal dark display container */}
              <div className="relative rounded-[2rem] border border-white/5 bg-[#070c14]/90 p-4 sm:p-6 overflow-hidden">
                
                {/* Tech card header decoration */}
                <div className="flex items-center justify-between border-b border-white/5 pb-4.5 mb-6">
                  <div>
                    <span className="text-[10px] uppercase tracking-[0.2em] text-[#D4AF37] font-semibold font-mono">B2B Authorized Catalog</span>
                    <h3 className="text-sm font-bold text-white mt-1 font-outfit">Showroom Portfolio</h3>
                  </div>
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-xs font-semibold text-emerald-400 ring-1 ring-emerald-500/20">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    Chennai Warehouse
                  </span>
                </div>

                {/* Showcase Image Area */}
                <div className="relative flex items-center justify-center py-4 sm:py-8 select-none">
                  <div className="absolute inset-0 bg-[radial-gradient(circle,_rgba(212,175,55,0.14),_transparent_70%)] blur-2xl pointer-events-none" />
                  <div className="floating-hero w-full max-w-[380px] transition-transform duration-700 ease-out group-hover:scale-103">
                    <Image 
                      src="/hero-products.png" 
                      alt="Sri Ganesh Enterprises wholesale catalog - Smart TV, Laptop, Mobile, Printer, Network Router, CCTV Camera, Refrigerator" 
                      width={620} 
                      height={460} 
                      className="w-full h-auto object-contain drop-shadow-[0_24px_48px_rgba(0,0,0,0.55)]" 
                      priority 
                    />
                  </div>
                </div>

                {/* Stats badge block */}
                <div className="mt-4 rounded-2xl border border-white/5 bg-white/5 p-4 flex items-center justify-between text-xs text-slate-300 font-sans">
                  <div>
                    <p className="text-slate-400">Trade Inventory</p>
                    <p className="text-sm font-bold text-white mt-0.5">5000+ In Stock</p>
                  </div>
                  <div className="text-right">
                    <p className="text-slate-400">Fulfillment Support</p>
                    <p className="text-sm font-bold text-[#F3D98A] mt-0.5">Chennai &amp; Tamil Nadu</p>
                  </div>
                </div>

              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}

