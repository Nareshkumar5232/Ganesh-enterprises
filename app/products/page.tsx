import ProductsClient from "@/components/products/ProductsClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Products | Sri Ganesh Enterprises ENTERPRISES",
  description: "Browse our premium selection of electronics, computers, IT accessories, networking products, chargers, earphones, smart devices, and technology solutions.",
};

interface SearchParams {
  q?: string;
  category?: string;
}

interface PageProps {
  searchParams?: Promise<SearchParams> | SearchParams;
}

export default async function ProductsPage({ searchParams }: PageProps) {
  // Resolve searchParams if it is a Promise (Next.js 15+ standard)
  const resolvedParams = searchParams instanceof Promise ? await searchParams : await Promise.resolve(searchParams);
  const q = resolvedParams?.q ?? "";
  const category = resolvedParams?.category ?? "";

  return (
    <ProductsClient
      initialSearchQuery={q}
      initialCategory={category}
    />
  );
}
