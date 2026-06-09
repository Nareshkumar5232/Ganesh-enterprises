import { mockBrands } from "@/lib/mock-data";

export default function TrustedBrands() {
  return (
    <section className="section-white">
      <div className="max-w-7xl mx-auto px-4 lg:px-6 py-14">
        <div className="text-center mb-10">
          <p className="text-[#2563EB] text-xs font-semibold uppercase tracking-wider mb-2">Our Brands</p>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#0F172A] dark:text-white mb-2">
            100+ Trusted Brands
          </h2>
          <p className="text-[#64748B] text-sm">
            Authorised distributor for the world&apos;s leading technology manufacturers.
          </p>
        </div>

        {/* Scrolling strip */}
        <div className="relative overflow-hidden border border-[#E2E8F0] dark:border-slate-700 rounded-xl bg-[#F8FAFC] dark:bg-[#1E293B] py-5">
          <div
            className="absolute left-0 top-0 h-full w-20 z-10 pointer-events-none"
            style={{ background: "linear-gradient(to right, #F8FAFC, transparent)" }}
            aria-hidden="true"
          />
          <div
            className="absolute right-0 top-0 h-full w-20 z-10 pointer-events-none"
            style={{ background: "linear-gradient(to left, #F8FAFC, transparent)" }}
            aria-hidden="true"
          />
          <div className="brands-scroll flex gap-8 items-center">
            {[...mockBrands, ...mockBrands].map((b, i) => (
              <div
                key={`${b.name}-${i}`}
                aria-hidden={i >= mockBrands.length}
                className="flex-shrink-0 px-6 py-2.5 bg-white dark:bg-[#0F172A] border border-[#E2E8F0] dark:border-slate-700 rounded-lg group cursor-default"
              >
                <span className="text-sm font-semibold text-[#94A3B8] group-hover:text-[#0F172A] dark:group-hover:text-white transition-colors duration-300">
                  {b.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
