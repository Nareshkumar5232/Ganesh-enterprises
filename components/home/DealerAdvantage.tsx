"use client";

type AdvRow = "yes" | "partial" | "no";

const ADVANTAGES: { label: string; us: AdvRow; them: AdvRow; note: string }[] = [
  {
    label: "Genuine Brand Products",
    us: "yes",
    them: "no",
    note: "All products direct from official distributors",
  },
  {
    label: "Wholesale / Bulk Pricing",
    us: "yes",
    them: "no",
    note: "Tiered pricing based on quantity",
  },
  {
    label: "Same-Day Dispatch from Chennai",
    us: "yes",
    them: "no",
    note: "Orders placed before 2 PM dispatched same day",
  },
  {
    label: "Official Brand Warranty",
    us: "yes",
    them: "partial",
    note: "Manufacturer warranty on every product",
  },
  {
    label: "Dedicated Dealer Support",
    us: "yes",
    them: "no",
    note: "Dedicated account manager for dealers",
  },
  {
    label: "Chennai Stock Availability",
    us: "yes",
    them: "no",
    note: "5000+ SKUs physically available in Chennai",
  },
  {
    label: "Flexible MOQ",
    us: "yes",
    them: "no",
    note: "No unreasonably high minimum order quantities",
  },
  {
    label: "Credit Facility for Dealers",
    us: "yes",
    them: "partial",
    note: "For established dealer partners",
  },
  {
    label: "Pan-South India Delivery",
    us: "yes",
    them: "partial",
    note: "Courier and logistics partner network",
  },
  {
    label: "Multi-Brand Under One Roof",
    us: "yes",
    them: "no",
    note: "100+ brands across all categories",
  },
];

function CheckIcon() {
  return (
    <svg className="w-5 h-5" viewBox="0 0 20 20" fill="none">
      <circle cx="10" cy="10" r="9" fill="#D4AF37" fillOpacity="0.15" />
      <path d="M5.5 10.5l3 3 5.5-6" stroke="#D4AF37" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg className="w-5 h-5" viewBox="0 0 20 20" fill="none">
      <circle cx="10" cy="10" r="9" fill="#DC2626" fillOpacity="0.1" />
      <path d="M7 7l6 6M13 7l-6 6" stroke="#DC2626" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function PartialIcon() {
  return (
    <svg className="w-5 h-5" viewBox="0 0 20 20" fill="none">
      <circle cx="10" cy="10" r="9" fill="#F59E0B" fillOpacity="0.1" />
      <path d="M6 10h8" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export default function DealerAdvantage() {
  return (
    <section className="section-white py-20" aria-label="Why dealers choose us">
      <div className="max-w-5xl mx-auto px-4 lg:px-6">

        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-[10px] font-bold text-[#D4AF37] uppercase tracking-[0.3em] mb-3">
            ━━ The Dealer Advantage ━━
          </p>
          <h2 className="text-3xl font-black text-[#111827] leading-tight">
            Why Dealers Choose{" "}
            <span className="text-[#DC2626]">Sri Ganesh Enterprises</span>
          </h2>
          <p className="text-[#6B7280] text-sm mt-3 max-w-xl mx-auto">
            A direct comparison of what you get when you source from us versus typical electronics suppliers.
          </p>
        </div>

        {/* Comparison table */}
        <div className="rounded-xl overflow-hidden" style={{ border: "1px solid #E5E7EB", boxShadow: "0 4px 24px rgba(17,24,39,0.06)" }}>

          {/* Table header */}
          <div
            className="grid"
            style={{
              gridTemplateColumns: "1fr 160px 160px",
              background: "#111827",
            }}
          >
            <div className="px-6 py-4">
              <span className="text-[#6B7280] text-xs font-bold uppercase tracking-widest">
                Feature / Benefit
              </span>
            </div>
            <div className="px-6 py-4 text-center border-l border-[#1F2937]">
              <div className="flex flex-col items-center gap-1">
                <div className="w-7 h-7 rounded bg-[#DC2626] flex items-center justify-center">
                  <span className="text-white font-black text-sm">G</span>
                </div>
                <span className="text-[#D4AF37] text-xs font-black uppercase tracking-wider">
                  Sri Ganesh
                </span>
              </div>
            </div>
            <div className="px-6 py-4 text-center border-l border-[#1F2937]">
              <div className="flex flex-col items-center gap-1">
                <div className="w-7 h-7 rounded bg-[#374151] flex items-center justify-center">
                  <span className="text-[#6B7280] text-xs font-bold">?</span>
                </div>
                <span className="text-[#6B7280] text-xs font-bold uppercase tracking-wider">
                  Others
                </span>
              </div>
            </div>
          </div>

          {/* Rows */}
          {ADVANTAGES.map((row, i) => (
            <div
              key={row.label}
              className="comparison-row grid items-center"
              style={{
                gridTemplateColumns: "1fr 160px 160px",
                background: i % 2 === 0 ? "#FFFFFF" : "#FAFAFA",
                borderTop: "1px solid #F3F4F6",
              }}
            >
              {/* Label */}
              <div className="px-6 py-4">
                <p className="text-[#111827] text-sm font-semibold">{row.label}</p>
                <p className="text-[#9CA3AF] text-xs mt-0.5">{row.note}</p>
              </div>

              {/* Us */}
              <div className="px-6 py-4 flex items-center justify-center border-l border-[#F3F4F6]">
                {row.us === "yes" ? <CheckIcon /> : row.us === "partial" ? <PartialIcon /> : <XIcon />}
              </div>

              {/* Them */}
              <div className="px-6 py-4 flex items-center justify-center border-l border-[#F3F4F6]">
                {row.them === "yes" ? <CheckIcon /> : row.them === "partial" ? <PartialIcon /> : <XIcon />}
              </div>
            </div>
          ))}

          {/* Footer row */}
          <div
            className="grid"
            style={{
              gridTemplateColumns: "1fr 160px 160px",
              background: "#111827",
            }}
          >
            <div className="px-6 py-4">
              <p className="text-[#6B7280] text-xs">
                Based on customer feedback and market comparison
              </p>
            </div>
            <div className="px-6 py-4 flex items-center justify-center border-l border-[#1F2937]">
              <span className="text-[#D4AF37] font-black text-xs uppercase tracking-wider">
                10/10
              </span>
            </div>
            <div className="px-6 py-4 flex items-center justify-center border-l border-[#1F2937]">
              <span className="text-[#4B5563] font-bold text-xs">Varies</span>
            </div>
          </div>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-6 mt-6 justify-center flex-wrap">
          <div className="flex items-center gap-2 text-xs text-[#6B7280]">
            <CheckIcon />
            <span>Available</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-[#6B7280]">
            <PartialIcon />
            <span>Partial / Limited</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-[#6B7280]">
            <XIcon />
            <span>Not Available</span>
          </div>
        </div>
      </div>
    </section>
  );
}
