import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ProductImageGallery from '@/components/product-details/ImageGallery';
import { ProductCard } from '@/components/products/ProductCard';
import ProductDetailsClient from './ProductDetailsClient';
import { getProduct, getProducts, normalizeProduct } from '@/services/products';
import type { Product } from '@/types';

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProduct(slug);

  if (!product) {
    return {
      title: "Product Not Found | Sri Ganesh Enterprises ENTERPRISES",
      description: "The requested product could not be loaded from the backend.",
    };
  }

  return {
    title: `${product.name} | Sri Ganesh Enterprises ENTERPRISES`,
    description: product.shortDescription || product.description,
    openGraph: {
      title: `${product.name} | Sri Ganesh Enterprises ENTERPRISES`,
      description: product.shortDescription || product.description,
      images: product.images?.[0] ? [{ url: product.images[0] }] : [],
    },
  };
}

export default async function ProductDetailsPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = await getProduct(slug);

  if (!product) {
    notFound();
  }

  const relatedCatalog = await getProducts({ category: product.category, limit: 20 });
  const relatedProducts = relatedCatalog.products
    .map(normalizeProduct)
    .filter((relatedProduct) => relatedProduct.id !== product.id)
    .slice(0, 4);

  return (
    <div className="bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12">
          {/* Product Image Gallery */}
          <ProductImageGallery images={product.images} productName={product.name} />

          {/* Product Info */}
          <ProductDetailsClient product={product} />
        </div>

        {/* Related Products */}
        <div className="mt-24">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl text-center mb-12">
            You Might Also Like
          </h2>
          <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            {relatedProducts.map((relatedProduct) => (
              <ProductCard key={relatedProduct.id} product={relatedProduct} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
