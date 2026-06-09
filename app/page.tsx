import type { Metadata } from "next";
import HeroSection       from "@/components/home/HeroSection";
import StatsSection      from "@/components/home/StatsSection";
import CategorySection   from "@/components/home/CategorySection";
import WhyChooseUs       from "@/components/home/WhyChooseUs";
import FeaturedProducts  from "@/components/home/FeaturedProducts";
import TrustedBrands     from "@/components/home/TrustedBrands";
import Testimonials      from "@/components/home/Testimonials";
import CTABanner         from "@/components/home/CTABanner";
import NewsletterSection from "@/components/home/NewsletterSection";

export const metadata: Metadata = {
  title: "Sri Ganesh Enterprises ENTERPRISES PVT LTD | Wholesale Electronics Distributor Chennai",
  description:
    "Wholesale electronics distributor in Chennai supplying genuine computers, laptops, networking equipment, security systems, mobile devices and home appliances to retailers and businesses. 100+ brands, 5000+ products.",
  keywords: [
    "wholesale electronics distributor Chennai",
    "bulk electronics supply",
    "computers networking laptops wholesale",
    "CCTV security systems Chennai",
    "Sri Ganesh Enterprises enterprises",
  ],
};

export default function HomePage() {
  return (
    <>
      {/* White → Gray → White → Gray → White → Gray → White → Gray → White */}
      <HeroSection />
      <StatsSection />
      <CategorySection />
      <WhyChooseUs />
      <FeaturedProducts />
      <TrustedBrands />
      <Testimonials />
      <CTABanner />
      <NewsletterSection />
    </>
  );
}
