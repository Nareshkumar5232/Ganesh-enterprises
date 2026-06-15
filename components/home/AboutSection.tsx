const HIGHLIGHTS = [
  {
    icon: (
      <svg viewBox="0 0 40 40" className="w-8 h-8" fill="none" stroke="#B91C1C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="4" y="10" width="32" height="24" rx="2" />
        <path d="M4 16h32" />
        <path d="M14 10V6" /><path d="M26 10V6" />
        <path d="M10 22l4 4 8-8" />
      </svg>
    ),
    title: "Bulk Supply Expertise",
    desc: "Over a decade supplying large volume orders to dealers and institutions.",
  },
  {
    icon: (
      <svg viewBox="0 0 40 40" className="w-8 h-8" fill="none" stroke="#B91C1C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 4l3.09 9.26H33l-7.94 5.48 3.09 9.26L20 23l-8.15 5 3.09-9.26L6.91 13.26H16.91z" />
      </svg>
    ),
    title: "Genuine Products",
    desc: "All products sourced directly from authorised brand distributors.",
  },
  {
    icon: (
      <svg viewBox="0 0 40 40" className="w-8 h-8" fill="none" stroke="#B91C1C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="14" width="36" height="22" rx="2" />
        <path d="M6 14V10a4 4 0 0 1 4-4h20a4 4 0 0 1 4 4v4" />
        <path d="M14 25l4 4 8-8" />
      </svg>
    ),
    title: "Fast Delivery",
    desc: "Same-day dispatch for orders placed before 2 PM from our Chennai warehouse.",
  },
  {
    icon: (
      <svg viewBox="0 0 40 40" className="w-8 h-8" fill="none" stroke="#B91C1C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="20" cy="20" r="16" />
        <path d="M20 10v10l6 3" />
        <path d="M8 20h4" /><path d="M28 20h4" />
      </svg>
    ),
    title: "Competitive Pricing",
    desc: "Best wholesale rates with tiered discounts based on order volume.",
  },
  {
    icon: (
      <svg viewBox="0 0 40 40" className="w-8 h-8" fill="none" stroke="#B91C1C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 4C13.37 4 8 9.37 8 16c0 5.38 3.47 9.95 8.32 11.6L20 36l3.68-8.4C28.53 25.95 32 21.38 32 16c0-6.63-5.37-12-12-12z" />
        <circle cx="20" cy="16" r="4" />
      </svg>
    ),
    title: "Trusted by Businesses",
    desc: "500+ businesses, schools and government offices rely on us for procurement.",
  },
  {
    icon: (
      <svg viewBox="0 0 40 40" className="w-8 h-8" fill="none" stroke="#B91C1C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 4l14 6v10c0 8-6 14-14 16C12 34 6 28 6 20V10z" />
        <path d="M14 20l4 4 8-8" />
      </svg>
    ),
    title: "Chennai Based Company",
    desc: "Locally based in Meeran Sahib Street, Chennai – walk-in welcome.",
  },
];

export default function AboutSection() {
  return (
    <section className="section-bg py-14" aria-label="About Sri Ganesh Enterprises">
      <div className="max-w-7xl mx-auto px-4 lg:px-6">

        {/* Header */}
        <div className="text-center mb-10">
          <div className="section-divider" />
          <h2 className="text-[26px] font-bold text-[#0F172A]">About Sri Ganesh Enterprises</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">

          {/* Left — company description */}
          <div className="flex flex-col gap-5">
            <div className="flex items-center gap-3">
              <span className="w-1 h-10 bg-[#B91C1C] rounded-full shrink-0" />
              <h3 className="text-[20px] font-bold text-[#0F172A]">Who We Are &amp; What We Do</h3>
            </div>
            <p className="text-[#6B7280] text-[14.5px] leading-relaxed">
              Sri Ganesh Enterprises is one of Chennai&apos;s most trusted wholesale electronics distributors,
              operating from the heart of the city&apos;s commercial electronics district. We supply a wide range
              of genuine, brand-authorised electronics — from computers and laptops to TVs, mobile phones,
              CCTV systems, networking equipment, and home appliances.
            </p>
            <p className="text-[#6B7280] text-[14.5px] leading-relaxed">
              Our customers include retail shops, corporate IT departments, schools, colleges, government
              offices, and system integrators across Tamil Nadu and South India. With over a decade of
              experience, we offer competitive bulk pricing, same-day dispatch, and dedicated account
              support for all our dealer partners.
            </p>

            {/* Key stats */}
            <div className="grid grid-cols-3 gap-4 mt-2">
              {[
                { value: "10+", label: "Years Experience" },
                { value: "100+", label: "Brands Available" },
                { value: "5000+", label: "Products In Stock" },
              ].map((s) => (
                <div key={s.label}
                  className="text-center p-4 bg-white border border-[#E5E7EB] rounded-xl">
                  <p className="text-[24px] font-black text-[#B91C1C] leading-none">{s.value}</p>
                  <p className="text-[12px] text-[#6B7280] font-medium mt-1 leading-tight">{s.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right — highlight cards grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {HIGHLIGHTS.map((h) => (
              <div key={h.title} className="highlight-card">
                <div className="flex justify-center mb-3">
                  <div className="w-14 h-14 rounded-xl bg-[#FEF2F2] flex items-center justify-center">
                    {h.icon}
                  </div>
                </div>
                <h4 className="text-[13px] font-bold text-[#0F172A] leading-snug mb-1.5">
                  {h.title}
                </h4>
                <p className="text-[12px] text-[#6B7280] leading-relaxed">
                  {h.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
