const BRANDS = [
  { name: "Samsung", logoUrl: "https://upload.wikimedia.org/wikipedia/commons/2/24/Samsung_Logo.svg" },
  { name: "LG", logoUrl: "https://upload.wikimedia.org/wikipedia/commons/b/bf/LG_logo_%282015%29.svg" },
  { name: "Dell", logoUrl: "https://upload.wikimedia.org/wikipedia/commons/1/18/Dell_logo_2016.svg" },
  { name: "HP", logoUrl: "https://upload.wikimedia.org/wikipedia/commons/a/ad/HP_logo_2012.svg" },
  { name: "Lenovo", logoUrl: "https://upload.wikimedia.org/wikipedia/commons/b/b8/Lenovo_logo.svg" },
  { name: "Asus", logoUrl: "https://upload.wikimedia.org/wikipedia/commons/2/2e/ASUS_Logo.svg" },
  { name: "Acer", logoUrl: "https://upload.wikimedia.org/wikipedia/commons/8/8b/Acer_2011.svg" },
  { name: "Mi", logoUrl: "https://upload.wikimedia.org/wikipedia/commons/a/ae/Xiaomi_logo_%282021%29.svg" },
  { name: "Canon", logoUrl: "https://upload.wikimedia.org/wikipedia/commons/b/bd/Canon_logo.svg" },
  { name: "Epson", logoUrl: "https://upload.wikimedia.org/wikipedia/commons/4/4f/Epson_logo.svg" },
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

        {/* Brand logos grid — responsive grid */}
        <div className="grid grid-cols-2 sm:grid-cols-5 lg:grid-cols-10 border border-[#E5E7EB] rounded-xl overflow-hidden bg-white">
          {BRANDS.map((brand, i) => (
            <div
              key={brand.name}
              className={[
                "brand-cell",
                i < BRANDS.length - 1 ? "lg:border-r border-[#E5E7EB]" : "",
                "border-b border-[#E5E7EB] lg:border-b-0",
              ].join(" ")}
            >
              <img
                src={brand.logoUrl}
                alt={`${brand.name} Logo`}
                className="h-7 max-w-[80%] object-contain select-none transition-transform duration-150 hover:scale-105"
              />
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
