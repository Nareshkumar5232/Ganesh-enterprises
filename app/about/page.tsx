import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "About Sri Ganesh Enterprises | Electronics, Computers & IT Products",
  description: "Learn about Sri Ganesh Enterprises Pvt Ltd - your trusted partner for electronics, computers, IT accessories, networking products, and technology solutions in Chennai.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Hero Section */}
      <section className="pt-28 pb-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          {/* Large Logo */}
          <div className="mb-8 flex justify-center">
            <Image
              src="/images/logo.svg"
              alt="Sri Ganesh Enterprises"
              width={400}
              height={224}
              className="w-full max-w-xs md:max-w-md h-auto"
              priority
            />
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-6 text-[#DC2626] tracking-tight">
            About Sri Ganesh Enterprises
          </h1>
          <p className="text-lg text-gray-400 mb-8 leading-relaxed">
            Your Trusted Partner for Electronics, Computers &amp; IT Products
          </p>
        </div>
      </section>

      {/* Company Overview */}
      <section className="py-16 px-4 bg-white/5 dark:bg-black/20 border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6 text-white tracking-tight">Who We Are</h2>
              <p className="text-gray-400 mb-4 leading-relaxed">
                Sri Ganesh Enterprises Pvt Ltd is Chennai's trusted partner for electronics, computers, IT accessories, networking products, and technology solutions. We have been serving customers with quality products and exceptional service since our establishment.
              </p>
              <p className="text-gray-400 leading-relaxed">
                With a commitment to excellence, genuine brands, and expert support, we ensure every customer finds the perfect solution for their needs.
              </p>
            </div>
            <div className="flex justify-center">
              <div className="w-full h-80 bg-gradient-to-br from-[#DC2626]/10 via-[#F59E0B]/5 to-transparent rounded-lg flex items-center justify-center border border-[#DC2626]/10 relative group overflow-hidden">
                <div className="absolute inset-0 bg-[#DC2626]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <span className="text-gray-400 dark:text-gray-300 font-semibold relative z-10 transition-colors group-hover:text-white">Premium Quality Products</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 px-4 border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center text-white tracking-tight">Why Choose Us</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Quality Products",
                description: "We offer only genuine brands and premium quality electronics, computers, and IT solutions.",
              },
              {
                title: "Expert Support",
                description: "Our knowledgeable team is always ready to help you choose the right product.",
              },
              {
                title: "Fast Delivery",
                description: "Quick and reliable delivery across Chennai and nearby areas.",
              },
              {
                title: "Competitive Pricing",
                description: "Best prices on premium products with regular offers and discounts.",
              },
              {
                title: "Customer Service",
                description: "24/7 WhatsApp support for all your inquiries and concerns.",
              },
              {
                title: "Warranty & Support",
                description: "Genuine products with proper warranty and after-sales support.",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="p-6 bg-white/5 dark:bg-black/20 rounded-xl border border-white/10 hover:border-[#DC2626]/50 hover:shadow-[0_0_15px_rgba(220,38,38,0.1)] transition-all duration-300"
              >
                <h3 className="text-xl font-bold text-[#F59E0B] mb-3">
                  {item.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 px-4 bg-white/5 dark:bg-black/20 border-t border-white/5">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8 text-white tracking-tight">Get In Touch</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="p-6 bg-black/40 rounded-xl border border-white/5">
              <h3 className="text-[#DC2626] text-lg font-bold mb-4 uppercase tracking-wider">Contact Information</h3>
              <p className="text-gray-300 mb-2 leading-relaxed">📞 WhatsApp / Call: +91 91503 10876</p>
              <p className="text-gray-300 mb-2 leading-relaxed">📧 info@sriganeshenterprises.in</p>
              <p className="text-gray-300 leading-relaxed">📧 contact@sriganeshenterprises.in</p>
            </div>
            <div className="p-6 bg-black/40 rounded-xl border border-white/5">
              <h3 className="text-[#DC2626] text-lg font-bold mb-4 uppercase tracking-wider">Location</h3>
              <p className="text-gray-300 leading-relaxed">
                No.18/19 Meeran Sahib Street, 1st Floor,<br />
                UNO Arcade Complex, Shop No: F49,<br />
                Chennai - 600002
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
