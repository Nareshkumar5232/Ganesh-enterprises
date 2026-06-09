import Link from "next/link";
import { Phone, MapPin, Mail, Zap } from "lucide-react";

const QUICK_LINKS = [
  { label: "Home",          href: "/" },
  { label: "Products",      href: "/products" },
  { label: "About Us",      href: "/about" },
  { label: "Contact",       href: "/contact" },
  { label: "Get a Quote",   href: "/contact" },
];

const CATEGORIES = [
  "Computers & IT",
  "Networking Equipment",
  "Security Systems",
  "Mobile Devices",
  "Home Appliances",
  "Electrical Products",
  "Smart Devices",
];

function SocialSVG({ type }: { type: string }) {
  const icons: Record<string, React.ReactNode> = {
    facebook: <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />,
    instagram: (
      <>
        <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
      </>
    ),
    linkedin: (
      <>
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect width="4" height="12" x="2" y="9" />
        <circle cx="4" cy="4" r="2" />
      </>
    ),
    twitter: <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />,
    whatsapp: <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z M12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2 22l4.832-1.438A9.956 9.956 0 0 0 12 22c5.523 0 10-4.477 10-10S17.523 2 12 2z" />,
  };
  return (
    <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor" aria-hidden="true">
      {icons[type]}
    </svg>
  );
}

const SOCIALS = [
  { type: "facebook",  href: "https://facebook.com",              label: "Facebook" },
  { type: "instagram", href: "https://instagram.com",             label: "Instagram" },
  { type: "linkedin",  href: "https://linkedin.com",              label: "LinkedIn" },
  { type: "twitter",   href: "https://twitter.com",               label: "Twitter / X" },
  { type: "whatsapp",  href: "https://wa.me/919342698344",         label: "WhatsApp" },
];

export default function Footer() {
  return (
    <footer className="bg-[#0F172A] text-slate-300">
      {/* Main grid */}
      <div className="max-w-7xl mx-auto px-4 lg:px-6 py-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

        {/* Brand */}
        <div className="flex flex-col gap-5">
          <div>
            <div className="flex items-center gap-2.5 mb-3">
              <div className="w-8 h-8 rounded bg-[#2563EB] flex items-center justify-center shrink-0">
                <Zap className="w-4 h-4 text-white" />
              </div>
              <div className="flex flex-col leading-none">
                <span className="font-bold text-white text-sm tracking-tight">Sri Ganesh Enterprises</span>
                <span className="text-slate-400 text-[10px] tracking-widest uppercase">Enterprises Pvt Ltd</span>
              </div>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed">
              Wholesale electronics distributor supplying genuine computers, networking
              equipment, security systems and home appliances to retailers and businesses
              across Chennai.
            </p>
          </div>
          <div className="flex items-center gap-2">
            {SOCIALS.map((s) => (
              <a key={s.type} href={s.href} target="_blank" rel="noopener noreferrer"
                aria-label={s.label}
                className="w-8 h-8 flex items-center justify-center rounded border border-slate-700 text-slate-400 hover:text-white hover:border-[#2563EB] hover:bg-[#2563EB]/10 transition-all duration-200">
                <SocialSVG type={s.type} />
              </a>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-5">
            Quick Links
          </h4>
          <ul className="flex flex-col gap-2.5">
            {QUICK_LINKS.map((l) => (
              <li key={l.href}>
                <Link href={l.href}
                  className="text-slate-400 text-sm hover:text-white transition-colors duration-150">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Categories */}
        <div>
          <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-5">
            Product Categories
          </h4>
          <ul className="flex flex-col gap-2.5">
            {CATEGORIES.map((c) => (
              <li key={c}>
                <Link href="/products"
                  className="text-slate-400 text-sm hover:text-white transition-colors duration-150">
                  {c}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-5">
            Contact Us
          </h4>
          <ul className="flex flex-col gap-3.5">
            {["+91 9342698344", "+91 9342798344"].map((p) => (
              <li key={p} className="flex items-center gap-2.5">
                <Phone className="w-3.5 h-3.5 text-[#2563EB] shrink-0" />
                <span className="text-slate-400 text-sm">{p}</span>
              </li>
            ))}
            {["044-3154 4571", "044-3539 5138"].map((p) => (
              <li key={p} className="flex items-center gap-2.5">
                <Phone className="w-3.5 h-3.5 text-[#64748B] shrink-0" />
                <span className="text-slate-400 text-sm">{p} (Office)</span>
              </li>
            ))}
            <li className="flex items-start gap-2.5">
              <MapPin className="w-3.5 h-3.5 text-[#2563EB] shrink-0 mt-0.5" />
              <span className="text-slate-400 text-sm leading-relaxed">
                No. 16/127, Inbharajapuram 1st Street,<br />
                Bajanai Kovil Street, Choolaimedu,<br />
                Chennai – 600094
              </span>
            </li>
            <li className="flex items-center gap-2.5">
              <Mail className="w-3.5 h-3.5 text-[#2563EB] shrink-0" />
              <span className="text-slate-400 text-sm">info@alhikmath.com</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 lg:px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} Sri Ganesh Enterprises ENTERPRISES PVT LTD. All rights reserved.</p>
          <p>Wholesale Electronics Distributor · Chennai, Tamil Nadu, India</p>
        </div>
      </div>
    </footer>
  );
}
