import type { Metadata } from "next";
import HeroSection      from "@/components/home/HeroSection";
import CategorySection  from "@/components/home/CategorySection";
import TrustedBrands   from "@/components/home/TrustedBrands";
import LiveInventory   from "@/components/home/LiveInventory";
import WholesaleBuyers from "@/components/home/WholesaleBuyers";
import DealerAdvantage from "@/components/home/DealerAdvantage";
import BulkQuoteForm   from "@/components/home/BulkQuoteForm";

export const metadata: Metadata = {
  title: "Sri Ganesh Enterprises | Chennai's Electronics Wholesale Marketplace",
  description:
    "Chennai's largest wholesale electronics distributor. Genuine computers, laptops, TVs, CCTV, networking, mobile devices and home appliances at bulk pricing. 100+ brands, 5000+ products in stock.",
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
      {/* ── Hero (matches image exactly) ── */}
      <HeroSection />

      {/* ── Shop by Category ── */}
      <CategorySection />

      {/* ── Trusted by Leading Brands ── */}
      <TrustedBrands />

      {/* ── Live Inventory Board ── */}
      <LiveInventory />

      {/* ── Who Buys From Us ── */}
      <WholesaleBuyers />

      {/* ── Dealer Advantage Comparison ── */}
      <DealerAdvantage />

      {/* ── Bulk Quote RFQ Form ── */}
      <BulkQuoteForm />
    </>
  );
}
