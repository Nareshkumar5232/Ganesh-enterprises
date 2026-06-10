import type { Metadata } from "next";
import HeroSection       from "@/components/home/HeroSection";
import ProductEcosystem  from "@/components/home/ProductEcosystem";
import CategorySection   from "@/components/home/CategorySection";
import TrustedBrands     from "@/components/home/TrustedBrands";
import AboutSection      from "@/components/home/AboutSection";
import WhoServeSection   from "@/components/home/WhoServeSection";

export const metadata: Metadata = {
  title: "Sri Ganesh Enterprises | Wholesale Electronics Distributor Chennai",
  description:
    "Chennai's trusted wholesale electronics distributor. Genuine computers, laptops, TVs, CCTV, networking, mobiles and home appliances at bulk pricing for businesses & dealers.",
  keywords: [
    "wholesale electronics Chennai",
    "bulk electronics supplier",
    "computers laptops wholesale Chennai",
    "CCTV security systems wholesale",
    "Samsung LG Sony wholesale dealer",
    "electronics distributor Tamil Nadu",
    "Sri Ganesh Enterprises",
  ],
};

export default function HomePage() {
  return (
    <>
      {/* 1. Hero — full screen */}
      <HeroSection />

      {/* 1.5. Product Ecosystem Showcase */}
      <ProductEcosystem />

      {/* 2. Shop by Category */}
      <CategorySection />

      {/* 3. Trusted by Leading Brands */}
      <TrustedBrands />

      {/* 4. About Sri Ganesh Enterprises */}
      <AboutSection />

      {/* 5. Who We Serve */}
      <WhoServeSection />
    </>
  );
}
