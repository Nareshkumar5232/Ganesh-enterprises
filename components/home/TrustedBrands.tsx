const BRANDS = [
  { name: "SAMSUNG",  color: "#1428A0", size: "20px", weight: "800" },
  { name: "LG",       color: "#A50034", size: "26px", weight: "900", serif: true },
  { name: "DELL",     color: "#007DB8", size: "20px", weight: "800" },
  { name: "HP",       color: "#0096D6", size: "24px", weight: "900" },
  { name: "Lenovo",   color: "#E2231A", size: "19px", weight: "700" },
  { name: "ASUS",     color: "#00539B", size: "20px", weight: "800" },
  { name: "acer",     color: "#83B81A", size: "21px", weight: "800" },
  { name: "Mi",       color: "#FF6900", size: "24px", weight: "900" },
  { name: "Canon",    color: "#B91C1C", size: "19px", weight: "700", serif: true },
  { name: "EPSON",    color: "#003087", size: "19px", weight: "800" },
];

export default function TrustedBrands() {
  return (
    <section className="section-white py-14 px-4" aria-label="Trusted brands">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="text-center mb-10">
          <div className="section-divider" />
          <h2 className="text-[26px] font-bold text-[#0F172A]">Trusted by Leading Brands</h2>
        </div>

        {/* Brand logos grid — single row */}
        <div
          className="grid border border-[#E5E7EB] rounded-xl overflow-hidden"
          style={{ gridTemplateColumns: `repeat(${BRANDS.length}, 1fr)` }}
        >
          {BRANDS.map((brand, i) => (
            <div
              key={brand.name}
              className={[
                "brand-cell",
                i < BRANDS.length - 1 ? "border-r border-[#E5E7EB]" : "",
              ].join(" ")}
            >
              <span
                className="select-none transition-transform duration-150 hover:scale-105"
                style={{
                  color: brand.color,
                  fontSize: brand.size,
                  fontWeight: brand.weight,
                  fontFamily: brand.serif ? "Georgia, serif" : "'Poppins', sans-serif",
                  letterSpacing: "-0.02em",
                  lineHeight: 1,
                }}
              >
                {brand.name}
              </span>
            </div>
          ))}
        </div>

        {/* Secondary brand tags */}
        <div className="flex flex-wrap justify-center gap-2 mt-5">
          {["Xiaomi", "Realme", "OnePlus", "Sony", "Panasonic", "Bosch", "Whirlpool", "Daikin", "D-Link", "TP-Link", "Hikvision", "CP Plus", "Cisco", "Apple"].map((b) => (
            <span key={b}
              className="text-[12px] font-medium text-[#6B7280] px-3 py-1 border border-[#E5E7EB] rounded-full bg-white hover:border-[#B91C1C] hover:text-[#B91C1C] transition-colors cursor-pointer">
              {b}
            </span>
          ))}
          <span className="text-[12px] font-semibold text-[#B91C1C] px-3 py-1">+ 80 more brands</span>
        </div>
      </div>
    </section>
  );
}
