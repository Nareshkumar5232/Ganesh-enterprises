import { AxiosError } from "axios";
import { apiClient } from "@/services/api";
import { generateSlug } from "@/lib/utils";
import type { Product, ProductCategory } from "@/types";

export interface ProductApiRecord {
  id: string;
  slug?: string;
  name: string;
  description: string;
  shortDescription?: string;
  category: ProductCategory;
  price: number;
  originalPrice?: number;
  stock: number;
  images?: string[];
  brand?: string;
  rating?: number;
  reviewCount?: number;
  status?: "active" | "inactive";
  isFeatured?: boolean;
  specifications?: Record<string, string>;
  tags?: string[];
  createdAt?: string;
  updatedAt?: string;
}

export interface ProductListResponse {
  products: ProductApiRecord[];
  total: number;
  pages: number;
  currentPage: number;
}

export interface ProductQueryFilters {
  category?: ProductCategory | "all";
  search?: string;
  status?: "active" | "inactive";
  page?: number;
  limit?: number;
  featured?: boolean;
}

export interface ProductMutationPayload {
  name: string;
  description: string;
  category: ProductCategory;
  price: number;
  originalPrice?: number;
  stock: number;
  images?: string[];
  brand?: string;
  status?: "active" | "inactive";
  isFeatured?: boolean;
  specifications?: Record<string, string>;
  tags?: string[];
}

const COLLECTION_PATHS = ["/product"];
const DETAIL_PATHS = (identifier: string) => [
  `/product/${identifier}`,
];

function isEnvelope(value: unknown): value is { products?: ProductApiRecord[]; total?: number; pages?: number; currentPage?: number } {
  return typeof value === "object" && value !== null && "products" in value;
}

function normalizeSlug(product: ProductApiRecord, productId: string) {
  return product.slug || `${generateSlug(product.name || "product")}-${productId}`;
}

export function normalizeProduct(product: ProductApiRecord): Product {
  const productId = product.id || product.slug || generateSlug(product.name || "product");
  const description = product.description || "";

  return {
    id: productId,
    slug: normalizeSlug(product, productId),
    name: product.name,
    description,
    shortDescription: product.shortDescription || description.slice(0, 120),
    price: product.price ?? 0,
    originalPrice: product.originalPrice,
    category: product.category,
    brand: product.brand || "Sri Ganesh Enterprises",
    images: product.images?.length ? product.images : ["/images/placeholder-product.svg"],
    rating: product.rating ?? 0,
    reviewCount: product.reviewCount ?? 0,
    stock: product.stock ?? 0,
    specifications: product.specifications || {},
    tags: product.tags || [],
    isFeatured: product.isFeatured ?? false,
    createdAt: product.createdAt || new Date().toISOString(),
  };
}

function normalizeListResponse(payload: unknown): ProductListResponse {
  const envelope = (isEnvelope(payload) ? payload : { products: Array.isArray(payload) ? payload : [] }) as {
    products?: ProductApiRecord[];
    total?: number;
    pages?: number;
    currentPage?: number;
  };

  return {
    products: (envelope.products ?? []) as ProductApiRecord[],
    total: envelope.total ?? (envelope.products?.length ?? 0),
    pages: envelope.pages ?? 1,
    currentPage: envelope.currentPage ?? 1,
  };
}

async function requestWithFallback<T>(paths: string[], options?: { method?: "GET" | "POST" | "PUT" | "DELETE"; params?: Record<string, string | number | boolean | undefined>; data?: unknown; headers?: Record<string, string>; }): Promise<T> {
  let lastError: unknown;

  for (const path of paths) {
    try {
      const response = await apiClient.request<T>({
        url: path,
        method: options?.method ?? "GET",
        params: options?.params,
        data: options?.data,
        headers: options?.headers,
      });
      return response.data;
    } catch (error) {
      lastError = error;
      if (error instanceof AxiosError) {
        const status = error.response?.status;
        if (status && status !== 404 && status < 500) {
          throw error;
        }
      }
    }
  }

  throw lastError instanceof Error ? lastError : new Error("Request failed");
}

export async function getProducts(filters: ProductQueryFilters = {}): Promise<ProductListResponse> {
  const query: Record<string, string | number | boolean | undefined> = {
    category: filters.category && filters.category !== "all" ? filters.category : undefined,
    search: filters.search?.trim() || undefined,
    status: filters.status,
    page: filters.page,
    limit: filters.limit,
    featured: filters.featured,
  };

  const queryString = new URLSearchParams(
    Object.entries(query).reduce<Record<string, string>>((accumulator, [key, value]) => {
      if (value !== undefined) {
        accumulator[key] = String(value);
      }
      return accumulator;
    }, {})
  ).toString();

  const paths = COLLECTION_PATHS.map((path) => (queryString ? `${path}?${queryString}` : path));
  const payload = await requestWithFallback<unknown>(paths, { method: "GET" });
  return normalizeListResponse(payload);
}

export async function getProduct(identifier: string): Promise<Product | null> {
  const decodedIdentifier = (() => {
    try {
      return decodeURIComponent(identifier);
    } catch {
      return identifier;
    }
  })();

  for (const basePath of DETAIL_PATHS(decodedIdentifier)) {
    try {
      const response = await apiClient.get<ProductApiRecord | ProductApiRecord[] | { product?: ProductApiRecord }>(basePath);
      const payload = response.data;
      if (Array.isArray(payload)) {
        const first = payload[0];
        return first ? normalizeProduct(first) : null;
      }
      if (payload && typeof payload === "object" && "product" in payload && payload.product) {
        return normalizeProduct(payload.product);
      }
      if (payload && typeof payload === "object" && "id" in payload) {
        return normalizeProduct(payload as ProductApiRecord);
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        const status = error.response?.status;
        if (status && status !== 404 && status < 500) {
          throw error;
        }
      }
    }
  }

  const list = await getProducts({ search: decodedIdentifier, limit: 1000 });
  const matched = list.products.find((product) => {
    const generatedSlug = generateSlug(product.name);
    return (
      product.id === decodedIdentifier ||
      product.slug === decodedIdentifier ||
      generatedSlug === decodedIdentifier ||
      product.id === decodedIdentifier ||
      product.slug === decodedIdentifier ||
      generatedSlug === decodedIdentifier.toLowerCase()
    );
  });

  return matched ? normalizeProduct(matched) : null;
}

export async function createProduct(product: ProductMutationPayload): Promise<Product> {
  const response = await requestWithFallback<ProductApiRecord>(COLLECTION_PATHS, {
    method: "POST",
    data: product,
  });
  return normalizeProduct(response);
}

export async function updateProduct(id: string, product: Partial<ProductMutationPayload>): Promise<Product> {
  const response = await requestWithFallback<ProductApiRecord>(DETAIL_PATHS(id), {
    method: "PUT",
    data: product,
  });
  return normalizeProduct(response);
}

export async function deleteProduct(id: string): Promise<{ success: boolean }> {
  return requestWithFallback<{ success: boolean }>(DETAIL_PATHS(id), {
    method: "DELETE",
  });
}

export async function uploadProductImages(productId: string, files: File[]): Promise<{ images: string[] }> {
  const formData = new FormData();
  formData.append("productId", productId);
  files.forEach((file) => formData.append("files", file));

  return requestWithFallback<{ images: string[] }>(["/products/upload-images", "/product/upload-images"], {
    method: "POST",
    data: formData,
  });
}
