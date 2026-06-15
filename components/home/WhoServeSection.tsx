const SERVE = [
  {
    id: "retail",
    name: "Retail Shops",
    icon: (
      <svg viewBox="0 0 40 40" className="w-9 h-9" fill="none" stroke="#B91C1C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 16l4-10h24l4 10" />
        <rect x="4" y="16" width="32" height="20" rx="2" />
        <rect x="16" y="24" width="8" height="12" />
        <path d="M4 16h32" />
        <circle cx="12" cy="13" r="1" fill="#B91C1C" />
        <circle cx="28" cy="13" r="1" fill="#B91C1C" />
      </svg>
    ),
  },
  {
    id: "corporate",
    name: "Corporate Offices",
    icon: (
      <svg viewBox="0 0 40 40" className="w-9 h-9" fill="none" stroke="#B91C1C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="6" y="4" width="28" height="32" rx="2" />
        <rect x="10" y="10" width="6" height="6" rx="1" />
        <rect x="24" y="10" width="6" height="6" rx="1" />
        <rect x="10" y="22" width="6" height="6" rx="1" />
        <rect x="24" y="22" width="6" height="6" rx="1" />
        <rect x="17" y="30" width="6" height="6" />
      </svg>
    ),
  },
  {
    id: "schools",
    name: "Schools & Colleges",
    icon: (
      <svg viewBox="0 0 40 40" className="w-9 h-9" fill="none" stroke="#B91C1C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 18L20 8l16 10v18H4z" />
        <rect x="14" y="26" width="12" height="10" />
        <rect x="10" y="18" width="6" height="6" />
        <rect x="24" y="18" width="6" height="6" />
        <line x1="20" y1="8" x2="20" y2="4" />
        <line x1="17" y1="4" x2="23" y2="4" />
      </svg>
    ),
  },
  {
    id: "govt",
    name: "Government Offices",
    icon: (
      <svg viewBox="0 0 40 40" className="w-9 h-9" fill="none" stroke="#B91C1C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 18L20 6l16 12" />
        <rect x="6" y="18" width="28" height="18" rx="1" />
        <line x1="4" y1="36" x2="36" y2="36" />
        <rect x="14" y="24" width="5" height="12" />
        <rect x="21" y="24" width="5" height="12" />
        <circle cx="20" cy="13" r="2" />
      </svg>
    ),
  },
  {
    id: "si",
    name: "System Integrators",
    icon: (
      <svg viewBox="0 0 40 40" className="w-9 h-9" fill="none" stroke="#B91C1C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="20" cy="20" r="6" />
        <circle cx="8"  cy="10" r="3" />
        <circle cx="32" cy="10" r="3" />
        <circle cx="8"  cy="30" r="3" />
        <circle cx="32" cy="30" r="3" />
        <line x1="11" y1="12" x2="16" y2="16" />
        <line x1="29" y1="12" x2="24" y2="16" />
        <line x1="11" y1="28" x2="16" y2="24" />
        <line x1="29" y1="28" x2="24" y2="24" />
      </svg>
    ),
  },
  {
    id: "dealers",
    name: "Dealers & Resellers",
    icon: (
      <svg viewBox="0 0 40 40" className="w-9 h-9" fill="none" stroke="#B91C1C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 20L20 4l14 16" />
        <rect x="10" y="20" width="8" height="16" />
        <rect x="22" y="24" width="8" height="12" />
        <path d="M14 20v-4" /><path d="M26 24v-4" />
        <line x1="4" y1="36" x2="36" y2="36" />
      </svg>
    ),
  },
];

export default function WhoServeSection() {
  return (
    <section className="section-white py-14 px-4 lg:px-6" aria-label="Who we serve">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="text-center mb-10">
          <div className="section-divider" />
          <h2 className="text-[26px] font-bold text-[#0F172A]">Who We Serve</h2>
        </div>

        {/* One-row grid — 6 cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {SERVE.map((s) => (
            <div key={s.id} className="serve-card">
              <div className="w-16 h-16 rounded-xl bg-[#FEF2F2] flex items-center justify-center shrink-0">
                {s.icon}
              </div>
              <span className="text-[13px] font-semibold text-[#0F172A] text-center leading-tight">
                {s.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
