"use client";

import { useState } from "react";

const BUYERS = [
  {
    id: "retail",
    icon: "🏪",
    title: "Retail Shops",
    count: "500+ Partners",
    detail:
      "Electronics retail stores across Tamil Nadu source their inventory from us. Competitive margins, genuine stock, and flexible MOQ for retail dealers.",
    tags: ["Daily restocking", "Margin support", "Display units"],
  },
  {
    id: "corporate",
    icon: "🏢",
    title: "Corporate Offices",
    count: "200+ Companies",
    detail:
      "IT procurement teams rely on us for bulk laptop, desktop, and networking deployments. AMC support and brand warranty on all corporate orders.",
    tags: ["Bulk laptops", "Networking infra", "AMC support"],
  },
  {
    id: "schools",
    icon: "🏫",
    title: "Schools",
    count: "150+ Institutions",
    detail:
      "Educational institutions get curated computer lab packages, projectors, interactive panels, and printers — all in one order with government bill support.",
    tags: ["Computer labs", "Projectors", "Govt billing"],
  },
  {
    id: "colleges",
    icon: "🎓",
    title: "Colleges",
    count: "80+ Colleges",
    detail:
      "Engineering and arts colleges trust us for annual tech procurement — from student laptops to server rooms and smart classrooms.",
    tags: ["Student laptops", "Servers", "Smart classrooms"],
  },
  {
    id: "government",
    icon: "🏛️",
    title: "Government Offices",
    count: "50+ Offices",
    detail:
      "Government departments procure through us via GeM portal assistance. Rate contracts, gemstone billing, and transparent pricing.",
    tags: ["GeM portal", "Rate contracts", "Govt billing"],
  },
  {
    id: "si",
    icon: "⚙️",
    title: "System Integrators",
    count: "300+ SIs",
    detail:
      "System integrators and IT solution providers use us as their backend supply chain. CCTV, networking, UPS, and server hardware available in bulk.",
    tags: ["CCTV projects", "Networking", "Server hardware"],
  },
  {
    id: "dealers",
    icon: "🤝",
    title: "Dealers",
    count: "1000+ Dealers",
    detail:
      "Authorised dealers across South India replenish from our warehouse. Best channel pricing, credit facility for established dealers.",
    tags: ["Channel pricing", "Credit facility", "Fast dispatch"],
  },
  {
    id: "resellers",
    icon: "📦",
    title: "Resellers",
    count: "700+ Resellers",
    detail:
      "Online and offline resellers get access to our full catalog at wholesale rates. Drop-shipping support and white-label packaging available.",
    tags: ["Wholesale rates", "Drop shipping", "Wide catalog"],
  },
];

export default function WholesaleBuyers() {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <section className="section-dark py-20" aria-label="Who buys from us">
      <div className="max-w-7xl mx-auto px-4 lg:px-6">

        {/* Header */}
        <div className="text-center mb-14">
          <p className="text-[10px] font-bold text-[#D4AF37] uppercase tracking-[0.3em] mb-3">
            ━━ Our Customer Base ━━
          </p>
          <h2 className="text-4xl font-black text-white leading-tight">
            Who Buys From <span className="gold-shimmer">Sri Ganesh Enterprises?</span>
          </h2>
          <p className="text-[#6B7280] text-sm mt-4 max-w-xl mx-auto leading-relaxed">
            From small retail shops to large government offices — we serve the entire
            electronics supply chain across South India.
          </p>
        </div>

        {/* Buyer cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {BUYERS.map((b) => {
            const isHovered = hovered === b.id;
            return (
              <div
                key={b.id}
                onMouseEnter={() => setHovered(b.id)}
                onMouseLeave={() => setHovered(null)}
                className="relative rounded-xl overflow-hidden cursor-default"
                style={{
                  background: isHovered
                    ? "linear-gradient(135deg, #1F2937 0%, #111827 100%)"
                    : "#1A2233",
                  border: isHovered ? "1px solid #D4AF37" : "1px solid #1F2937",
                  transition: "all 0.3s ease",
                  transform: isHovered ? "translateY(-4px)" : "translateY(0)",
                  boxShadow: isHovered ? "0 16px 40px rgba(212,175,55,0.15)" : "none",
                }}
              >
                {/* Corner accent */}
                <div
                  className="absolute top-0 right-0 w-14 h-14 opacity-10 pointer-events-none"
                  style={{
                    background: "linear-gradient(225deg, #D4AF37 0%, transparent 60%)",
                    clipPath: "polygon(100% 0, 100% 100%, 0 0)",
                  }}
                />

                <div className="p-6">
                  {/* Icon */}
                  <div className="text-3xl mb-3">{b.icon}</div>

                  {/* Title & count */}
                  <h3 className="text-white font-black text-lg leading-tight mb-1">
                    {b.title}
                  </h3>
                  <p className="text-[#D4AF37] text-xs font-bold uppercase tracking-widest mb-3">
                    {b.count}
                  </p>

                  {/* Expandable detail */}
                  <div
                    style={{
                      maxHeight: isHovered ? "200px" : "0px",
                      opacity: isHovered ? 1 : 0,
                      overflow: "hidden",
                      transition: "max-height 0.35s ease, opacity 0.3s ease",
                    }}
                  >
                    <p className="text-[#9CA3AF] text-sm leading-relaxed mb-4">
                      {b.detail}
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {b.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-[10px] font-bold px-2.5 py-1 rounded uppercase tracking-wider"
                          style={{
                            background: "rgba(212,175,55,0.12)",
                            color: "#D4AF37",
                            border: "1px solid rgba(212,175,55,0.25)",
                          }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Collapsed hint */}
                  <div
                    style={{
                      opacity: isHovered ? 0 : 1,
                      transition: "opacity 0.2s ease",
                    }}
                  >
                    <p className="text-[#4B5563] text-xs mt-2">Hover to learn more →</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="mt-14 text-center">
          <p className="text-[#6B7280] text-sm mb-6">
            Are you a new dealer or looking to start sourcing from Chennai&apos;s largest electronics wholesale hub?
          </p>
          <a
            href="/contact"
            className="btn-gold inline-block"
          >
            Become a Dealer Partner
          </a>
        </div>
      </div>
    </section>
  );
}
