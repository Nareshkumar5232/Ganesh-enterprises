"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";

/* SVG product icons rendered inline for the orbital carousel */
const PRODUCTS = [
  {
    id: "tv",
    label: "Smart TV",
    angle: 0,
    icon: (
      <svg viewBox="0 0 48 48" className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="4" y="6" width="40" height="28" rx="3" />
        <polyline points="14,42 24,34 34,42" />
        <line x1="14" y1="42" x2="34" y2="42" />
      </svg>
    ),
  },
  {
    id: "laptop",
    label: "Laptop",
    angle: 60,
    icon: (
      <svg viewBox="0 0 48 48" className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="8" y="8" width="32" height="22" rx="2" />
        <path d="M2 38h44l-4-8H6z" />
      </svg>
    ),
  },
  {
    id: "mobile",
    label: "Mobile",
    angle: 120,
    icon: (
      <svg viewBox="0 0 48 48" className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="14" y="4" width="20" height="40" rx="4" />
        <circle cx="24" cy="38" r="1.5" fill="currentColor" />
      </svg>
    ),
  },
  {
    id: "printer",
    label: "Printer",
    angle: 180,
    icon: (
      <svg viewBox="0 0 48 48" className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="10" y="16" width="28" height="18" rx="3" />
        <path d="M14 16V8h20v8" />
        <rect x="16" y="28" width="16" height="10" />
        <line x1="18" y1="23" x2="22" y2="23" />
      </svg>
    ),
  },
  {
    id: "networking",
    label: "Networking",
    angle: 240,
    icon: (
      <svg viewBox="0 0 48 48" className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="4" y="20" width="40" height="10" rx="2" />
        <circle cx="10" cy="25" r="1.5" fill="currentColor" />
        <circle cx="16" cy="25" r="1.5" fill="currentColor" />
        <line x1="24" y1="20" x2="24" y2="14" />
        <path d="M18 14 Q24 8 30 14" strokeWidth="2.5" fill="none" />
        <path d="M12 14 Q24 4 36 14" strokeWidth="2.5" fill="none" />
      </svg>
    ),
  },
  {
    id: "cctv",
    label: "CCTV",
    angle: 300,
    icon: (
      <svg viewBox="0 0 48 48" className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M8 20l24-8v16L8 20z" />
        <rect x="30" y="14" width="10" height="12" rx="2" />
        <line x1="8" y1="20" x2="4" y2="20" />
        <line x1="4" y1="16" x2="4" y2="36" />
        <circle cx="40" cy="16" r="2" fill="currentColor" />
      </svg>
    ),
  },
];

