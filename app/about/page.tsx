import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "About Sri Ganesh Enterprises | Electronics, Computers & IT Products",
  description: "Learn about Sri Ganesh Enterprises ENTERPRISES PVT LTD - your trusted partner for electronics, computers, IT accessories, networking products, and technology solutions in Chennai.",
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
              src="/images/logo.png"
              alt="Sri Ganesh Enterprises ENTERPRISES"
              width={400}
              height={224}
              className="w-full max-w-xs md:max-w-md h-auto"
              priority
            />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-[#9EFF00]">
            About Sri Ganesh Enterprises ENTERPRISES
          </h1>
          <p className="text-lg text-gray-400 mb-8">
            Your Trusted Partner for Electronics, Computers & IT Products
          </p>
        </div>
      </section>

      {/* Company Overview */}
      <section className="py-16 px-4 bg-white/5 dark:bg-black/20">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6 text-white">Who We Are</h2>
              <p className="text-gray-400 mb-4 leading-relaxed">
                Sri Ganesh Enterprises ENTERPRISES PVT LTD is Chennai's trusted partner for electronics, computers, IT accessories, networking products, and technology solutions. We have been serving customers with quality products and exceptional service since our establishment.
              </p>
              <p className="text-gray-400 leading-relaxed">
                With a commitment to excellence, genuine brands, and expert support, we ensure every customer finds the perfect solution for their needs.
              </p>
            </div>
            <div className="flex justify-center">
              <div className="w-full h-80 bg-gradient-to-br from-[#9EFF00]/20 to-transparent rounded-lg flex items-center justify-center border border-[#9EFF00]/20">
                <span className="text-gray-500">Premium Quality Products</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center text-white">Why Choose Us</h2>
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
                className="p-6 bg-white/5 dark:bg-black/20 rounded-lg border border-[#9EFF00]/20 hover:border-[#9EFF00]/50 transition-colors duration-300"
              >
                <h3 className="text-xl font-semibold text-[#9EFF00] mb-3">
                  {item.title}
                </h3>
                <p className="text-gray-400">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 px-4 bg-white/5 dark:bg-black/20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8 text-white">Get In Touch</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="p-6 bg-black/40 rounded-lg">
              <h3 className="text-[#9EFF00] text-lg font-semibold mb-4">Contact Information</h3>
              <p className="text-gray-400 mb-2">📞 WhatsApp: +91 9342698344</p>
              <p className="text-gray-400 mb-4">📞 WhatsApp: +91 9342798344</p>
              <p className="text-gray-400 mb-4">🏢 OFFICE: 044-3154 4571 &amp; 044-3539 5138</p>
              <p className="text-gray-400 mb-2">📧 care@alhikmath.com</p>
              <p className="text-gray-400">📧 info@alhikmath.com</p>
            </div>
            <div className="p-6 bg-black/40 rounded-lg">
              <h3 className="text-[#9EFF00] text-lg font-semibold mb-4">Location</h3>
              <p className="text-gray-400">
                No. 16/127, Inbharajapuram 1st Street,<br />
                Bajanai Kovil Street, Choolaimedu - 600094,<br />
                Chennai, Tamil Nadu, India
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
