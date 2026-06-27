import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative min-h-[calc(100vh-64px)] flex items-center justify-center pt-20 pb-12 sm:pt-24 sm:pb-16 bg-white overflow-hidden" aria-label="Hero">
      <div className="max-w-7xl mx-auto px-4 lg:px-6 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center w-full">

          {/* ── Left Content ── */}
          <div className="flex flex-col gap-5 max-w-xl text-center lg:text-left mx-auto lg:mx-0">
            {/* Gold tagline */}
            <p className="text-[#D4AF37] font-semibold text-xs sm:text-sm tracking-widest uppercase font-outfit">
              Your Trusted Wholesale Partner
            </p>

            {/* Main heading */}
            <div className="space-y-1">
              <h1 className="text-3xl sm:text-5xl lg:text-[3.5rem] font-extrabold text-[#0F172A] leading-[1.1] tracking-tight font-heading">
                Wholesale Electronics for
              </h1>
              <h1 className="text-3xl sm:text-5xl lg:text-[3.5rem] font-extrabold text-[#B91C1C] leading-[1.1] tracking-tight font-heading">
                Businesses &amp; Dealers
              </h1>
            </div>

            {/* Subtext */}
            <p className="text-[#6B7280] text-sm sm:text-lg leading-relaxed font-sans">
              Chennai's premier B2B distributor supplying genuine televisions, laptops, mobiles, printers, CCTV, and smart home appliances at bulk-buy prices.
            </p>

            {/* Check items */}
            <div className="grid grid-cols-2 sm:flex sm:flex-wrap items-center justify-center lg:justify-start gap-x-6 gap-y-2.5 font-outfit text-left">
              {["Bulk Pricing", "Genuine Brands", "Chennai Ready Stock"].map((item) => (
                <div key={item} className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-[#B91C1C] shrink-0" strokeWidth={2.5} />
                  <span className="text-[#0F172A] text-xs sm:text-sm font-semibold">{item}</span>
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mt-2 w-full">
              <Link href="/products" className="btn-red w-full sm:w-auto text-sm sm:text-base font-outfit">
                Explore Products <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href="/contact" className="btn-outline w-full sm:w-auto text-sm sm:text-base font-outfit">
                Get Wholesale Quote <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* ── Right — Product Image ── */}
          <div className="relative flex items-center justify-center w-full max-w-full">
            {/* Warm background glow */}
            <div
              className="absolute inset-2 sm:inset-6 rounded-[40px] opacity-60 pointer-events-none"
              style={{ background: "linear-gradient(135deg, #FFF8F0 0%, #FFF0E5 100%)" }}
            />
            <div className="relative z-10 w-full flex justify-center items-center px-4">
              <Image
                src="/hero-products.png"
                alt="Sri Ganesh Enterprises wholesale catalog - Smart TV, Laptop, Mobile, Printer, Network Router, CCTV Camera, Refrigerator"
                width={600}
                height={430}
                className="w-full max-h-[250px] sm:max-h-[380px] lg:max-h-[440px] h-auto object-contain drop-shadow-2xl hover:scale-[1.01] transition-transform duration-300"
                priority
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