export default function ShowroomEntrance() {
  const [entered, setEntered] = useState(false);
  const [angle, setAngle] = useState(0);
  const rafRef = useRef<number | null>(null);
  const lastRef = useRef<number>(0);
  const ORBIT_R = 160;

  useEffect(() => {
    // Trigger entrance animation
    const t = setTimeout(() => setEntered(true), 100);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    // Smooth CSS-driven rotation via RAF for JS angle
    let running = true;
    const tick = (ts: number) => {
      if (!running) return;
      const delta = ts - lastRef.current;
      lastRef.current = ts;
      setAngle((prev) => (prev + delta * 0.008) % 360); // ~0.5 RPM
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame((ts) => {
      lastRef.current = ts;
      rafRef.current = requestAnimationFrame(tick);
    });
    return () => {
      running = false;
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  function getOrbitPos(baseAngle: number, orbitAngle: number) {
    const rad = ((baseAngle + orbitAngle) * Math.PI) / 180;
    const x = Math.cos(rad) * ORBIT_R;
    const y = Math.sin(rad) * ORBIT_R * 0.45; // flatten to ellipse
    return { x, y };
  }

  return (
    <section
      className="relative min-h-screen bg-[#111827] flex flex-col items-center justify-center overflow-hidden"
      aria-label="Showroom entrance"
    >
      {/* Background grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `
            linear-gradient(#D4AF37 1px, transparent 1px),
            linear-gradient(90deg, #D4AF37 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Radial glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div
          className="w-[600px] h-[600px] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(212,175,55,0.08) 0%, rgba(220,38,38,0.04) 40%, transparent 70%)",
          }}
        />
      </div>

      {/* Logo / header */}
      <div
        className={`relative z-10 flex flex-col items-center transition-all duration-1000 ${
          entered ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-8"
        }`}
      >
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded bg-[#DC2626] flex items-center justify-center">
            <span className="text-white font-black text-xl leading-none">G</span>
          </div>
          <div className="flex flex-col leading-none">
            <span className="text-white font-bold text-xl tracking-tight">
              Sri Ganesh Enterprises
            </span>
            <span className="text-[#D4AF37] text-[10px] tracking-[0.25em] uppercase font-semibold">
              Wholesale Electronics · Est. Chennai
            </span>
          </div>
        </div>
      </div>

      {/* ── Orbital product showcase ── */}
      <div className="relative z-10 my-8" style={{ width: 380, height: 380 }}>
        {/* Orbit ring */}
        <div
          className="absolute inset-0 rounded-full border border-[#D4AF37]/20"
          style={{ top: "27.5%", bottom: "27.5%", left: 0, right: 0 }}
        />

        {/* Center label */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center z-10 pointer-events-none">
          <div
            className="w-28 h-28 rounded-full bg-[#111827] border-2 border-[#D4AF37]/40 flex items-center justify-center"
            style={{ boxShadow: "0 0 40px rgba(212,175,55,0.15)" }}
          >
            <div className="flex flex-col items-center gap-0.5">
              <span className="text-[#D4AF37] text-xs font-bold tracking-[0.2em] uppercase">5000+</span>
              <span className="text-white text-[10px] tracking-[0.1em] uppercase text-center leading-tight">Products<br />In Stock</span>
            </div>
          </div>
        </div>

        {/* Orbiting product icons */}
        {PRODUCTS.map((p) => {
          const pos = getOrbitPos(angle, p.angle);
          return (
            <div
              key={p.id}
              className="absolute z-20 flex flex-col items-center gap-1 transition-none"
              style={{
                left: "50%",
                top: "50%",
                transform: `translate(calc(-50% + ${pos.x}px), calc(-50% + ${pos.y}px))`,
              }}
            >
              <div
                className="w-14 h-14 rounded-full bg-[#1F2937] border border-[#374151] flex items-center justify-center text-[#D4AF37] hover:border-[#D4AF37] hover:bg-[#111827] transition-colors cursor-default"
                style={{ boxShadow: "0 4px 16px rgba(0,0,0,0.3)" }}
                title={p.label}
              >
                {p.icon}
              </div>
              <span className="text-[#9CA3AF] text-[9px] uppercase tracking-widest font-semibold whitespace-nowrap">
                {p.label}
              </span>
            </div>
          );
        })}
      </div>

      {/* ── Center text block ── */}
      <div
        className={`relative z-10 text-center max-w-xl px-6 transition-all duration-1000 delay-300 ${
          entered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <p className="text-[#6B7280] text-xs uppercase tracking-[0.3em] font-semibold mb-3">
          ━━ Welcome to ━━
        </p>
        <h1 className="text-3xl sm:text-4xl font-black text-white leading-tight mb-2">
          Chennai&apos;s Electronics{" "}
          <span className="gold-shimmer">Wholesale Marketplace</span>
        </h1>
        <p className="text-[#6B7280] text-sm mt-3 mb-8 leading-relaxed">
          100+ Brands · Genuine Products · Bulk Pricing · Dealer Support
        </p>

        <div className="flex items-center justify-center gap-4 flex-wrap">
          <Link href="/products" className="btn-gold text-sm">
            Enter Showroom
          </Link>
          <Link href="/contact" className="btn-red text-sm">
            Request Bulk Quote
          </Link>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10">
        <span className="text-[#6B7280] text-[10px] uppercase tracking-widest">Scroll to explore</span>
        <ChevronDown className="w-4 h-4 text-[#D4AF37] animate-bounce" />
      </div>

      {/* Corner accent lines */}
      <div className="absolute top-0 left-0 w-24 h-24 pointer-events-none">
        <div className="absolute top-6 left-6 w-12 h-0.5 bg-[#D4AF37]/40" />
        <div className="absolute top-6 left-6 w-0.5 h-12 bg-[#D4AF37]/40" />
      </div>
      <div className="absolute top-0 right-0 w-24 h-24 pointer-events-none">
        <div className="absolute top-6 right-6 w-12 h-0.5 bg-[#D4AF37]/40" />
        <div className="absolute top-6 right-6 w-0.5 h-12 bg-[#D4AF37]/40" />
      </div>
      <div className="absolute bottom-0 left-0 w-24 h-24 pointer-events-none">
        <div className="absolute bottom-6 left-6 w-12 h-0.5 bg-[#DC2626]/30" />
        <div className="absolute bottom-6 left-6 w-0.5 h-12 bg-[#DC2626]/30" />
      </div>
      <div className="absolute bottom-0 right-0 w-24 h-24 pointer-events-none">
        <div className="absolute bottom-6 right-6 w-12 h-0.5 bg-[#DC2626]/30" />
        <div className="absolute bottom-6 right-6 w-0.5 h-12 bg-[#DC2626]/30" />
      </div>
    </section>
  );
}
