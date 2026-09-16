import type { Product } from "@/lib/types";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
export const PRODUCTS_PER_PAGE = 20;

export interface ProductFilters {
  title?: string;
  price_min?: number;
  price_max?: number;
  categoryId?: number;
  offset?: number;
  limit?: number;
}

export async function getProducts(filters: ProductFilters = {}): Promise<Product[]> {
  const query = new URLSearchParams();
  if (filters.title) query.set("title", filters.title);
  if (filters.price_min !== undefined) query.set("price_min", String(filters.price_min));
  if (filters.price_max !== undefined) query.set("price_max", String(filters.price_max));
  if (filters.categoryId) query.set("categoryId", String(filters.categoryId));
  query.set("offset", String(filters.offset ?? 0));
  query.set("limit", String(filters.limit ?? PRODUCTS_PER_PAGE));

  const res = await fetch(`${BASE_URL}/products?${query.toString()}`, {
    next: { revalidate: 3600 },
  });
  if (!res.ok) throw new Error(`Failed to fetch products: ${res.status}`);
  return res.json();
}

export async function getFeaturedProducts(limit = 8): Promise<Product[]> {
  return getProducts({ offset: 0, limit });
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const res = await fetch(`${BASE_URL}/products/slug/${slug}`, {
    next: { revalidate: 3600 },
  });
  if (res.status === 404) return null;
  if (!res.ok) throw new Error(`Failed to fetch product: ${res.status}`);
  return res.json();
}

export async function getRelatedProducts(
  categoryId: number,
  excludeId: number,
  limit = 4
): Promise<Product[]> {
  const products = await getProducts({ categoryId, limit: limit + 1 });
  return products.filter((p) => p.id !== excludeId).slice(0, limit);
}