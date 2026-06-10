"use client";

import { useState } from "react";
import { CheckCircle, Package, Building2, Phone, MessageSquare, Users } from "lucide-react";

const BENEFITS = [
  { icon: <Package className="w-4 h-4" />, text: "Bulk order discounts" },
  { icon: <Building2 className="w-4 h-4" />, text: "Business invoice & GST" },
  { icon: <CheckCircle className="w-4 h-4" />, text: "Genuine brand warranty" },
  { icon: <Users className="w-4 h-4" />, text: "Dedicated account manager" },
  { icon: <Phone className="w-4 h-4" />, text: "Priority phone support" },
  { icon: <MessageSquare className="w-4 h-4" />, text: "WhatsApp order tracking" },
];

const PRODUCTS = [
  "Laptops & Desktops",
  "Smart TVs",
  "CCTV & Security Systems",
  "Smartphones & Tablets",
  "Networking Equipment",
  "Printers & Scanners",
  "Home Appliances",
  "UPS & Power Products",
  "IT Accessories",
  "Other",
];

type FormData = {
  name: string;
  company: string;
  phone: string;
  product: string;
  quantity: string;
  message: string;
};

export default function BulkQuoteForm() {
  const [form, setForm] = useState<FormData>({
    name: "",
    company: "",
    phone: "",
    product: "",
    quantity: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // Build WhatsApp message
    const msg = encodeURIComponent(
      `*Bulk Quote Request — Sri Ganesh Enterprises*\n\n` +
        `👤 Name: ${form.name}\n` +
        `🏢 Company: ${form.company}\n` +
        `📞 Phone: ${form.phone}\n` +
        `📦 Product: ${form.product}\n` +
        `🔢 Quantity: ${form.quantity}\n` +
        `💬 Message: ${form.message}`
    );
    window.open(`https://wa.me/919150310876?text=${msg}`, "_blank");
    setSubmitted(true);
  }

  return (
    <section
      className="section-dark py-20 px-4 relative overflow-hidden"
      aria-label="Bulk quote request form"
    >
      {/* Background texture */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(#D4AF37 1px, transparent 1px), linear-gradient(90deg, #D4AF37 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
        }}
      />

      {/* Diagonal gold accent */}
      <div
        className="absolute top-0 right-0 w-64 h-64 pointer-events-none opacity-5"
        style={{
          background: "linear-gradient(225deg, #D4AF37 0%, transparent 60%)",
          clipPath: "polygon(100% 0, 100% 100%, 0 0)",
        }}
      />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-14">
          <p className="text-[10px] font-bold text-[#D4AF37] uppercase tracking-[0.3em] mb-3">
            ━━ Request For Quotation ━━
          </p>
          <h2 className="text-4xl font-black text-white leading-tight">
            Get <span className="gold-shimmer">Wholesale Pricing</span>
          </h2>
          <p className="text-[#6B7280] text-sm mt-3 max-w-lg mx-auto leading-relaxed">
            Fill in your requirement below. Our wholesale team will respond with
            the best bulk pricing within 2 hours on business days.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">

          {/* Left — Benefits panel */}
          <div className="lg:col-span-2">
            <div
              className="rounded-xl p-7"
              style={{ background: "#1A2233", border: "1px solid #1F2937" }}
            >
              <h3 className="text-white font-black text-lg mb-1">
                Why Request a Quote?
              </h3>
              <p className="text-[#6B7280] text-sm mb-6 leading-relaxed">
                Wholesale buyers get pricing that isn&apos;t listed online. Submit
                your requirement and unlock dealer-exclusive rates.
              </p>

              <div className="space-y-4">
                {BENEFITS.map((b, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div
                      className="w-8 h-8 rounded flex items-center justify-center shrink-0"
                      style={{ background: "rgba(212,175,55,0.1)", color: "#D4AF37" }}
                    >
                      {b.icon}
                    </div>
                    <span className="text-[#D1D5DB] text-sm font-medium">{b.text}</span>
                  </div>
                ))}
              </div>

              <div
                className="mt-8 p-4 rounded-lg"
                style={{ background: "rgba(220,38,38,0.08)", border: "1px solid rgba(220,38,38,0.2)" }}
              >
                <p className="text-[#DC2626] font-bold text-sm mb-1">📞 Call Directly</p>
                <p className="text-white font-black text-xl">+91 91503 10876</p>
                <p className="text-[#6B7280] text-xs mt-1">Mon–Sat · 9:30 AM – 7:00 PM</p>
              </div>

              <div
                className="mt-4 p-4 rounded-lg"
                style={{ background: "rgba(212,175,55,0.06)", border: "1px solid rgba(212,175,55,0.2)" }}
              >
                <p className="text-[#D4AF37] font-bold text-sm mb-1">📍 Visit Showroom</p>
                <p className="text-[#D1D5DB] text-xs leading-relaxed">
                  No.18/19 Meeran Sahib Street, 1st Floor,<br />
                  UNO Arcade Complex, Shop No: F49,<br />
                  Chennai – 600002
                </p>
              </div>
            </div>
          </div>

          {/* Right — Form */}
          <div className="lg:col-span-3">
            {submitted ? (
              <div
                className="rounded-xl p-10 flex flex-col items-center justify-center text-center gap-4"
                style={{
                  background: "#1A2233",
                  border: "1px solid #D4AF37",
                  minHeight: 400,
                }}
              >
                <div className="text-5xl mb-2">🎉</div>
                <h3 className="text-white font-black text-2xl">Quote Sent via WhatsApp!</h3>
                <p className="text-[#6B7280] text-sm max-w-sm leading-relaxed">
                  Your bulk quote request has been sent to our wholesale team.
                  We&apos;ll respond with pricing within 2 business hours.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="btn-gold mt-2 text-sm"
                >
                  Submit Another Request
                </button>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="rounded-xl p-7 space-y-5"
                style={{ background: "#1A2233", border: "1px solid #1F2937" }}
              >
                {/* Row 1 */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#9CA3AF] uppercase tracking-widest mb-2">
                      Full Name *
                    </label>
                    <input
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      required
                      placeholder="Your name"
                      className="rfq-input"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#9CA3AF] uppercase tracking-widest mb-2">
                      Company / Shop Name *
                    </label>
                    <input
                      name="company"
                      value={form.company}
                      onChange={handleChange}
                      required
                      placeholder="Company or shop name"
                      className="rfq-input"
                    />
                  </div>
                </div>

                {/* Row 2 */}
                <div>
                  <label className="block text-xs font-bold text-[#9CA3AF] uppercase tracking-widest mb-2">
                    Phone Number *
                  </label>
                  <input
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    required
                    type="tel"
                    placeholder="+91 XXXXX XXXXX"
                    className="rfq-input"
                  />
                </div>

                {/* Row 3 */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#9CA3AF] uppercase tracking-widest mb-2">
                      Product Category *
                    </label>
                    <select
                      name="product"
                      value={form.product}
                      onChange={handleChange}
                      required
                      className="rfq-input"
                    >
                      <option value="" disabled>Select category</option>
                      {PRODUCTS.map((p) => (
                        <option key={p} value={p}>{p}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#9CA3AF] uppercase tracking-widest mb-2">
                      Quantity / Requirement
                    </label>
                    <input
                      name="quantity"
                      value={form.quantity}
                      onChange={handleChange}
                      placeholder="e.g. 50 laptops, 10 units"
                      className="rfq-input"
                    />
                  </div>
                </div>

                {/* Row 4 */}
                <div>
                  <label className="block text-xs font-bold text-[#9CA3AF] uppercase tracking-widest mb-2">
                    Detailed Requirement
                  </label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    rows={4}
                    placeholder="Brand preference, specs, delivery timeline, etc."
                    className="rfq-input resize-none"
                  />
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  className="btn-red w-full text-base py-4 flex items-center justify-center gap-2 font-black tracking-widest uppercase"
                >
                  <MessageSquare className="w-4 h-4" />
                  Get Wholesale Pricing via WhatsApp
                </button>

                <p className="text-center text-[#4B5563] text-xs">
                  By submitting, you agree to be contacted by our wholesale team.
                  Your information is kept confidential.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
