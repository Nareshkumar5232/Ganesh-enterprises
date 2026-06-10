import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="hero-section pt-16 px-4 section-white" aria-label="Hero">
      <div className="max-w-7xl mx-auto w-full py-10 lg:py-0">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center min-h-[calc(100vh-64px)]">

          {/* ── Left ── */}
          <div className="flex flex-col gap-5 max-w-lg py-10 lg:py-16">
            {/* Gold tagline */}
            <p className="text-[#D4AF37] font-semibold text-sm tracking-wide">
              Your Trusted Wholesale Partner
            </p>

            {/* Main heading */}
            <div>
              <h1 className="text-[2.4rem] sm:text-[2.75rem] font-black text-[#0F172A] leading-[1.1] tracking-tight">
                Wholesale Electronics for
              </h1>
              <h1 className="text-[2.4rem] sm:text-[2.75rem] font-black text-[#B91C1C] leading-[1.1] tracking-tight">
                Businesses &amp; Dealers
              </h1>
            </div>

            {/* Subtext */}
            <p className="text-[#6B7280] text-[15px] leading-relaxed">
              Supplying genuine electronics, IT products, and home appliances
              from leading brands at the best wholesale prices.
            </p>

            {/* Check items */}
            <div className="flex items-center flex-wrap gap-4">
              {["Bulk Pricing", "Genuine Products", "Fast Delivery"].map((item) => (
                <div key={item} className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#B91C1C] shrink-0" strokeWidth={2.5} />
                  <span className="text-[#0F172A] text-[14px] font-semibold">{item}</span>
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex items-center gap-3 flex-wrap mt-1">
              <Link href="/products" className="btn-red">
                Explore Products <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href="/contact" className="btn-outline">
                Get Wholesale Quote <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* ── Right — product image ── */}
          <div className="relative flex items-center justify-center py-8 lg:py-0">
            <div
              className="absolute inset-4 rounded-[40px] opacity-60"
              style={{ background: "linear-gradient(135deg, #FFF8F0 0%, #FFF0E5 100%)" }}
            />
            <div className="relative z-10 w-full max-w-[560px]">
              <Image
                src="/hero-products.png"
                alt="Electronics products — TV, Laptop, Mobile, Printer, Router, CCTV, Refrigerator"
                width={640}
                height={460}
                className="w-full h-auto object-contain drop-shadow-xl"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
