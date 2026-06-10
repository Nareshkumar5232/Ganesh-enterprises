import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";

export default function HeroSection() {
  return (
    <section
      className="section-white py-12 px-4 overflow-hidden"
      aria-label="Wholesale electronics hero"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-4 items-center">

          {/* ── Left content ── */}
          <div className="flex flex-col gap-5 max-w-lg">

            {/* Badge */}
            <div className="inline-flex">
              <span className="bg-[#FEF2F2] text-[#CC0000] text-xs font-bold px-4 py-1.5 rounded-full border border-[#FECACA]">
                Your Trusted Wholesale Partner
              </span>
            </div>

            {/* Heading */}
            <div>
              <h1 className="text-[2.6rem] font-black text-[#111111] leading-tight tracking-tight">
                Wholesale Electronics for
              </h1>
              <h1 className="text-[2.6rem] font-black text-[#CC0000] leading-tight tracking-tight">
                Businesses &amp; Dealers
              </h1>
            </div>

            {/* Description */}
            <p className="text-[#4B5563] text-[15px] leading-relaxed">
              Supplying genuine electronics, IT products, and home appliances
              from leading brands at the best wholesale prices.
            </p>

            {/* Checkmarks */}
            <div className="flex items-center gap-6 flex-wrap">
              {["Bulk Pricing", "Genuine Products", "Fast Delivery"].map((item) => (
                <div key={item} className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#CC0000]" strokeWidth={2.5} />
                  <span className="text-[#374151] text-sm font-semibold">{item}</span>
                </div>
              ))}
            </div>

            {/* CTA buttons */}
            <div className="flex items-center gap-3 flex-wrap mt-1">
              <Link href="/products" className="btn-primary text-sm py-3 px-6">
                Explore Products <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href="/contact" className="btn-outline text-sm py-3 px-6">
                Get Wholesale Quote <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* ── Right product image ── */}
          <div className="relative flex items-center justify-center">
            {/* Warm cream background blob */}
            <div
              className="absolute inset-0 rounded-[40px]"
              style={{
                background: "linear-gradient(135deg, #FFF8F0 0%, #FFF3E8 50%, #FEF0E0 100%)",
                margin: "-12px 0",
              }}
            />
            {/* Product image */}
            <div className="relative z-10 w-full">
              <Image
                src="/hero-products.png"
                alt="Electronics products — TV, Laptop, Mobile, Printer, Router, CCTV"
                width={680}
                height={480}
                className="w-full h-auto object-contain drop-shadow-lg"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
